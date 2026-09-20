import { ledger } from '../../data/newspaper';
import { Words } from './reveal';

const NewsLedger = () => (
  <section id="career" className="nw-sec">
    <div className="nw-container">
      <div className="nw-section-head">
        <div className="nw-section-head-row rv">
          <div>
            <span className="nw-kicker rv-fade">Known Whereabouts</span>
            <h3 className="nw-section-title">
              <Words text="The Career Ledger" />
            </h3>
          </div>
          <span className="nw-section-side rv-fade">Experience on record — internships &amp; education</span>
        </div>
        <div className="nw-section-rule rv rv-rule" aria-hidden="true" />
      </div>

      <div className="nw-career">
        {ledger.map((entry, index) => (
          <div
            className="nw-career-row rv rv-settle"
            style={{ '--rv-delay': `${index * 120}ms` }}
            key={entry.role}
          >
            <span className="nw-career-period">
              <span className="rv-stampchild">{entry.period}</span>
            </span>
            <div>
              <h4 className="nw-career-role">{entry.role}</h4>
              <span className="nw-career-org">{entry.org}</span>
            </div>
            <p className="nw-career-blurb">{entry.blurb}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default NewsLedger;