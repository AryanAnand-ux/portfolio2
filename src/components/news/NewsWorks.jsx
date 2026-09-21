import { Link } from 'react-router-dom';
import { projectsData, exhibitLetter, hostOf } from '../../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { Words } from './reveal';

const clientFor = (project) => {
  if (project.projectLink) return `Shipped at ${hostOf(project.projectLink)}`;
  return 'Filed under github.com/AryanAnand-ux';
};

const sourceFor = (project) => {
  const url = project.projectLink || project.github;
  return `Recovered from ${hostOf(url)}`;
};

const Scribble = ({ letter }) => (
  <span className="nw-scribble rv">
    Exhibit {letter}
    <svg aria-hidden="true" viewBox="0 0 120 44" preserveAspectRatio="none">
      <path
        className="rv-sketch"
        d="M10 24 C 8 10, 44 4, 76 7 C 104 10, 116 18, 112 28 C 108 38, 70 42, 40 39 C 16 37, 8 30, 12 20"
        fill="none"
        stroke="#a6382c"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
        pathLength="1"
      />
    </svg>
  </span>
);

const Shot = ({ project }) =>
  project.thumb ? (
    <img
      className="nw-shot-img"
      src={project.thumb}
      alt={`${project.title} interface`}
      loading="lazy"
      decoding="async"
    />
  ) : (
    <div className="nw-shot">
      <span className="nw-shot-title">{project.title}</span>
      <span className="nw-shot-mark">No plate on file &middot; vellum sketch</span>
    </div>
  );

const Tags = ({ tech }) => (
  <div className="nw-tags">
    {tech.map((tag) => (
      <span className="nw-tag" key={tag}>
        {tag}
      </span>
    ))}
  </div>
);

const PhotoFrame = ({ project, letter, mediaClass = '', delay = 0 }) => (
  <div className={`nw-photo-frame rv rv-develop`} style={{ '--rv-delay': `${delay}ms` }}>
    <span className="nw-tape" aria-hidden="true" />
    <div className={`nw-photo-frame-media ${mediaClass}`}>
      <Shot project={project} />
    </div>
    <span className="nw-halftone" aria-hidden="true" />
    <span className="nw-confirmed-stamp" aria-hidden="true">
      Confirmed
    </span>
    <div className="nw-photo-frame-cap">
      <Scribble letter={letter} />
      <span className="nw-photo-frame-src">{sourceFor(project)}</span>
    </div>
  </div>
);

const FeatureExhibit = ({ project, letter }) => (
  <article id={`exhibit-${project.id}`} className="nw-exfeature nw-group">
    <div className="nw-exfeature-media">
      <PhotoFrame project={project} letter={letter} />
    </div>
    <div className="rv rv-settle" style={{ '--rv-delay': '80ms' }}>
      <span className="nw-exhead">Exhibit {letter}</span>
      <span className="nw-exclient">{clientFor(project)}</span>
      <h3 className="nw-extitle">{project.title}</h3>
      <p className="nw-exdesc">{project.description}</p>
      <Tags tech={project.tech} />
      <div className="nw-exfoot">
        <span className="nw-exdate">
          {project.caseFile?.entered ?? '2026'} &middot; {project.caseFile?.role ?? 'Solo'}
        </span>
        <Link className="nw-openfile" to={`/case-files/${project.id}`}>
          Open case file
          <span className="nw-openfile-arrow">&rarr;</span>
        </Link>
        {project.projectLink && (
          <a
            className="nw-openfile-live"
            href={project.projectLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title} live`}
          >
            <ArrowUpRight size={15} />
          </a>
        )}
      </div>
    </div>
  </article>
);

const ExhibitCard = ({ project, letter, delay = 0 }) => (
  <article
    id={`exhibit-${project.id}`}
    className="nw-excard rv rv-settle nw-group"
    style={{ '--rv-delay': `${delay}ms` }}
  >
    <span className="nw-exhead">Exhibit {letter}</span>
    <span className="nw-exclient">{clientFor(project)}</span>
    <h3 className="nw-extitle">{project.title}</h3>
    <PhotoFrame project={project} letter={letter} mediaClass="nw-photo-frame-media--card" />
    <p className="nw-exdesc">{project.description}</p>
    <Tags tech={project.tech} />
    <div className="nw-exfoot">
      <span className="nw-exdate">
        {project.caseFile?.entered ?? '2026'} &middot; {project.caseFile?.role ?? 'Solo'}
      </span>
      <Link className="nw-openfile" to={`/case-files/${project.id}`}>
        Open case file
        <span className="nw-openfile-arrow">&rarr;</span>
      </Link>
      {project.projectLink && (
        <a
          className="nw-openfile-live"
          href={project.projectLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.title} live`}
        >
          <ArrowUpRight size={15} />
        </a>
      )}
    </div>
  </article>
);

const NewsWorks = () => {
  const featured = projectsData[0];
  const cards = projectsData.slice(1);
  const lastLetter = exhibitLetter(projectsData[projectsData.length - 1]?.id);

  return (
    <section id="work" className="nw-sec">
      <div className="nw-container">
        <div className="nw-section-head">
          <div className="nw-section-head-row rv">
            <div>
              <span className="nw-kicker rv-fade">The Evidence</span>
              <h3 className="nw-section-title">
                <Words text="Selected Works" />
              </h3>
            </div>
            <span className="nw-section-side rv-fade">
              Exhibits A &ndash; {lastLetter} &middot; Entered 2025 &ndash; Now
            </span>
          </div>
          <div className="nw-section-rule rv rv-rule" aria-hidden="true" />
        </div>

        {featured && <FeatureExhibit project={featured} letter={exhibitLetter(featured.id)} />}

        <div className="nw-exgrid-holder">
          <div className="nw-exgrid">
            {cards.map((project, index) => (
              <ExhibitCard
                key={project.id}
                project={project}
                letter={exhibitLetter(project.id)}
                delay={index * 60}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsWorks;