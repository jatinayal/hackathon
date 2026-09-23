import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Courses', href: '#courses' },
  { name: 'Practice', href: '#membership' },
  { name: 'CodeArena', href: '#hero-editor' },
  { name: 'Quiz', href: '#why-us' },
  { name: 'System Design', href: '#courses' },
  { name: 'Contests', href: '#faang' },
];

function NavLinks({ activeLink, onSelect }) {
  return navLinks.map(link => (
    <a key={link.name} href={link.href}
      className={`navbar-link ${activeLink === link.name ? 'active' : ''}`}
      aria-current={activeLink === link.name ? 'page' : undefined}
      onClick={() => onSelect(link.name)}>
      {link.name}
    </a>
  ));
}

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    let observer;
    let observedHeight = 0;
    const observeMidpoint = () => {
      const height = hero.getBoundingClientRect().height;
      if (!height || height === observedHeight) return;
      observedHeight = height;
      observer?.disconnect();
      // Extend the root below the viewport so even a tall Hero is measured
      // by how much has passed the top, not by how much fits on screen.
      const buffer = Math.min(0.05, 8 / height);
      const hideAt = 0.5 - buffer;
      const showAt = 0.5 + buffer;
      observer = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio <= hideAt && entry.boundingClientRect.top < 0) {
          setCompact(true);
          setMobileMenuOpen(false);
        } else if (entry.intersectionRatio >= showAt || entry.boundingClientRect.top >= 0) {
          setCompact(false);
        }
      }, { rootMargin: `0px 0px ${Math.ceil(height)}px 0px`, threshold: [hideAt, showAt] });
      observer.observe(hero);
    };
    observeMidpoint();
    const resizeObserver = new ResizeObserver(observeMidpoint);
    resizeObserver.observe(hero);
    return () => {
      observer?.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  const selectLink = name => {
    setActiveLink(name);
    setMobileMenuOpen(false);
  };
  const links = <NavLinks activeLink={activeLink} onSelect={selectLink} />;

  return (
    <header className={`navbar-wrapper ${compact ? 'is-compact' : 'is-full'}`}>
      <div className="navbar-state navbar-full" inert={compact} aria-hidden={compact}>
        <div className="navbar-container">
          <a href="#hero" className="navbar-logo" onClick={() => selectLink('Home')}>STRIKE</a>
          <nav className="navbar-links" aria-label="Main navigation">{links}</nav>
          <div className="navbar-actions">
            <a href="#membership" className="btn-nav">Get Started</a>
            <button className="mobile-toggle" onClick={() => setMobileMenuOpen(open => !open)}
              aria-label="Toggle Navigation Menu" aria-expanded={mobileMenuOpen} aria-controls="navbar-mobile-menu">
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
          {mobileMenuOpen && (
            <nav id="navbar-mobile-menu" className="mobile-menu open" aria-label="Mobile navigation">
              {links}
              <a href="#membership" className="btn-nav" onClick={() => setMobileMenuOpen(false)}>Get Started</a>
            </nav>
          )}
        </div>
      </div>
      <div className="navbar-state navbar-mini" inert={!compact} aria-hidden={!compact}>
        <nav className="navbar-container navbar-mini-container" aria-label="Compact navigation">{links}</nav>
      </div>
    </header>
  );
};
