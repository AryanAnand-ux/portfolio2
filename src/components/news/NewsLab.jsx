import { stackRows } from '../../data/newspaper';
import { Words } from './reveal';

const Finding = ({ row }) => {
  if (row.rank === 'primary') {
    return (
      <span className="rv-stampchild">
        <span className="nw-stamp nw-stamp--red">{row.finding}</span>
      </span>
    );
  }
  if (row.rank === 'learning') {
    return (
      <span className="rv-stampchild">
        <span className="nw-stamp nw-stamp--ink nw-stamp--still">{row.finding}</span>
      </span>
    );
  }
  return (
    <span className="rv-stampchild">
      <span className="nw-stamp nw-stamp--ink">{row.finding}</span>
    </span>
  );
};

const NewsLab = () => (
  <section id="stack" className="nw-sec nw-sec--stack">
    <div className="nw-container">
      <div className="nw-section-head">
        <div className="nw-section-head-row rv">
          <div>
            <span className="nw-kicker rv-fade">Forensics</span>
            <h3 className="nw-section-title">
              <Words text="The Lab Report" />
            </h3>
          </div>
          <span className="nw-section-side rv-fade">
            Substances detected on the subject, as of this edition
          </span>
        </div>
        <div className="nw-section-rule rv rv-rule" aria-hidden="true" />
      </div>

      <div className="nw-table">
        <div className="nw-lab-head" aria-hidden="true">
          <span>Substance</span>
          <span>Code</span>
          <span>Detected</span>
          <span>Finding</span>
        </div>
        {stackRows.map((row, index) => (
          <div
            className="nw-lab-row rv rv-settle"
            style={{ '--rv-delay': `${index * 40}ms` }}
            key={row.code}
          >
            <span className="nw-lab-substance">
              <span className="nw-lab-substance-name">{row.substance}</span>
              <span className="nw-lab-code-mobile">{row.code}</span>
            </span>
            <span className="nw-lab-code">{row.code}</span>
            <span className="nw-lab-detected">{row.detected}</span>
            <span className="nw-lab-finding">
              <Finding row={row} />
            </span>
          </div>
        ))}
      </div>

      <p className="nw-note">Findings are illustrative — what he reaches for day to day, not a ranking.</p>
    </div>
  </section>
);

export default NewsLab;