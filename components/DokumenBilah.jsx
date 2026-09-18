'use client';

import { useState } from 'react';
import Link from 'next/link';
import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import { unduhBerkas } from '@/lib/docx';
import Icon from '@/components/Icon';

/**
 * DokumenBilah: bilah tombol di atas halaman dokumen cetak.
 *
 * Isinya tautan kembali ke situs, sakelar bahasa, tautan ke dokumen satunya,
 * dan dua cara menyimpan. Seluruh bilah ini tidak pernah ikut tercetak.
 *
 * -----------------------------------------------------------------------------
 * DUA CARA MENYIMPAN, DAN KAPAN MEMAKAI YANG MANA
 * -----------------------------------------------------------------------------
 *   PDF    rupanya terkunci, sama persis di layar siapa pun. Dipakai kalau
 *          berkasnya cuma akan dibaca, misalnya dilampirkan ke surel.
 *
 *   Word   bisa disunting penerima maupun kamu sendiri. Dipakai kalau sistem
 *          lamaran memintanya, dan sebagian memang cuma menerima .doc/.docx.
 *
 * Versi Word disusun di peramban, bukan di server, jadi tidak ada yang perlu
 * menunggu unggahan maupun langganan layanan luar.
 *
 * @param {{
 *   judul: string,
 *   lainHref: string,
 *   lainLabel: string,
 *   buatDocx?: () => Uint8Array | Promise<Uint8Array>,
 *   namaDocx?: string,
 * }} props
 */
export default function DokumenBilah({ judul, lainHref, lainLabel, buatDocx, namaDocx }) {
  const { lang, setLang, t } = useLanguage();
  const [sibuk, setSibuk] = useState(false);
  const [gagal, setGagal] = useState(false);

  const simpanWord = async () => {
    if (sibuk) return;
    setSibuk(true);
    setGagal(false);

    try {
      /*
        Diberi satu putaran nafas sebelum menyusun berkasnya. Penyusunan
        berjalan di utas yang sama dengan tampilan, dan tanpa jeda ini tombol
        tidak sempat berubah jadi "Menyiapkan" sebelum layar membeku sesaat.
      */
      await new Promise((lanjut) => setTimeout(lanjut, 0));
      unduhBerkas(await buatDocx(), namaDocx);
    } catch {
      // Kegagalan apa pun tidak boleh membuat halaman ikut mati. Pengunjung
      // diberi tahu, dan tombol PDF di sebelahnya tetap bisa dipakai.
      setGagal(true);
    } finally {
      setSibuk(false);
    }
  };

  const labelWord = gagal
    ? t(portfolio.ui.unduhGagal)
    : sibuk
      ? t(portfolio.ui.menyiapkan)
      : t(portfolio.ui.unduhWord);

  return (
    <div className="dok-bilah" data-cetak="sembunyi">
      <div className="dok-bilah-kiri">
        <Link href="/">{lang === 'id' ? 'Kembali ke situs' : 'Back to site'}</Link>
        <span className="hidden sm:inline">{judul}</span>
      </div>

      <div className="dok-bilah-kanan">
        {/* Dokumen ikut bahasa yang sedang aktif, jadi sakelarnya disediakan
            di sini supaya tidak perlu bolak balik ke halaman utama. */}
        <button type="button" className="dok-tombol-samar" onClick={() => setLang(lang === 'id' ? 'en' : 'id')}>
          {lang === 'id' ? 'English' : 'Bahasa Indonesia'}
        </button>

        <Link href={lainHref}>{lainLabel}</Link>

        {buatDocx ? (
          <button type="button" onClick={simpanWord} disabled={sibuk} aria-live="polite">
            <Icon name="download" className="h-3.5 w-3.5" aria-hidden="true" />
            {labelWord}
          </button>
        ) : null}

        <button type="button" onClick={() => window.print()}>
          <Icon name="printer" className="h-3.5 w-3.5" aria-hidden="true" />
          {t(portfolio.ui.printPage)}
        </button>
      </div>
    </div>
  );
}
