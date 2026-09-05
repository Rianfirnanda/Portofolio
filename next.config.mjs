/**
 * Konfigurasi Next.js. Situs dibangun sebagai berkas statis murni.
 *
 * DEPLOY DI VERCEL (cara yang sedang dipakai)
 * Tidak perlu mengatur apa pun. Vercel menjalankan `npm run build`, membaca
 * folder out/, dan menyajikan situs dari root domain. Biarkan
 * NEXT_PUBLIC_BASE_PATH kosong.
 *
 * DEPLOY DI GITHUB PAGES (opsional, kalau suatu saat dibutuhkan)
 * Project page disajikan dari sub-folder, jadi aset perlu diberi awalan nama
 * repo. Isi NEXT_PUBLIC_BASE_PATH dengan "/nama-repo" saat build.
 * Workflow di .github/workflows/deploy.yml sudah mengurus ini otomatis.
 */

// Normalisasi: buang trailing slash, pastikan diawali "/" bila tidak kosong.
const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').trim().replace(/\/+$/, '');
const basePath = rawBasePath && !rawBasePath.startsWith('/') ? `/${rawBasePath}` : rawBasePath;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hasil build berupa HTML/CSS/JS statis di folder `out/` (tanpa server Node).
  output: 'export',

  // GitHub Pages tidak punya image optimizer, jadi semua gambar disajikan apa adanya.
  images: { unoptimized: true },

  // Setiap route diekspor sebagai folder + index.html (mencegah 404 saat refresh).
  trailingSlash: true,

  // Prefix routing & aset statis untuk project page GitHub Pages.
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,

  // Base path diteruskan ke sisi client agar <img>, favicon, dan link file
  // bisa memakai helper `withBasePath()` di lib/asset.js.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
