import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import './components/news/news.css';
import NewsIntro from './components/news/NewsIntro';
import NewsHeader from './components/news/NewsHeader';
import NewsHero from './components/news/NewsHero';
import NewsWorks from './components/news/NewsWorks';
import NewsLab from './components/news/NewsLab';
import NewsLedger from './components/news/NewsLedger';
import NewsBeyond from './components/news/NewsBeyond';
import NewsAwards from './components/news/NewsAwards';
import NewsContact from './components/news/NewsContact';
import NewsFooter from './components/news/NewsFooter';
import NewsCaseFile from './components/news/NewsCaseFile';
import NewsCertifications from './components/news/NewsCertifications';
import NewsNotFound from './components/news/NewsNotFound';

const Home = ({ introDone, onIntroDone }) => (
  <>
    {!introDone && <NewsIntro onDone={onIntroDone} />}
    <NewsHeader />
    <main id="main-content" className="nw-main">
      <NewsHero />
      <NewsWorks />
      <NewsLab />
      <NewsLedger />
      <NewsBeyond />
      <NewsAwards />
      <NewsContact />
    </main>
    <NewsFooter />
  </>
);

const SubPage = ({ children }) => (
  <>
    <main id="main-content" className="nw-main">
      {children}
    </main>
    <NewsFooter />
  </>
);

const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
};

const RevealObserver = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const targets = document.querySelectorAll('.rv');
    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
};

function App() {
  const [introDone, setIntroDone] = useState(() => {
    try {
      return window.sessionStorage.getItem('fm-intro-seen') === '1';
    } catch {
      return false;
    }
  });

  const handleIntroDone = () => {
    setIntroDone(true);
    try {
      window.sessionStorage.setItem('fm-intro-seen', '1');
    } catch {
      /* ignore */
    }
  };

  return (
    <BrowserRouter>
      <ScrollManager />
      <RevealObserver />
      <RouteConfig introDone={introDone} onIntroDone={handleIntroDone} />
      <svg aria-hidden="true" width="0" height="0" style={{ position: 'absolute' }}>
        <filter id="fm-rough" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.035 0.06"
            numOctaves="2"
            seed="7"
            result="t"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="t"
            scale="7"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
}

const RouteConfig = ({ introDone, onIntroDone }) => (
  <Routes>
    <Route
      path="/"
      element={<Home introDone={introDone} onIntroDone={onIntroDone} />}
    />
    <Route
      path="/case-files/:slug"
      element={
        <SubPage>
          <CaseFileRoute />
        </SubPage>
      }
    />
    <Route
      path="/certifications"
      element={
        <SubPage>
          <NewsCertifications />
        </SubPage>
      }
    />
    <Route
      path="*"
      element={
        <SubPage>
          <NewsNotFound />
        </SubPage>
      }
    />
  </Routes>
);

const CaseFileRoute = () => {
  const { slug } = useParams();
  return <NewsCaseFile slug={slug} />;
};

export default App;