/**
 * =============================================================================
 *  data/posts.js  |  PEMBACA TULISAN BLOG
 * =============================================================================
 *
 *  Setiap tulisan disimpan sebagai satu berkas JSON di content/posts/.
 *  Berkas ini membaca seluruh isi folder itu saat situs dibangun, jadi menambah
 *  tulisan baru lewat panel CMS langsung memunculkannya di situs tanpa ada
 *  daftar terpisah yang perlu diperbarui.
 *
 *  PENTING UNTUK PENGEMBANG
 *  Berkas ini membaca folder, jadi hanya boleh dipanggil dari server component
 *  atau dari berkas yang berjalan saat build. Komponen di sisi browser menerima
 *  hasilnya lewat props, bukan dengan mengimpor berkas ini.
 *
 *  Struktur satu tulisan ada di data/README.md bagian 6.
 * =============================================================================
 */

import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

/**
 * Membaca dan menyaring seluruh tulisan.
 *
 * Tulisan bertanda `draft: true` disembunyikan dari situs tanpa dihapus, dan
 * berkas yang rusak dilewati agar satu salah ketik tidak menjatuhkan seluruh
 * halaman blog.
 *
 * @returns {Array<object>} tulisan terbit, terurut dari yang paling baru
 */
export function getPublishedPosts() {
  let files = [];

  try {
    files = readdirSync(POSTS_DIR).filter((name) => name.endsWith('.json'));
  } catch {
    // Folder belum ada, misalnya saat semua tulisan dihapus dari CMS.
    return [];
  }

  return files
    .map((name) => {
      try {
        const raw = readFileSync(path.join(POSTS_DIR, name), 'utf8');
        const post = JSON.parse(raw);
        // Nama berkas jadi cadangan kalau field slug lupa diisi.
        return { ...post, slug: post.slug || name.replace(/\.json$/, '') };
      } catch {
        return null;
      }
    })
    .filter((post) => post && !post.draft)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

/** Mencari satu tulisan berdasarkan slug-nya. */
export function getPostBySlug(slug) {
  return getPublishedPosts().find((post) => post.slug === slug) ?? null;
}

/** Seluruh topik unik dari semua tulisan, dipakai untuk tombol penyaring. */
export function getAllTags(posts = getPublishedPosts()) {
  const unique = [];
  posts.forEach((post) => {
    (post.tags ?? []).forEach((tag) => {
      if (!unique.includes(tag)) unique.push(tag);
    });
  });
  return unique;
}
