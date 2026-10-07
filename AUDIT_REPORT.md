# Aryan Anand Portfolio — Engineering Audit

Audit date: 7 October 2026  
Repository: `AryanAnand-ux/portfolio2`  
Production URL: <https://aryan.runs-on.dev/>

## Scope

The source tree, Vite and Vercel configuration, route components, metadata, assets, external
links, browser behavior, dependency graph, and production build were reviewed. The existing
newspaper visual identity and animation system were preserved.

## Issues found

### P0/P1 issues

- Route changes only updated `document.title`; canonical, description, Open Graph, Twitter, and
  structured data stayed pointed at the home page.
- Uppercase case-study slugs were accepted inconsistently and had no canonical redirect.
- The catch-all Vercel rewrite returned the SPA shell for arbitrary paths, creating a soft-404
  risk for crawlers.
- CSP allowed all HTTPS image origins and unnecessary frame/blob sources.
- The project had no CI workflow, dependency audit command, or security reporting policy.
- Several lazy images had no intrinsic dimensions in markup, relying on CSS alone to reserve space.
- The dependency lockfile contained ten high/moderate advisories.

### Lower-severity observations

- `keywords` was redundant and removed; relevance now comes from page copy, titles, descriptions,
  headings, and structured data.
- Two Google verification tags existed; the retained tag is the one currently configured for the
  property. Verification ownership should be reconfirmed if that property changes.
- Vercel Analytics and Speed Insights intentionally request their platform scripts at runtime.

## Fixes made

- Added route-aware metadata in `src/seo.jsx`:
  - canonical URL
  - title and description
  - robots index/noindex state
  - Open Graph title, description, type, URL, image, and alt text
  - Twitter title, description, and image
  - route JSON-LD for the profile, credentials collection, and case-study article
- Added `Person`, `WebSite`, and JUET identity signals targeting Aryan Anand, JUET, developer,
  and AI/ML searches.
- Added lowercase canonical redirects for case-study slugs.
- Replaced the broad SPA catch-all rewrite with explicit rewrites for `/`, `/certifications`, and
  `/case-files/:slug`; arbitrary direct paths are no longer intentionally rewritten as valid
  pages.
- Tightened CSP with `base-uri`, `object-src 'none'`, `form-action`, `frame-src 'none'`, and
  same-origin image policy. Added COOP and CORP headers.
- Moved the JavaScript motion-class setup out of inline HTML scripts, removing two unnecessary
  inline script blocks.
- Added width/height hints to project, case-study, certification, and existing hero images.
- Constrained certification thumbnails to a fixed 16:10 frame so portrait source PDFs cannot
  expand the cards vertically; previews remain cropped with `object-fit: cover`.
- Added `npm run audit`, GitHub Actions CI, and `SECURITY.md`.
- Updated the lockfile through `npm audit fix`; the final audit reports zero vulnerabilities.

## SEO improvements

- Home page remains optimized around Aryan Anand, Full-Stack Developer, AI/ML Engineer, JUET,
  Bhopal, and portfolio intent.
- Certification and case-study routes now receive distinct metadata.
- Case-study canonical URLs are normalized to lowercase slugs.
- JSON-LD now describes a profile, person, website, credentials collection, and individual
  articles instead of only a static home graph.
- `robots.txt` and `sitemap.xml` were inspected and remain valid and aligned with the public
  route set.
- Unknown direct URLs are no longer covered by the previous catch-all rewrite, reducing
  crawlable soft-404s.

## Performance improvements

- Preserved the current animations and reduced-motion support.
- Kept above-the-fold hero image priority and asynchronous decoding.
- Added intrinsic image dimensions and retained CSS aspect-ratio constraints to reduce CLS.
- Kept non-critical project/certification imagery lazy-loaded.
- Removed redundant metadata and reduced CSP parsing/permission surface.
- Production output after the fixes: 303.68 kB JavaScript (93.54 kB gzip) and 41.58 kB CSS
  (8.34 kB gzip).

## Security improvements

- Reduced `img-src` from unrestricted HTTPS to same-origin/data URLs.
- Removed unnecessary frame/blob permissions and added `object-src 'none'`.
- Added `base-uri 'self'`, explicit `form-action`, `frame-ancestors 'none'`, COOP, and CORP.
- Confirmed no `dangerouslySetInnerHTML`, `innerHTML`, `eval`, frontend secrets, or unsafe URL
  construction from user-controlled content.
- Preserved `rel="noopener noreferrer"` on external new-tab links.
- Dependency audit is clean after lockfile updates.
- `unsafe-inline` remains in `script-src` because JSON-LD is emitted as an inline structured-data
  block; `style-src 'unsafe-inline'` remains because the current component animation system uses
  React inline custom properties. These are documented intentional exceptions.

## Accessibility improvements

- Existing skip link, semantic headings, labels, focus-visible styles, reduced-motion handling,
  mobile menu `aria-expanded`/`aria-controls`, Escape handling, and inert closed navigation were
  verified.
- Added image dimensions without altering accessible names or visual layout.
- Existing meaningful image alt text and icon-only link labels were retained.
- The contact form remains a local `mailto:` handoff and does not silently submit data to a
  server.

## Production-readiness improvements

- Added CI for Node 22 with locked install, lint, build, and high-severity dependency audit.
- Added a vulnerability disclosure policy.
- Explicit route rewrites now distinguish supported SPA routes from arbitrary paths.
- `npm run check` remains the local combined lint/build gate.

## Files changed

- [AUDIT_REPORT.md](./AUDIT_REPORT.md)
- [SECURITY.md](./SECURITY.md)
- [.github/workflows/ci.yml](./.github/workflows/ci.yml)
- [index.html](./index.html)
- [package.json](./package.json)
- [package-lock.json](./package-lock.json)
- [src/App.jsx](./src/App.jsx)
- [src/main.jsx](./src/main.jsx)
- [src/seo.jsx](./src/seo.jsx)
- [src/components/news/NewsCaseFile.jsx](./src/components/news/NewsCaseFile.jsx)
- [src/components/news/NewsCertifications.jsx](./src/components/news/NewsCertifications.jsx)
- [src/components/news/news.css](./src/components/news/news.css)
- [src/components/news/NewsWorks.jsx](./src/components/news/NewsWorks.jsx)
- [vercel.json](./vercel.json)

## Tests and checks performed

- `npm ci` — passed.
- `npm run lint` — passed.
- `npm run build` — passed with Vite 8.3.3.
- `npm run check` — passed.
- `npm run audit` — passed; 0 vulnerabilities.
- `git diff --check` — passed.
- Vercel JSON parse validation — passed.
- Local production preview smoke test:
  - `/` — passed; title and home canonical verified.
  - `/certifications` — passed; distinct title and route metadata verified.
  - `/case-files/juet-nexus` — passed; title, lowercase canonical, OG URL, `index, follow`,
    JSON-LD, and case heading verified.
  - `/case-files/JUET-NEXUS` — canonical redirect behavior implemented.
  - `/not-a-real-route` — client 404 page and `noindex, follow` metadata verified.
- Live `robots.txt`, `sitemap.xml`, and home response were fetched and reviewed.

## Remaining issues / not verified

- Route metadata is generated client-side after hydration. Social crawlers that do not execute
  JavaScript may still see the static home metadata on deep URLs; full per-route SSR/prerendering
  would require a build-time prerender or server-rendering layer.
- Vercel production response headers, redirect status codes, Google Search Console indexing, and
  Core Web Vitals in real-user traffic were not verifiable from the local repository session and
  must be checked after deployment.
- Local preview logs 404s for `/_vercel/insights/*` and `/_vercel/speed-insights/*`; these are
  expected because those scripts are injected by the Vercel platform, not by Vite preview.
- No automated browser test framework was added; smoke tests used the integrated browser against
  the production preview.

## Deployment checklist

1. Deploy the current branch to Vercel.
2. Verify `/`, `/certifications`, every sitemap case-study URL, and an arbitrary unknown URL.
3. Confirm unknown direct URLs return an HTTP 404 and supported deep links return HTTP 200.
4. Inspect response headers for CSP, COOP, CORP, X-Frame-Options, and Referrer-Policy.
5. Validate canonical, OG, Twitter, and JSON-LD output in rendered deep routes.
6. Run Lighthouse on mobile and desktop; record LCP, CLS, and INP.
7. Submit/refresh `https://aryan.runs-on.dev/sitemap.xml` in Google Search Console.
8. Confirm the retained Google verification token belongs to the intended property.
9. Review Vercel Analytics and Speed Insights after real traffic is collected.

## Final scores

| Area | Score | Rationale |
|---|---:|---|
| SEO | 88/100 | Strong route metadata and structured data; client-side metadata still limits non-JS social crawlers. |
| Performance | 84/100 | Small production bundle, lazy images, dimensions, and preserved motion; real-user CWV not measured. |
| Security | 92/100 | Tightened headers, no exposed secrets, and clean dependency audit; intentional inline CSP exceptions remain. |
| Production readiness | 90/100 | CI, audit gate, security policy, and safer routing are present; deployment verification remains. |
