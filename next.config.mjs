/**
 * Konfigurasi Next.js.
 *
 * SITUS INI DI-DEPLOY DI VERCEL
 * Seluruh halaman tetap dibuat sekali saat build (pre-render), jadi kecepatannya
 * sama dengan situs statis murni. Bedanya, proyek ini juga menyediakan dua
 * endpoint kecil di app/api/ yang dipakai CMS untuk login lewat GitHub.
 * Endpoint itulah alasan `output: 'export'` tidak dipakai lagi.
 *
 * Vercel mengenali proyek Next.js sendiri, jadi tidak ada pengaturan yang perlu
 * diisi manual di dashboard-nya.
 *
 * NEXT_PUBLIC_BASE_PATH
 * Biarkan kosong di Vercel. Variabel ini hanya berguna kalau suatu saat situs
 * dipindah ke hosting yang menyajikannya dari sub-folder.
 */

// Normalisasi: buang garis miring di akhir, pastikan diawali "/" bila tidak kosong.
const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').trim().replace(/\/+$/, '');
const basePath = rawBasePath && !rawBasePath.startsWith('/') ? `/${rawBasePath}` : rawBasePath;

/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
    PENGOPTIMAL GAMBAR

    Dulu ini dimatikan karena situsnya disajikan sebagai berkas statis di
    GitHub Pages, dan di sana tidak ada yang bisa memproses gambar. Setelah
    pindah ke Vercel, pengoptimalnya tersedia penuh dan sangat berguna:

      ukuran menyesuaikan   ponsel menerima gambar seukuran layarnya, bukan
                            berkas asli 5 MB dari kamera
      format modern         AVIF dan WebP, jauh lebih kecil dari JPEG
      disimpan di tepi      hasil olahannya dipakai ulang selama 31 hari

    Tampilan gambarnya sama persis. Yang berubah cuma berapa banyak data yang
    perlu diunduh pengunjung.
  */
  images: {
    formats: ['image/avif', 'image/webp'],
    // Gambar hasil olahan disimpan lama karena berkas sumbernya jarang
    // berubah. Kalau kamu mengganti gambar, namanya biasanya ikut berganti.
    minimumCacheTTL: 2678400,
  },

  // Setiap halaman punya alamat berakhiran garis miring, misalnya /blog/.
  trailingSlash: true,

  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,

  // Diteruskan ke sisi browser agar helper withBasePath() di lib/asset.js
  // bisa menyusun alamat gambar dengan benar.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  async rewrites() {
    return [
      // Panel konten berupa halaman HTML biasa di public/admin/index.html.
      // Next.js tidak otomatis membuka berkas index di dalam folder, jadi
      // alamat /admin diarahkan ke berkasnya secara eksplisit.
      { source: '/admin', destination: '/admin/index.html' },
      { source: '/admin/', destination: '/admin/index.html' },
    ];
  },
};

export default nextConfig;
