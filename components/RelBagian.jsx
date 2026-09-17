'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';

/**
 * RelBagian: deretan garis kecil di tepi kiri layar lebar yang menunjukkan
 * posisi pembaca di dalam halaman.
 *
 * Kenapa ada, padahal sudah ada navbar: navbar menyorot bagian yang sedang
 * dibaca, tetapi tidak memperlihatkan halaman ini panjangnya berapa bagian dan
 * sudah sampai mana. Rel ini menjawab itu dalam sekali pandang, tanpa meminta
 * tempat: lebarnya cuma 2,6 rem dan namanya baru muncul saat kursor mendekat.
 *
 * Hanya muncul di layar 1280 piksel ke atas, tempat ruang kosong di tepi
 * memang ada. Di bawah itu tidak dirender sama sekali, dan navigasinya tetap
 * lewat navbar seperti biasa. Matikan lewat panel, Sentuhan Interaktif.
 */
export default function RelBagian() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [aktif, setAktif] = useState('');

  const aktifkan = portfolio.appearance?.sectionRail !== false;
  const isHome = pathname === '/' || pathname === '';
  const items = (portfolio.nav ?? []).filter((item) => item.type !== 'page');

  useEffect(() => {
    if (!aktifkan || !isHome || typeof IntersectionObserver === 'undefined') return undefined;

    const bagian = items.map((item) => document.getElementById(item.id)).filter(Boolean);
    if (bagian.length === 0) return undefined;

    // Ambang yang sama dengan navbar, supaya keduanya tidak pernah menyorot
    // bagian yang berbeda pada saat yang sama.
    const pengamat = new IntersectionObserver(
      (entri) => {
        const terlihat = entri
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (terlihat) setAktif(terlihat.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    bagian.forEach((el) => pengamat.observe(el));
    return () => pengamat.disconnect();
  }, [aktifkan, isHome, items]);

  if (!aktifkan || !isHome || items.length < 3) return null;

  return (
    <nav
      data-print="hide"
      aria-label={t(portfolio.ui.sectionRailLabel)}
      className="rel-bagian"
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className="rel-titik"
          aria-current={aktif === item.id ? 'true' : undefined}
        >
          <span aria-hidden="true" className="rel-tanda" />
          <span className="rel-nama">{t(item.label)}</span>
        </a>
      ))}
    </nav>
  );
}
