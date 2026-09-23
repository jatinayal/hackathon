import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

import { RocketSvg } from './RocketSvg';
import { RocketSmokeFx } from './RocketSmokeFx';
import { sounds } from '../../utils/soundEffects';



// Another 30% faster for the entrance and reverse landing. Takeoff timing is
// deliberately separate because it coordinates the existing smoke reveal.
const FLIGHT_SPEED = 1.2 * 1.25 * 1.3;

// The ellipse is defined ONLY in viewport coordinates. The dock is used
// exclusively by the exit connector and the straight landing sequence.
function flightGeometry(width, height, dock) {
  const mobile = width < 768;
  const center = { x: width * (mobile ? 0.52 : 0.69), y: height * 0.49 };
  const rx = width * (mobile ? 0.64 : 0.255);
  const ry = height * (mobile ? 0.43 : 0.41);
  const entryAngle = Math.PI * 11 / 9;
  // Leave enough lateral room for a broad return, even on narrow screens.
  const exitCosine = gsap.utils.clamp(0.25, 0.78, (dock.x + Math.max(60, width * 0.10) - center.x) / rx);
  const exitAngle = Math.PI * 2 + Math.acos(exitCosine);
  const ellipse = angle => ({
    point: { x: center.x + rx * Math.cos(angle), y: center.y + ry * Math.sin(angle) },
    tangent: { x: -rx * Math.sin(angle), y: ry * Math.cos(angle) },
    acceleration: { x: -rx * Math.cos(angle), y: -ry * Math.sin(angle) },
  });
  // At entry the 92px-tall asset points right. Clear its full longest
  // dimension plus a margin before following the existing entry connector.
  const start = { x: -(92 + 24), y: height * 0.74 };
  const entry = ellipse(entryAngle);
  const exit = ellipse(exitAngle);
  const approachY = dock.y + 24;
  const approach = { x: dock.x, y: approachY };

  const add = (a, b, scale = 1) => ({ x: a.x + b.x * scale, y: a.y + b.y * scale });
  const boundary = (sample, speed) => {
    const rate = speed / Math.hypot(sample.tangent.x, sample.tangent.y);
    return {
      velocity: { x: sample.tangent.x * rate, y: sample.tangent.y * rate },
      acceleration: { x: sample.acceleration.x * rate * rate, y: sample.acceleration.y * rate * rate },
    };
  };
  // Quintic Hermite connectors match the ellipse's tangent AND curvature.
  // Their straight endpoints have zero curvature, avoiding a rotation kink
  // at offscreen entry or where the upright overshoot begins.
  const transition = (from, to, v0, v1, a0, a1) => {
    const p1 = add(from, v0, 1 / 5);
    const p4 = add(to, v1, -1 / 5);
    const points = [from, p1, add(add(p1, v0, 1 / 5), a0, 1 / 20),
      add(add(p4, v1, -1 / 5), a1, 1 / 20), p4, to];
    const derivatives = points.slice(1).map((p, i) => ({ x: 5 * (p.x - points[i].x), y: 5 * (p.y - points[i].y) }));
    const evaluate = (controls, t) => {
      let row = controls;
      while (row.length > 1) row = row.slice(1).map((p, i) => ({
        x: row[i].x * (1 - t) + p.x * t,
        y: row[i].y * (1 - t) + p.y * t,
      }));
      return row[0];
    };
    let commands = '';
    const steps = 12;
    for (let i = 0; i < steps; i++) {
      const t0 = i / steps, t1 = (i + 1) / steps;
      const p0 = evaluate(points, t0), p3 = evaluate(points, t1);
      const c1 = add(p0, evaluate(derivatives, t0), 1 / (3 * steps));
      const c2 = add(p3, evaluate(derivatives, t1), -1 / (3 * steps));
      commands += ` C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p3.x} ${p3.y}`;
    }
    return commands;
  };
  const zero = { x: 0, y: 0 };
  const entrySpeed = Math.hypot(entry.point.x - start.x, entry.point.y - start.y);
  const entering = boundary(entry, entrySpeed);
  let path = `M ${start.x} ${start.y}`;
  path += transition(start, entry.point, { x: entrySpeed, y: 0 }, entering.velocity, zero, entering.acceleration);
  // The SVG is a geometry guide only; the timeline interpolates cached samples.
  const arcCount = Math.ceil((exitAngle - entryAngle) / (Math.PI / 4));
  for (let i = 1; i <= arcCount; i++) {
    const point = ellipse(entryAngle + (exitAngle - entryAngle) * i / arcCount).point;
    path += ` A ${rx} ${ry} 0 0 1 ${point.x} ${point.y}`;
  }
  const exitSpeed = Math.max(80, Math.hypot(exit.point.x - dock.x, exit.point.y - approachY) * 1.2);
  const leaving = boundary(exit, exitSpeed);
  path += transition(exit.point, approach, leaving.velocity, { x: 0, y: -exitSpeed * 0.8 }, leaving.acceleration, zero);
  const overshootHeight = Math.min(280, Math.max(96, height * 0.28), Math.max(24, dock.y - 48));
  return { path, start, entryPoint: entry.point, approachY, overshootY: dock.y - overshootHeight, scale: mobile ? 0.75 : 0.95 };
}
// Sample geometry once, then ease a scalar progress value instead of attaching
// the rocket directly to the SVG. No layout/path reads occur on animation frames.
function flightGuide(path, dockX, approachY) {
  const length = path.getTotalLength();
  const count = 600;
  const samples = Array.from({ length: count + 1 }, (_, i) => {
    const p = path.getPointAtLength(length * i / count);
    return { x: p.x, y: p.y };
  });
  samples[count] = { x: dockX, y: approachY };
  const angles = samples.map((p, i) => {
    const before = samples[Math.max(0, i - 2)];
    const after = samples[Math.min(count, i + 2)];
    return Math.atan2(after.y - before.y, after.x - before.x) * 180 / Math.PI + 90;
  });
  for (let i = 1; i <= count; i++) {
    angles[i] = angles[i - 1] + ((angles[i] - angles[i - 1] + 540) % 360) - 180;
  }
  const upright = Math.round(angles[count] / 360) * 360;
  samples.forEach((p, i) => {
    const before = samples[Math.max(0, i - 1)];
    const after = samples[Math.min(count, i + 1)];
    const divisor = i === 0 || i === count ? 1 : 2;
    p.dx = (after.x - before.x) / divisor;
    p.dy = (after.y - before.y) / divisor;
    // A small, distance-based heading lag adds follow-through without frame-
    // rate dependent springs, wobble, or an orientation snap at the endpoint.
    let heading = 0;
    for (let j = -6; j <= 2; j++) heading += angles[Math.max(0, Math.min(count, i + j))];
    heading /= 9;
    const t = gsap.utils.clamp(0, 1, (i / count - 0.90) / 0.10);
    const settle = t * t * t * (10 - 15 * t + 6 * t * t);
    p.rotation = heading + (upright - heading) * settle;
  });
  return { length, samples, count };
}
// Retard only the entry clock. Once the connector ends, this is the original
// flight clock plus a constant delay, so orbit and docking speeds stay intact.
const orbitEase = t => t - 0.075 * Math.sin(Math.PI * t) / Math.PI - 0.275 * Math.sin(2 * Math.PI * t) / (2 * Math.PI);
function entryTiming(duration, guide, entryPoint) {
  let nearest = 0;
  let distance = Infinity;
  guide.samples.forEach((p, i) => {
    const d = Math.hypot(p.x - entryPoint.x, p.y - entryPoint.y);
    if (d < distance) { distance = d; nearest = i; }
  });
  const invert = (fn, value) => {
    let low = 0, high = 1;
    for (let i = 0; i < 24; i++) {
      const mid = (low + high) / 2;
      if (fn(mid) < value) low = mid; else high = mid;
    }
    return (low + high) / 2;
  };
  const join = invert(orbitEase, nearest / guide.count);
  const extra = 0.55;
  const total = duration + extra;
  const clock = t => duration * t + extra * (1 - Math.pow(1 - Math.min(1, t / join), 3));
  const samples = Array.from({ length: 1001 }, (_, i) => orbitEase(invert(clock, total * i / 1000)));
  samples[0] = 0;
  samples[1000] = 1;
  return { duration: total, ease: t => {
    const index = t * 1000;
    const i = Math.min(999, Math.floor(index));
    return samples[i] + (samples[i + 1] - samples[i]) * (index - i);
  } };
}
export const RocketMotionLayer = ({ phase, targetDockRef, priceAreaRef, priceContentRef, onSmokeCovered, onLaunchComplete, onLanded, onLaunchRocket, thrustLevel = 'cruising' }) => {
  const canvasRef = useRef(null);
  const rearCanvasRef = useRef(null);
  const flightLayerRef = useRef(null);
  const foregroundRef = useRef(false);
  const [flightHost, setFlightHost] = useState(null);
  useEffect(() => {
    // Reopening after reveal restores the anchor on the entering render.
    // A one-time lookup can run before that anchor exists.
    if (phase === 'entering') {
      setFlightHost(targetDockRef.current?.closest('.rocket-modal-overlay') || null);
    }
  }, [phase, targetDockRef]);
  const rocketWrapRef = useRef(null);
  const motionPathRef = useRef(null);
  const timelineRef = useRef(null);
  const driverRef = useRef(null);
  const startFrameRef = useRef(null);
  const boundsKeyRef = useRef('');
  const stopFlight = useCallback(() => {
    cancelAnimationFrame(startFrameRef.current);
    startFrameRef.current = null;
    timelineRef.current?.kill();
    timelineRef.current?.clear();
    timelineRef.current = null;
    if (driverRef.current) gsap.killTweensOf(driverRef.current);
    driverRef.current = null;
    if (rocketWrapRef.current) gsap.killTweensOf(rocketWrapRef.current);
    if (flightLayerRef.current) gsap.killTweensOf(flightLayerRef.current);
  }, []);
  const trailRef = useRef([]);
  const emittingRef = useRef(false);
  const phaseRef = useRef(phase);

  const onLandedRef = useRef(onLanded);

  const onLaunchRef = useRef(onLaunchRocket);
  const onLaunchCompleteRef = useRef(onLaunchComplete);

  useLayoutEffect(() => {
    phaseRef.current = phase;
    onLandedRef.current = onLanded;
    onLaunchRef.current = onLaunchRocket;
    onLaunchCompleteRef.current = onLaunchComplete;
  }, [phase, onLanded, onLaunchRocket, onLaunchComplete]);
  const [smokeTrigger, setSmokeTrigger] = useState(null);
  const [dockCoords, setDockCoords] = useState({ x: 0, y: 0 });

  const measure = useCallback(() => {
    const anchor = targetDockRef.current;
    if (!anchor) return null;
    const rect = anchor.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const host = anchor.closest('.rocket-modal-overlay');
    // The backdrop establishes a fixed containing block. Compensate overlay
    // scrolling only on layout events, keeping the layers in viewport space.
    for (const layer of [rearCanvasRef.current, canvasRef.current, flightLayerRef.current]) {
      if (layer && host) layer.style.translate = `${host.scrollLeft}px ${host.scrollTop}px`;
    }
    return {
      dock: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      popup: anchor.closest('.rocket-modal-container').getBoundingClientRect(),
    };
  }, [targetDockRef]);

  const startEntrance = useCallback((bounds, progress = 0) => {
    const rocket = rocketWrapRef.current;
    if (!rocket || !bounds || !motionPathRef.current || !flightLayerRef.current) return;
    stopFlight();
    gsap.set(rocket, { autoAlpha: 0 });
    foregroundRef.current = false;
    gsap.set(flightLayerRef.current, { autoAlpha: 1, zIndex: 2006 });
    flightLayerRef.current.dataset.depth = 'rear';
    const { dock, popup } = bounds;
    boundsKeyRef.current = [window.innerWidth, window.innerHeight, dock.x, dock.y].join(',');
    const geometry = flightGeometry(window.innerWidth, window.innerHeight, dock);
    motionPathRef.current.setAttribute('d', geometry.path);
    setDockCoords(dock);
    setSmokeTrigger(null);
    trailRef.current = [];
    emittingRef.current = true;
    gsap.set(rocket, { x: geometry.start.x, y: geometry.start.y, rotation: 90, rotationX: 0, rotationY: 0, xPercent: 0, yPercent: 0, z: 0, skewX: 0, skewY: 0, scale: geometry.scale * 0.91, zIndex: 2050, autoAlpha: 0, force3D: true });
    const orbitDuration = (window.innerWidth < 768 ? 3 : 3.5) / FLIGHT_SPEED;
    const guide = flightGuide(motionPathRef.current, dock.x, geometry.approachY);
    const timing = entryTiming(orbitDuration, guide, geometry.entryPoint);
    // Popup bounds are an occlusion check only, never orbit control points.
    // Switch at the clearest outer point before the return crosses the card.
    let switchIndex = Math.floor(guide.count * 0.7);
    let clearance = -Infinity;
    guide.samples.forEach((point, i) => {
      if (i < guide.count * 0.45 || i > guide.count * 0.85) return;
      const gap = Math.max(point.x - popup.right, popup.left - point.x,
        point.y - popup.bottom, popup.top - point.y);
      if (gap > clearance) { clearance = gap; switchIndex = i; }
    });
    const switchProgress = switchIndex / guide.count;
    // The eased return ends at 80% of cruise; ascent starts at that same speed.
    const speed = guide.length / orbitDuration * 0.8;
    const ascentDuration = 3 * (geometry.approachY - geometry.overshootY) / speed;
    const tl = gsap.timeline({ paused: true });
    timelineRef.current = tl;
    const driver = { progress: 0 };
    driverRef.current = driver;
    const setX = gsap.quickSetter(rocket, 'x', 'px');
    const setY = gsap.quickSetter(rocket, 'y', 'px');
    const setRotation = gsap.quickSetter(rocket, 'rotation', 'deg');
    const setScaleX = gsap.quickSetter(rocket, 'scaleX');
    const setScaleY = gsap.quickSetter(rocket, 'scaleY');
    tl.to(driver, {
      progress: 1,
      duration: timing.duration,
      ease: timing.ease,
      onUpdate: () => {
        const foreground = driver.progress >= switchProgress;
        if (foreground !== foregroundRef.current) {
          foregroundRef.current = foreground;
          flightLayerRef.current.style.zIndex = foreground ? '2025' : '2006';
          flightLayerRef.current.dataset.depth = foreground ? 'front' : 'rear';
        }
        const depth = gsap.utils.clamp(0, 1, (driver.progress - switchProgress + 0.06) / 0.18);
        const blend = depth * depth * (3 - 2 * depth);
        const scale = geometry.scale * (0.91 + 0.09 * blend);
        setScaleX(scale);
        setScaleY(scale);
        const index = driver.progress * guide.count;
        const i = Math.min(guide.count - 1, Math.floor(index));
        const t = index - i;
        const a = guide.samples[i], b = guide.samples[i + 1];
        const t2 = t * t, t3 = t2 * t;
        const h0 = 2 * t3 - 3 * t2 + 1, h1 = t3 - 2 * t2 + t;
        const h2 = -2 * t3 + 3 * t2, h3 = t3 - t2;
        setX(h0 * a.x + h1 * a.dx + h2 * b.x + h3 * b.dx);
        setY(h0 * a.y + h1 * a.dy + h2 * b.y + h3 * b.dy);
        setRotation(a.rotation + (b.rotation - a.rotation) * t);
      },
    });
    // The curve ends upright. Only Y changes through ascent and reverse;
    // no rotation tween, pause, rounded endpoint, or landing correction.
    tl.to(rocket, { y: geometry.overshootY, duration: ascentDuration, ease: 'power2.out' });
    tl.call(() => { emittingRef.current = false; });
    tl.to(rocket, {
      y: dock.y,
      duration: (window.innerWidth < 768 ? 1.1 : 1.25) / FLIGHT_SPEED,
      ease: 'sine.inOut',
      onComplete: () => {
        sounds.playDock();
        setSmokeTrigger('landing');
        onLandedRef.current?.();
      },
    });
    if (progress) {
      // Render the guide callback when restoring progress after a resize.
      tl.totalProgress(progress, false);
      emittingRef.current = tl.time() < timing.duration + ascentDuration;
    }
    // Geometry, transforms and timeline are ready before revealing the node.
    // Start the paused timeline on the next frame, never on a stale GSAP clock.
    gsap.set(rocket, { autoAlpha: 1 });
    startFrameRef.current = requestAnimationFrame(() => {
      startFrameRef.current = null;
      if (timelineRef.current === tl) tl.play();
    });
  }, [stopFlight]);

  // Own every flight tween and pending frame, including close/reopen and skip.
  useLayoutEffect(() => {
    if (!flightHost) return;
    if (phase === 'entering') {
      const bounds = measure();
      if (bounds) {
        sounds.playWhoosh();
        startEntrance(bounds);
      }
    } else if (phase === 'blasting') {
      sounds.playLaunch();

      emittingRef.current = true;
      // Smoke has already covered the price area. Reveal only after exit;
      // the smoke timeline holds its coverage until the new content mounts.
      timelineRef.current = gsap.timeline().to(rocketWrapRef.current, {
        y: -140, duration: 0.8 / 1.2, ease: 'power3.in',
        onComplete: () => {
          emittingRef.current = false;
          onLaunchCompleteRef.current?.();
        },
      });
    }
    return () => {
      stopFlight();
      emittingRef.current = false;
    };
  }, [phase, measure, startEntrance, flightHost, stopFlight]);

  // Re-measure only on layout events. Preserve flight progress on resize;
  // while docked, follow the real anchor on resize/overlay scroll.
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const bounds = measure();
        if (!bounds) return;
        const { dock } = bounds;
        const key = [window.innerWidth, window.innerHeight, dock.x, dock.y].join(',');
        if (key === boundsKeyRef.current) return;
        boundsKeyRef.current = key;
        if (phaseRef.current === 'entering' && timelineRef.current) {
          startEntrance(bounds, timelineRef.current.totalProgress());
        } else if (['landed', 'countdown'].includes(phaseRef.current)) {
          setDockCoords(dock);
          gsap.set(rocketWrapRef.current, { x: dock.x, y: dock.y, scale: window.innerWidth < 768 ? 0.75 : 0.95 });
        }
      });
    };
    const observer = new ResizeObserver(update);
    const anchor = targetDockRef.current;
    if (anchor) {
      observer.observe(anchor);
      observer.observe(anchor.closest('.rocket-modal-container'));
    }
    window.addEventListener('resize', update);
    window.addEventListener('scroll', update, true);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('scroll', update, true);
    };
  }, [measure, startEntrance, targetDockRef, flightHost, phase]);

  // Bounded canvas dashes, spatially spaced and aged in seconds (not frames).
  // The loop sleeps after the final dash fades; there are no DOM particles.
  useEffect(() => {
    const canvas = canvasRef.current;
    const rearCanvas = rearCanvasRef.current;
    if (!canvas || !rearCanvas) return;
    const contexts = [rearCanvas.getContext('2d'), canvas.getContext('2d')];
    let frame;
    let last = null;
    let carry = 0;
    const render = (now) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      for (const ctx of contexts) {
        if (ctx.canvas.width !== width || ctx.canvas.height !== height) {
          ctx.canvas.width = width;
          ctx.canvas.height = height;
          last = null;
        }
        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 2;
        ctx.lineCap = 'butt';
      }
      const rocket = rocketWrapRef.current;
      if (rocket && emittingRef.current) {
        const rotation = Number(gsap.getProperty(rocket, 'rotation')) * Math.PI / 180;
        const nozzle = 40 * Number(gsap.getProperty(rocket, 'scaleX'));
        const point = { x: Number(gsap.getProperty(rocket, 'x')) - Math.sin(rotation) * nozzle, y: Number(gsap.getProperty(rocket, 'y')) + Math.cos(rotation) * nozzle };
        if (last) {
          const dx = point.x - last.x;
          const dy = point.y - last.y;
          const distance = Math.hypot(dx, dy);
          // A layout change is not a flight segment.
          if (distance > 0 && distance < 100) {
            for (let step = 16 - carry; step <= distance; step += 16) {
              trailRef.current.push({ x: last.x + dx * step / distance, y: last.y + dy * step / distance, dx: dx / distance * 5, dy: dy / distance * 5, born: now, foreground: foregroundRef.current });
            }
            carry = (carry + distance) % 16;
          } else carry = 0;
        }
        last = point;
      } else last = null;
      trailRef.current = trailRef.current.filter(dash => now - dash.born < 1600).slice(-180);
      for (const dash of trailRef.current) {
        // Dashes keep their original depth while fading.
        const ctx = contexts[dash.foreground ? 1 : 0];
        ctx.strokeStyle = `rgba(255,255,255,${0.85 * (1 - (now - dash.born) / 1600)})`;
        ctx.beginPath();
        ctx.moveTo(dash.x - dash.dx, dash.y - dash.dy);
        ctx.lineTo(dash.x + dash.dx, dash.y + dash.dy);
        ctx.stroke();
      }
      if (phase === 'entering' || phase === 'blasting' || trailRef.current.length) frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [phase, flightHost]);

  const launch = () => { if (phase === 'landed') onLaunchRef.current?.(); };
  const viewportLayer = { position: 'fixed', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' };
  return <>
    {createPortal(
      <div style={{ ...viewportLayer, overflow: 'hidden', zIndex: 2040 }}>
      <RocketSmokeFx
        trigger={['countdown', 'blasting', 'revealed'].includes(phase) ? 'takeoff' : smokeTrigger}
        phase={phase} priceAreaRef={priceAreaRef} priceContentRef={priceContentRef}
        onCovered={onSmokeCovered}
        targetCoords={dockCoords} nozzleOffset={40 * (window.innerWidth < 768 ? 0.75 : 0.95)}
      />
      </div>, document.body,
    )}
    {flightHost && createPortal(<>
      <svg aria-hidden="true" style={{ position: 'fixed', width: '100%', height: '100%', visibility: 'hidden', pointerEvents: 'none' }}>
        <path ref={motionPathRef} fill="none" />
      </svg>
      <canvas ref={rearCanvasRef} aria-hidden="true" data-trail-depth="rear" className="rocket-full-viewport-canvas" style={{ ...viewportLayer, zIndex: 2005 }} />
      <canvas ref={canvasRef} aria-hidden="true" data-trail-depth="front" className="rocket-full-viewport-canvas" style={{ ...viewportLayer, zIndex: 2020 }} />
      <div ref={flightLayerRef} data-rocket-flight-layer style={{ ...viewportLayer, overflow: 'hidden', zIndex: 2006 }}>
      {phase !== 'revealed' && (
        <div ref={rocketWrapRef}
          className={`rocket-viewport-element ${phase === 'landed' ? 'is-clickable' : ''}`}
          onClick={launch}
          onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); launch(); } }}
          role={phase === 'landed' ? 'button' : undefined} tabIndex={phase === 'landed' ? 0 : -1}
          aria-label={phase === 'landed' ? 'Click rocket to unlock offer' : 'STRIKE rocket'}
          style={{ position: 'absolute', top: 0, left: 0, width: 54, height: 92, marginLeft: -27, marginTop: -46, zIndex: 2050, visibility: 'hidden', opacity: 0, pointerEvents: phase === 'landed' ? 'auto' : 'none', transformOrigin: 'center center', outline: 'none' }}>
          <RocketSvg thrustLevel={thrustLevel} width={54} height={92} />
          {phase === 'landed' && <div className="rocket-minimal-glow-ring" aria-hidden="true" />}
        </div>
      )}
      </div>
    </>, flightHost)}
  </>;
};










