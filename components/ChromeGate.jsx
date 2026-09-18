'use client';

import { usePathname } from 'next/navigation';

/**
 * ChromeGate: menyembunyikan perabot situs di halaman yang berupa dokumen.
 *
 * Halaman di bawah /cetak/ dan halaman /panduan/ adalah dokumen, bukan
 * halaman jelajah. Navbar, footer, pemutar musik, dan tombol melayang tidak
 * punya tempat di sana, baik di layar maupun di atas kertas.
 *
 * Dipakai membungkus perabot itu di app/layout.js. Isi halamannya sendiri
 * tetap tampil seperti biasa.
 */
const DOKUMEN = ['/cetak', '/panduan'];

export default function ChromeGate({ children }) {
  const pathname = usePathname() ?? '';
  if (DOKUMEN.some((awalan) => pathname.startsWith(awalan))) return null;
  return children;
}
