/**
 * =============================================================================
 *  lib/tema.js  |  TAMPILAN SITUS DIATUR DARI PANEL
 * =============================================================================
 *
 *  Warna aksen, kelengkungan sudut, ketebalan kaca, dan keramaian latar dulu
 *  ditulis tetap di app/globals.css. Sekarang semuanya bisa kamu ubah lewat
 *  panel, menu Pengaturan Situs lalu Tampilan.
 *
 *  Caranya: nilai dari panel diubah jadi sederet variabel CSS, lalu disisipkan
 *  ke dalam <head> sebagai satu blok <style>. Karena disisipkan setelah
 *  globals.css, nilai dari panel yang menang.
 *
 *  Kolom yang kamu kosongkan TIDAK ditulis sama sekali, jadi nilai bawaan di
 *  globals.css yang dipakai. Ini disengaja: mengosongkan satu kolom berarti
 *  "biarkan seperti aslinya", bukan "kosongkan jadi nol".
 *
 *  KENAPA WARNANYA DISARING
 *  Isi panel ditulis manusia dan tersimpan di repositori, lalu hasilnya
 *  disisipkan sebagai CSS. Kalau ditelan mentah mentah, satu isian usil bisa
 *  menyelipkan aturan CSS lain. Jadi tiap nilai diperiksa bentuknya lebih dulu,
 *  dan yang tidak cocok dibuang diam diam.
 * =============================================================================
 */

/** Hanya #abc atau #aabbcc. Selain itu ditolak. */
const WARNA = /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i;

const warna = (nilai) => (typeof nilai === 'string' && WARNA.test(nilai.trim()) ? nilai.trim() : null);

/** Angka di dalam rentang yang masuk akal, dibulatkan ke tiga desimal. */
const angka = (nilai, min, maks) => {
  const n = typeof nilai === 'number' ? nilai : Number.parseFloat(nilai);
  if (!Number.isFinite(n)) return null;
  return Math.round(Math.min(maks, Math.max(min, n)) * 1000) / 1000;
};

/** Pilihan dari daftar tertutup. */
const pilihan = (nilai, daftar) => (daftar.includes(nilai) ? nilai : null);

/*
  Seberapa ramai latar belakangnya. Satu pilihan di panel mengatur empat
  lapisan sekaligus, karena mengatur empat angka satu per satu itu menyiksa
  dan gampang menghasilkan kombinasi yang jelek.

  "tenang" sengaja jadi bawaan yang disarankan. Latar penuh gradien ungu
  beranimasi itu ciri khas situs buatan mesin, dan menurunkannya adalah satu
  perubahan paling besar pengaruhnya supaya situs ini terlihat dirancang orang.
*/
const LATAR = {
  polos: { blob: 0, grid: 0, dot: 0, noise: 0.02 },
  tenang: { blob: 0.1, grid: 0.03, dot: 0, noise: 0.03 },
  sedang: { blob: 0.17, grid: 0.045, dot: 0.05, noise: 0.03 },
  ramai: { blob: 0.26, grid: 0.06, dot: 0.07, noise: 0.045 },
};

/** Kelengkungan sudut kartu. Sudut yang lebih tegas terasa lebih serius. */
const SUDUT = { tegas: '0.75rem', sedang: '1rem', bulat: '1.5rem' };

/** Gaya judul besar. Gradien itu ciri khas situs buatan mesin. */
const JUDUL = { solid: 'solid', gradien: 'gradien' };

/**
 * Menyusun blok CSS dari pengaturan Tampilan di panel.
 *
 * @param {object} tampilan isi appearance.theme dari content/settings.json
 * @returns {string} isi tag <style>, atau string kosong kalau tidak ada yang diubah
 */
export function gayaDariPanel(tampilan = {}) {
  const t = tampilan ?? {};
  const baris = [];
  const gelap = [];

  const a1 = warna(t.accent1);
  const a2 = warna(t.accent2);
  const a3 = warna(t.accent3);
  if (a1) baris.push(`--accent-1:${a1}`);
  if (a2) baris.push(`--accent-2:${a2}`);
  if (a3) baris.push(`--accent-3:${a3}`);

  // Warna tautan dan penanda aktif. Dipisah terang dan gelap karena yang
  // terbaca di atas putih belum tentu terbaca di atas hitam.
  const link = warna(t.accentLink);
  const linkGelap = warna(t.accentLinkDark);
  if (link) baris.push(`--accent-fg:${link}`);
  if (linkGelap) gelap.push(`--accent-fg:${linkGelap}`);

  const latar = pilihan(t.background, Object.keys(LATAR));
  if (latar) {
    const L = LATAR[latar];
    baris.push(
      `--blob-opacity:${L.blob}`,
      `--grid-opacity:${L.grid}`,
      `--dot-opacity:${L.dot}`,
      `--noise-opacity:${L.noise}`
    );
    // Mode gelap perlu sedikit lebih kuat supaya lapisannya tetap terlihat.
    gelap.push(
      `--blob-opacity:${Math.round(L.blob * 1.3 * 1000) / 1000}`,
      `--grid-opacity:${L.grid}`,
      `--dot-opacity:${L.dot}`,
      `--noise-opacity:${Math.round(L.noise * 1.5 * 1000) / 1000}`
    );
  }

  const sudut = pilihan(t.radius, Object.keys(SUDUT));
  if (sudut) baris.push(`--sudut-kartu:${SUDUT[sudut]}`);

  // Ketebalan buram kaca. Nol berarti kaca bening tanpa buram sama sekali.
  const buram = angka(t.blur, 0, 40);
  if (buram !== null) baris.push(`--kaca-buram:${buram}px`);

  const kecepatan = angka(t.blobSpeed, 10, 120);
  if (kecepatan !== null) baris.push(`--blob-speed:${kecepatan}s`);

  const gaya = pilihan(t.headingStyle, Object.keys(JUDUL));

  const bagian = [];
  if (baris.length) bagian.push(`:root{${baris.join(';')}}`);
  if (gelap.length) bagian.push(`[data-theme='dark']{${gelap.join(';')}}`);

  /*
    Judul polos. Ditulis sebagai aturan yang menimpa .gradient-text, bukan
    sebagai variabel, karena yang perlu dimatikan adalah background-clip dan
    itu bukan sesuatu yang bisa diwakili satu angka.
  */
  if (gaya === 'solid') {
    bagian.push(
      '.gradient-text,.bg-clip-text{background-image:none!important;' +
        '-webkit-background-clip:border-box!important;background-clip:border-box!important;' +
        '-webkit-text-fill-color:currentColor!important;color:var(--fg)!important;animation:none!important}'
    );
  }

  return bagian.join('');
}
