'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import { withBasePath } from '@/lib/asset';
import Icon from '@/components/Icon';

/**
 * LightboxProvider: satu lapisan tampilan gambar besar untuk seluruh situs.
 *
 * Komponen mana pun bisa memanggilnya:
 *
 *   const { openLightbox } = useLightbox();
 *   openLightbox({ src: '/images/foto.jpg', alt: 'Keterangan', caption: 'Judul' });
 *
 * Ditutup dengan tombol Escape, klik di luar gambar, atau tombol silang.
 * Fokus keyboard dikembalikan ke elemen yang membukanya, dan halaman di
 * belakangnya dikunci selama lightbox terbuka.
 *
 * Matikan seluruh fiturnya lewat appearance.lightbox di data/portfolio.js.
 */
const LightboxContext = createContext(null);

export function LightboxProvider({ children }) {
  const { t } = useLanguage();
  const [item, setItem] = useState(null);
  const closeButtonRef = useRef(null);
  const openerRef = useRef(null);

  const enabled = portfolio.appearance?.lightbox !== false;

  const openLightbox = useCallback(
    (next) => {
      if (!enabled || !next?.src) return;
      openerRef.current = document.activeElement;
      setItem(next);
    },
    [enabled]
  );

  const closeLightbox = useCallback(() => {
    setItem(null);
    // Kembalikan fokus ke gambar yang tadi diklik supaya alur keyboard tidak putus.
    if (openerRef.current instanceof HTMLElement) openerRef.current.focus();
  }, []);

  // Kunci gulir halaman, tutup dengan Escape, dan pindahkan fokus ke tombol tutup.
  useEffect(() => {
    if (!item) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [item, closeLightbox]);

  const value = useMemo(() => ({ openLightbox, closeLightbox, enabled }), [openLightbox, closeLightbox, enabled]);

  return (
    <LightboxContext.Provider value={value}>
      {children}

      {item ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t(item.caption) || t(item.alt) || 'Gambar'}
          data-print="hide"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8"
          style={{ animation: 'fade-in 0.25s ease-out' }}
        >
          {/* Latar peredup. Diklik untuk menutup. */}
          <button
            type="button"
            aria-label={t(portfolio.ui.lightboxClose)}
            onClick={closeLightbox}
            className="absolute inset-0 cursor-zoom-out bg-black/80 backdrop-blur-md"
          />

          <figure
            className="relative z-10 flex max-h-full w-full max-w-4xl flex-col"
            style={{ animation: 'lightbox-in 0.35s cubic-bezier(0.22, 1, 0.36, 1)' }}
          >
            {/* Tanpa w-full supaya bingkainya memeluk gambar, bukan memeluk
                kotak kosong di kiri dan kanan gambar. */}
            <img
              src={withBasePath(item.src)}
              alt={t(item.alt)}
              className="mx-auto max-h-[78svh] max-w-full rounded-2xl border border-white/15 object-contain shadow-2xl"
            />

            {t(item.caption) ? (
              <figcaption className="mt-4 text-center text-sm text-slate-200">
                {t(item.caption)}
              </figcaption>
            ) : null}
          </figure>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeLightbox}
            aria-label={t(portfolio.ui.lightboxClose)}
            className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </LightboxContext.Provider>
  );
}

/**
 * Hook pembaca konteks. Aman dipanggil di mana saja: kalau provider-nya tidak
 * ada, hook ini mengembalikan fungsi kosong sehingga komponen tetap jalan.
 */
export function useLightbox() {
  return (
    useContext(LightboxContext) ?? {
      openLightbox: () => {},
      closeLightbox: () => {},
      enabled: false,
    }
  );
}

export default LightboxProvider;
