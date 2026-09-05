import { portfolio } from '@/data/portfolio';

// Wajib ada saat memakai output: 'export' supaya berkas robots.txt
// dibuat sekali waktu build, bukan dihitung ulang tiap permintaan.
export const dynamic = 'force-static';

/** robots.txt dibuat otomatis dari meta.baseUrl di data/portfolio.js. */
export default function robots() {
  const base = portfolio.meta.baseUrl.replace(/\/+$/, '');

  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${base}/sitemap.xml`,
  };
}
