import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Col */}
          <div className="footer-brand">
            <a href="#hero" className="footer-logo">
              STRIKE
            </a>
            <p className="footer-desc">
              Empowering developers with cutting-edge tools and resources. Powered by Coder Army,
              Strike is your gateway to a world of endless coding with guided lessons, real
              projects, level up your skills.
            </p>
          </div>

          {/* Platform Col */}
          <div>
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-links">
              <li><a href="#hero" className="footer-link">Home</a></li>
              <li><a href="#membership" className="footer-link">Practice</a></li>
              <li><a href="#courses" className="footer-link">DSA Sheet</a></li>
            </ul>
          </div>

          {/* Company Col */}
          <div>
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              <li><a href="#faqs" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Legal Col */}
          <div>
            <h4 className="footer-col-title">Legal</h4>
            <ul className="footer-links">
              <li><a href="#faqs" className="footer-link">Terms of Service</a></li>
              <li><a href="#faqs" className="footer-link">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2025 STRIKE. All rights reserved.</p>
          <button onClick={scrollToTop} className="btn-scroll-top">
            <ArrowUp size={16} /> Top
          </button>
        </div>
      </div>
    </footer>
  );
};
