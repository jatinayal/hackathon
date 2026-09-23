import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

import gsap from 'gsap';

// Uneven cloud centers and densities, rather than rows filling a rectangle.
// Keep twelve wisps so coverage/reveal timing stays exactly the same.
const TAKEOFF_PUFFS = [
  { x: 0.04, y: 0.61, size: 0.92, rotation: -18, opacity: 0.26 },
  { x: 0.20, y: 0.28, size: 1.12, rotation: 12, opacity: 0.33 },
  { x: 0.34, y: 0.74, size: 1.06, rotation: -10, opacity: 0.38 },
  { x: 0.49, y: 0.42, size: 1.22, rotation: 16, opacity: 0.43 },
  { x: 0.67, y: 0.68, size: 1.10, rotation: -14, opacity: 0.35 },
  { x: 0.84, y: 0.32, size: 1.03, rotation: 20, opacity: 0.30 },
  { x: 0.98, y: 0.65, size: 0.90, rotation: -12, opacity: 0.24 },
  { x: 0.13, y: 0.86, size: 0.85, rotation: 24, opacity: 0.22 },
  { x: 0.39, y: 0.12, size: 0.98, rotation: -22, opacity: 0.28 },
  { x: 0.60, y: 0.88, size: 1.05, rotation: 10, opacity: 0.31 },
  { x: 0.76, y: 0.07, size: 0.88, rotation: -16, opacity: 0.23 },
  { x: 0.91, y: 0.90, size: 0.82, rotation: 18, opacity: 0.21 },
];

/**
 * Viewport smoke layers: landing at the dock, takeoff centered on the price panel.
 * Landing smoke stays above the popup (z-index: 2045).
 * Takeoff wisps can spill past the panel and popup without changing layout.
 *
 * Features:
 * 1. Landing Mode: Soft, brief lateral dust/mist puff & ground shockwave when rocket touches down.
 * 2. Takeoff Mode: Lightweight, irregular wisps with natural spill and drift.
 */
export const RocketSmokeFx = ({ trigger = null, phase, priceAreaRef, priceContentRef, onCovered, targetCoords = { x: 0, y: 0 }, nozzleOffset = 40 }) => {
  const landingRef = useRef(null);
  const takeoffRef = useRef(null);
  const takeoffTimelineRef = useRef(null);
  const onCoveredRef = useRef(onCovered);
  const [priceHost, setPriceHost] = useState(null);
  useEffect(() => { onCoveredRef.current = onCovered; }, [onCovered]);
  // Resolve the price anchor once; smoke itself lives outside the popup.

  useEffect(() => { setPriceHost(priceAreaRef.current); }, [priceAreaRef]);
  // Position the unclipped cloud layer only on layout/scroll events. Percent
  // cloud anchors adapt to the price panel's new size during the same reveal.
  useLayoutEffect(() => {
    if (!priceHost || !takeoffRef.current) return;
    let frame;
    const align = () => {
      const rect = priceHost.getBoundingClientRect();
      gsap.set(takeoffRef.current, { x: rect.left, y: rect.top, width: rect.width, height: rect.height, autoRound: false });
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(align);
    };
    align();
    const observer = new ResizeObserver(align);
    observer.observe(priceHost);
    window.addEventListener('resize', schedule);
    window.addEventListener('scroll', schedule, true);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', schedule);
      window.removeEventListener('scroll', schedule, true);
    };
  }, [priceHost, phase]);
  // Landing Smoke / Dust Effect
  useEffect(() => {
    if (trigger !== 'landing' || !landingRef.current) return;
    const context = gsap.context(() => {
      const container = landingRef.current;
      const puffs = container.querySelectorAll('.landing-smoke-puff');
      const groundDisc = container.querySelector('.landing-ground-disc');

      gsap.killTweensOf([puffs, groundDisc]);

      // 1. Soft horizontal ground dust shockwave
      if (groundDisc) {
        gsap.fromTo(
          groundDisc,
          { scaleX: 0.2, scaleY: 0.1, opacity: 0.3 },
          {
            scaleX: 2.2,
            scaleY: 0.7,
            opacity: 0,
            duration: 0.75,
            ease: 'power2.out',
          }
        );
      }

      // 2. Lateral dust puffs billowing out sideways
      puffs.forEach((puff, i) => {
        const isLeft = i % 2 === 0;
        const speedFactor = 0.85 + (i % 3) * 0.15;
        const targetX = (isLeft ? -1 : 1) * (18 + i * 5);
        const targetY = (Math.random() - 0.45) * 10;

        gsap.fromTo(
          puff,
          {
            scale: 0.25,
            opacity: 0,
            x: 0,
            y: 0,
          },
          {
            scale: 1.1 + (i % 3) * 0.25,
            opacity: 0.28,
            x: targetX,
            y: targetY,
            duration: 0.38 * speedFactor,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(puff, {
                opacity: 0,
                scale: 1.5,
                x: targetX * 1.35,
                duration: 0.45 * speedFactor,
                ease: 'power1.out',
              });
            },
          }
        );
      });
    });
    return () => context.revert();
  }, [trigger]);

  // One timeline owns coverage, the hold during launch, and dispersal.
  useEffect(() => {
    if (trigger !== 'takeoff' || !takeoffRef.current || !priceHost) return;
    const context = gsap.context(() => {
      const puffs = takeoffRef.current.querySelectorAll('.takeoff-smoke-puff');
      const rect = priceHost.getBoundingClientRect();
      const nozzleX = targetCoords.x - rect.left;
      const nozzleY = targetCoords.y + nozzleOffset - rect.top;
      const tl = gsap.timeline();
      takeoffTimelineRef.current = tl;
      tl.fromTo(puffs, {
        xPercent: -50, yPercent: -50,
        x: i => nozzleX - TAKEOFF_PUFFS[i].x * rect.width,
        y: i => nozzleY - TAKEOFF_PUFFS[i].y * rect.height,
        scale: 0.08, rotation: 0, opacity: 0,
      }, {
        x: 0, y: 0, scale: 1,
        rotation: i => TAKEOFF_PUFFS[i].rotation,
        opacity: i => TAKEOFF_PUFFS[i].opacity,
        duration: 0.5, stagger: 0.012, ease: 'power2.out',
      });
      // Crossfade the teaser beneath the spreading wisps, so low-density
      // smoke can conceal the swap without an opaque slab or price flash.
      tl.to(priceContentRef.current, { opacity: 0, duration: 0.28, ease: 'sine.inOut' }, 0.15);
      tl.addLabel('covered');
      tl.addPause('covered', () => onCoveredRef.current?.());
      tl.addLabel('uncover', 'covered+=0.01');
      tl.to(puffs, {
        x: i => Math.sign(TAKEOFF_PUFFS[i].x - 0.5) * rect.width * (0.06 + (i % 3) * 0.025),
        y: i => -rect.height * (0.12 + (i % 4) * 0.07),
        rotation: i => TAKEOFF_PUFFS[i].rotation + (i % 2 ? 12 : -12),
        scale: i => 1.3 + (i % 3) * 0.12, opacity: 0,
        duration: 1.35, stagger: 0.025, ease: 'sine.inOut',
      }, 'uncover');
    });
    return () => {
      context.revert();
      takeoffTimelineRef.current = null;
    };
  }, [trigger, priceHost, priceContentRef, targetCoords, nozzleOffset]);

  useEffect(() => {
    const tl = takeoffTimelineRef.current;
    if (phase !== 'revealed' || !tl || !priceContentRef.current) return;
    // The new offer mounts hidden. Resume only after that React commit;
    // no independent timeout can expose the price before smoke coverage.
    tl.to(priceContentRef.current, { opacity: 1, duration: 0.85, ease: 'sine.inOut' }, 'uncover+=0.18');
    tl.play('uncover');
  }, [phase, priceContentRef]);

  const landingPuffCount = 10;

  const nozzleY = targetCoords.y + nozzleOffset;

  return (
    <>
    <div
      className="rocket-smoke-viewport-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 2045, // Under rocket (2050) but above modal card (2010)
      }}
      aria-hidden="true"
    >
      {/* Landing Smoke Cluster */}
      <div
        ref={landingRef}
        className="landing-smoke-cluster"
        style={{
          position: 'absolute',
          left: `${targetCoords.x}px`,
          top: `${nozzleY}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Soft horizontal dust disc shockwave */}
        <div
          className="landing-ground-disc"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '68px',
            height: '24px',
            marginLeft: '-34px',
            marginTop: '-12px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255, 255, 255, 0.75) 0%, rgba(203, 213, 225, 0.4) 45%, transparent 75%)',
            filter: 'blur(4px)',
            opacity: 0,
            transform: 'scale(0.2)',
          }}
        />

        {Array.from({ length: landingPuffCount }).map((_, i) => (
          <div
            key={`landing-puff-${i}`}
            className="landing-smoke-puff"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '36px',
              height: '28px',
              marginLeft: '-18px',
              marginTop: '-14px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.92) 0%, rgba(226, 232, 240, 0.6) 45%, rgba(148, 163, 184, 0.2) 70%, transparent 85%)',
              filter: 'blur(5px) drop-shadow(0 0 5px rgba(255, 255, 255, 0.4))',
              opacity: 0,
              transform: 'scale(0.25)',
            }}
          />
        ))}
      </div>

    {priceHost && (
      <div
        ref={takeoffRef}
        className="takeoff-smoke-cluster"
        aria-hidden="true"
        style={{ position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none' }}
      >
        {TAKEOFF_PUFFS.map((puff, i) => (
          <div
            key={`takeoff-puff-${i}`}
            className="takeoff-smoke-puff"
            style={{
              position: 'absolute',
              left: `${puff.x * 100}%`,
              top: `${puff.y * 100}%`,
              width: `${48 * puff.size}%`, height: `${112 * puff.size}%`, borderRadius: '46% 54% 58% 42%',
              background: 'radial-gradient(ellipse, rgba(220, 228, 236, 0.9) 0%, rgba(196, 210, 224, 0.58) 38%, rgba(178, 196, 214, 0.14) 62%, transparent 74%)',
              opacity: 0,
            }}
          />
        ))}
      </div>
    )}
    </div>
    </>
  );
};



