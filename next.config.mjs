/**
 * Konfigurasi Next.js untuk static export ke GitHub Pages.
 *
 * NEXT_PUBLIC_BASE_PATH:
 *  - Kosong ("") saat `npm run dev` di lokal  -> situs jalan di http://localhost:3000/
 *  - Diisi "/<nama-repo>" saat deploy Pages    -> situs jalan di https://<user>.github.io/<nama-repo>/
 *
 * Nilai ini di-set otomatis oleh GitHub Actions (.github/workflows/deploy.yml).
 * Untuk custom domain / user-page (<user>.github.io), biarkan kosong.
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
