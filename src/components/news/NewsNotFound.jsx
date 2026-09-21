import { Link } from 'react-router-dom';
import { newspaper, contactInfo } from '../../data/newspaper';
import { Words } from './reveal';
import { ArrowLeft, FileQuestion, Mail } from 'lucide-react';

const NewsNotFound = () => (
  <div className="nw-notfound-page">
    <header className="nw-case-top">
      <div className="nw-container">
        <div className="nw-case-strip">
          <Link className="link-pencil nw-case-back" to="/">
            &larr; Back to the case
          </Link>
          <span>
            {newspaper.mastheadName} &middot; Case Files
          </span>
          <span>Filed from {newspaper.city}</span>
        </div>

        <div className="nw-case-head nw-notfound-head">
          <div className="rv rv-settle">
            <span className="nw-notfound-dispatch">
              <span className="nw-notfound-pulse" aria-hidden="true" />
              Incident Dispatch #404 &middot; Telegraph Interrupted
            </span>
          </div>

          <div className="rv rv-settle" style={{ '--rv-delay': '60ms' }}>
            <span className="nw-notfound-stamp">[ Evidence Unaccounted For &middot; Redacted ]</span>
          </div>

          <div className="rv rv-settle" style={{ '--rv-delay': '120ms' }}>
            <h1 className="nw-case-h1 nw-notfound-h1">
              <Words text="404 — The Missing Case File" />
            </h1>
          </div>

          <p className="nw-notfound-sub rv rv-settle" style={{ '--rv-delay': '180ms' }}>
            Exhibit Not Found in the Permanent Record
          </p>
        </div>
      </div>
    </header>

    <section className="nw-case-main">
      <div className="nw-container">
        <div className="nw-notfound-body rv rv-settle" style={{ '--rv-delay': '240ms' }}>
          <div className="nw-notfound-copy">
            <p>
              A search of the morgue and the digital filing cabinets has turned up no verifiable
              trace of the requested exhibit. The file may have been expunged, mis-shelved, or
              relocated under editorial discretion.
            </p>
            <p className="nw-notfound-ref">
              Bureau Ref: <b>MISSING-DOC-00404</b> &middot; {contactInfo.deskCity}
            </p>
          </div>

          <div className="nw-notfound-actions">
            <Link className="nw-btn nw-btn--lg nw-btn--solid" to="/">
              <FileQuestion size={17} />
              Return to the front page
            </Link>
            <a
              className="nw-btn nw-btn--lg nw-btn--ghost"
              href={`mailto:${contactInfo.email}?subject=Incident%20Report%20404%20Missing%20Exhibit`}
            >
              <Mail size={17} />
              Contact the desk
            </a>
          </div>

          <div className="nw-notfound-dispatch-foot">
            <span>End of incident report</span>
            <span className="nw-notfound-diamonds" aria-hidden="true">
              &diams; &diams; &diams;
            </span>
            <span>Bhopal Wire</span>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default NewsNotFound;
