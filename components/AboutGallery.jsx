'use client';

import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import { useLightbox } from '@/components/LightboxProvider';
import SmartImage from '@/components/SmartImage';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';

/**
 * AboutGallery: strip gambar di bawah ringkasan Tentang Saya.
 *
 * Isinya diambil dari profile.gallery di data/portfolio.js. Kosongkan array
 * itu dan strip ini hilang sendiri. Gambar bisa diklik untuk dibuka besar.
 */
export default function AboutGallery() {
  const { t } = useLanguage();
  const { openLightbox, enabled: lightboxEnabled } = useLightbox();
  const { profile, ui } = portfolio;

  const items = profile.gallery ?? [];
  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <Reveal className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-subtle">
          {t(ui.galleryTitle)}
        </h3>
        {lightboxEnabled ? (
          <p className="text-xs text-subtle">{t(ui.galleryHint)}</p>
        ) : null}
      </Reveal>

      <ul className="mt-5 grid gap-4 sm:grid-cols-3">
        {items.map((item, index) => {
          const alt = t(item.alt) || t(item.caption);

          const media = (
            <>
              <SmartImage
                src={item.src}
                alt={alt}
                width={640}
                height={640}
                className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              />

              {/* Peredup dan keterangan yang muncul dari bawah saat disentuh kursor. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100"
              />

              <span className="pointer-events-none absolute inset-x-4 bottom-4 flex items-end justify-between gap-2">
                <span className="text-sm font-semibold leading-snug text-white drop-shadow">
                  {t(item.caption)}
                </span>
                {lightboxEnabled ? (
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/25 bg-white/15 text-white opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                    <Icon name="image" className="h-4 w-4" />
                  </span>
                ) : null}
              </span>
            </>
          );

          return (
            <Reveal as="li" key={item.src} delay={Math.min(index * 90, 270)}>
              {lightboxEnabled ? (
                <button
                  type="button"
                  onClick={() => openLightbox({ src: item.src, alt: item.alt, caption: item.caption })}
                  aria-label={`${t(ui.imageZoom)}: ${t(item.caption)}`}
                  className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-line"
                >
                  {media}
                </button>
              ) : (
                <div className="group relative block w-full overflow-hidden rounded-2xl border border-line">
                  {media}
                </div>
              )}
            </Reveal>
          );
        })}
      </ul>
    </div>
  );
}
