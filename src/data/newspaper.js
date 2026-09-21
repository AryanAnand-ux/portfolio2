// Curated editorial content for the newspaper broadsheet build.
// Content is Aryan's own — presented in the reference case-file style.

export const SITE = {
  origin: 'https://portfolio2-q1z5b488y-aryans-projects-144bd52a.vercel.app',
  resume: '/resume_5th_sem_v5.pdf',
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
  headlineLead: 'A third-year engineering student who likes building things — ',
  headlineEm: 'front to back.',
  leadParagraph:
    'Turned up on record: Aryan Anand is a B.Tech CSE (AI/ML) student in his third year at JUET — a software & research intern at Indian Oil Corporation Limited, and fresh off a Power BI internship with Microsoft Elevate.',
  byline: 'Reporting from Bhopal, between JUET and IOCL',
  dossierParagraphs: [
    'He enjoys the whole process — going from a rough idea to something that ships. His main stack is Python and React on the front, with FastAPI underneath and Vercel for deploys, and a CGPA of 8.57 to keep the record honest.',
    'When a build calls for it, he reaches for the classics too — Node.js, Next.js, MongoDB, Redis and raw SQL. And through his time at IOCL, he works on applied machine learning against live industrial data, while leading the IETE Student\u2019s Forum on campus.',
  ],
  stats: [
    { value: 'No. 07', label: 'Exhibits on file' },
    { value: '8.57', label: 'CGPA · JUET' },
    { value: '3rd', label: 'Year · B.Tech CSE (AI/ML)' },
    { value: 'X2', label: 'Hackathon podiums this year' },
  ],
  photoAttribution: 'the subject',
  quickIntel: [
    { label: 'CGPA 8.57', value: 'Academic record', sub: 'B.Tech CSE (AI/ML) · JUET · 3rd year' },
    { label: 'IST', value: 'Bhopal', sub: 'Remote-friendly, worldwide' },
    { label: 'Open to', value: 'Internships & hackathons', sub: 'Software, research, and weekend builds' },
    { label: 'Graduating', value: 'June 2028', sub: 'Currently in the 5th semester' },
  ],
  dispatchNote:
    'Open to internships, freelance builds, and collaborative hackathon projects — typically answering within 24 hours.',
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
      'Last seen building a real-time full-stack ML application that predicts Heavy Kerosene Flash Points from 41 live DCS sensor inputs — an L1-regularised regression pipeline with a secure AI chatbot on duty. Deliverable in production.',
  },
  {
    period: 'Feb 2026 — Mar 2026',
    org: 'Microsoft Elevate · AICTE',
    role: 'Power BI Intern',
    blurb:
      'Observed analysing 365 global cybersecurity incidents into a Power BI dashboard — breach trends, attack vectors and incident patterns turned into clear, actionable intelligence. Alumnus on record.',
  },
  {
    period: 'Jul 2024 — Jun 2028',
    org: 'JUET',
    role: 'B.Tech CSE (AI/ML), 3rd Year',
    blurb:
      'First recorded appearance. Six-semester engineer keeping a GPA of 8.57 while studying DSA, DBMS, computer networks and artificial intelligence — before the code goes to production.',
  },
];

export const beyondCode = [
  {
    period: 'Jun 2024 — Present',
    org: 'IETE Student\u2019s Forum · JUET',
    role: 'Joint Secretary',
    blurb:
      'Coordinates technical events and student activities as part of the student leadership team — part of the reason the subject keeps an 8.57 CGPA in parallel.',
  },
  {
    period: 'Jun 2024 — Present',
    org: 'Developer Student Communities · JUET',
    role: 'Community Lead, VR/AR/MR',
    blurb:
      'Led technical initiatives and organised the CodeSrijan Hackathon — one of two hackathon podiums clocked this year.',
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
    blurb: 'Racing in Hyundai\u2019s national hackathon.',
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
    blurb: 'Cloud computing and AI program, completed.',
  },
];

export const contactInfo = {
  email: 'aryan.anand1806@gmail.com',
  phone: '+91-8922959085',
  deskCity: 'Bhopal, MP, India',
  deskNote: 'IST · working with teams worldwide, remote-first.',
  availability: 'Open to internships & freelance',
  availabilityNote:
    '3rd-year B.Tech CSE (AI/ML) — taking on internships, freelance builds and hackathon collabs while the semester permits.',
  github: 'https://github.com/AryanAnand-ux',
  linkedin: 'https://www.linkedin.com/in/aryananand-ux',
  replyNote: 'Usually replies within 24 hours',
  coordsNote: 'For commissions, contracts, and the occasional good argument about CSS.',
};

export const footerContent = {
  bio: 'A third-year B.Tech CSE (AI/ML) student at JUET — a software & research intern at Indian Oil Corporation Limited, a Microsoft Elevate alumnus, and a two-time hackathon podium finisher in 2026. This broadsheet is hand-set in Caslon and Franklin.',
  sections: [
    { label: 'Selected Works', href: '/#work' },
    { label: 'The Stack', href: '/#stack' },
    { label: 'The Career Ledger', href: '/#career' },
    { label: 'Credentials', href: '/certifications' },
    { label: 'Letters & Commissions', href: '/#contact' },
  ],
  copyright: '© 2026 The Aryan Anand Times · All rights reserved · Printed in Bhopal',
};