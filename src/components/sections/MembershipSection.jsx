import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { plansData } from '../../data/plansData';
import { MembershipBanner } from '../ui/MembershipBanner';

export const MembershipSection = () => {
  // Store selected duration index for each plan (default to 4 Years, index 2)
  const [plusDurationIndex, setPlusDurationIndex] = useState(2);
  const [ultraDurationIndex, setUltraDurationIndex] = useState(2);

  const plusPlan = plansData.find((p) => p.id === 'strike-plus');
  const ultraPlan = plansData.find((p) => p.id === 'strike-ultra');

  const selectedPlusVariant = plusPlan.variants[plusDurationIndex];
  const selectedUltraVariant = ultraPlan.variants[ultraDurationIndex];

  return (
    <section id="membership" className="membership-section">
      {/* Top divider gradient */}
      <div className="membership-top-line" />
      <div className="membership-ambient-glow" />
      <div className="membership-gold-glow" />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">THE STRIKE MEMBERSHIP</span>
          <h2 className="section-title">
            Membership<br />
            <span
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #a0a0a0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Plans
            </span>
          </h2>
          <p className="section-subtitle">
            One focused investment in your engineering career.<br />
            <span style={{ color: '#71717a' }}>
              Every course. Present and future. Pay once, learn forever.
            </span>
          </p>
        </div>

        {/* 2 Membership Cards Grid */}
        <div className="membership-grid">
          {/* ================= STRIKE PLUS (SILVER) ================= */}
          <div className="plan-card plan-card-silver">
            <div className="plan-banner-wrapper">
              <MembershipBanner type="silver" />
            </div>

            <div className="plan-body">
              <span className="plan-tag plan-tag-silver">{plusPlan.tagline}</span>
              <h3 className="plan-name plan-name-silver">{plusPlan.name}</h3>
              <p className="plan-desc">{plusPlan.subtitle}</p>

              {/* Duration Switcher */}
              <div className="duration-label">SELECT DURATION</div>
              <div className="duration-pills">
                {plusPlan.variants.map((v, i) => (
                  <button
                    key={v.duration}
                    className={`duration-pill ${plusDurationIndex === i ? 'active-silver' : ''}`}
                    onClick={() => setPlusDurationIndex(i)}
                  >
                    <span>{v.duration}</span>
                    {v.isPopular && <span className="pill-popular-tag">Popular</span>}
                  </button>
                ))}
              </div>

              {/* Price Details */}
              <div className="pricing-display">
                <span className="price-currency" style={{ color: '#ffffff' }}>₹</span>
                <span className="price-amount" style={{ color: '#ffffff' }}>
                  {selectedPlusVariant.sellingPrice.toLocaleString('en-IN')}
                </span>
                <span className="price-original">
                  ₹{selectedPlusVariant.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="badge-discount">{selectedPlusVariant.discount}</span>
                {selectedPlusVariant.isPopular && (
                  <span className="badge-discount" style={{ background: 'rgba(255, 255, 255, 0.15)' }}>
                    Popular
                  </span>
                )}
              </div>

              <div className="pricing-subtext">
                {selectedPlusVariant.duration} · one-time · no renewals
              </div>

              {/* Features List */}
              <ul className="plan-features">
                {plusPlan.features.map((feat, idx) => (
                  <li key={idx} className="feature-item">
                    <Check className="feature-icon-silver" />
                    <span>{feat.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a href="#hero-editor" className="btn-plan btn-plan-silver">
                <span>{plusPlan.buttonText}</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>

          {/* ================= STRIKE ULTRA (GOLD) ================= */}
          <div className="plan-card plan-card-gold">
            <div className="plan-banner-wrapper">
              <MembershipBanner type="gold" />
              <div className="plan-badge-value">
                <Sparkles size={14} />
                <span>BEST VALUE</span>
              </div>
            </div>

            <div className="plan-body">
              <span className="plan-tag plan-tag-gold">{ultraPlan.tagline}</span>
              <h3 className="plan-name plan-name-gold">{ultraPlan.name}</h3>
              <p className="plan-desc">{ultraPlan.subtitle}</p>

              {/* Duration Switcher */}
              <div className="duration-label">SELECT DURATION</div>
              <div className="duration-pills">
                {ultraPlan.variants.map((v, i) => (
                  <button
                    key={v.duration}
                    className={`duration-pill ${ultraDurationIndex === i ? 'active-gold' : ''}`}
                    onClick={() => setUltraDurationIndex(i)}
                  >
                    <span>{v.duration}</span>
                    {v.isPopular && (
                      <span className="pill-popular-tag" style={{ background: 'rgba(0,0,0,0.25)' }}>
                        Popular
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Price Details */}
              <div className="pricing-display">
                <span className="price-currency" style={{ color: '#f59e0b' }}>₹</span>
                <span className="price-amount" style={{ color: '#ffffff' }}>
                  {selectedUltraVariant.sellingPrice.toLocaleString('en-IN')}
                </span>
                <span className="price-original">
                  ₹{selectedUltraVariant.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="badge-discount badge-discount-gold">
                  {selectedUltraVariant.discount}
                </span>
                {selectedUltraVariant.isPopular && (
                  <span className="badge-popular-gold">Popular</span>
                )}
              </div>

              <div className="pricing-subtext">
                {selectedUltraVariant.duration} · one-time · no renewals
              </div>

              {/* Features List */}
              <ul className="plan-features">
                {ultraPlan.features.map((feat, idx) => (
                  <li key={idx} className="feature-item">
                    <Check className="feature-icon-gold" />
                    <span className={feat.highlight ? 'feature-bold' : ''}>{feat.text}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a href="#hero-editor" className="btn-plan btn-plan-gold">
                <span>{ultraPlan.buttonText}</span>
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="membership-disclaimer">
          Prices inclusive of GST · One-time payment · No renewals
        </p>
      </div>
    </section>
  );
};
