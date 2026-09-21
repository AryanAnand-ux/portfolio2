import { Mail } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '../icons';
import { contactInfo } from '../../data/newspaper';
import { Words } from './reveal';

const NewsContact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const story = String(data.get('story') ?? '').trim();
    const subject = encodeURIComponent(
      String(data.get('subject') ?? '').trim() || 'New letter from the desk'
    );
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${story}`);
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="nw-sec nw-sec--contact">
      <div className="nw-container">
        <div className="nw-section-head">
          <div className="nw-section-head-row rv">
            <div>
              <span className="nw-kicker rv-fade">Submit a Tip</span>
              <h3 className="nw-section-title">
                <Words text="Letters & Commissions" />
              </h3>
            </div>
            <span className="nw-section-side rv-fade">The desk is open for select work — 2026</span>
          </div>
          <div className="nw-section-rule rv rv-rule" aria-hidden="true" />
        </div>

        <div className="nw-contact-box rv rv-settle">
          <div className="nw-contact-form">
            <h4 className="nw-contact-title">Put it in writing</h4>
            <p className="nw-contact-intro">
              A project in mind, a role to fill, or just a good question - send it through and
              he&apos;ll get back to you.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="nw-field-row2">
                <div className="nw-field">
                  <label htmlFor="name">Your Name</label>
                  <input id="name" name="name" type="text" placeholder="Jane Doe" required />
                </div>
                <div className="nw-field">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    required
                  />
                </div>
              </div>
              <div className="nw-field">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="A new product, a rebuild, a contract..."
                  required
                />
              </div>
              <div className="nw-field">
                <label htmlFor="story">The Story</label>
                <textarea
                  id="story"
                  name="story"
                  rows="5"
                  placeholder="Tell him what you're building."
                  required
                />
              </div>
              <div className="nw-form-foot">
                <span>{contactInfo.replyNote}</span>
                <button className="nw-btn nw-btn--lg nw-btn--solid" type="submit">
                  Send the letter
                </button>
              </div>
            </form>
          </div>

          <div className="nw-contact-right">
            <div className="nw-contact-block">
              <span className="nw-contact-block-label">Direct Line</span>
              <p className="nw-contact-block-value">
                <a className="link-pencil" href={`mailto:${contactInfo.email}`}>
                  {contactInfo.email}
                </a>
              </p>
              <p className="nw-contact-block-sub">{contactInfo.coordsNote}</p>
            </div>
            <div className="nw-contact-block">
              <span className="nw-contact-block-label">The Desk</span>
              <p className="nw-contact-block-value">{contactInfo.deskCity}</p>
              <p className="nw-contact-block-sub">{contactInfo.deskNote}</p>
            </div>
            <div className="nw-contact-block">
              <span className="nw-contact-block-label">Availability</span>
              <p className="nw-contact-block-value">{contactInfo.availability}</p>
              <p className="nw-contact-block-sub">{contactInfo.availabilityNote}</p>
            </div>
            <div className="nw-contact-social">
              <a
                className="nw-social"
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <GitHubIcon size={19} />
              </a>
              <a
                className="nw-social"
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon size={19} />
              </a>
              <a className="nw-social" href={`mailto:${contactInfo.email}`} aria-label="Email">
                <Mail size={19} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsContact;