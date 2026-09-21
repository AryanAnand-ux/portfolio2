import { Link } from 'react-router-dom';
import { newspaper, heroContent, SITE } from '../../data/newspaper';

const NewsHero = () => (
  <section className="nw-hero-sec">
    <div className="nw-container">
      <div className="nw-frontpage">
        <span>{newspaper.frontPage}</span>
        <span>{newspaper.filedUnder}</span>
      </div>

      <div className="nw-hero-grid">
        <div>
          <span className="nw-hero-kicker rv rv-settle">{heroContent.caseMarker}</span>
          <div className="rv rv-settle" style={{ '--rv-delay': '60ms' }}>
            <h1 className="nw-hero-h1">
              {heroContent.headlineLead}
              <em>{heroContent.headlineEm}</em>
            </h1>
          </div>
          <p className="nw-hero-lead rv rv-settle" style={{ '--rv-delay': '140ms' }}>
            {heroContent.leadParagraph}
          </p>
          <p className="nw-hero-byline rv rv-settle" style={{ '--rv-delay': '200ms' }}>
            By <b>The Investigation Desk</b> &nbsp;·&nbsp; {heroContent.byline}
          </p>
          <div className="nw-hero-ctas rv rv-settle" style={{ '--rv-delay': '260ms' }}>
            <a
              className="nw-btn nw-btn--lg nw-btn--solid"
              href={SITE.resume}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume &rarr;
            </a>
            <Link className="nw-btn nw-btn--lg nw-btn--ghost" to="/#contact">
              Get in touch
            </Link>
          </div>

          <div className="nw-stats rv rv-settle" style={{ '--rv-delay': '320ms' }}>
            {heroContent.stats.map((stat) => (
              <div className="nw-stat" key={stat.label}>
                <div className="nw-stat-value">{stat.value}</div>
                <div className="nw-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="nw-hero-photo">
          <div className="rv rv-develop" style={{ '--rv-delay': '180ms' }}>
            <div className="nw-photo-card">
              <img
                src="/avatar.webp"
                alt="Aryan Anand — the subject, in his natural habitat"
                width="900"
                height="900"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
          <p className="nw-hero-caption rv rv-settle" style={{ '--rv-delay': '240ms' }}>
            <b>Pictured:</b> {heroContent.photoAttribution}
          </p>

          <article className="nw-dossier rv rv-settle dropcap" style={{ '--rv-delay': '300ms' }}>
            {heroContent.dossierParagraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </article>
        </div>
      </div>
    </div>
  </section>
);

export default NewsHero;