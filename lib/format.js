/** Fungsi pembantu untuk memformat tanggal dan menghitung lama baca. */

/**
 * Ubah '2026-07-14' menjadi '14 Juli 2026' atau '14 July 2026'.
 * Memakai locale tetap supaya hasil di server dan browser selalu sama.
 */
export function formatDate(value, lang = 'id') {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return String(value);

  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

/**
 * Perkiraan lama baca dalam menit, dihitung dari jumlah kata di seluruh blok.
 * Dipakai hanya kalau sebuah tulisan tidak mengisi field readingTime.
 */
export function estimateReadingTime(content = [], lang = 'id') {
  const words = content.reduce((total, block) => {
    const pieces = [];
    if (block.text) pieces.push(typeof block.text === 'string' ? block.text : block.text[lang] ?? '');
    if (Array.isArray(block.items)) {
      block.items.forEach((item) => pieces.push(typeof item === 'string' ? item : item[lang] ?? ''));
    }
    return total + pieces.join(' ').split(/\s+/).filter(Boolean).length;
  }, 0);

  return Math.max(1, Math.round(words / 200));
}
