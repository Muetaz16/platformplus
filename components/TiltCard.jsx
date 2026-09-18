'use client';

import { useRef } from 'react';

/**
 * Pointer-driven 3D tilt with a moving specular glare.
 * Respects reduced-motion (guards on matchMedia). Pure transform, no deps.
 */
export default function TiltCard({ children, className = '', max = 9, style }) {
  const ref = useRef(null);
  const raf = useRef(0);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max;
    const ry = (px - 0.5) * max;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transform = '';
  };

  return (
    <div
      ref={ref}
      className={`tilt ${className}`.trim()}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <span className="tilt-glare" aria-hidden />
      <div className="tilt-inner">{children}</div>
    </div>
  );
}
