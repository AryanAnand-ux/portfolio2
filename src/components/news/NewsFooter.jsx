import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../icons';
import { newspaper, contactInfo, footerContent } from '../../data/newspaper';
import VisitorCount from './VisitorCount';

const SectionLink = ({ item }) =>
  item.href.startsWith('/') ? (
    <Link className="link-pencil-bright" to={item.href}>
      {item.label}
    </Link>
  ) : (
    <a className="link-pencil-bright" href={item.href}>
      {item.label}
    </a>
  );

const NewsFooter = () => (
  <footer className="nw-footer" data-purpose="newspaper-closing-footer">
    <div className="nw-container">
      <div className="nw-footer-mast">{newspaper.mastheadName}</div>

      <div className="nw-footer-grid">
        <p className="nw-footer-bio">{footerContent.bio}</p>

        <div className="nw-footer-col">
          <h5 className="nw-footer-col-title">Sections</h5>
          {footerContent.sections.map((section) => (
            <SectionLink item={section} key={section.href} />
          ))}
        </div>

        <div className="nw-footer-col">
          <h5 className="nw-footer-col-title">The Desk</h5>
          <p>{contactInfo.deskCity}</p>
          <p>{contactInfo.deskNote}</p>
          <a className="link-pencil-bright" href={`mailto:${contactInfo.email}`}>
            {contactInfo.email}
          </a>
        </div>

        <div className="nw-footer-col">
          <h5 className="nw-footer-col-title">Wire Services</h5>
          <a
            className="link-pencil-bright"
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="link-pencil-bright"
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="nw-footer-stamp">
        <span>Case Closed</span>
      </div>

      <div className="nw-footer-bar">
        <span>{footerContent.copyright}</span>
        <VisitorCount />
        <div className="nw-footer-icons">
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <GitHubIcon size={18} />
          </a>
          <a
            href={contactInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={18} />
          </a>
          <a href={`mailto:${contactInfo.email}`} aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default NewsFooter;