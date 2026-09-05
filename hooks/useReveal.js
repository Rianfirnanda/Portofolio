'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal ringan dengan IntersectionObserver (tanpa library animasi).
 *
 * Pemakaian:
 *   const { ref, revealed } = useReveal();
 *   <div ref={ref} className={revealed ? 'reveal is-visible' : 'reveal'}>...</div>
 *
 * Catatan aksesibilitas: kalau pengguna mengaktifkan "reduce motion", elemen
 * langsung ditandai terlihat sehingga tidak ada animasi sama sekali.
 *
 * @param {{ threshold?: number, rootMargin?: string, once?: boolean }} options
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -10% 0px', once = true } = {}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Hormati preferensi sistem: tanpa animasi, langsung tampil.
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setRevealed(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, revealed };
}

export default useReveal;
