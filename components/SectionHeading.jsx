'use client';

import { useState } from 'react';
import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import { nomorBagian } from '@/lib/urutan-bagian';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';

/**
 * Judul section standar. Semua teksnya diambil dari portfolio.sections di
 * data/portfolio.js, jadi bisa diganti lewat panel.
 *
 * -----------------------------------------------------------------------------
 * SUSUNANNYA
 * -----------------------------------------------------------------------------
 *
 *   02  PENGALAMAN ─────────────────────────────────────────
 *   Tempat saya belajar
 *   Keterangan pendek satu sampai dua baris.
 *
 * Baris pertama itu sengaja dibuat seperti kepala bab: nomor, label kecil,
 * lalu garis rambut yang memanjang mengisi sisa lebar. Garis itu yang
 * mengerjakan sebagian besar pekerjaan. Tanpa dia, tiap bagian cuma tumpukan
 * teks yang makin ke bawah makin sulit dibedakan; dengan dia, mata langsung
 * tahu satu babak selesai dan babak berikutnya dimulai.
 *
 * Judul besarnya memakai huruf berkait. Itu satu satunya tempat di halaman
 * ini, selain nama di sampul, yang memakainya. Dipakai hemat begitu, huruf
 * berkait terbaca sebagai hierarki. Dipakai di mana mana, dia cuma jadi
 * dekorasi.
 *
 * Nomornya dihitung otomatis dari bagian mana saja yang punya isi, lihat
 * lib/urutan-bagian.js.
 *
 * -----------------------------------------------------------------------------
 * TAUTAN SALIN
 * -----------------------------------------------------------------------------
 * Kalau `id` diisi, ikon rantai kecil muncul saat kursor lewat di atas judul.
 * Diklik, alamat lengkap ke bagian itu tersalin ke papan klip, jadi kamu bisa
 * mengirim tautan yang langsung mendarat di bagian Proyek, misalnya.
 *
 * Di layar sentuh yang tidak punya kursor, ikonnya selalu terlihat samar,
 * karena kalau tidak dia tidak akan pernah bisa ditemukan.
 *
 * Bisa dimatikan lewat panel, Pengaturan Situs > Nama Situs dan SEO >
 * Tautan salin di judul bagian.
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', id }) {
  const { t } = useLanguage();
  const [tersalin, setTersalin] = useState(false);

  const tengah = align === 'center';
  const aktif = Boolean(id) && portfolio.appearance?.sectionAnchor !== false;
  const nomor = id ? nomorBagian(id) : '';

  /*
    Nomor yang terlanjur diketik di depan label dibuang.

    Sebelum nomornya dihitung otomatis, label di panel memang ditulis lengkap
    dengan nomornya, misalnya "02 / Perjalanan". Isi panel sudah dibersihkan,
    tapi penjagaan ini tetap dipasang: kalau suatu saat kamu mengetiknya lagi
    karena terbiasa, yang tampil tidak jadi "02  02 / Perjalanan".
  */
  const label = nomor ? String(eyebrow ?? '').replace(/^\s*\d{1,2}\s*[/.-]\s*/, '') : eyebrow;

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
    <Reveal className={`flex flex-col ${tengah ? 'items-center text-center' : 'items-start text-left'}`}>
      {/* Baris kepala bab: nomor, label, lalu garis rambut sisa lebar. */}
      <div className="flex w-full items-center gap-3">
        {nomor ? <span className="nomor-bagian shrink-0">{nomor}</span> : null}

        {label ? (
          <span className="shrink-0 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-subtle">
            {label}
          </span>
        ) : null}

        <hr className="aturan min-w-6 flex-1" />
      </div>

      <h2
        className={`group judul-tampil mt-4 flex items-baseline gap-2.5 text-[2.35rem] text-fg sm:text-[3rem] ${
          tengah ? 'justify-center' : ''
        }`}
      >
        <span>{title}</span>

        {aktif ? (
          <button
            type="button"
            onClick={salin}
            aria-label={`${t(portfolio.ui.sectionCopyLink)}: ${title}`}
            title={tersalin ? t(portfolio.ui.copied) : t(portfolio.ui.sectionCopyLink)}
            className={`grid h-7 w-7 shrink-0 translate-y-[-0.15em] place-items-center rounded-full border border-line text-subtle transition-all duration-300 hover:border-line-strong hover:text-accent focus-visible:opacity-100 ${
              tersalin ? 'text-accent opacity-100' : 'opacity-0 group-hover:opacity-100'
            } max-[1024px]:opacity-40`}
          >
            <Icon name={tersalin ? 'check' : 'copy'} className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </h2>

      {subtitle ? (
        <p className={`mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-subtle ${tengah ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}
