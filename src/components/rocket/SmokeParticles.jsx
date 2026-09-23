import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Volumetric Launch Smoke & Particle Simulation
 * Billows dense smoke clouds when the rocket launches to completely cover the price container,
 * then gently dissipates to reveal the unlocked offer.
 */
export const SmokeParticles = ({ active = false, dissipating = false }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const puffs = containerRef.current.querySelectorAll('.smoke-puff');
    const embers = containerRef.current.querySelectorAll('.smoke-ember');

    if (active && !dissipating) {
      // Billow out rapidly to cover the entire price box
      gsap.fromTo(
        puffs,
        {
          scale: 0.2,
          opacity: 0,
          y: 20,
        },
        {
          scale: (i) => 1.1 + (i % 4) * 0.25,
          opacity: (i) => 0.88 - (i % 3) * 0.1,
          y: (i) => -15 - (i % 5) * 8,
          x: (i) => (i % 2 === 0 ? (i * 6 - 25) : -(i * 5 - 20)),
          duration: 0.7,
          stagger: 0.03,
          ease: 'power3.out',
        }
      );

      // Embers bursting upward
      gsap.fromTo(
        embers,
        {
          y: 0,
          opacity: 1,
          scale: 0.5,
        },
        {
          y: (i) => -60 - Math.random() * 80,
          x: (i) => (Math.random() - 0.5) * 160,
          opacity: 0,
          scale: (i) => 1 + Math.random(),
          duration: 1.2,
          stagger: 0.04,
          ease: 'power2.out',
        }
      );
    } else if (dissipating) {
      // Dissolve and clear the smoke outward to unveil the prize
      gsap.to(puffs, {
        scale: 1.8,
        opacity: 0,
        y: -50,
        x: (i) => (i % 2 === 0 ? 60 : -60),
        duration: 1.1,
        stagger: 0.03,
        ease: 'power2.inOut',
      });
    } else {
      // Reset
      gsap.set(puffs, { opacity: 0, scale: 0.1 });
      gsap.set(embers, { opacity: 0 });
    }
  }, [active, dissipating]);

  // Generate 16 distinct volumetric cloud puff elements
  const puffCount = 16;
  const puffs = Array.from({ length: puffCount });

  // Generate 12 glowing spark embers
  const emberCount = 12;
  const embers = Array.from({ length: emberCount });

  return (
    <div
      ref={containerRef}
      className={`smoke-simulation-layer ${active ? 'active' : ''} ${dissipating ? 'dissipating' : ''}`}
      aria-hidden="true"
    >
      {/* SVG Definitions for turbulent cloud filter */}
      <svg className="smoke-svg-filters" width="0" height="0">
        <defs>
          <radialGradient id="smokeCloudGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.95" />
            <stop offset="30%" stopColor="#cbd5e1" stopOpacity="0.85" />
            <stop offset="65%" stopColor="#64748b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1e293b" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="smokeFireGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#fdba74" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#ea580c" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Volumetric Clouds */}
      <div className="smoke-cloud-cluster">
        {puffs.map((_, i) => (
          <div
            key={`puff-${i}`}
            className={`smoke-puff ${i < 4 ? 'fire-tint' : ''}`}
            style={{
              '--puff-index': i,
            }}
          />
        ))}
      </div>

      {/* Floating Fiery Spark Embers */}
      <div className="smoke-embers-container">
        {embers.map((_, i) => (
          <div
            key={`ember-${i}`}
            className="smoke-ember"
            style={{
              left: `${45 + (i * 3) % 20}%`,
              '--delay': `${i * 0.05}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
