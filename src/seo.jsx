import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from './data/newspaper';
import { projectsData } from './data/projects';

const DEFAULT_DESCRIPTION =
  'Official portfolio of Aryan Anand, a Full-Stack Developer and AI/ML Engineer at JUET. Explore shipped products, research, internships, and certifications.';

const upsertMeta = (selector, attributes, content) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const upsertLink = (rel, href) => {
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const routeMetadata = (pathname) => {
  if (pathname === '/') {
    return {
      title: SITE.defaultTitle,
      description: DEFAULT_DESCRIPTION,
      type: 'profile',
      image: `${SITE.origin}/avatar.webp`,
      index: true,
      jsonLd: {
        '@type': 'ProfilePage',
        '@id': `${SITE.origin}/#profilepage`,
        url: `${SITE.origin}/`,
        name: 'Aryan Anand — Profile',
        mainEntity: { '@id': `${SITE.origin}/#person` },
      },
    };
  }

  if (pathname === '/certifications') {
    return {
      title: 'Certificates and Credentials — Aryan Anand | JUET',
      description:
        'Browse Aryan Anand’s verified internships, certifications, hackathon credentials, and current résumé.',
      type: 'website',
      image: `${SITE.origin}/avatar.webp`,
      index: true,
      jsonLd: {
        '@type': 'CollectionPage',
        '@id': `${SITE.origin}/certifications#page`,
        url: `${SITE.origin}/certifications`,
        name: 'Certificates and Credentials — Aryan Anand',
        description:
          'Verified internships, certifications, hackathon credentials, and résumé for Aryan Anand.',
        isPartOf: { '@id': `${SITE.origin}/#website` },
      },
    };
  }

  if (pathname.startsWith('/case-files/')) {
    const slug = pathname.split('/')[2]?.toLowerCase();
    const project = projectsData.find((item) => item.id === slug);
    if (project) {
      return {
        title: `${project.title} — Case Study | Aryan Anand`,
        description: project.description,
        type: 'article',
        image: project.thumb ? `${SITE.origin}${project.thumb}` : `${SITE.origin}/avatar.webp`,
        index: true,
        jsonLd: {
          '@type': 'Article',
          '@id': `${SITE.origin}/case-files/${project.id}#article`,
          url: `${SITE.origin}/case-files/${project.id}`,
          headline: project.caseFile.headline,
          description: project.description,
          image: [`${SITE.origin}${project.thumb}`],
          datePublished: `${project.caseFile.entered}-01-01`,
          author: { '@id': `${SITE.origin}/#person` },
          publisher: { '@id': `${SITE.origin}/#person` },
          isPartOf: { '@id': `${SITE.origin}/#website` },
          about: project.tech,
        },
      };
    }
  }

  return {
    title: '404 — Missing Case File · Aryan Anand',
    description: 'The requested Aryan Anand portfolio page could not be found.',
    type: 'website',
    image: `${SITE.origin}/avatar.webp`,
    index: false,
    jsonLd: null,
  };
};

const RouteMetadata = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = routeMetadata(pathname);
    const canonical = `${SITE.origin}${pathname === '/' ? '/' : pathname}`;
    const graph = metadata.jsonLd
      ? {
          '@context': 'https://schema.org',
          '@graph': [
            metadata.jsonLd,
            ...(pathname === '/'
              ? [
                  {
                    '@type': 'Person',
                    '@id': `${SITE.origin}/#person`,
                    name: 'Aryan Anand',
                    url: `${SITE.origin}/`,
                    image: `${SITE.origin}/avatar.webp`,
                    jobTitle: 'Full-Stack Developer & AI/ML Engineer',
                    alumniOf: {
                      '@type': 'EducationalOrganization',
                      name: 'Jaypee University of Engineering and Technology',
                      alternateName: 'JUET',
                    },
                    sameAs: [
                      'https://github.com/AryanAnand-ux',
                      'https://www.linkedin.com/in/aryananand-ux',
                    ],
                  },
                  {
                    '@type': 'WebSite',
                    '@id': `${SITE.origin}/#website`,
                    url: `${SITE.origin}/`,
                    name: 'Aryan Anand Portfolio',
                    publisher: { '@id': `${SITE.origin}/#person` },
                  },
                ]
              : []),
          ],
        }
      : null;

    document.title = metadata.title;
    upsertLink('canonical', canonical);
    upsertMeta('meta[name="description"]', { name: 'description' }, metadata.description);
    upsertMeta('meta[name="robots"]', { name: 'robots' }, metadata.index ? 'index, follow' : 'noindex, follow');
    upsertMeta('meta[property="og:title"]', { property: 'og:title' }, metadata.title);
    upsertMeta('meta[property="og:description"]', { property: 'og:description' }, metadata.description);
    upsertMeta('meta[property="og:type"]', { property: 'og:type' }, metadata.type);
    upsertMeta('meta[property="og:url"]', { property: 'og:url' }, canonical);
    upsertMeta('meta[property="og:image"]', { property: 'og:image' }, metadata.image);
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt' }, `Aryan Anand — ${metadata.title}`);
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, metadata.title);
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, metadata.description);
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, metadata.image);

    const existingJsonLd = document.getElementById('route-jsonld');
    if (existingJsonLd) existingJsonLd.remove();
    if (graph) {
      const script = document.createElement('script');
      script.id = 'route-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(graph);
      document.head.appendChild(script);
    }
  }, [pathname]);

  return null;
};

export default RouteMetadata;
