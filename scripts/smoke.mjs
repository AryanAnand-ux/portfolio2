import { access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projectsData } from '../src/data/projects.js';
import { SITE } from '../src/data/newspaper.js';
import { getRouteMetadata, SITE_ORIGIN } from '../src/seo-data.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const routes = ['/', '/certifications', ...projectsData.map((project) => `/case-files/${project.id}`)];
const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const requiredScripts = ['build', 'prerender', 'test:smoke', 'lint', 'audit'];
for (const script of requiredScripts) {
  if (!packageJson.scripts?.[script]) {
    throw new Error(`Missing npm script: ${script}`);
  }
}

const sourceIndex = await readFile(path.join(root, 'index.html'), 'utf8');
const escapedDefaultTitle = SITE.defaultTitle.replaceAll('&', '&amp;');
if (!sourceIndex.includes(`<title>${escapedDefaultTitle}</title>`)) {
  throw new Error('index.html title does not match SITE.defaultTitle');
}

for (const route of routes) {
  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');
  await access(file);
  const html = await readFile(file, 'utf8');
  const metadata = getRouteMetadata(route);
  const escapedTitle = metadata.title.replaceAll('&', '&amp;');
  const escapedDescription = metadata.description.replaceAll('&', '&amp;');
  const canonical = `${SITE_ORIGIN}${metadata.canonicalPath}`;
  if (
    !html.includes(`<title>${escapedTitle}</title>`) ||
    !html.includes(`name="description"`) ||
    !html.includes(`content="${escapedDescription}"`) ||
    !html.includes(`rel="canonical" href="${canonical}"`) ||
    !html.includes('route-jsonld') ||
    !html.includes('id="seo-fallback"')
  ) {
    throw new Error(`Missing SEO output in ${route}`);
  }

  // The 1.4 MB avatar PNG must never ship as a page icon again.
  if (html.includes('href="/avatar.png"')) {
    throw new Error(`${route} references the oversized avatar.png as an icon`);
  }
  if (!html.includes('<html lang="en-IN">') || !html.includes('property="og:locale"')) {
    throw new Error(`${route} is missing locale metadata`);
  }

  // The LCP preload must name an image the route actually renders.
  const preload = /<link rel="preload" as="image" href="([^"]+)"/.exec(html)?.[1];
  if (route === '/certifications' && preload) {
    throw new Error('/certifications preloads an image it does not show');
  }
  if (route === '/' && preload !== '/avatar.webp') {
    throw new Error(`Home preloads "${preload}" instead of the hero portrait`);
  }
  if (route.startsWith('/case-files/')) {
    const project = projectsData.find((item) => route === `/case-files/${item.id}`);
    if (preload !== project.thumb) {
      throw new Error(`${route} preloads "${preload}" instead of its plate image`);
    }
  }
}

console.log('Verified per-route icon, locale and LCP preload output.');

console.log(`Verified static SEO output for ${routes.length} routes.`);
console.log('Verified required npm scripts and SITE.defaultTitle alignment.');

const sitemap = await readFile(path.join(dist, 'sitemap.xml'), 'utf8');
for (const route of routes) {
  const url = `${SITE_ORIGIN}${route}`;
  if (!sitemap.includes(`<loc>${url}</loc>`)) {
    throw new Error(`Missing ${url} from sitemap.xml`);
  }
}

const urlEntryCount = (sitemap.match(/<url>/g) ?? []).length;
const lastmodCount = (sitemap.match(/<lastmod>/g) ?? []).length;
if (urlEntryCount !== routes.length || lastmodCount !== routes.length) {
  throw new Error(`sitemap.xml must stamp <lastmod> on all ${routes.length} urls`);
}

const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
if (!robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`)) {
  throw new Error('robots.txt does not reference the canonical sitemap');
}

console.log('Verified sitemap and robots.txt route coverage.');
