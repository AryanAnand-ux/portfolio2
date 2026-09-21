// Curated editorial content for the newspaper broadsheet build.
// Content is Aryan's own — presented in the reference case-file style.

export const SITE = {
  origin: 'https://portfolio2-q1z5b488y-aryans-projects-144bd52a.vercel.app',
  resume: '/Resume_5th_sem.pdf',
  defaultTitle: 'Aryan Anand — The Personal Record of a Full-Stack Developer',
};

const issueDate = new Date().toLocaleDateString('en-GB', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export const newspaper = {
  mastheadName: 'Aryan Anand',
  tagline: 'The Personal Record of a B.Tech CSE (AI/ML) Student',
  edition: 'The Investigation Edition',
  established: 'Est. 2024',
  issueDate,
  volume: 'Vol. III',
  contents: 'Selected Works & Papers',
  price: 'Price: One Chai',
  frontPage: 'Front Page',
  filedUnder: 'Filed Under: Open Investigations',
  city: 'Bhopal, India',
};

export const heroContent = {
  caseMarker: 'Field Report No. 03 — Findings Published',
  headlineLead: 'Full-stack builds, applied AI, and product instincts — ',
  headlineEm: 'from idea to shipped.',
  leadParagraph:
    'On record: Aryan Anand is a third-year B.Tech CSE (AI/ML) student at JUET, building React interfaces, FastAPI backends, and machine-learning systems shaped by real internship work at Indian Oil Corporation Limited.',
  byline: 'Reporting from Bhopal',
  dossierParagraphs: [
    'He enjoys the full build cycle: shaping a rough idea, turning it into software, and shipping it where people can actually use it. His regular stack runs from Python and React to FastAPI and Vercel, with a CGPA of 8.57 to keep the record honest.',
    'When the brief calls for it, he reaches for Node.js, Next.js, MongoDB, Redis and SQL as well. At IOCL, he works on applied machine learning against live industrial data; on campus, he helps lead the IETE Student\u2019s Forum.',
  ],
  stats: [
    { value: 'No. 07', label: 'Exhibits on file' },
    { value: '8.57', label: 'CGPA · JUET' },
    { value: '3rd', label: 'Year · B.Tech CSE (AI/ML)' },
    { value: '2x', label: 'Hackathon podiums this year' },
  ],
  photoAttribution: 'the subject, in his natural habitat',
};

export const stackRows = [
  { substance: 'Python', code: 'PYT', detected: 'Most days', finding: 'Primary tool', rank: 'primary' },
  { substance: 'React / TS', code: 'RTS', detected: 'Most days', finding: 'Primary tool', rank: 'primary' },
  { substance: 'TypeScript', code: 'TS', detected: 'Most days', finding: 'Primary tool', rank: 'primary' },
  { substance: 'FastAPI', code: 'FAST', detected: 'Most days', finding: 'Primary tool', rank: 'primary' },
  { substance: 'Java', code: 'JAV', detected: 'In classes', finding: 'Comfortable', rank: 'comfortable' },
  { substance: 'C / C++', code: 'CPP', detected: 'In classes', finding: 'Comfortable', rank: 'comfortable' },
  { substance: 'Next.js', code: 'NEXT', detected: 'In projects', finding: 'Comfortable', rank: 'comfortable' },
  { substance: 'Node.js', code: 'NODE', detected: 'In projects', finding: 'Comfortable', rank: 'comfortable' },
  { substance: 'SQL / PostgreSQL', code: 'SQL', detected: 'In projects', finding: 'Comfortable', rank: 'comfortable' },
  { substance: 'MongoDB', code: 'MDB', detected: 'In projects', finding: 'Comfortable', rank: 'comfortable' },
  { substance: 'Redis', code: 'RDS', detected: 'In projects', finding: 'Comfortable', rank: 'comfortable' },
  { substance: 'Docker', code: 'DCKR', detected: 'In projects', finding: 'Comfortable', rank: 'comfortable' },
  { substance: 'Pandas / NumPy', code: 'PDN', detected: 'For the numbers', finding: 'Comfortable', rank: 'comfortable' },
  { substance: 'Scikit-learn', code: 'SKL', detected: 'For the models', finding: 'Comfortable', rank: 'comfortable' },
  { substance: 'Power BI / DAX', code: 'PBI', detected: 'When needed', finding: 'Comfortable', rank: 'comfortable' },
  { substance: 'AWS', code: 'AWS', detected: 'Learning', finding: 'Trace amount', rank: 'learning' },
  { substance: 'Git / GitHub', code: 'GIT', detected: 'Most days', finding: 'Primary tool', rank: 'primary' },
];

export const ledger = [
  {
    period: 'Jun 2026 — Jul 2026',
    org: 'Indian Oil Corporation Limited',
    role: 'AI/ML Intern',
    blurb:
      'Built a production-facing full-stack ML application that predicts Heavy Kerosene Flash Points from 41 live DCS sensor inputs, backed by an L1-regularised regression pipeline and a secure AI chatbot.',
  },
  {
    period: 'Feb 2026 — Mar 2026',
    org: 'Microsoft Elevate · AICTE',
    role: 'Power BI Intern',
    blurb:
      'Analysed 365 global cybersecurity incidents in Power BI, turning breach trends, attack vectors and incident patterns into clear, decision-ready intelligence.',
  },
  {
    period: 'Jul 2024 — Jun 2028',
    org: 'JUET',
    role: 'B.Tech CSE (AI/ML), 3rd Year',
    blurb:
      'Third-year engineering student with an 8.57 CGPA, studying DSA, DBMS, computer networks and artificial intelligence while building production-minded side projects.',
  },
];

export const beyondCode = [
  {
    period: 'Jun 2024 — Present',
    org: 'IETE Student\u2019s Forum · JUET',
    role: 'Joint Secretary',
    blurb:
      'Coordinates technical events and student activities as part of the campus leadership team, balancing organisational work with academics and project builds.',
  },
  {
    period: 'Jun 2024 — Present',
    org: 'Developer Student Communities · JUET',
    role: 'Community Lead, VR/AR/MR',
    blurb:
      'Leads technical initiatives around immersive technology and helped organise CodeSrijan, adding community work to the engineering record.',
  },
];

export const achievements = [
  {
    year: '2026',
    title: 'Elite Hack 1.0',
    honor: 'Winner',
    blurb: 'First place among 100+ teams.',
  },
  {
    year: '2026',
    title: 'i.mobilothon 5.0',
    honor: 'Finalist',
    blurb: 'Finalist in Hyundai\u2019s national mobility hackathon.',
  },
  {
    year: '2025',
    title: 'Oracle AI Foundations Associate',
    honor: 'Certified',
    blurb: 'Cloud and applied AI foundations on record.',
  },
  {
    year: '2026',
    title: 'Microsoft Elevate · AICTE',
    honor: 'Alumnus',
    blurb: 'Completed cloud computing and AI training through the program.',
  },
];

export const contactInfo = {
  email: 'aryan.anand1806@gmail.com',
  phone: '+91-8922959085',
  deskCity: 'Bhopal, MP, India',
  deskNote: 'IST · available for remote-first work with teams worldwide.',
  availability: 'Open to internships and freelance builds',
  availabilityNote:
    'Third-year B.Tech CSE (AI/ML) student taking on internships, freelance builds and hackathon collaborations while the semester permits.',
  github: 'https://github.com/AryanAnand-ux',
  linkedin: 'https://www.linkedin.com/in/aryananand-ux',
  replyNote: 'Usually replies within 24 hours',
  coordsNote: 'For commissions, contracts, and the occasional good argument about CSS.',
};

export const footerContent = {
  bio: 'A third-year B.Tech CSE (AI/ML) student at JUET, software and research intern at Indian Oil Corporation Limited, Microsoft Elevate alumnus, and two-time hackathon podium finisher in 2026. This broadsheet is hand-set in Caslon and Franklin.',
  sections: [
    { label: 'Selected Works', href: '/#work' },
    { label: 'The Stack', href: '/#stack' },
    { label: 'The Career Ledger', href: '/#career' },
    { label: 'Credentials', href: '/certifications' },
    { label: 'Letters & Commissions', href: '/#contact' },
  ],
  copyright: '© 2026 The Aryan Anand Times · All rights reserved · Printed in Bhopal',
};
