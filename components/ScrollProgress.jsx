'use client';

import { useEffect, useRef } from 'react';
import { portfolio } from '@/data/portfolio';

/**
 * ScrollProgress: garis tipis bergradien di tepi paling atas layar yang
 * memanjang seiring pengunjung menggulir halaman.
 *
 * Ditulis langsung ke gaya elemen lewat requestAnimationFrame, jadi tidak ada
 * re-render React sama sekali saat menggulir.
 *
 * Matikan lewat appearance.scrollProgress di data/portfolio.js.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);
  const enabled = portfolio.appearance?.scrollProgress !== false;

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const bar = barRef.current;
      if (!bar) return;

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;

      bar.style.transform = `scaleX(${ratio})`;
      bar.style.opacity = ratio > 0.005 ? '1' : '0';
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="scroll-progress"
      style={{ transform: 'scaleX(0)', opacity: 0, transition: 'opacity 0.3s ease' }}
    />
  );
}
