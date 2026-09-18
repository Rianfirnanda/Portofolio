import '@/app/panduan.css';
import { portfolio } from '@/data/portfolio';
import { panduan } from '@/data/panduan';
import Panduan from '@/components/Panduan';

/**
 * Halaman modul panduan penggunaan.
 *
 * Tidak diindeks mesin pencari. Isinya panduan mengurus situs ini, dan yang
 * membutuhkannya cuma pemilik situs, bukan orang yang sedang mencari nama
 * pemiliknya di mesin pencari.
 */
export const metadata = {
  /* absolute, bukan teks biasa, supaya pola judul di app/layout.js tidak ikut
     menempelkan nama pemilik situs untuk kedua kalinya. Judul ini juga jadi
     judul berkas PDF-nya, dan nama yang tertulis dua kali di situ terbaca
     seperti kesalahan. */
  title: { absolute: `${panduan.judul} | ${portfolio.profile.name}` },
  description: panduan.anak,
  robots: { index: false, follow: false },
};

export default function HalamanPanduan() {
  return <Panduan />;
}
