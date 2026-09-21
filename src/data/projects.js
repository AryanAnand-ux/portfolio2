const hostOf = (url) => {
  if (!url) return 'github.com/AryanAnand-ux';
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'github.com/AryanAnand-ux';
  }
};

export const projectsData = [
  {
    id: 'ai-cad-workbench',
    title: 'AI-Parametric CAD Workbench',
    description:
      'A full-stack tool that turns natural-language part descriptions into interactive 3D CAD models, with live parameter sliders, conversational refinement, and STL/STEP export.',
    thumb: '/projects/cad.webp',
    tech: ['FastAPI', 'React', 'Three.js', 'Gemini API', 'Docker'],
    projectLink: 'https://github.com/AryanAnand-ux',
    github: 'https://github.com/AryanAnand-ux',
    caseFile: {
      headline: 'The part desk that speaks the language of engineers',
      lead: 'Describe a part in plain English — a bearing flange, an end cap, a bracket — and out comes an interactive 3D CAD model, editable on the spot with live parameter sliders.',
      figureCaption: 'Fig. 1 — the workbench, turning plain English into solid geometry.',
      byline: '2026',
      body: [
        'Most CAD tools demand you already know what you want and how to ask for it in toolbar-speak. This exhibit inverts the arrangement: the human describes the part, and the machine handles the drafting.',
        'The subject fed a natural-language pipeline into a Three.js viewer, so a request like “a hollow cylinder with four bolt holes” resolves into real, adjustable parameters — not a static image. Every dimension stays live; drag a slider and the whole assembly recomputes.',
        'A conversation layer sits on top, letting the user refine the part in dialogue — “thicker walls”, “taper the top” — before exporting to STL or STEP for actual manufacturing workflows.',
        'It is, in the desk’s judgment, the strongest solo machine-learning product in the file: an LLM doing honest geometry work instead of chat-window tricks.',
      ],
      quote: '“A request like \u201chollow cylinder, four bolt holes\u201d resolves into real, adjustable parameters — not a static image.”',
      build: [
        { label: 'Front-end', value: 'React · Three.js' },
        { label: 'Back-end', value: 'FastAPI' },
        { label: 'AI', value: 'Gemini API · NL to parameters' },
        { label: 'Export', value: 'STL · STEP' },
        { label: 'Deploy', value: 'Docker' },
      ],
      role: 'Solo',
      entered: '2026',
      status: 'In development',
    },
  },
  {
    id: 'juet-nexus',
    title: 'JUET Nexus',
    description:
      'Proxy dashboard for the university’s ERP system built to speed up data access and give students a smoother, low-latency experience.',
    thumb: '/projects/nexus.webp',
    tech: ['TypeScript', 'Next.js', 'Fastify', 'Redis'],
    projectLink: 'https://juet-nexus-frontend.vercel.app/',
    github: 'https://github.com/AryanAnand-ux/JUET-Nexus.git',
    caseFile: {
      headline: 'The proxy that tamed the campus ERP',
      lead: 'University ERP portals are not known for speed. JUET Nexus sits in front of one, caching and shaping requests so students stop watching spinners.',
      figureCaption: 'Fig. 1 — the campus portal, refitted for actual speed.',
      byline: '2026',
      body: [
        'Every university runs the same cruel experiment: make students log into an ERP so slow it teaches patience. The subject decided the experiment deserved better instrumentation.',
        'Nexus acts as a proxy layer over the existing system — it intercepts repeated, heavy calls, holds them in Redis-backed caches, and serves the rest through a fastify-fitted middleware stack and a Next.js shell.',
        'The result is a dashboard students actually want to open: results, attendance and notices surfaced quickly, with the underlying ERP none the wiser.',
        'Built partly as a convenience tool, it doubles as an honest demonstration of the subject’s caching and middleware instincts.',
      ],
      quote: '“A proxy so the campus stops teaching patience.”',
      build: [
        { label: 'Front-end', value: 'Next.js · TypeScript' },
        { label: 'Middleware', value: 'Fastify' },
        { label: 'Cache', value: 'Redis' },
        { label: 'Role', value: 'Solo' },
      ],
      role: 'Solo',
      entered: '2026',
      status: 'Live at juet-nexus-frontend.vercel.app',
    },
  },
  {
    id: 'loom2',
    title: 'Loom2',
    description:
      'AI-powered digital wardrobe app that classifies clothing by type and color and recommends weather-aware outfits through an integrated Stylist AI.',
    thumb: '/projects/loom.webp',
    tech: ['React', 'Node.js', 'AI APIs'],
    projectLink: 'https://loom2-one.vercel.app/',
    github: 'https://github.com/AryanAnand-ux/Loom2.git',
    caseFile: {
      headline: 'A wardrobe that already knows the forecast',
      lead: 'Point the camera at a shirt and Loom2 logs it — type, colour, all of it — then a Stylist AI assembles outfits that actually match the weather.',
      figureCaption: 'Fig. 1 — the wardrobe, cataloguing itself one garment at a time.',
      byline: '2026',
      body: [
        'The digital wardrobe problem is less about storage and more about classification: a pile of photos is no better than a pile of clothes. Loom2 teaches the pile to sort itself.',
        'The app runs AI classification on each garment — type and colour — and builds a searchable catalogue from ordinary photos. The wardrobe then meets the weather: an integrated Stylist AI proposes complete, weather-appropriate outfits.',
        'The subject wired the classification into a React front-end with a Node.js backend, leaning on AI APIs for the computer-vision work rather than hand-rolling a classifier.',
        'A student-convenient amount of polish for a genuinely useful daily product.',
      ],
      quote: '“A wardrobe that can hear the forecast and dress accordingly.”',
      build: [
        { label: 'Front-end', value: 'React' },
        { label: 'Back-end', value: 'Node.js' },
        { label: 'AI', value: 'Classifier APIs · Stylist AI' },
        { label: 'Live', value: 'loom2-one.vercel.app' },
        { label: 'Role', value: 'Solo' },
      ],
      role: 'Solo',
      entered: '2026',
      status: 'Live at loom2-one.vercel.app',
    },
  },
  {
    id: 'graphql-vs-rest',
    title: 'GraphQL vs. REST Benchmark',
    description:
      'Technical research paper benchmarking GraphQL and REST on API performance, latency, and developer experience.',
    thumb: '/projects/graphvsrest.webp',
    tech: ['GraphQL', 'REST', 'Benchmarking'],
    projectLink: 'https://github.com/AryanAnand-ux/graphql-vs-rest-benchmark.git',
    github: 'https://github.com/AryanAnand-ux/graphql-vs-rest-benchmark.git',
    caseFile: {
      headline: 'The quiet war between two API dialects, measured',
      lead: 'A technical paper that stops arguing preferences and starts reading numbers — GraphQL versus REST, run through the same workloads, timed on the same bench.',
      figureCaption: 'Fig. 1 — the bench report, sample sizes duly noted.',
      byline: '2026',
      body: [
        'Every engineering corridor has the argument: GraphQL or REST? The subject chose the laboratory over the corridor.',
        'The paper builds matching API surfaces in both paradigms and runs them against identical workloads — measuring latency, payload overhead and the developer experience of extending each one.',
        'The write-up stays honest about nuance: where GraphQL’s over-fetching control wins, where REST’s simplicity and cache-friendliness wins, and where the answer is “it depends” for reasons the benchmark can actually cite.',
        'The subject files it under research — the beginning of a habit of testing opinions.',
      ],
      quote: '“Preference is not evidence. These are the numbers.”',
      build: [
        { label: 'Surfaces', value: 'GraphQL · REST' },
        { label: 'Workloads', value: 'Identical on both' },
        { label: 'Output', value: 'Benchmark paper' },
        { label: 'Role', value: 'Solo' },
      ],
      role: 'Solo',
      entered: '2026',
      status: 'Published to GitHub',
    },
  },
  {
    id: 'file-converter',
    title: 'File Converter',
    description:
      'Client-side PDF and image toolkit – split, merge, rotate, watermark, encrypt, and resize – that processes everything in-browser with no server uploads.',
    thumb: '/projects/fileconvertor.webp',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    projectLink: 'https://file-converter-opal.vercel.app/',
    github: 'https://github.com/AryanAnand-ux/file-converter.git',
    caseFile: {
      headline: 'A PDF toolkit that never sees your files',
      lead: 'Split, merge, rotate, watermark, encrypt, resize — all in the browser. The files arrive, the files depart; the server never meets them.',
      figureCaption: 'Fig. 1 — the worktable, every operation done in-browser.',
      byline: '2026',
      body: [
        'Most “converter” sites are upload-traps in disguise — your document takes a holiday on someone’s server. This exhibit keeps the whole operation on the client.',
        'The subject built a PDF and image toolkit where every operation — splitting, merging, rotating, watermarking, encrypting, resizing — runs in-browser. Files never leave the machine by design.',
        'A Next.js and TypeScript shell holds the feature set together with Tailwind styling, and the privacy trade-off is not an afterthought but the pitch: nothing to upload, nothing to leak.',
        'The desk approves the security posture on record.',
      ],
      quote: '“The files arrive. The files depart. The server never meets them.”',
      build: [
        { label: 'Front-end', value: 'Next.js · Tailwind CSS' },
        { label: 'Language', value: 'TypeScript' },
        { label: 'Processing', value: '100% client-side' },
        { label: 'Live', value: 'file-converter-opal.vercel.app' },
        { label: 'Role', value: 'Solo' },
      ],
      role: 'Solo',
      entered: '2026',
      status: 'Live at file-converter-opal.vercel.app',
    },
  },
  {
    id: 'hy-kero-predictor',
    title: 'HY Kero Flash Point Predictor',
    description:
      'Real-time full-stack ML application predicting Heavy Kerosene Flash Points from 41 live DCS sensor inputs using an L1-regularized regression pipeline and an integrated, secure AI chatbot.',
    thumb: '/projects/hykero.webp',
    tech: ['Python', 'FastAPI', 'React', 'SQLite', 'Docker'],
    projectLink: 'https://hy-kero-predictor.vercel.app/',
    github: 'https://github.com/AryanAnand-ux/hy-kero-predictor.git',
    caseFile: {
      headline: 'Refinery instruments, read by a trained model',
      lead: 'Forty-one live DCS sensor streams, an L1-regularised regression pipeline, and a chatbot guarding the plant floor — predicting Heavy Kerosene Flash Points in real time.',
      figureCaption: 'Fig. 1 — the refinery board, readings live on the desk.',
      byline: '2026',
      body: [
        'At Indian Oil’s Mathura refinery, Heavy Kerosene Flash Point is a safety-relevant property that operators monitor constantly. The subject spent a summer internship building the machine that helps.',
        'The application ingests 41 live DCS sensor inputs and predicts flash points through an L1-regularised regression pipeline — the “most relevant variables on the call sheet”, which the desk notes is exactly the point of regularisation.',
        'A FastAPI core serves the predictions, a React interface puts the numbers on a dashboard, SQLite holds the ledger of readings, and the whole production is containerized under Docker.',
        'The exhibit closes with an integrated AI chatbot — secured, and deployed where it can actually be checked: in front of live industrial data.',
      ],
      quote: '“No sitting in the lab — the model reads forty-one instruments and answers in real time.”',
      build: [
        { label: 'ML', value: 'PyTorch-blend · L1-regularised regression' },
        { label: 'Data', value: '41 live DCS sensor inputs' },
        { label: 'Back-end', value: 'FastAPI · SQLite' },
        { label: 'Front-end', value: 'React' },
        { label: 'AI', value: 'Secure chatbot' },
        { label: 'Deploy', value: 'Docker' },
        { label: 'Employer', value: 'IOCL Mathura (intern)' },
      ],
      role: 'Intern — IOCL',
      entered: '2026',
      status: 'In production',
    },
  },
  {
    id: 'cybersecurity-breach-analytics',
    title: 'Global Cybersecurity Breach Analytics',
    description:
      'Power BI dashboard analyzing 365 global cybersecurity incidents, visualizing breach trends, attack vectors, and incident patterns to turn raw data into actionable insights.',
    thumb: '/projects/globalcyber.webp',
    tech: ['Power BI', 'Data Analytics', 'Cybersecurity'],
    projectLink: 'https://github.com/AryanAnand-ux/Global-Cybersecurity-Breach-Analytics-PowerBI.git',
    github: 'https://github.com/AryanAnand-ux/Global-Cybersecurity-Breach-Analytics-PowerBI.git',
    caseFile: {
      headline: 'Three hundred and sixty-five breaches, one dashboard',
      lead: 'A full year of global cyber incidents packed into a Power BI board — breach trends, attack vectors, and patterns that turn raw incident logs into intelligence.',
      figureCaption: 'Fig. 1 — the incident board, all 365 cases on the wall.',
      byline: '2026',
      body: [
        'For the Microsoft Elevate AICTE program, the subject took 365 global cybersecurity incidents and built the board that makes them legible.',
        'The Power BI dashboard layers breach trends, attack vectors and incident patterns over time, letting a reader move from “what happened” to “where it keeps happening” without writing a query.',
        'Built during the Power BI internship, it’s the data-visualisation exhibit in the file — evidence that the subject turns raw data into decisions, not just dashboards that look busy.',
      ],
      quote: '“A year of attacks, ordered so the next one is easier to spot.”',
      build: [
        { label: 'Tool', value: 'Power BI · DAX' },
        { label: 'Data', value: '365 global incidents' },
        { label: 'Focus', value: 'Trends · vectors · patterns' },
        { label: 'Program', value: 'Microsoft Elevate AICTE' },
        { label: 'Role', value: 'Intern' },
      ],
      role: 'Intern — Microsoft Elevate',
      entered: '2026',
      status: 'On file',
    },
  },
];

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const exhibitLetter = (id) => {
  const index = projectsData.findIndex((p) => p.id === id);
  return index >= 0 ? LETTERS[index] ?? 'A' : 'A';
};

export const relatedBy = (project, all = projectsData) => {
  const others = all.filter((p) => p.id !== project.id);
  const shared = (other) =>
    other.tech.reduce((n, t) => (project.tech.includes(t) ? n + 1 : n), 0);
  const byShared = [...others].sort((a, b) => shared(b) - shared(a));
  return byShared.filter((p) => shared(p) > 0).slice(0, 2).length >= 2
    ? byShared.filter((p) => shared(p) > 0).slice(0, 2)
    : others.slice(0, 2);
};

export { hostOf };