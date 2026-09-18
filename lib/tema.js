/**
 * =============================================================================
 *  lib/tema.js  |  TAMPILAN SITUS DIATUR DARI PANEL
 * =============================================================================
 *
 *  Warna aksen, kelengkungan sudut, ketebalan kaca, dan keramaian latar dulu
 *  ditulis tetap di app/globals.css. Sekarang semuanya bisa kamu ubah lewat
 *  panel, menu Pengaturan Situs lalu Tampilan.
 *
 *  -----------------------------------------------------------------------------
 *  DUA CARA MENGATUR, DAN KENAPA ADA DUA
 *  -----------------------------------------------------------------------------
 *
 *    1. Pilih tema siap pakai.  Satu menu, satu klik, seluruh situs berganti
 *       rupa. Ini yang dipakai hampir semua orang, hampir sepanjang waktu.
 *
 *    2. Atur sendiri.  Kolom kolom di bawahnya. Kosong berarti "ikut tema yang
 *       dipilih di atas". Diisi berarti "yang ini saya mau begini".
 *
 *  Susunan bertingkat itu yang membuat panel ini bisa dipakai orang yang baru
 *  pertama membukanya maupun orang yang tahu persis warna heksa yang dia mau.
 *  Pemula tidak pernah perlu turun ke bagian kedua. Yang berpengalaman tidak
 *  pernah terhalang bagian pertama.
 *
 *  Urutan menangnya: kolom isian mengalahkan tema siap pakai, tema siap pakai
 *  mengalahkan bawaan di globals.css.
 *
 *  -----------------------------------------------------------------------------
 *  KENAPA SEMUA NILAINYA DISARING
 *  -----------------------------------------------------------------------------
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

  "tenang" sengaja jadi bawaan yang disarankan. Latar penuh gradien beranimasi
  itu ciri khas situs buatan mesin, dan menurunkannya adalah satu perubahan
  paling besar pengaruhnya supaya situs ini terlihat dirancang orang.
*/
const LATAR = {
  polos: { blob: 0, grid: 0, dot: 0, noise: 0.02 },
  tenang: { blob: 0.1, grid: 0.03, dot: 0, noise: 0.03 },
  sedang: { blob: 0.17, grid: 0.045, dot: 0.05, noise: 0.03 },
  ramai: { blob: 0.26, grid: 0.06, dot: 0.07, noise: 0.045 },
};

/**
 * Kelengkungan sudut. Satu pilihan mengatur kartu dan tombol sekaligus.
 *
 * Tombolnya tidak boleh sebulat kartunya. Kartu selebar 400 piksel dengan
 * sudut 1,5 rem masih terbaca sebagai kotak, tombol selebar 140 piksel dengan
 * sudut yang sama sudah jadi kapsul. Jadi tiap pilihan punya dua angka.
 */
const SUDUT = {
  tegas: { kartu: '0.5rem', tombol: '0.4rem' },
  sedang: { kartu: '1rem', tombol: '0.65rem' },
  bulat: { kartu: '1.5rem', tombol: '999px' },
};

/** Gaya judul besar. Gradien itu ciri khas situs buatan mesin. */
const JUDUL = ['solid', 'gradien'];

/**
 * Huruf judul.
 *
 * Tiap pilihan membawa tebal dan kerapatan hurufnya sendiri, bukan cuma nama
 * hurufnya. Itu perlu karena tiap huruf punya ukuran optis yang berbeda: Space
 * Grotesk sudah terasa tegas di tebal 500, sedangkan huruf berkait baru
 * terbaca sebagai judul kalau dibiarkan di 400 dan diberi jarak lebih longgar.
 * Kalau cuma nama hurufnya yang ditukar, salah satu pilihan pasti terlihat
 * kurus atau terlalu renggang.
 */
const HURUF = {
  modern: {
    keluarga: 'var(--font-space), ui-sans-serif, system-ui, sans-serif',
    tebal: 500,
    jarak: '-0.03em',
  },
  berkait: {
    keluarga: "var(--font-instrument), Georgia, Cambria, 'Times New Roman', serif",
    tebal: 400,
    jarak: '-0.015em',
  },
  polos: {
    keluarga: 'var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif',
    tebal: 800,
    jarak: '-0.04em',
  },
};

/**
 * Tema siap pakai.
 *
 * Tiap tema adalah satu himpunan nilai yang sudah dicocokkan satu sama lain.
 * Bukan sekadar tiga warna: warna tautan untuk mode terang dan gelap dipilih
 * terpisah, karena warna yang terbaca di atas kertas putih hampir tidak pernah
 * terbaca di atas layar hitam, dan sebaliknya.
 *
 * Kalau kamu ingin menambah tema sendiri, salin satu blok di bawah, ganti
 * nilainya, lalu tambahkan namanya ke daftar pilihan di
 * public/admin/config.yml pada kolom "Tema siap pakai".
 */
export const TEMA = {
  'biru-tenang': {
    accent1: '#2f4bb8',
    accent2: '#3f7fbf',
    accent3: '#6ea8c9',
    accentLink: '#2f4bb8',
    accentLinkDark: '#7fb3d5',
    background: 'tenang',
    radius: 'sedang',
    headingStyle: 'solid',
    headingFont: 'modern',
  },

  /* Nyaris tanpa warna. Paling aman untuk lamaran kerja dan paling sulit
     terlihat murahan, karena tidak ada warna yang bisa salah dipadankan. */
  'tinta-hitam': {
    accent1: '#1f2937',
    accent2: '#4b5563',
    accent3: '#9ca3af',
    accentLink: '#111827',
    accentLinkDark: '#e5e7eb',
    background: 'polos',
    radius: 'tegas',
    headingStyle: 'solid',
    headingFont: 'modern',
  },

  'hijau-hutan': {
    accent1: '#166534',
    accent2: '#3f8f6b',
    accent3: '#8cc0a8',
    accentLink: '#15803d',
    accentLinkDark: '#86d9ad',
    background: 'tenang',
    radius: 'sedang',
    headingStyle: 'solid',
    headingFont: 'modern',
  },

  'tanah-terakota': {
    accent1: '#9a3412',
    accent2: '#c2703f',
    accent3: '#e0a878',
    accentLink: '#9a3412',
    accentLinkDark: '#f0b088',
    background: 'tenang',
    radius: 'bulat',
    headingStyle: 'solid',
    headingFont: 'modern',
  },

  'ungu-senja': {
    accent1: '#4c1d95',
    accent2: '#7c4dbd',
    accent3: '#b39ddb',
    accentLink: '#5b21b6',
    accentLinkDark: '#c4b0e8',
    background: 'sedang',
    radius: 'sedang',
    headingStyle: 'solid',
    headingFont: 'modern',
  },

  'malam-emas': {
    accent1: '#8a6a1f',
    accent2: '#b08d3a',
    accent3: '#d8c07a',
    accentLink: '#7a5d18',
    accentLinkDark: '#e0c884',
    background: 'sedang',
    radius: 'tegas',
    headingStyle: 'solid',
    headingFont: 'polos',
  },
};

/**
 * Menyusun blok CSS dari pengaturan Tampilan di panel.
 *
 * @param {object} tampilan isi appearance.theme dari content/settings.json
 * @returns {string} isi tag <style>, atau string kosong kalau tidak ada yang diubah
 */
export function gayaDariPanel(tampilan = {}) {
  const panel = tampilan ?? {};

  /*
    Tema siap pakai dipasang lebih dulu sebagai dasar, lalu kolom isian
    ditumpuk di atasnya. Kolom yang kosong tidak menimpa apa apa, dan itulah
    yang membuat "kosongkan untuk ikut tema" berlaku dengan sendirinya.
  */
  const dasar = TEMA[pilihan(panel.preset, Object.keys(TEMA))] ?? {};
  const t = { ...dasar };
  for (const [kunci, nilai] of Object.entries(panel)) {
    if (nilai === '' || nilai === null || nilai === undefined) continue;
    t[kunci] = nilai;
  }

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
  if (sudut) {
    baris.push(`--sudut-kartu:${SUDUT[sudut].kartu}`, `--sudut-tombol:${SUDUT[sudut].tombol}`);
  }

  // Ketebalan buram kaca. Nol berarti kaca bening tanpa buram sama sekali.
  const buram = angka(t.blur, 0, 40);
  if (buram !== null) baris.push(`--kaca-buram:${buram}px`);

  const kecepatan = angka(t.blobSpeed, 10, 120);
  if (kecepatan !== null) baris.push(`--blob-speed:${kecepatan}s`);

  const huruf = pilihan(t.headingFont, Object.keys(HURUF));
  if (huruf) {
    const H = HURUF[huruf];
    baris.push(`--tampil-huruf:${H.keluarga}`, `--tampil-tebal:${H.tebal}`, `--tampil-jarak:${H.jarak}`);
  }

  const gaya = pilihan(t.headingStyle, JUDUL);

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
