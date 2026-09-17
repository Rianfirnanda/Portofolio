/**
 * =============================================================================
 *  lib/tema.js  |  PERAKIT TAMPILAN DARI PANEL
 * =============================================================================
 *
 *  Warna aksen, warna latar, ketebalan buram kaca, kelengkungan sudut, jarak
 *  antar bagian, lebar isi, dan ukuran huruf dulu ditulis mati di globals.css.
 *  Sekarang semuanya diatur lewat panel, di menu Pengaturan Situs > Tampilan
 *  Visual, dan berkas ini yang menerjemahkannya jadi variabel CSS.
 *
 *  Hasilnya ditulis sekali ke dalam <style> di app/layout.js saat situs
 *  dibangun, jadi tidak ada kedipan warna dan tidak ada kerja tambahan di
 *  peramban pengunjung.
 *
 *  KENAPA SELEKTORNYA DITULIS DUA KALI, ":root:root"
 *  Supaya menang telak atas nilai bawaan di globals.css tanpa bergantung pada
 *  urutan berkas gaya, yang tidak dijamin Next.js.
 * =============================================================================
 */

/** Pasangan warna aksen siap pakai. Kunci objeknya dipakai panel sebagai pilihan. */
export const PRESET_AKSEN = {
  indigo: ['#6366f1', '#a855f7', '#06b6d4'],
  samudra: ['#3b82f6', '#0ea5e9', '#2dd4bf'],
  zamrud: ['#10b981', '#14b8a6', '#84cc16'],
  senja: ['#f43f5e', '#d946ef', '#fb923c'],
  emas: ['#f59e0b', '#ea580c', '#facc15'],
  anggur: ['#8b5cf6', '#ec4899', '#38bdf8'],
  hutan: ['#0d9488', '#65a30d', '#22d3ee'],
  baja: ['#64748b', '#0ea5e9', '#94a3b8'],
};

/** Pasangan warna latar. Tiap nilai: [warna dasar, warna dalam gradien]. */
export const PRESET_LATAR = {
  netral: { terang: ['#f5f7fc', '#eaeefb'], gelap: ['#05070f', '#0a0f22'] },
  hangat: { terang: ['#faf8f4', '#f2ebe1'], gelap: ['#0a0806', '#171310'] },
  dingin: { terang: ['#f2f7fb', '#e5eff7'], gelap: ['#04080f', '#07131f'] },
  pekat: { terang: ['#eef1f7', '#e1e6f1'], gelap: ['#000206', '#04070e'] },
  lembut: { terang: ['#fbfbfd', '#f1f3f9'], gelap: ['#0c0e15', '#141824'] },
};

/* Kelengkungan sudut kartu, dalam rem. */
const SUDUT = { tajam: 0.45, sedang: 1, lembut: 1.45, bulat: 1.9 };

/* Jarak atas bawah tiap bagian halaman: [ponsel, layar lebar], dalam rem. */
const KEPADATAN = { rapat: [3.25, 4.25], nyaman: [4.5, 6], lapang: [6, 8] };

/* Lebar maksimum isi halaman. */
const LEBAR = { sedang: '64rem', lebar: '72rem', penuh: '80rem' };

/* Pengali untuk lapisan dekoratif latar: blob, grid, titik, noise. */
const INTENSITAS = { minimal: 0.4, normal: 1, kaya: 1.6 };

/*
  Huruf judul.

  Ketiganya tumpukan huruf bawaan sistem, tidak ada berkas yang perlu diunduh
  pengunjung, jadi mengganti pilihan di sini tidak menambah satu bita pun pada
  waktu muat halaman. Serif memberi kesan terbitan cetak, mono memberi kesan
  teknis, dan keduanya seketika membedakan situs ini dari templat yang semua
  judulnya memakai satu huruf sans yang sama.
*/
const HURUF_JUDUL = {
  sans: { huruf: 'var(--font-sans)', rapat: '-0.022em' },
  serif: {
    huruf:
      "'Iowan Old Style', 'Palatino Linotype', 'Book Antiqua', Palatino, 'Source Serif 4', Georgia, 'Times New Roman', serif",
    rapat: '-0.012em',
  },
  mono: {
    huruf: "ui-monospace, 'SF Mono', 'JetBrains Mono', 'Cascadia Mono', Menlo, Consolas, monospace",
    rapat: '-0.03em',
  },
};

/* ---------------------------------------------------------------------------
 * KETERBACAAN WARNA AKSEN
 *
 * Warna aksen dipakai juga sebagai warna tulisan kecil (label bagian, nama
 * instansi, tautan di artikel). Warna pilihan bebas tidak dijamin terbaca di
 * atas latar: kuning cerah di atas putih rasio kontrasnya 1,5 banding 1,
 * jauh di bawah 4,5 yang disyaratkan WCAG AA.
 *
 * Jadi warnanya tidak dipakai mentah. Warna itu digelapkan sedikit demi
 * sedikit di mode terang, atau diterangkan di mode gelap, sampai kontrasnya
 * benar benar lolos. Dihitung saat situs dibangun, bukan ditebak.
 * ------------------------------------------------------------------------- */

const keRgb = (hex) => {
  const bersih = String(hex).trim().replace('#', '');
  const penuh = bersih.length === 3 ? bersih.replace(/./g, (c) => c + c) : bersih;
  const angka = Number.parseInt(penuh.slice(0, 6), 16);
  return Number.isNaN(angka) ? [0, 0, 0] : [(angka >> 16) & 255, (angka >> 8) & 255, angka & 255];
};

const keHex = ([r, g, b]) =>
  '#' + [r, g, b].map((n) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, '0')).join('');

const kanal = (c) => {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
};

const luminansi = ([r, g, b]) => 0.2126 * kanal(r) + 0.7152 * kanal(g) + 0.0722 * kanal(b);

const kontras = (a, b) => {
  const x = luminansi(a);
  const y = luminansi(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

const campur = (a, b, t) => a.map((nilai, i) => nilai * (1 - t) + b[i] * t);

/**
 * Mengembalikan versi warna aksen yang kontrasnya minimal `target` banding 1
 * terhadap latar. Dicampur sedikit demi sedikit ke arah hitam atau putih.
 *
 * Targetnya 6,5, bukan 4,5 seperti syarat minimum WCAG AA. Sebabnya warna ini
 * paling sering dipakai untuk tulisan berukuran kecil dan berhuruf kapital
 * semua, misalnya label "03 / KARYA" di atas judul bagian. Huruf sekecil itu
 * pada angka pas pasan memang lolos di atas kertas, tetapi di layar ponsel
 * yang sedang kena cahaya matahari tetap sulit dibaca. Angka 6,5 juga kira
 * kira setara warna yang dipakai sebelum warnanya bisa diatur dari panel,
 * jadi tampilannya tidak berubah bagi yang memakai palet bawaan.
 */
export function aksenTerbaca(aksenHex, latarHex, target = 6.5) {
  const aksen = keRgb(aksenHex);
  const latar = keRgb(latarHex);
  const arah = luminansi(latar) > 0.4 ? [0, 0, 0] : [255, 255, 255];

  if (kontras(aksen, latar) >= target) return keHex(aksen);

  for (let t = 0.04; t <= 1.0001; t += 0.04) {
    const calon = campur(aksen, arah, t);
    if (kontras(calon, latar) >= target) return keHex(calon);
  }
  return keHex(arah);
}

const angka = (nilai, bawaan, min, maks) => {
  const n = Number(nilai);
  return Number.isFinite(n) ? Math.min(maks, Math.max(min, n)) : bawaan;
};

const pilih = (peta, kunci, bawaan) => peta[kunci] ?? peta[bawaan];

/**
 * Merakit seluruh blok CSS dari objek `theme` di content/settings.json.
 * Semua field boleh kosong: yang kosong memakai nilai bawaan lama.
 */
export function bangunGayaTema(tema = {}) {
  const preset = PRESET_AKSEN[tema.preset] ?? null;
  const aksen = [
    (preset ? preset[0] : tema.accent1) || PRESET_AKSEN.indigo[0],
    (preset ? preset[1] : tema.accent2) || PRESET_AKSEN.indigo[1],
    (preset ? preset[2] : tema.accent3) || PRESET_AKSEN.indigo[2],
  ];

  const latar = pilih(PRESET_LATAR, tema.latar, 'netral');
  const sudut = pilih(SUDUT, tema.sudut, 'sedang');
  const [padatKecil, padatBesar] = pilih(KEPADATAN, tema.kepadatan, 'nyaman');
  const lebar = pilih(LEBAR, tema.lebarKonten, 'lebar');
  const intensitas = pilih(INTENSITAS, tema.intensitasLatar, 'normal');

  const blur = angka(tema.blur, 20, 0, 48);
  const skala = angka(tema.skalaHuruf, 100, 88, 118) / 100;
  const kecepatan = angka(tema.kecepatanBlob, 30, 8, 120);

  const judul = HURUF_JUDUL[tema.hurufJudul] ?? HURUF_JUDUL.sans;
  const judulPolos = tema.gayaJudul === 'polos';

  const aksenTulisanTerang = aksenTerbaca(aksen[1], latar.terang[0]);
  const aksenTulisanGelap = aksenTerbaca(aksen[2], latar.gelap[0]);

  const o = (dasar) => +(dasar * intensitas).toFixed(4);

  return `
:root:root{
--accent-1:${aksen[0]};
--accent-2:${aksen[1]};
--accent-3:${aksen[2]};
--accent-fg:${aksenTulisanTerang};
--bg:${latar.terang[0]};
--bg-deep:${latar.terang[1]};
--blob-speed:${kecepatan}s;
--blob-opacity:${o(0.145)};
--grid-opacity:${o(0.045)};
--dot-opacity:${o(0.05)};
--noise-opacity:${o(0.03)};
--r-lg:${sudut}rem;
--blur-kaca:${blur}px;
--skala-teks:${skala};
--w-konten:${lebar};
--ruang-bagian:${padatKecil}rem;
--ruang-bagian-lebar:${padatBesar}rem;
--font-judul:${judul.huruf};
--rapat-judul:${judul.rapat};
}
:root:root[data-theme='dark']{
--accent-fg:${aksenTulisanGelap};
--bg:${latar.gelap[0]};
--bg-deep:${latar.gelap[1]};
--blob-opacity:${o(0.2)};
--grid-opacity:${o(0.05)};
--dot-opacity:${o(0.06)};
--noise-opacity:${o(0.05)};
}
${
  judulPolos
    ? `:root:root .gradient-text{background-image:none;color:var(--fg);animation:none;}`
    : ''
}
`.replace(/\n+/g, '\n').trim();
}

export default bangunGayaTema;
