'use client';

import { useState } from 'react';
import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';

/**
 * Judul section standar: label kecil di atas, judul besar, lalu subjudul.
 * Semua teksnya diambil dari portfolio.sections di data/portfolio.js.
 *
 * -----------------------------------------------------------------------------
 * TAUTAN SALIN
 * -----------------------------------------------------------------------------
 * Kalau `id` diisi, ikon rantai kecil muncul saat kursor lewat di atas judul.
 * Diklik, alamat lengkap ke bagian itu tersalin ke papan klip, jadi kamu bisa
 * mengirim tautan yang langsung mendarat di bagian Proyek, misalnya.
 *
 * Ikonnya sengaja tidak terlihat sampai kursor mendekat, supaya tidak menambah
 * keramaian pada judul. Di layar sentuh yang tidak punya kursor, ikonnya selalu
 * terlihat samar, karena kalau tidak dia tidak akan pernah bisa ditemukan.
 *
 * Bisa dimatikan lewat panel, Pengaturan Situs > Nama Situs dan SEO >
 * Tautan salin di judul bagian.
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', id }) {
  const { t } = useLanguage();
  const [tersalin, setTersalin] = useState(false);

  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';
  const aktif = Boolean(id) && portfolio.appearance?.sectionAnchor !== false;

  const salin = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}#${id}`);
      setTersalin(true);
      setTimeout(() => setTersalin(false), 1600);
    } catch {
      // Papan klip diblokir peramban. Alamatnya tetap bisa disalin manual
      // dari bilah alamat, jadi tidak perlu diributkan.
    }
  };

  return (
    <Reveal className={`flex flex-col gap-3 ${alignment} max-w-2xl`}>
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          <span aria-hidden="true" className="h-px w-6 bg-accent/60" />
          {eyebrow}
        </span>
      ) : null}

      <h2 className="group flex items-center gap-2.5 text-[2.1rem] font-bold leading-[1.12] text-fg sm:text-[2.6rem]">
        <span>{title}</span>

        {aktif ? (
          <button
            type="button"
            onClick={salin}
            aria-label={`${t(portfolio.ui.sectionCopyLink)}: ${title}`}
            title={tersalin ? t(portfolio.ui.copied) : t(portfolio.ui.sectionCopyLink)}
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-subtle transition-all duration-300 hover:border-line-strong hover:text-accent focus-visible:opacity-100 ${
              tersalin ? 'opacity-100 text-accent' : 'opacity-0 group-hover:opacity-100'
            } max-[1024px]:opacity-40`}
          >
            <Icon name={tersalin ? 'check' : 'copy'} className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </h2>

      {subtitle ? <p className="max-w-xl text-[1.0625rem] leading-relaxed text-subtle">{subtitle}</p> : null}
    </Reveal>
  );
}
