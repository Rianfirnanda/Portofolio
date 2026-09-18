/**
 * =============================================================================
 *  scripts/generate-panduan.mjs  |  MENCETAK MODUL PANDUAN JADI BERKAS PDF
 * =============================================================================
 *
 *  Menghasilkan public/panduan-penggunaan.pdf dari halaman /panduan/.
 *
 *  -----------------------------------------------------------------------------
 *  KENAPA TIDAK IKUT DIJALANKAN TIAP KALI SITUS DIBANGUN
 *  -----------------------------------------------------------------------------
 *  Karena mencetak PDF butuh peramban sungguhan, dan mesin yang membangun situs
 *  di Vercel tidak punya peramban. Memasangnya ke sana berarti menambah sekitar
 *  150 MB unduhan pada tiap kali situs dibangun, demi berkas yang isinya cuma
 *  berubah kalau panduannya sendiri diubah.
 *
 *  Jadi berkas PDF-nya ikut disimpan di dalam repositori, dan skrip ini
 *  dijalankan tangan waktu isi panduannya berubah:
 *
 *      npm run panduan
 *
 *  Halaman /panduan/ sendiri SELALU mengikuti isi terbaru, karena dia dibangun
 *  dari data/panduan.js seperti halaman lain. Yang bisa tertinggal cuma berkas
 *  PDF-nya, dan skrip ini yang menyusulkannya.
 *
 *  -----------------------------------------------------------------------------
 *  CARA MENJALANKANNYA
 *  -----------------------------------------------------------------------------
 *    1. npm run build && npm start        (atau npm run dev)
 *    2. npm run panduan
 *
 *  Kalau Playwright belum terpasang, skrip ini berhenti dengan pesan, bukan
 *  dengan galat. Berkas PDF yang lama tetap ada dan situs tetap bisa dibangun.
 * =============================================================================
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const ALAMAT = process.env.PANDUAN_URL || 'http://localhost:3000/panduan/';
const TUJUAN = path.join(process.cwd(), 'public', 'panduan-penggunaan.pdf');

/** Kaki halaman: nomor halaman di tengah, dicetak pada tiap lembar. */
const KAKI = `
<div style="width:100%;font:9px -apple-system,system-ui,sans-serif;color:#6b7280;
            padding:0 16mm;display:flex;justify-content:space-between;">
  <span>Panduan Penggunaan</span>
  <span>Halaman <span class="pageNumber"></span> dari <span class="totalPages"></span></span>
</div>`;

/* Kepala halaman dibiarkan kosong, tapi tetap harus ada isinya. Tanpa elemen
   apa pun, sebagian versi Chromium mencetak teks bawaannya sendiri berupa
   judul dan alamat halaman di tepi atas tiap lembar. */
const KEPALA = '<div></div>';

async function muatPlaywright() {
  for (const nama of [
    'playwright',
    'playwright-core',
    // Dipasang di luar proyek saat menguji. Dicoba terakhir.
    '/opt/node22/lib/node_modules/playwright/index.js',
  ]) {
    try {
      return await import(nama);
    } catch {
      // Coba yang berikutnya.
    }
  }
  return null;
}

const pw = await muatPlaywright();

if (!pw) {
  console.log(
    'Panduan PDF dilewati: Playwright belum terpasang.\n' +
      'Pasang dulu dengan "npm i -D playwright", lalu jalankan "npm run panduan".\n' +
      'Berkas public/panduan-penggunaan.pdf yang lama tetap dipakai.',
  );
  process.exit(0);
}

const peluncuran = process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {};
const browser = await pw.chromium.launch(peluncuran);

try {
  const halaman = await browser.newPage();
  await halaman.goto(ALAMAT, { waitUntil: 'networkidle', timeout: 60000 });

  // Huruf perlu selesai dimuat sebelum halaman diukur, kalau tidak patahan
  // barisnya dihitung memakai huruf cadangan dan hasilnya meleset.
  await halaman.evaluate(() => document.fonts?.ready);
  await halaman.waitForTimeout(400);

  const pdf = await halaman.pdf({
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: KEPALA,
    footerTemplate: KAKI,
    margin: { top: '14mm', bottom: '16mm', left: '16mm', right: '16mm' },
  });

  mkdirSync(path.dirname(TUJUAN), { recursive: true });
  writeFileSync(TUJUAN, pdf);
  console.log(`Panduan PDF dibuat: ${TUJUAN} (${Math.round(pdf.length / 1024)} kB)`);
} finally {
  await browser.close();
}
