import { Link } from 'react-router-dom';
import { newspaper, SITE } from '../../data/newspaper';
import { certificatesData } from '../../data/certificates';
import { Words } from './reveal';
import { ArrowLeft, FileText, ExternalLink } from 'lucide-react';

const CertCard = ({ cert, index }) => (
  <article className="nw-cert-card rv rv-settle" style={{ '--rv-delay': `${index * 50}ms` }}>
    <a
      className="nw-cert-thumb"
      href={cert.file}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${cert.title} certificate PDF`}
    >
      {cert.thumbnail ? (
        <img
          src={cert.thumbnail}
          alt={`${cert.title} — certificate`}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="nw-cert-thumb-ph">
          <FileText size={30} />
          <span>PDF on file</span>
        </div>
      )}
      <span className="nw-tape" aria-hidden="true" />
      <span className="nw-cert-view" aria-hidden="true">
        View the paper
        <ExternalLink size={13} />
      </span>
    </a>
    <div className="nw-cert-body">
      <h3 className="nw-cert-title">{cert.title}</h3>
      <p className="nw-cert-issuer">{cert.issuer}</p>
      <p className="nw-cert-date">{cert.date}</p>
      <a
        className="nw-openfile"
        href={cert.file}
        target="_blank"
        rel="noopener noreferrer"
      >
        Open PDF
        <span className="nw-openfile-arrow">&rarr;</span>
      </a>
    </div>
  </article>
);

const NewsCertifications = () => (
  <div className="nw-cert-page">
    <header className="nw-case-top">
      <div className="nw-container">
        <div className="nw-case-strip">
          <Link className="link-pencil nw-case-back" to="/#contact">
            &larr; Back to the case
          </Link>
          <span>
            {newspaper.mastheadName} &middot; Papers on File
          </span>
          <span>Filed from {newspaper.city}</span>
        </div>

        <div className="nw-case-head nw-cert-head">
          <span className="nw-kicker nw-case-kicker rv rv-settle">Credentials &amp; Proofs</span>
          <div className="rv rv-settle" style={{ '--rv-delay': '60ms' }}>
            <h1 className="nw-case-h1">
              <Words text="The Evidence Drawer" />
            </h1>
          </div>
          <p className="nw-case-lead rv rv-settle" style={{ '--rv-delay': '140ms' }}>
            The certificates, credentials and hackathon results the subject can actually produce on
            request — each one verifiable, and most of them accompanied by the paper itself.
          </p>
        </div>
      </div>
    </header>

    <section className="nw-case-main">
      <div className="nw-container">
        <div className="nw-section-head">
          <div className="nw-section-head-row rv">
            <div>
              <span className="nw-kicker rv-fade">Exhibits on file</span>
              <h3 className="nw-section-title">
                <Words text="Papers & Certificates" />
              </h3>
            </div>
            <span className="nw-section-side rv-fade">
              {certificatesData.length} verified &middot; 2024 &ndash; 2026
            </span>
          </div>
          <div className="nw-section-rule rv rv-rule" aria-hidden="true" />
        </div>

        <div className="nw-cert-grid">
          {certificatesData.map((cert, index) => (
            <CertCard cert={cert} index={index} key={cert.id} />
          ))}
        </div>

        <div className="nw-cert-dossier rv rv-settle">
          <div>
            <span className="nw-kicker rv-fade">The Full Dossier</span>
            <h3 className="nw-cert-dossier-title">Curriculum vitae, on file</h3>
            <p className="nw-cert-dossier-copy">
              The subject&apos;s complete record — education, experience, projects and
              certifications — filed together and kept current.
            </p>
          </div>
          <a
            className="nw-btn nw-btn--solid nw-btn--lg"
            href={SITE.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileText size={17} />
            Open the résumé
            <ExternalLink size={15} />
          </a>
        </div>

        <div className="nw-case-foot">
          <Link className="nw-btn" to="/#contact">
            <ArrowLeft size={16} />
            Back to the case
          </Link>
          <Link className="nw-btn nw-btn--solid" to="/#work">
            Read the works
            <span className="nw-openfile-arrow">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  </div>
);

export default NewsCertifications;