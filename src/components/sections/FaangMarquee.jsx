import React from 'react';
import { faangCompanies } from '../../data/faangLogos';

export const FaangMarquee = () => {
  // Duplicate array for seamless infinite marquee scroll
  const marqueeItems = [...faangCompanies, ...faangCompanies, ...faangCompanies];

  return (
    <section id="faang" className="marquee-section">
      <div className="container">
        <h2 className="marquee-title">
          Get All <span style={{ color: '#ffffff' }}>Premium</span> Questions Asked In{' '}
          <span style={{ color: '#ffffff' }}>FAANG</span> Companies
        </h2>
      </div>

      {/* Continuous Marquee Ticker */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {marqueeItems.map((comp, idx) => (
            <div key={idx} className="marquee-item" title={comp.name}>
              {comp.name === 'Amazon' && (
                <span
                  style={{
                    fontFamily: 'sans-serif',
                    fontSize: '1.75rem',
                    fontWeight: '800',
                    color: '#ffffff',
                    letterSpacing: '-0.04em'
                  }}
                >
                  amazon<span style={{ color: '#f59e0b' }}>.com</span>
                </span>
              )}

              {comp.name === 'Apple' && (
                <svg width="34" height="34" viewBox={comp.viewBox} fill="#ffffff">
                  <path d={comp.path} />
                </svg>
              )}

              {comp.name === 'Netflix' && (
                <span
                  style={{
                    fontFamily: 'Impact, sans-serif',
                    fontSize: '2rem',
                    color: '#e50914',
                    letterSpacing: '0.05em'
                  }}
                >
                  NETFLIX
                </span>
              )}

              {comp.name === 'Cisco' && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '14px', marginBottom: '2px' }}>
                    <span style={{ width: '2px', height: '6px', background: '#00bceb' }} />
                    <span style={{ width: '2px', height: '10px', background: '#00bceb' }} />
                    <span style={{ width: '2px', height: '14px', background: '#00bceb' }} />
                    <span style={{ width: '2px', height: '10px', background: '#00bceb' }} />
                    <span style={{ width: '2px', height: '6px', background: '#00bceb' }} />
                  </div>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '1.2rem', fontWeight: '800', color: '#00bceb', letterSpacing: '0.08em' }}>
                    CISCO
                  </span>
                </div>
              )}

              {comp.name === 'PayPal' && (
                <span
                  style={{
                    fontFamily: 'sans-serif',
                    fontSize: '1.8rem',
                    fontWeight: '800',
                    fontStyle: 'italic',
                    color: '#0079C1'
                  }}
                >
                  Pay<span style={{ color: '#00457C' }}>Pal</span>
                </span>
              )}

              {comp.name === 'Oracle' && (
                <span
                  style={{
                    fontFamily: 'sans-serif',
                    fontSize: '1.9rem',
                    fontWeight: '900',
                    color: '#00d2ff',
                    letterSpacing: '0.12em'
                  }}
                >
                  ORACLE
                </span>
              )}

              {comp.name === 'Google' && (
                <span
                  style={{
                    fontFamily: 'sans-serif',
                    fontSize: '1.8rem',
                    fontWeight: '700',
                    letterSpacing: '-0.02em'
                  }}
                >
                  <span style={{ color: '#4285F4' }}>G</span>
                  <span style={{ color: '#EA4335' }}>o</span>
                  <span style={{ color: '#FBBC05' }}>o</span>
                  <span style={{ color: '#4285F4' }}>g</span>
                  <span style={{ color: '#34A853' }}>l</span>
                  <span style={{ color: '#EA4335' }}>e</span>
                </span>
              )}

              {comp.name === 'Facebook' && (
                <svg width="34" height="34" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <a href="#membership" className="btn-go-ahead">
        Go Ahead
      </a>
    </section>
  );
};
