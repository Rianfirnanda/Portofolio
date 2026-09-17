'use client';

import { useEffect, useRef, useState } from 'react';
import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';

/**
 * Judul section standar: label kecil di atas, judul besar, lalu subjudul.
 * Semua teksnya diambil dari portfolio.sections, yang kamu isi lewat panel.
 *
 * Kalau `id` diberikan, muncul tombol kecil di samping judul untuk menyalin
 * tautan langsung ke bagian itu. Berguna saat seseorang ingin mengirimkan
 * bagian tertentu, misalnya daftar sertifikasi, tanpa menyuruh penerimanya
 * menggulir sendiri. Dimatikan lewat panel, Sentuhan Interaktif.
 */
export default function SectionHeading({ id, eyebrow, title, subtitle, align = 'left' }) {
  const { t } = useLanguage();
  const [tersalin, setTersalin] = useState(false);
  const jamRef = useRef(null);
  const jangkarAktif = Boolean(id) && portfolio.appearance?.headingAnchor !== false;

  // Penanda "tersalin" kembali sendiri setelah 1,8 detik. Jamnya dibatalkan
  // saat komponen dilepas, supaya tidak ada perubahan state pada komponen yang
  // sudah tidak ada, misalnya ketika pengunjung pindah halaman tepat setelah
  // menekan tombolnya.
  useEffect(() => () => clearTimeout(jamRef.current), []);

  const alignment =
    align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  const salinTautan = async () => {
    const alamat = `${window.location.origin}${window.location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(alamat);
    } catch {
      return;
    }
    setTersalin(true);
    clearTimeout(jamRef.current);
    jamRef.current = setTimeout(() => setTersalin(false), 1800);
  };

  return (
    <Reveal className={`kepala-bagian flex flex-col gap-3 ${alignment} max-w-2xl`}>
      {eyebrow ? (
        <span className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-accent">
          <span
            aria-hidden="true"
            className="h-px w-7 bg-linear-to-r from-accent-1 to-accent-2 opacity-70"
          />
          {eyebrow}
        </span>
      ) : null}

      <h2 className="judul-bagian font-bold text-fg">
        {title}
        {jangkarAktif ? (
          <button
            type="button"
            onClick={salinTautan}
            aria-label={`${t(portfolio.ui.copySectionLink)}: ${title}`}
            title={tersalin ? t(portfolio.ui.copied) : t(portfolio.ui.copySectionLink)}
            className="jangkar-judul align-middle"
          >
            <Icon name={tersalin ? 'check' : 'link'} className="h-4 w-4" />
          </button>
        ) : null}
      </h2>

      {subtitle ? (
        <p className="max-w-xl text-[1.0625rem] leading-relaxed text-subtle">{subtitle}</p>
      ) : null}
    </Reveal>
  );
}
