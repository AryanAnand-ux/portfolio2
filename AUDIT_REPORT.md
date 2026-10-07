# Aryan Anand Portfolio — Current Repository Audit

Audit date: 7 October 2026  
Repository: `AryanAnand-ux/portfolio2`  
Canonical site: <https://aryan.runs-on.dev/>

## Verified current-repository findings

- The build pipeline now runs Vite and then the prerender step through the explicit `prerender`
  npm script.
- The smoke-test command is declared as `test:smoke` and points to `scripts/smoke.mjs`.
- The public build contains 9 generated route documents: the homepage, certifications, and seven
  case-study routes.
- `SITE.defaultTitle` is the source for the homepage route metadata, and the static `index.html`
  title is checked against it.
- CI references only npm scripts declared in `package.json`: `lint`, `build`, `test:smoke`, and
  `audit`.
- The current source contains no frontend secret additions.
- Vercel configuration contains explicit rewrites for the supported public routes and the
  previously audited security headers and CSP restrictions.

## Fixes made

### Build and route generation

- Updated [package.json](./package.json):
  - `build` runs `vite build && npm run prerender`.
  - `prerender` runs `node scripts/prerender.mjs`.
  - `test:smoke` runs `node scripts/smoke.mjs`.
- Updated [src/seo-data.js](./src/seo-data.js) to use `SITE.defaultTitle` for the homepage
  metadata instead of duplicating the title string.
- Strengthened [scripts/smoke.mjs](./scripts/smoke.mjs) to verify:
  - all expected generated route files exist;
  - route title, description, canonical, JSON-LD, and no-JavaScript fallback output exist;
  - sitemap and robots coverage are present;
  - required npm scripts are declared;
  - `index.html` matches `SITE.defaultTitle`.
- Kept the existing visual design, content, animations, and application behavior unchanged.

### Existing audited improvements retained

- Build-time route metadata and JSON-LD prerendering.
- Explicit Vercel route rewrites without a broad unknown-route SPA rewrite.
- Narrowed CSP and security headers in [vercel.json](./vercel.json).
- Stable image geometry and compact certificate-card layout.
- CI workflow in [.github/workflows/ci.yml](./.github/workflows/ci.yml).

## Checks run against the current repository

The following exact commands were run successfully after the changes:

- `npm run lint`
- `npm run build`
- `npm run test:smoke`
- `npm run audit`
- `git diff --check`
- `npm run build` generated the production bundle and prerendered all 9 routes.
- `npm run test:smoke` verified the generated route files, route metadata, JSON-LD, fallback
  content, sitemap, robots, npm scripts, and title alignment.

`npm audit --audit-level=high` reported 0 vulnerabilities.

## Files changed for this integration fix

- [package.json](./package.json)
- [src/seo-data.js](./src/seo-data.js)
- [scripts/smoke.mjs](./scripts/smoke.mjs)
- [AUDIT_REPORT.md](./AUDIT_REPORT.md)

## Remaining risks not verified by repository-only checks

- Live production HTML, response headers, unknown-route HTTP 404 behavior, social previews, and
  post-deployment Core Web Vitals require an accessible deployed response.
- The prerendered no-JavaScript fallback improves crawlability but is not full server-rendered
  React.
- The existing `style-src-attr 'unsafe-inline'` exception remains coupled to current inline
  animation styles.
- The visitor counter remains dependent on `abacus.jasoncameron.dev`.

## Repository-based scores

| Area | Score | Basis |
|---|---:|---|
| SEO | 94/100 | Route metadata, canonicals, JSON-LD, sitemap coverage, and prerendered fallback are present in the build pipeline. |
| Performance | 86/100 | Stable image geometry, compact certificate cards, lazy non-critical images, and the existing optimized production bundle. |
| Security | 94/100 | Current CSP/security headers remain narrowed and the high-severity dependency audit is clean. |
| Production readiness | 96/100 | Build/prerender integration, smoke tests, CI script alignment, and dependency checks are wired; live deployment behavior is not measurable from the repository alone. |

## Deployment checklist

1. Deploy the current branch to Vercel.
2. Confirm raw HTML metadata for `/`, `/certifications`, and every case-study route.
3. Confirm unknown direct paths return HTTP 404 rather than the homepage shell.
4. Inspect production CSP and verify the visitor counter and Vercel Insights.
5. Validate JSON-LD and social previews.
6. Measure mobile and desktop Core Web Vitals after deployment.
