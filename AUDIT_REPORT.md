# Aryan Anand Portfolio — Re-audit Report

Audit date: 7 October 2026  
Repository: `AryanAnand-ux/portfolio2`  
Canonical site: <https://aryan.runs-on.dev/>

## Verified findings

1. The previous implementation updated route metadata only after React hydration. The source
   `index.html` was therefore the same initial HTML shell for deep routes.
2. `index.html` and the React homepage used different titles.
3. Route metadata and JSON-LD logic was duplicated between the static document and React.
4. The Vercel rewrite for case studies used a dynamic SPA shell rather than generated route
   documents.
5. `abacus.jasoncameron.dev` is actively used by `VisitorCount.jsx`; it is not an unused CSP
   origin. Vercel Insights uses the same-origin `/_vercel` scripts and the Vercel vitals origin.
6. The JavaScript project has no TypeScript source; the direct `@types/react` and
   `@types/react-dom` dev dependencies were unused.
7. Project, case-study, hero, and certificate images have intrinsic dimensions or stable CSS
   aspect-ratio containers. The certificate card frame was verified at approximately 16:10 in
   the local browser.
8. Configured external project links returned HTTP 200 for GitHub and the four deployed project
   URLs tested. LinkedIn rejected automated requests with 405/999 responses, so it is not
   classified as broken.

## Fixes made

### Route SEO and prerendering

- Added [src/seo-data.js](./src/seo-data.js) as the single source of truth for:
  - route titles
  - descriptions
  - canonical paths
  - Open Graph values
  - Twitter card values
  - index/noindex state
  - route JSON-LD
- Updated [src/seo.jsx](./src/seo.jsx) to consume the shared metadata and update the document
  during client-side navigation.
- Aligned `SITE.defaultTitle`, `index.html`, generated HTML, and React to:
  `Aryan Anand | Portfolio — Full-Stack Developer & AI Engineer (JUET)`.
- Added static JSON-LD for `Person`, `WebSite`, `ProfilePage`, `CollectionPage`, `ItemList`, and
  case-study `Article` entities.
- Added route-specific Twitter image alt metadata and canonical Open Graph URLs.
- Added [scripts/prerender.mjs](./scripts/prerender.mjs), which generates static HTML for:
  - `/`
  - `/certifications`
  - all seven `/case-files/:slug` routes
- Each generated route now contains its own title, description, canonical, OG metadata, Twitter
  metadata, JSON-LD, and a semantic `<noscript>` content fallback with headings, descriptions,
  links, project details, or certificate listings.
- Updated [vercel.json](./vercel.json) to rewrite supported routes to their generated HTML files.
  Arbitrary unknown paths are not covered by a catch-all SPA rewrite.

### Security and CSP

- Removed the unused Vercel script origin from `script-src`.
- Removed `script-src 'unsafe-inline'`; the remaining inline JSON-LD is a non-executable data
  block, while application code is loaded from same-origin bundled assets.
- Removed `style-src 'unsafe-inline'` and scoped the necessary React custom-property styles to
  `style-src-attr 'unsafe-inline'`.
- Removed `data:` from `img-src`; all application images are same-origin.
- Removed the obsolete `interest-cohort` permission.
- Kept `https://abacus.jasoncameron.dev` in `connect-src` because the visitor counter fetches
  it at runtime.
- Kept `https://vitals.vercel-insights.com` because Vercel Speed Insights uses it.
- Retained `base-uri`, `object-src`, `form-action`, `frame-src 'none'`, `frame-ancestors 'none'`,
  COOP, CORP, X-Frame-Options, nosniff, and the existing referrer policy.

### Dependencies and production checks

- Removed unused direct React type packages from [package.json](./package.json).
- Added static route and sitemap smoke validation in [scripts/smoke.mjs](./scripts/smoke.mjs).
- CI now runs install, lint, production build/prerender, static smoke tests, and high-severity
  dependency audit in [.github/workflows/ci.yml](./.github/workflows/ci.yml).
- No frontend secrets were added or exposed. Existing public profile/contact data remains
  intentionally public portfolio content.

## Checks performed

- `npm run lint` — passed.
- `npm run build` — passed; Vite generated the production bundle and prerendered 9 routes.
- `npm run test:smoke` — passed; all 9 generated routes contain title, canonical, JSON-LD, and
  crawlable fallback content.
- Smoke test verified all 9 public routes are represented in `sitemap.xml` and that `robots.txt`
  references the canonical sitemap.
- `npm audit --audit-level=high` — passed with 0 vulnerabilities.
- `npm ls --depth=0` — passed after removing unused type packages.
- `git diff --check` — passed.
- `vercel.json` JSON parsing — passed.
- Local production preview:
  - `/` title matched the canonical homepage title.
  - `/certifications` exposed its route-specific title, canonical, OG URL, JSON-LD, and fallback.
  - `/case-files/juet-nexus` exposed its case-study title, canonical, OG URL, JSON-LD, fallback,
    and rendered heading.
  - `/case-files/JUET-NEXUS` redirected client-side to the lowercase canonical route.
  - Certificate cards remained compact after hydration.
- External link checks:
  - GitHub — HTTP 200.
  - JUET Nexus, Loom2, File Converter, and HY Kero Predictor — HTTP 200.
  - LinkedIn — automated client blocked with 405/999; not verified as broken.

## Live deployment verification

The currently deployed site was checked before these new local changes were deployed:

- `robots.txt` and `sitemap.xml` were reachable and contain the expected public route list.
- The live deep-route HTML response still showed the homepage shell/title rather than route-specific
  static metadata. This confirms the remaining limitation in the deployed version and is expected
  until the current build is deployed.
- Production response headers, the new generated deep-route HTML, and post-deploy Core Web Vitals
  are not yet verified for this re-audit.

## Remaining risks

- The generated `<noscript>` fallback improves crawler-visible content without introducing SSR,
  but it is not equivalent to full server-rendered React. The site still needs post-deployment
  crawler and social-card validation.
- `style-src-attr 'unsafe-inline'` remains necessary for the existing animation delay custom
  properties and inline SVG positioning. Removing it would change animation behavior.
- The visitor counter depends on the third-party `abacus.jasoncameron.dev` service. If that
  feature is removed later, its CSP origin should be removed at the same time.
- LinkedIn availability remains unverified because the provider blocks automated requests.
- Real-user LCP, CLS, and INP are not measurable from this local audit and must be checked after
  deployment.

## Final scores

| Area | Score | Basis |
|---|---:|---|
| SEO | 94/100 | Static route metadata, canonical URLs, JSON-LD, sitemap coverage, and no-JS fallback are now present; post-deploy crawler validation remains. |
| Performance | 86/100 | Stable image geometry, compact certificate cards, lazy non-critical images, and a 94 kB gzip JS bundle; real-user CWV remains unmeasured. |
| Security | 94/100 | Clean dependency audit and narrower CSP with only verified external origins; a scoped style attribute exception remains. |
| Production readiness | 94/100 | CI, prerendering, route smoke tests, security policy, explicit rewrites, and deployment checks are present; this revision still needs deployment verification. |

## Deployment checklist

1. Deploy the current `main` changes to Vercel.
2. Confirm `/`, `/certifications`, and every sitemap case-study route return the generated route
   metadata without waiting for JavaScript.
3. Confirm an unknown direct path returns HTTP 404 and is not rewritten to the homepage.
4. Inspect production CSP and confirm the visitor counter and Vercel Insights still function.
5. Validate JSON-LD with Google’s Rich Results Test or Schema Markup Validator.
6. Check Open Graph/Twitter previews for the homepage and at least one case study.
7. Run mobile and desktop Lighthouse and record LCP, CLS, and INP.
8. Re-check the live sitemap in Google Search Console after deployment.
