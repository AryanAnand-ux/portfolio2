import { Link } from 'react-router-dom';
import { newspaper } from '../../data/newspaper';
import { projectsData, relatedBy, hostOf } from '../../data/projects';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const EXHIBIT_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

const Shot = ({ project }) =>
  project.thumb ? (
    <img className="nw-shot-img" src={project.thumb} alt={`${project.title} interface`} />
  ) : (
    <div className="nw-cf-shot">
      <span className="nw-cf-shot-title">{project.title}</span>
      <span className="nw-cf-shot-mark">No plate on file &middot; vellum sketch</span>
    </div>
  );

const BuildRow = ({ label, value }) => (
  <div className="nw-cf-build-row">
    <span className="nw-cf-build-label">{label}</span>
    <span className="nw-cf-build-value">{value}</span>
  </div>
);

const NewsCaseFile = ({ slug }) => {
  const project = projectsData.find((p) => p.id === slug);
  if (!project) return null;

  const letter = EXHIBIT_LETTERS[projectsData.findIndex((p) => p.id === slug)] ?? 'A';
  const related = relatedBy(project).slice(0, 2);
  const caseFile = project.caseFile;
  const liveUrl = project.projectLink || project.github;

  return (
    <div className="nw-case-page">
      <header className="nw-case-top">
        <div className="nw-container">
          <div className="nw-case-strip">
            <Link className="link-pencil nw-case-back" to={`/#exhibit-${project.id}`}>
              &larr; Back to the case
            </Link>
            <span>
              {newspaper.mastheadName} &middot; Case Files
            </span>
            <span>Filed from {newspaper.city}</span>
          </div>

          <div className="nw-case-head">
            <span className="nw-kicker nw-case-kicker rv rv-settle">
              Case File &middot; Exhibit {letter} &middot; {hostOf(liveUrl)}
            </span>
            <div className="rv rv-settle" style={{ '--rv-delay': '60ms' }}>
              <h1 className="nw-case-h1">{caseFile.headline}</h1>
            </div>
            <p className="nw-case-lead rv rv-settle" style={{ '--rv-delay': '140ms' }}>
              {caseFile.lead}
            </p>
            <p className="nw-case-byline rv rv-settle" style={{ '--rv-delay': '200ms' }}>
              By <b>The Investigation Desk</b> &nbsp;&middot;&nbsp; {caseFile.byline}
            </p>
          </div>

          <figure className="nw-cf-figure rv rv-develop" style={{ '--rv-delay': '120ms' }}>
            <span className="nw-tape" aria-hidden="true" />
            <div className="nw-cf-media">
              <Shot project={project} />
            </div>
            <figcaption className="nw-cf-caption">
              <span>Exhibit {letter}</span>
              <span>{caseFile.figureCaption}</span>
            </figcaption>
          </figure>
        </div>
      </header>

      <section className="nw-case-main">
        <div className="nw-container">
          <div className="nw-case-grid">
            <article className="nw-cf-body rv rv-settle dropcap">
              {caseFile.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <blockquote className="nw-cf-quote">{caseFile.quote}</blockquote>
            </article>

            <aside className="nw-cf-built rv rv-settle" style={{ '--rv-delay': '120ms' }}>
              <div className="nw-cf-built-head">How it was built</div>
              {caseFile.build.map((row) => (
                <BuildRow key={row.label} label={row.label} value={row.value} />
              ))}
              <div className="nw-cf-built-foot">
                <span>Role</span>
                <span>{caseFile.role}</span>
              </div>
              <div className="nw-cf-built-foot">
                <span>Entered</span>
                <span>{caseFile.entered}</span>
              </div>
              <div className="nw-cf-built-foot">
                <span>Status</span>
                <span>{caseFile.status}</span>
              </div>
              <div className="nw-cf-related">
                <p>Related exhibits</p>
                {related.map((rel) => (
                  <Link className="link-pencil" to={`/case-files/${rel.id}`} key={rel.id}>
                    {rel.title}
                  </Link>
                ))}
              </div>
            </aside>
          </div>

          <div className="nw-case-foot">
            <Link className="nw-btn" to={`/#exhibit-${project.id}`}>
              <ArrowLeft size={16} />
              Back to the case
            </Link>
            <a
              className="nw-btn nw-btn--solid"
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Inspect the evidence
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsCaseFile;