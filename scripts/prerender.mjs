import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getJsonLd, getRouteMetadata, SITE_ORIGIN } from '../src/seo-data.js';
import { projectsData } from '../src/data/projects.js';
import { certificatesData } from '../src/data/certificates.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const templatePath = path.join(dist, 'index.html');
const routes = ['/', '/certifications', ...projectsData.map((project) => `/case-files/${project.id}`)];

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

const replaceTitle = (html, title) => html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

const replaceMeta = (html, attribute, key, content) => {
  const pattern = new RegExp(
    `(<meta\\s+${attribute}="${key}"\\s+content=")[^"]*(")`,
    'i'
  );
  return html.replace(pattern, `$1${escapeHtml(content)}$2`);
};

const replaceCanonical = (html, canonical) => {
  const pattern = /(<link\s+rel="canonical"\s+href=")[^"]*(")/i;
  return canonical ? html.replace(pattern, `$1${escapeHtml(canonical)}$2`) : html;
};

// The shared template preloads the hero portrait for the home page. Emitting that
// preload on sub-pages wastes a high-priority request on an image they never show.
const replaceLcpPreload = (html, route) => {
  if (route === '/') return html;
  if (route === '/certifications') {
    return html.replace(/[ \t]*<!-- LCP image preload -->\r?\n[ \t]*<link rel="preload" as="image"[^>]*\/>\r?\n?/, '');
  }
  const project = projectsData.find((item) => route === `/case-files/${item.id}`);
  const image = project?.thumb ? project.thumb : '/avatar.webp';
  const pattern = /(<link\s+rel="preload"\s+as="image"\s+href=")[^"]*(")/i;
  return html.replace(pattern, `$1${escapeHtml(image)}$2`);
};

const addJsonLd = (html, jsonLd) => {
  if (!jsonLd) return html;
  const serialized = JSON.stringify(jsonLd).replaceAll('<', '\\u003c');
  return html.replace('</head>', `  <script id="route-jsonld" type="application/ld+json">${serialized}</script>\n</head>`);
};

const renderNoScript = (route) => {
  const metadata = getRouteMetadata(route);
  const links = projectsData
    .map(
      (project) =>
        `<li><a href="/case-files/${project.id}">${escapeHtml(project.title)}</a> — ${escapeHtml(project.description)}</li>`
    )
    .join('');

  if (route === '/') {
    return `<noscript id="seo-fallback"><main><h1>Aryan Anand | Full-Stack Developer &amp; AI/ML Engineer</h1><p>${escapeHtml(metadata.description)}</p><h2>Selected works</h2><ul>${links}</ul><p><a href="/certifications">View certificates and credentials</a> · <a href="/#contact">Contact Aryan Anand</a></p></main></noscript>`;
  }

  if (route === '/certifications') {
    return `<noscript id="seo-fallback"><main><h1>Certificates and Credentials — Aryan Anand | JUET</h1><p>${escapeHtml(metadata.description)}</p><ul>${certificatesData
      .map(
        (certificate) =>
          `<li><a href="${certificate.file}">${escapeHtml(certificate.title)}</a> — ${escapeHtml(certificate.issuer)} (${escapeHtml(certificate.date)})</li>`
      )
      .join('')}</ul><p><a href="/">Return to Aryan Anand’s portfolio</a></p></main></noscript>`;
  }

  const project = projectsData.find((item) => route === `/case-files/${item.id}`);
  if (!project) return '';
  return `<noscript id="seo-fallback"><main><p><a href="/">Aryan Anand portfolio</a> / Case Study</p><h1>${escapeHtml(project.caseFile.headline)}</h1><p>${escapeHtml(project.caseFile.lead)}</p><h2>About this project</h2>${project.caseFile.body
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join('')}<h2>Technology</h2><ul>${project.tech
    .map((technology) => `<li>${escapeHtml(technology)}</li>`)
    .join('')}</ul><p><a href="${escapeHtml(project.projectLink || project.github)}">Inspect the evidence</a></p></main></noscript>`;
};

const addNoScriptFallback = (html, route) =>
  html.replace('<div id="root">', `${renderNoScript(route)}\n  <div id="root">`);

const renderRoute = (template, route) => {
  const metadata = getRouteMetadata(route);
  const canonical = metadata.canonicalPath
    ? `${SITE_ORIGIN}${metadata.canonicalPath}`
    : null;
  let html = replaceTitle(template, metadata.title);
  html = replaceMeta(html, 'name', 'description', metadata.description);
  html = replaceMeta(html, 'name', 'robots', metadata.index ? 'index, follow' : 'noindex, follow');
  html = replaceMeta(html, 'property', 'og:title', metadata.title);
  html = replaceMeta(html, 'property', 'og:description', metadata.description);
  html = replaceMeta(html, 'property', 'og:type', metadata.type);
  html = replaceMeta(html, 'property', 'og:url', canonical ?? `${SITE_ORIGIN}${route}`);
  html = replaceMeta(html, 'property', 'og:image', metadata.image);
  html = replaceMeta(html, 'property', 'og:image:alt', metadata.imageAlt);
  html = replaceMeta(html, 'name', 'twitter:title', metadata.title);
  html = replaceMeta(html, 'name', 'twitter:description', metadata.description);
  html = replaceMeta(html, 'name', 'twitter:image', metadata.image);
  html = replaceMeta(html, 'name', 'twitter:image:alt', metadata.imageAlt);
  html = replaceCanonical(html, canonical);
  html = replaceLcpPreload(html, route);
  html = addJsonLd(html, getJsonLd(metadata));
  return addNoScriptFallback(html, route);
};

const outputPathFor = (route) =>
  route === '/' ? path.join(dist, 'index.html') : path.join(dist, route.slice(1), 'index.html');

// Google ignores changefreq/priority but does read <lastmod>. Stamping the build
// date gives recrawl signals a real value instead of the placeholder the source
// sitemap ships with, so refreshed content is picked up on the next crawl.
const stampSitemapLastmod = async () => {
  const sitemapPath = path.join(dist, 'sitemap.xml');
  let xml = await readFile(sitemapPath, 'utf8');
  if (/<lastmod>/.test(xml)) return;
  const lastmod = new Date().toISOString().slice(0, 10);
  xml = xml.replace(/(<url>)(?!\s*<lastmod>)/g, `$1\n    <lastmod>${lastmod}</lastmod>`);
  await writeFile(sitemapPath, xml);
};

const template = await readFile(templatePath, 'utf8');
for (const route of routes) {
  const outputPath = outputPathFor(route);
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, renderRoute(template, route));
}

await stampSitemapLastmod();

console.log(`Prerendered ${routes.length} public routes.`);
