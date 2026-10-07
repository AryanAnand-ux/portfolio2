import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getJsonLd, getRouteMetadata, SITE_ORIGIN } from './seo-data';

const upsertMeta = (selector, attributes, content) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const setCanonical = (href) => {
  const existing = document.head.querySelector('link[rel="canonical"]');
  if (!href) {
    existing?.remove();
    return;
  }

  const element = existing ?? document.createElement('link');
  element.setAttribute('rel', 'canonical');
  element.setAttribute('href', href);
  if (!existing) document.head.appendChild(element);
};

const RouteMetadata = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = getRouteMetadata(pathname);
    const canonical = metadata.canonicalPath
      ? `${SITE_ORIGIN}${metadata.canonicalPath}`
      : null;
    const jsonLd = getJsonLd(metadata);

    document.title = metadata.title;
    setCanonical(canonical);
    upsertMeta('meta[name="description"]', { name: 'description' }, metadata.description);
    upsertMeta(
      'meta[name="robots"]',
      { name: 'robots' },
      metadata.index ? 'index, follow' : 'noindex, follow'
    );
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, metadata.title);
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, metadata.description);
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, metadata.type);
    upsertMeta(
      'meta[property="og:url"]',
      { property: 'og:url' },
      canonical ?? `${SITE_ORIGIN}${pathname}`
    );
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, 'Aryan Anand');
    upsertMeta('meta[property="og:image"]', { property: 'og:image' }, metadata.image);
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt' }, metadata.imageAlt);
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, 'summary_large_image');
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, metadata.title);
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, metadata.description);
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, metadata.image);
    upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt' }, metadata.imageAlt);

    document.getElementById('route-jsonld')?.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'route-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [pathname]);

  return null;
};

export default RouteMetadata;
