/**
 * Helper dua bahasa (ID/EN) tanpa library i18n.
 *
 * Nilai di data/portfolio.js boleh berupa:
 *   - string biasa            -> dipakai apa adanya di kedua bahasa
 *   - { id: '...', en: '...' } -> dipilih sesuai bahasa aktif
 *   - array dari keduanya      -> dipetakan satu per satu
 */

/** Daftar bahasa yang didukung. */
export const LANGUAGES = ['id', 'en'];

/**
 * Ambil teks sesuai bahasa aktif.
 * @param {string|{id?: string, en?: string}|null|undefined} value
 * @param {'id'|'en'} lang
 * @returns {string}
 */
export function t(value, lang = 'id') {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (typeof value === 'object') return value[lang] ?? value.id ?? value.en ?? '';
  return '';
}

/**
 * Versi array dari `t()` — berguna untuk daftar chip/paragraf.
 * @param {Array} list
 * @param {'id'|'en'} lang
 * @returns {string[]}
 */
export function tList(list, lang = 'id') {
  if (!Array.isArray(list)) return [];
  return list.map((item) => t(item, lang));
}
