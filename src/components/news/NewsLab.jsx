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

      <div className="nw-table" role="table" aria-label="Tools detected in the lab report">
        <div className="nw-lab-head" role="row">
          <span role="columnheader">Substance</span>
          <span role="columnheader">Code</span>
          <span role="columnheader">Detected</span>
          <span role="columnheader">Finding</span>
        </div>
        {stackRows.map((row, index) => (
          <div
            className="nw-lab-row rv rv-settle"
            style={{ '--rv-delay': `${index * 40}ms` }}
            key={row.code}
            role="row"
          >
            <span className="nw-lab-substance" role="cell">
              <span className="nw-lab-substance-name">{row.substance}</span>
              <span className="nw-lab-code-mobile">{row.code}</span>
            </span>
            <span className="nw-lab-code" role="cell">
              {row.code}
            </span>
            <span className="nw-lab-detected" role="cell">
              {row.detected}
            </span>
            <span className="nw-lab-finding" role="cell">
              <Finding row={row} />
            </span>
          </div>
        ))}
      </div>

      <p className="nw-note">Findings are practical — what he reaches for day to day, not a ranking.</p>
    </div>
  </section>
);

export default NewsLab;
