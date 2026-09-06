'use client';

import Link from 'next/link';
import { useLanguage } from '@/components/LanguageProvider';

/**
 * DokumenBilah: bilah tombol di atas halaman dokumen cetak.
 *
 * Isinya tautan kembali ke situs, sakelar bahasa, tautan ke dokumen satunya,
 * dan tombol simpan. Seluruh bilah ini tidak pernah ikut tercetak.
 *
 * @param {{ judul: string, lainHref: string, lainLabel: string }} props
 */
export default function DokumenBilah({ judul, lainHref, lainLabel }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className="dok-bilah" data-cetak="sembunyi">
      <div className="dok-bilah-kiri">
        <Link href="/">{lang === 'id' ? 'Kembali ke situs' : 'Back to site'}</Link>
        <span className="hidden sm:inline">{judul}</span>
      </div>

      <div className="dok-bilah-kanan">
        {/* Dokumen ikut bahasa yang sedang aktif, jadi sakelarnya disediakan
            di sini supaya tidak perlu bolak balik ke halaman utama. */}
        <button
          type="button"
          onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
          style={{ background: 'transparent', borderColor: 'rgba(226,232,240,0.28)', color: 'inherit' }}
        >
          {lang === 'id' ? 'English' : 'Bahasa Indonesia'}
        </button>

        <Link href={lainHref}>{lainLabel}</Link>

        <button type="button" onClick={() => window.print()}>
          {lang === 'id' ? 'Simpan sebagai PDF' : 'Save as PDF'}
        </button>
      </div>
    </div>
  );
}
