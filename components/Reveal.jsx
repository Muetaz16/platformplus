'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal wrapper. Adds `.in-view` once the element enters the viewport.
 * `delay` maps to the .d1–.d5 stagger classes in globals.css.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const delayClass = delay ? ` d${delay}` : '';
  return (
    <Tag
      ref={ref}
      className={`reveal${delayClass}${shown ? ' in-view' : ''} ${className}`.trim()}
      style={style}
    >
      {children}
    </Tag>
  );
}
