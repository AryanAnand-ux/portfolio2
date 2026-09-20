import { achievements } from '../../data/newspaper';
import { Words } from './reveal';

const NewsAwards = () => (
  <section id="awards" className="nw-sec">
    <div className="nw-container">
      <div className="nw-section-head">
        <div className="nw-section-head-row rv">
          <div>
            <span className="nw-kicker rv-fade">The Trophy Shelf</span>
            <h3 className="nw-section-title">
              <Words text="Distinctions" />
            </h3>
          </div>
          <span className="nw-section-side rv-fade">Trophies, certs &amp; placings on record</span>
        </div>
        <div className="nw-section-rule rv rv-rule" aria-hidden="true" />
      </div>

      <div className="nw-awards">
        {achievements.map((item, index) => (
          <article
            className="nw-award rv rv-settle"
            style={{ '--rv-delay': `${index * 90}ms` }}
            key={item.title}
          >
            <span className="nw-award-year">{item.year}</span>
            <div className="nw-award-body">
              <h4 className="nw-award-title">{item.title}</h4>
              <span className="nw-award-honor">{item.honor}</span>
              <p className="nw-award-blurb">{item.blurb}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default NewsAwards;