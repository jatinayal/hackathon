import React, { useState } from 'react';
import { faqsData } from '../../data/faqsData';

export const FaqSection = () => {
  const [openId, setOpenId] = useState(null);

  const toggleFaq = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faqs" className="faqs-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Your Questions, Answered</h2>
          <p className="section-subtitle">
            Get instant answers to most common questions about Strike.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faqs-container">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq-item ${isOpen ? 'active' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
