/**
 * =============================================================================
 *  lib/markdown.js  |  Mengubah tulisan biasa menjadi halaman yang rapi
 * =============================================================================
 *
 *  Kamu menulis di panel dengan cara biasa saja. Berkas ini yang mengubahnya
 *  jadi halaman jadi. Yang perlu kamu tahu cuma tiga hal:
 *
 *    1. Baris kosong memisahkan paragraf.
 *    2. Awali baris dengan # untuk judul besar, ## untuk subjudul.
 *    3. Untuk menyisipkan berkas, tempel saja tautannya di baris sendiri.
 *
 *  Soal nomor tiga, berkas apa pun yang kamu unggah lewat panel bisa langsung
 *  ditempel tautannya, dan berkas ini yang memilihkan tampilan yang pas:
 *
 *    gambar   jpg png webp gif avif    tampil sebagai gambar
 *    video    mp4 webm mov ogv         tampil sebagai pemutar video
 *    musik    mp3 wav ogg m4a aac      tampil sebagai pemutar musik
 *    dokumen  pdf                      tampil sebagai pembaca PDF
 *    lainnya  zip docx xlsx dan lain   tampil sebagai tombol unduh
 *
 *  KEAMANAN
 *  Kode HTML mentah di dalam tulisan sengaja dibuang, tidak dijalankan. Jadi
 *  kalau suatu hari ada orang lain ikut mengelola panel, dia tidak bisa
 *  menyelipkan skrip berbahaya lewat isi tulisan.
 * =============================================================================
 */

import { Marked } from 'marked';

/** Daftar jenis berkas yang punya tampilan khusus. */
const JENIS = {
  gambar: ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.svg'],
  video: ['.mp4', '.webm', '.mov', '.ogv', '.m4v'],
  musik: ['.mp3', '.wav', '.ogg', '.m4a', '.aac', '.flac'],
  dokumen: ['.pdf'],
};

/** Menebak jenis berkas dari akhiran namanya. */
function jenisBerkas(href = '') {
  const bersih = String(href).split(/[?#]/)[0].toLowerCase();
  for (const [nama, akhiran] of Object.entries(JENIS)) {
    if (akhiran.some((a) => bersih.endsWith(a))) return nama;
  }
  return null;
}

/** Membuat teks aman dipakai di dalam atribut HTML. */
function aman(teks = '') {
  return String(teks)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Menolak alamat yang bisa menjalankan kode, misalnya javascript: dan data:.
 * Yang lolos hanya alamat biasa dan berkas di dalam situs ini sendiri.
 */
function alamatAman(href = '') {
  const bersih = String(href).trim();
  if (/^(https?:|mailto:|tel:|\/|#|\.)/i.test(bersih)) return bersih;
  return '#';
}

/** Potongan HTML untuk tiap jenis berkas. */
function sisipkanBerkas(href, label = '') {
  const url = aman(alamatAman(href));
  const teks = aman(label);

  switch (jenisBerkas(href)) {
    case 'gambar':
      return `<figure class="media-blok"><img src="${url}" alt="${teks}" loading="lazy" decoding="async" />${
        teks ? `<figcaption>${teks}</figcaption>` : ''
      }</figure>`;

    case 'video':
      return `<figure class="media-blok"><video controls preload="metadata" playsinline>${
        `<source src="${url}" />`
      }Peramban kamu belum bisa memutar video ini.</video>${
        teks ? `<figcaption>${teks}</figcaption>` : ''
      }</figure>`;

    case 'musik':
      return `<figure class="media-blok media-musik"><audio controls preload="none" src="${url}">Peramban kamu belum bisa memutar audio ini.</audio>${
        teks ? `<figcaption>${teks}</figcaption>` : ''
      }</figure>`;

    case 'dokumen':
      // Sebagian ponsel tidak bisa menampilkan PDF di dalam halaman, jadi
      // tombol buka di tab baru selalu disediakan sebagai jalan keluar.
      return `<figure class="media-blok media-dokumen"><object data="${url}" type="application/pdf"><p>Dokumen tidak bisa ditampilkan di sini.</p></object><a class="media-unduh" href="${url}" target="_blank" rel="noopener noreferrer">${
        teks || 'Buka dokumen'
      }</a></figure>`;

    default:
      return null;
  }
}

/**
 * Aturan tampilan khusus untuk tulisan.
 *
 * Dibuat sebagai fungsi supaya tiap pemanggilan dapat salinan sendiri dan
 * tidak saling mengganggu saat beberapa halaman dibangun bersamaan.
 */
function aturan() {
  return {
    // Kode HTML mentah dibuang, tidak ikut ditampilkan.
    html: () => '',

    /**
     * Blok media tidak boleh terbungkus paragraf. Gambar, video, dan pemutar
     * musik adalah blok utuh, dan menaruhnya di dalam paragraf menghasilkan
     * HTML yang tidak sah sehingga jaraknya jadi kacau di sebagian peramban.
     * Jadi paragraf yang memuat media dipecah dulu di sini.
     */
    paragraph({ tokens }) {
      const isi = this.parser.parseInline(tokens ?? []);
      if (!isi.includes('<figure')) return `<p>${isi}</p>\n`;

      return isi
        .split(/(<figure[\s\S]*?<\/figure>)/g)
        .map((bagian) => (bagian.startsWith('<figure') ? bagian : bagian.trim() && `<p>${bagian.trim()}</p>`))
        .filter(Boolean)
        .join('\n');
    },

    image({ href, text }) {
      return sisipkanBerkas(href, text) ?? '';
    },

    link({ href, text, tokens }) {
      const isi = text || this.parser.parseInline(tokens ?? []);

      // Tautan yang berdiri sendiri dan menunjuk ke berkas media diubah
      // menjadi pemutar. Tautan di tengah kalimat dibiarkan jadi tautan biasa.
      const berkas = sisipkanBerkas(href, typeof isi === 'string' ? isi : '');
      if (berkas && jenisBerkas(href) !== null) return berkas;

      const url = alamatAman(href);
      const keluar = /^https?:/i.test(url);
      return `<a href="${aman(url)}"${
        keluar ? ' target="_blank" rel="noopener noreferrer"' : ''
      }>${isi}</a>`;
    },
  };
}

/**
 * Mengubah tulisan menjadi HTML siap tampil.
 *
 * @param {string} teks isi tulisan apa adanya dari panel
 * @returns {string} HTML yang sudah aman dipakai
 */
export function renderMarkdown(teks) {
  if (typeof teks !== 'string' || teks.trim() === '') return '';

  const mesin = new Marked({ gfm: true, breaks: true });
  mesin.use({ renderer: aturan() });

  return mesin.parse(teks);
}

/**
 * Membuang semua tanda baca penata supaya tersisa teksnya saja.
 * Dipakai untuk ringkasan otomatis dan hitungan waktu baca.
 */
export function teksPolos(teks) {
  if (typeof teks !== 'string') return '';
  return teks
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // tautan dan gambar
    .replace(/^\s{0,3}#{1,6}\s+/gm, '') // tanda judul
    .replace(/^\s{0,3}>\s?/gm, '') // tanda kutipan
    .replace(/^\s{0,3}[-*+]\s+/gm, '') // tanda daftar
    .replace(/[*_`~]/g, '') // penebalan dan sejenisnya
    .replace(/\s+/g, ' ')
    .trim();
}

/** Perkiraan waktu baca dalam menit, minimal satu menit. */
export function waktuBaca(teks) {
  const jumlahKata = teksPolos(teks).split(' ').filter(Boolean).length;
  return Math.max(1, Math.round(jumlahKata / 200));
}

/** Ringkasan otomatis dari kalimat kalimat pertama tulisan. */
export function ringkasanOtomatis(teks, panjang = 160) {
  const polos = teksPolos(teks);
  if (polos.length <= panjang) return polos;
  const potong = polos.slice(0, panjang);
  const spasi = potong.lastIndexOf(' ');
  return `${potong.slice(0, spasi > 40 ? spasi : panjang).trimEnd()}...`;
}
