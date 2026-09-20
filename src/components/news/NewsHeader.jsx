import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { newspaper, contactInfo } from '../../data/newspaper';
import { GitHubIcon, LinkedInIcon } from '../icons';

const NAV_LINKS = [
  { label: 'Work', to: '/#work' },
  { label: 'Stack', to: '/#stack' },
  { label: 'Experience', to: '/#career' },
  { label: 'Credentials', to: '/certifications' },
  { label: 'Contact', to: '/#contact' },
];

const NewsHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className="nw-header" id="top">
        <div className="nw-container">
          <div className="nw-meta-strip">
            <span>{newspaper.city}</span>
            <span className="nw-meta-center">{newspaper.edition}</span>
            <span className="nw-meta-right">{newspaper.established}</span>
          </div>

          <div className="nw-masthead">
            <h1>{newspaper.mastheadName}</h1>
            <p className="nw-masthead-tagline">{newspaper.tagline}</p>
          </div>

          <div className="nw-issue-ledger">
            <span>{newspaper.issueDate}</span>
            <span className="nw-dot" aria-hidden="true" />
            <span>{newspaper.volume}</span>
            <span className="nw-dot" aria-hidden="true" />
            <span>{newspaper.contents}</span>
            <span className="nw-dot" aria-hidden="true" />
            <span>{newspaper.price}</span>
          </div>
        </div>
      </header>

      <div className={`nw-nav-wrap ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nw-container">
          <nav className="nw-nav" aria-label="Primary">
            <Link className="nw-nav-brand" to="/" onClick={close}>
              {newspaper.mastheadName}
            </Link>

            <div className="nw-nav-links">
              {NAV_LINKS.map((link) => (
                <Link className="nw-nav-link" to={link.to} key={link.to} onClick={close}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="nw-nav-actions">
              <Link className="nw-btn nw-btn--sm nw-btn--solid" to="/#contact" onClick={close}>
                Hire him
              </Link>
              <button
                className={`nw-burger ${open ? 'is-open' : ''}`}
                type="button"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </nav>

          <div className={`nw-mobile-panel ${open ? 'is-open' : ''}`} aria-hidden={!open}>
            <div className="nw-mobile-links">
              {NAV_LINKS.map((link) => (
                <Link className="nw-mobile-link" to={link.to} key={link.to} onClick={close}>
                  <span>{link.label}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                    className="text-ink-soft"
                    aria-hidden="true"
                  >
                    <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" />
                  </svg>
                </Link>
              ))}

              <div className="nw-mobile-meta">
                <Link className="nw-btn nw-btn--xl nw-btn--solid" to="/#contact" onClick={close}>
                  Hire him &rarr;
                </Link>
                <div className="nw-mobile-meta-row">
                  <span className="nw-mobile-pin">
                    <MapPin size={14} />
                    {newspaper.city}
                  </span>
                  <a
                    href={contactInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <GitHubIcon size={14} />
                    github.com/AryanAnand-ux
                  </a>
                  <a
                    href={contactInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon size={14} />
                    linkedin.com/in/aryananand-ux
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsHeader;