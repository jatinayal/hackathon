import React, { useEffect, useRef, useState } from 'react';
import { faangCompanies } from '../../data/faangLogos';

export const FaangMarquee = () => {
  const wrapperRef = useRef(null);
  const [repeats, setRepeats] = useState(1);
  useEffect(() => {
    // Each half must fill the viewport, including on ultrawide displays.
    const observer = new ResizeObserver(([entry]) => {
      setRepeats(Math.max(1, Math.ceil(entry.contentRect.width / (faangCompanies.length * 180))));
    });
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);
  const items = Array.from({ length: repeats }, () => faangCompanies).flat();

  return (
    <section id="faang" className="marquee-section">
      <div className="container">
        <h2 className="marquee-title">
          Get All <span style={{ color: '#ffffff' }}>Premium</span> Questions Asked In{' '}
          <span style={{ color: '#ffffff' }}>FAANG</span> Companies
        </h2>
      </div>
      <div ref={wrapperRef} className="marquee-wrapper">
        <div className="marquee-track">
          {[0, 1].map(group => (
            <div key={group} className="marquee-group" role="list"
              aria-label={group === 0 ? 'Companies' : undefined} aria-hidden={group === 1 ? true : undefined}>
              {items.map((company, index) => (
                <div key={`${index}-${company.name}`} className="marquee-item" role="listitem"
                  title={company.name} aria-hidden={index >= faangCompanies.length ? true : undefined}>
                  <img src={company.logo} alt={group === 0 && index < faangCompanies.length ? company.name : ''}
                    className={`marquee-logo ${company.size === 'wide-icon' ? 'marquee-logo-wide-icon' : ''}`} width="120" height="34" draggable={false} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <a href="#membership" className="btn-go-ahead">Go Ahead</a>
    </section>
  );
};
