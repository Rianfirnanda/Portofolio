/**
 * =============================================================================
 *  scripts/copy-cms.mjs
 * =============================================================================
 *
 *  Menyalin berkas panel konten dari node_modules ke public/admin/ supaya
 *  panelnya disajikan dari domain sendiri, bukan dari CDN pihak ketiga.
 *
 *  Dijalankan otomatis sebelum `npm run dev` dan `npm run build` lewat script
 *  predev dan prebuild di package.json, jadi tidak perlu diingat manual.
 *
 *  Hasil salinannya tidak ikut masuk ke Git (lihat .gitignore) karena selalu
 *  bisa dibuat ulang dari dependency yang versinya sudah dikunci.
 * =============================================================================
 */

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const TARGET_DIR = path.join(process.cwd(), 'public', 'admin');
const TARGET_FILE = path.join(TARGET_DIR, 'sveltia-cms.js');
const BRANDING_FILE = path.join(TARGET_DIR, 'panel-branding.js');

/**
 * Menulis judul panel dari isi yang kamu atur sendiri lewat panel.
 *
 * -----------------------------------------------------------------------------
 * KENAPA LEWAT BERKAS TERPISAH, BUKAN LANGSUNG DI config.yml
 * -----------------------------------------------------------------------------
 * config.yml itu berkas yang ditulis tangan, delapan puluh kilobita, penuh
 * komentar penjelasan. Kalau sebuah skrip menimpanya tiap kali situs dibangun,
 * dua hal buruk terjadi: komentarnya berisiko rusak, dan berkas yang dilacak
 * Git jadi berubah tiap kali build, sehingga riwayat perubahannya penuh derau.
 *
 * Jadi judulnya ditulis ke berkas kecil terpisah yang TIDAK dilacak Git, sama
 * seperti sveltia-cms.js, lalu dibaca index.html dan diserahkan ke CMS.init().
 * Penimpaan lewat CMS.init() memang didukung, dan itu sudah diuji langsung di
 * peramban, bukan diasumsikan.
 *
 * Urutan sumbernya:
 *
 *   1. meta.panelTitle  kalau kamu mengisinya di panel
 *   2. nama lengkapmu   "Panel " diikuti profile.name
 *   3. "Panel Konten"   kalau dua duanya kosong
 */
function tulisBranding() {
  const bacaJson = (berkas) => {
    try {
      return JSON.parse(readFileSync(path.join(process.cwd(), 'content', berkas), 'utf8'));
    } catch {
      return {};
    }
  };

  const meta = bacaJson('settings.json').meta ?? {};
  const profile = bacaJson('profile.json');

  const isi = (nilai) => (typeof nilai === 'string' && nilai.trim() !== '' ? nilai.trim() : '');
  const nama = isi(profile.shortName) || isi(profile.name);

  const judul = isi(meta.panelTitle) || (nama ? `Panel ${nama}` : 'Panel Konten');

  writeFileSync(
    BRANDING_FILE,
    '/* Dibuat otomatis oleh scripts/copy-cms.mjs. Jangan diedit tangan. */\n' +
      `window.__PANEL_BRANDING__ = ${JSON.stringify({ app_title: judul })};\n`
  );

  return judul;
}

let sourceFile = null;

try {
  // Entry point resmi paketnya mengarah ke dist/sveltia-cms.mjs, yaitu build
  // pustaka yang perlu dinyalakan manual. Yang kita butuhkan build klasik di
  // folder yang sama, karena versi itu menyalakan dirinya sendiri begitu
  // dimuat lewat tag <script> biasa.
  const entry = fileURLToPath(import.meta.resolve('@sveltia/cms'));
  sourceFile = path.join(path.dirname(entry), 'sveltia-cms.js');
} catch {
  // Cadangan untuk versi Node yang belum punya import.meta.resolve.
  const guess = path.join(process.cwd(), 'node_modules', '@sveltia', 'cms', 'dist', 'sveltia-cms.js');
  if (existsSync(guess)) sourceFile = guess;
}

if (!sourceFile || !existsSync(sourceFile)) {
  console.warn(
    '[panel konten] Berkas @sveltia/cms tidak ditemukan. Jalankan npm install lebih dulu.\n' +
      '               Situsnya tetap bisa dibangun, hanya halaman /admin yang belum bisa dibuka.'
  );
  // Judul panelnya tetap ditulis. Kalau tidak, index.html memuat berkas yang
  // tidak ada dan panelnya ikut gagal karena alasan yang sama sekali berbeda.
  mkdirSync(TARGET_DIR, { recursive: true });
  tulisBranding();
  process.exit(0);
}

mkdirSync(TARGET_DIR, { recursive: true });
copyFileSync(sourceFile, TARGET_FILE);

const judul = tulisBranding();

const sizeKb = (statSync(TARGET_FILE).size / 1024).toFixed(0);
console.log(`[panel konten] public/admin/sveltia-cms.js siap (${sizeKb} KB)`);
console.log(`[panel konten] judul panel: ${judul}`);
