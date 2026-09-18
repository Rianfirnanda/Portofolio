/**
 * =============================================================================
 *  lib/urutan-bagian.js  |  NOMOR URUT TIAP BAGIAN HALAMAN
 * =============================================================================
 *
 *  Tiap kepala bagian diberi nomor kecil: 01 Tentang, 02 Pengalaman, dan
 *  seterusnya. Gunanya bukan hiasan. Halaman ini panjang, dan nomor memberi
 *  pembaca rasa "sudah sampai mana", persis seperti nomor bab di buku.
 *
 *  KENAPA TIDAK DITULIS LANGSUNG DI TIAP KOMPONEN
 *  Karena bagian yang datanya kosong menyembunyikan dirinya sendiri. Kalau
 *  nomornya diketik manual, seseorang yang mengosongkan bagian Publikasi
 *  lewat panel akan mendapat halaman bernomor 01, 02, 03, 05, 06. Nomor yang
 *  melompat lebih buruk daripada tidak ada nomor sama sekali: pembaca mengira
 *  ada sesuatu yang gagal dimuat.
 *
 *  Jadi nomornya dihitung di sini, dari data yang sama yang dipakai tiap
 *  bagian untuk memutuskan tampil atau tidak. Mengosongkan satu bagian lewat
 *  panel membuat sisanya bernomor ulang dengan sendirinya.
 *
 *  Kalau kamu memindah urutan bagian di app/page.js, pindahkan juga barisnya
 *  di URUTAN di bawah supaya nomornya tetap cocok.
 * =============================================================================
 */

import { portfolio } from '@/data/portfolio';

/**
 * Urutan bagian di halaman utama, lengkap dengan cara memeriksa apakah
 * bagian itu punya isi. Urutannya harus sama dengan app/page.js.
 *
 * Hero tidak ikut karena dia tidak punya kepala bagian bernomor.
 */
const URUTAN = [
  ['about', (d) => d.profile?.summaryId?.length > 0],
  ['experience', (d) => d.experience?.length > 0],
  ['projects', (d) => d.projects?.length > 0],
  ['publications', (d) => d.publications?.length > 0],
  ['skills', (d) => d.skills?.groups?.length > 0],
  ['certifications', (d) => d.certifications?.length > 0],
  ['education', (d) => d.education?.length > 0],
  ['volunteering', (d) => d.volunteering?.length > 0],
  ['gallery', (d) => d.gallery?.enabled !== false && d.gallery?.items?.length > 0],
  /*
    Blog diperiksa lewat menu, bukan lewat jumlah tulisan.

    Daftar tulisan dibaca dari berkas di dalam folder content/posts saat situs
    dibangun, dan pembacanya memakai node:fs. Modul ini ikut terpakai di sisi
    peramban, dan apa pun yang menyentuh node:fs di sana membuat seluruh situs
    gagal dibangun. Jadi yang dipakai adalah daftar menu, yang isinya kamu
    tentukan sendiri lewat panel dan aman dibaca di mana saja.

    Satu hal yang perlu diketahui: kalau kamu membuang semua tulisan tapi Blog
    masih tercantum di menu, bagian Blog menyembunyikan dirinya sendiri sedang
    nomornya tetap terpakai, jadi urutannya melompat satu. Buang juga Blog
    dari menu dan nomornya rapi lagi.
  */
  ['blog', (d) => (d.nav ?? []).some((item) => item.id === 'blog')],
  ['feedback', (d) => d.feedback?.enabled !== false],
  ['contact', () => true],
];

/*
  Dihitung sekali saat modul pertama dipakai, bukan tiap kali sebuah kepala
  bagian digambar. Isinya tidak pernah berubah selama halaman terbuka: data
  situs ini dibaca saat situs dibangun, bukan saat dikunjungi.
*/
const NOMOR = (() => {
  const peta = new Map();
  let urut = 0;

  for (const [id, adaIsi] of URUTAN) {
    let isi = false;
    try {
      isi = Boolean(adaIsi(portfolio));
    } catch {
      // Bentuk data yang tak terduga tidak boleh menjatuhkan seluruh halaman.
      // Bagian itu cuma kehilangan nomornya.
      isi = false;
    }
    if (!isi) continue;
    urut += 1;
    peta.set(id, String(urut).padStart(2, '0'));
  }

  return peta;
})();

/**
 * Nomor urut sebuah bagian, sudah dalam bentuk dua angka.
 *
 * @param {string} id id bagian, sama dengan atribut id pada elemen section
 * @returns {string} misalnya "03", atau string kosong kalau bagiannya tidak
 *   terdaftar maupun tidak punya isi
 */
export function nomorBagian(id) {
  return NOMOR.get(id) ?? '';
}
