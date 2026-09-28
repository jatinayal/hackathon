import React, { useEffect, useRef } from 'react';
import { Wrench } from 'lucide-react';

export const FloatingToolButton = () => {
  const buttonRef = useRef(null);
  const suppressClick = useRef(false);

  useEffect(() => {
    const button = buttonRef.current;
    let drag = null;
    let position = null;
    let frame = null;
    let previousSelection = null;
    let size = { width: button.offsetWidth, height: button.offsetHeight };
    const viewport = () => {
      const view = window.visualViewport;
      return { left: view?.offsetLeft || 0, top: view?.offsetTop || 0,
        width: view?.width || window.innerWidth, height: view?.height || window.innerHeight };
    };
    const clamp = point => {
      const view = viewport();
      // Reserve room for the existing hover scale/rotation at every edge.
      const margin = 8;
      const minX = view.left + margin, minY = view.top + margin;
      return {
        x: Math.max(minX, Math.min(point.x, view.left + view.width - size.width - margin)),
        y: Math.max(minY, Math.min(point.y, view.top + view.height - size.height - margin)),
      };
    };
    const render = () => {
      frame = null;
      if (!position) return;
      position = clamp(position);
      button.style.translate = `${position.x}px ${position.y}px`;
    };
    const schedule = () => { if (frame === null) frame = requestAnimationFrame(render); };
    const restoreSelection = () => {
      if (previousSelection !== null) document.documentElement.style.userSelect = previousSelection;
      previousSelection = null;
      delete button.dataset.dragging;
    };
    const down = event => {
      if (!event.isPrimary || event.button !== 0 || drag) return;
      suppressClick.current = false;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY,
        lastX: event.clientX, lastY: event.clientY,
        origin: position ? { ...position } : { x: button.offsetLeft, y: button.offsetTop }, moved: false };
      button.setPointerCapture(event.pointerId);
    };
    const move = event => {
      if (!drag || event.pointerId !== drag.id) return;
      drag.lastX = event.clientX;
      drag.lastY = event.clientY;
      const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
      if (!drag.moved && Math.hypot(dx, dy) < 6) return;
      if (!drag.moved) {
        drag.moved = true;
        suppressClick.current = true;
        previousSelection = document.documentElement.style.userSelect;
        document.documentElement.style.userSelect = 'none';
        button.dataset.dragging = 'true';
        // Keep responsive CSS placement until the first actual drag.
        Object.assign(button.style, { left: '0px', top: '0px', right: 'auto', bottom: 'auto' });
      }
      event.preventDefault();
      position = { x: drag.origin.x + dx, y: drag.origin.y + dy };
      schedule();
    };
    const finish = event => {
      if (!drag || event.pointerId !== drag.id) return;
      const id = drag.id;
      drag = null;
      if (frame !== null) cancelAnimationFrame(frame);
      render();
      restoreSelection();
      if (button.hasPointerCapture(id)) button.releasePointerCapture(id);
    };
    const resize = () => {
      size = { width: button.offsetWidth, height: button.offsetHeight };
      if (position) {
        position = clamp(position);
        // Rebase an in-progress drag after viewport/orientation changes.
        if (drag) { drag.origin = { ...position }; drag.x = drag.lastX; drag.y = drag.lastY; }
        schedule();
      } else {
        const initial = { x: button.offsetLeft, y: button.offsetTop };
        const bounded = clamp(initial);
        if (bounded.x !== initial.x || bounded.y !== initial.y) {
          position = bounded;
          Object.assign(button.style, { left: '0px', top: '0px', right: 'auto', bottom: 'auto' });
          schedule();
        }
      }
    };
    button.addEventListener('pointerdown', down);
    button.addEventListener('pointermove', move);
    for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) button.addEventListener(type, finish);
    window.addEventListener('resize', resize);
    window.visualViewport?.addEventListener('resize', resize);
    window.visualViewport?.addEventListener('scroll', resize);
    resize();
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      restoreSelection();
      if (drag && button.hasPointerCapture(drag.id)) button.releasePointerCapture(drag.id);
      button.removeEventListener('pointerdown', down);
      button.removeEventListener('pointermove', move);
      for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) button.removeEventListener(type, finish);
      window.removeEventListener('resize', resize);
      window.visualViewport?.removeEventListener('resize', resize);
      window.visualViewport?.removeEventListener('scroll', resize);
    };
  }, []);

  return (
    <button ref={buttonRef} type="button" className="floating-tool-btn"
      title="Strike Settings & Tools" aria-label="Settings and Tools"
      onClick={event => {
        if (suppressClick.current && event.detail !== 0) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }}>
      <Wrench size={20} />
    </button>
  );
};
