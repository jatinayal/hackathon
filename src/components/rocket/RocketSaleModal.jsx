import React, { useState, useEffect, useRef } from 'react';
import { RocketMotionLayer } from './RocketMotionLayer';
import { sounds } from '../../utils/soundEffects';
import thunderImg from '../../assets/images/thunder.png';
import {
  Volume2,
  VolumeX,
  X,
  Copy,
  Check,
  Timer,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const RocketSaleModal = ({
  isOpen = false,
  onClose,
  onClaimOffer,
}) => {
  // Animation Phases: 'entering' | 'landed' | 'countdown' | 'blasting' | 'revealed'
  const [phase, setPhase] = useState('entering');
  const [thrustLevel, setThrustLevel] = useState('cruising');
  const [isMuted, setIsMuted] = useState(false);
  const [couponCopied, setCouponCopied] = useState(false);

  // 24-hour countdown clock (active once revealed)
  const [timeLeft, setTimeLeft] = useState({
    hours: '23',
    minutes: '59',
    seconds: '42',
  });

  const targetDockRef = useRef(null);
  const priceAreaRef = useRef(null);
  const priceContentRef = useRef(null);

  // Real-time ticking timer (only runs when revealed)
  useEffect(() => {
    if (phase !== 'revealed') return;

    const updateTimer = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = Math.max(0, endOfDay.getTime() - now.getTime());

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(timerInterval);
  }, [phase]);

  // Reset sequence when modal opens
  useEffect(() => {
    if (isOpen) {
      setPhase('entering');
      setThrustLevel('cruising');
    }
  }, [isOpen]);

  // Handle Rocket Click to Launch
  const handleLaunchClick = () => {
    if (phase !== 'landed') return;

    setPhase('countdown');
    setThrustLevel('launch');
    sounds.playBeep(false);
  };

  // Sound Toggle Handler
  const toggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  // Copy Coupon Code Handler
  const handleCopyCoupon = () => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard.writeText('THUNDER60').catch(() => {
          fallbackCopyText('THUNDER60');
        });
      } else {
        fallbackCopyText('THUNDER60');
      }
    } catch {
      fallbackCopyText('THUNDER60');
    }
    setCouponCopied(true);
    setTimeout(() => {
      setCouponCopied(false);
    }, 2500);
  };

  const fallbackCopyText = (text) => {
    try {
      const el = document.createElement('textarea');
      el.value = text;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    } catch (e) {
      console.warn('Copy fallback error:', e);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="rocket-modal-overlay" role="dialog" aria-modal="true">
      {/* Full-Screen Viewport Rocket & White Dashed Trail Layer */}
      <RocketMotionLayer
        phase={phase}
        targetDockRef={targetDockRef}
        priceAreaRef={priceAreaRef}
        priceContentRef={priceContentRef}
        onSmokeCovered={() => {
          sounds.playBeep(true);
          setPhase('blasting');
        }}
        onLaunchComplete={() => {
          setPhase('revealed');
          sounds.playRevealChime();
        }}
        onLanded={() => {
          setPhase('landed');
          setThrustLevel('none');
        }}
        onLaunchRocket={handleLaunchClick}
        thrustLevel={thrustLevel}
      />

      {/* STRIKE Minimalist 2-Column Modal Card */}
      <div className="rocket-modal-container strike-minimal-modal">
        {/* Subtle Top Highlight Line */}
        <div className="rocket-modal-top-line" />

        {/* Minimal Modal Header Actions (Float top right) */}
        <div className="minimal-modal-controls">
          <button
            onClick={toggleSound}
            className="action-icon-btn"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
          <button
            onClick={onClose}
            className="action-icon-btn"
            title="Close"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="minimal-popup-layout">
          {/* ================= LEFT SIDE: COURSE IMAGE ================= */}
          <div className="minimal-popup-left">
            <div className="course-visual-card">
              <img
                src={thunderImg}
                alt="Thunder: 100 Days of Code"
                className="course-visual-img"
              />

              {/* Batch badge */}
              <div className="course-live-pill">
                <span className="live-dot-pulse" />
                <span>LIVE BATCH</span>
              </div>

              {/* Course emblem footer */}
              <div className="course-visual-footer">
                <span className="course-brand-tag">STRIKE FLAGSHIP</span>
                <span className="course-instructor-names">Rohit Negi & Aditya Tandon</span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE: COURSE DETAILS ================= */}
          <div className="minimal-popup-right">
            {/* 1. Course Title */}
            <div className="course-title-group">
              <span className="course-category-badge">Special Offer</span>
              <h2 className="course-main-title">Thunder: 100 Days of Code</h2>
            </div>

            {/* 2. Duration & Metadata */}
            <div className="course-duration-bar">
              <Clock size={15} color="#fbbf24" />
              <span>6 Months • 120+ Hours • Live & Interactive</span>
            </div>

            {/* 3. Topics Covered (3-4 clean bullet points) */}
            <div className="course-topics-section">
              <span className="topics-heading">Topics Covered:</span>
              <ul className="topics-list">
                <li>
                  <CheckCircle2 size={14} color="#22c55e" />
                  <span>Data Structures & Algorithms in C++</span>
                </li>
                <li>
                  <CheckCircle2 size={14} color="#22c55e" />
                  <span>Full Stack Web Development & Microservices</span>
                </li>
                <li>
                  <CheckCircle2 size={14} color="#22c55e" />
                  <span>System Design, Cloud & Production DevOps</span>
                </li>
                <li>
                  <CheckCircle2 size={14} color="#22c55e" />
                  <span>Generative AI & LLM Capstone Projects</span>
                </li>
              </ul>
            </div>

            {/* 4. Price Section (Teaser with rocket vs Revealed offer) */}
            <div ref={priceAreaRef} className="course-price-section">
              {/* TEASER STATE: Rocket is docked here as the sole interactive trigger */}
              {phase !== 'revealed' && (
                <div ref={priceContentRef} className="price-teaser-container">
                  {/* Invisible Target Anchor for Rocket to Dock */}
                  <div ref={targetDockRef} className="rocket-dock-target-anchor" />

                  {/* Clean Helper Prompt */}
                  <div
                    className={`rocket-minimal-hint ${phase === 'landed' ? 'is-ready' : ''}`}
                    onClick={phase === 'landed' ? handleLaunchClick : undefined}
                    role={phase === 'landed' ? 'button' : undefined}
                    tabIndex={phase === 'landed' ? 0 : -1}
                  >
                    <span className="hint-label">
                      {phase === 'landed' ? 'Click the rocket' : 'Rocket approaching...'}
                    </span>
                  </div>
                </div>
              )}

              {/* REVEALED STATE: Original price, discounted price, countdown, coupon & CTA */}
              {phase === 'revealed' && (
                <div ref={priceContentRef} className="price-revealed-container" style={{ opacity: 0, animation: 'none' }}>
                  {/* Pricing Row */}
                  <div className="price-reveal-row">
                    <div className="price-numbers">
                      <span className="price-original">₹11,999</span>
                      <span className="price-discounted">₹4,499</span>
                      <span className="price-save-tag">62% OFF</span>
                    </div>

                    {/* Compact Countdown Clock */}
                    <div className="minimal-countdown-clock">
                      <Timer size={14} color="#fbbf24" />
                      <span className="countdown-time">
                        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
                      </span>
                    </div>
                  </div>

                  {/* Coupon Code Pill */}
                  <div className="minimal-coupon-bar">
                    <span className="coupon-prefix">Code:</span>
                    <strong className="coupon-code">THUNDER60</strong>
                    <button
                      onClick={handleCopyCoupon}
                      className={`copy-code-pill ${couponCopied ? 'copied' : ''}`}
                    >
                      {couponCopied ? (
                        <>
                          <Check size={12} />
                          COPIED!
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          COPY
                        </>
                      )}
                    </button>
                  </div>

                  {/* Claim Offer Action */}
                  <button
                    onClick={() => {
                      onClaimOffer?.();
                      onClose?.();
                    }}
                    className="minimal-claim-cta"
                  >
                    <span>Claim Offer Now</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

