import { SITE } from './data/newspaper.js';
import { projectsData } from './data/projects.js';
import { certificatesData } from './data/certificates.js';

export const DEFAULT_DESCRIPTION =
  'Official portfolio of Aryan Anand, a Full-Stack Developer and AI/ML Engineer at JUET. Explore shipped products, research, internships, and certifications.';
export const SITE_ORIGIN = SITE.origin;

const PERSON_ID = `${SITE.origin}/#person`;
const WEBSITE_ID = `${SITE.origin}/#website`;

const person = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Aryan Anand',
  alternateName: ['Aryan Anand JUET', 'Aryan Anand Developer', 'AryanAnand-ux'],
  url: `${SITE.origin}/`,
  image: `${SITE.origin}/avatar.webp`,
  jobTitle: 'Full-Stack Developer & AI/ML Engineer',
  description:
    'Full-stack developer and AI/ML engineer at Jaypee University of Engineering and Technology (JUET) specializing in React, Node.js, FastAPI, and machine learning systems.',
  email: 'aryan.anand1806@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bhopal',
    addressRegion: 'Madhya Pradesh',
    addressCountry: 'IN',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Jaypee University of Engineering and Technology',
    alternateName: ['JUET', 'JUET Guna'],
  },
  sameAs: ['https://github.com/AryanAnand-ux', 'https://www.linkedin.com/in/aryananand-ux'],
  knowsAbout: [
    'Full-Stack Development',
    'React',
    'Node.js',
    'FastAPI',
    'Python',
    'Artificial Intelligence',
    'Machine Learning',
    'TypeScript',
    'GraphQL',
    'REST APIs',
    'JUET',
  ],
};

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE.origin}/`,
  name: 'Aryan Anand Portfolio',
  alternateName: ['Aryan Anand Portfolio JUET', 'Aryan Anand Website'],
  description: DEFAULT_DESCRIPTION,
  publisher: { '@id': PERSON_ID },
  inLanguage: 'en-IN',
};

const normalizePath = (pathname) => {
  const path = pathname.replace(/\/+$/, '');
  return path || '/';
};

export const getRouteMetadata = (pathname) => {
  const normalizedPath = normalizePath(pathname);

  if (normalizedPath === '/') {
    return {
      title: 'Aryan Anand | Portfolio — Full-Stack Developer & AI Engineer (JUET)',
      description: DEFAULT_DESCRIPTION,
      type: 'profile',
      image: `${SITE.origin}/avatar.webp`,
      imageAlt: 'Portrait of Aryan Anand',
      canonicalPath: '/',
      index: true,
      page: {
        '@type': 'ProfilePage',
        '@id': `${SITE.origin}/#profilepage`,
        url: `${SITE.origin}/`,
        name: 'Aryan Anand — Profile',
        description: DEFAULT_DESCRIPTION,
        mainEntity: { '@id': PERSON_ID },
        isPartOf: { '@id': WEBSITE_ID },
        inLanguage: 'en-IN',
      },
    };
  }

  if (normalizedPath === '/certifications') {
    const itemListId = `${SITE.origin}/certifications#credentials`;
    return {
      title: 'Certificates and Credentials — Aryan Anand | JUET',
      description:
        'Browse Aryan Anand’s internships, certifications, hackathon credentials, and current résumé from JUET.',
      type: 'website',
      image: `${SITE.origin}/avatar.webp`,
      imageAlt: 'Aryan Anand portfolio credentials',
      canonicalPath: '/certifications',
      index: true,
      page: {
        '@type': 'CollectionPage',
        '@id': `${SITE.origin}/certifications#page`,
        url: `${SITE.origin}/certifications`,
        name: 'Certificates and Credentials — Aryan Anand',
        description:
          'Aryan Anand’s internships, certifications, hackathon credentials, and résumé.',
        mainEntity: { '@id': itemListId },
        isPartOf: { '@id': WEBSITE_ID },
        inLanguage: 'en-IN',
      },
      additional: {
        '@type': 'ItemList',
        '@id': itemListId,
        name: 'Aryan Anand credentials',
        numberOfItems: certificatesData.length,
        itemListElement: certificatesData.map((certificate, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'EducationalOccupationalCredential',
            name: certificate.title,
            credentialCategory: 'Certificate',
            recognizedBy: {
              '@type': 'Organization',
              name: certificate.issuer,
            },
            url: `${SITE.origin}/certifications`,
          },
        })),
      },
    };
  }

  const caseFilePrefix = '/case-files/';
  if (normalizedPath.startsWith(caseFilePrefix)) {
    const slug = normalizedPath.slice(caseFilePrefix.length).toLowerCase();
    const project = projectsData.find((item) => item.id === slug);
    if (project) {
      const canonicalPath = `${caseFilePrefix}${project.id}`;
      return {
        title: `${project.title} — Case Study | Aryan Anand`,
        description: project.description,
        type: 'article',
        image: project.thumb ? `${SITE.origin}${project.thumb}` : `${SITE.origin}/avatar.webp`,
        imageAlt: `${project.title} interface`,
        canonicalPath,
        index: true,
        page: {
          '@type': 'Article',
          '@id': `${SITE.origin}${canonicalPath}#article`,
          url: `${SITE.origin}${canonicalPath}`,
          headline: project.caseFile.headline,
          description: project.description,
          image: project.thumb ? [`${SITE.origin}${project.thumb}`] : [`${SITE.origin}/avatar.webp`],
          datePublished: `${project.caseFile.entered}-01-01`,
          author: { '@id': PERSON_ID },
          publisher: { '@id': PERSON_ID },
          mainEntityOfPage: `${SITE.origin}${canonicalPath}`,
          articleSection: 'Case Study',
          keywords: project.tech,
          isPartOf: { '@id': WEBSITE_ID },
          inLanguage: 'en-IN',
        },
      };
    }
  }

  return {
    title: '404 — Missing Case File · Aryan Anand',
    description: 'The requested Aryan Anand portfolio page could not be found.',
    type: 'website',
    image: `${SITE.origin}/avatar.webp`,
    imageAlt: 'Aryan Anand portfolio',
    canonicalPath: null,
    index: false,
    page: null,
  };
};

export const getJsonLd = (metadata) => {
  if (!metadata.page) return null;
  return {
    '@context': 'https://schema.org',
    '@graph': [person, website, metadata.page, ...(metadata.additional ? [metadata.additional] : [])],
  };
};
