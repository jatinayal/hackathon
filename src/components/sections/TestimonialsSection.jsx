import React from 'react';
import { testimonialsData } from '../../data/testimonialsData';

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">★ REVIEWS</span>
          <h2 className="section-title">Trusted by Visionaries</h2>
          <p className="section-subtitle">
            Hear from real users who achieved success with our automation
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonialsData.slice(0, 6).map((item) => (
            <div key={item.id} className="testimonial-card">
              <p className="testimonial-quote">"{item.testimonial}"</p>
              <div>
                <h4 className="testimonial-author-name">{item.name}</h4>
                <span className="testimonial-author-role">
                  {item.role || 'Software Engineer'} {item.company ? `· ${item.company}` : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
