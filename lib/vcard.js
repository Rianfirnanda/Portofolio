/**
 * lib/vcard.js: menyusun kartu kontak .vcf dari isi panel.
 *
 * Format vCard 3.0 dipilih, bukan 4.0, karena 3.0 yang dibaca semua buku
 * alamat yang umum dipakai, termasuk Kontak bawaan Android dan iOS serta
 * Outlook. vCard 4.0 lebih rapi di atas kertas tetapi ditolak sebagian.
 *
 * Baris vCard dipisah CRLF, bukan LF. Ini bukan gaya penulisan, melainkan
 * syarat di RFC 6350, dan sebagian aplikasi memang gagal membaca berkas yang
 * memakai LF saja.
 */

/** Tanda titik dua, koma, dan titik koma harus dilepas supaya tidak memotong baris. */
const aman = (teks) =>
  String(teks ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\;');

/**
 * @param {{name: string, headline?: string, org?: string, location?: string,
 *          email?: string, phone?: string, url?: string, social?: string[]}} isi
 * @returns {string} isi berkas .vcf
 */
export function susunVCard(isi = {}) {
  const nama = String(isi.name ?? '').trim();
  const bagian = nama.split(/\s+/);
  const depan = bagian[0] ?? '';
  const belakang = bagian.slice(1).join(' ');

  const baris = ['BEGIN:VCARD', 'VERSION:3.0'];

  baris.push(`N:${aman(belakang)};${aman(depan)};;;`);
  baris.push(`FN:${aman(nama)}`);
  if (isi.headline) baris.push(`TITLE:${aman(isi.headline)}`);
  if (isi.org) baris.push(`ORG:${aman(isi.org)}`);
  if (isi.email) baris.push(`EMAIL;TYPE=INTERNET,PREF:${aman(isi.email)}`);
  if (isi.phone) baris.push(`TEL;TYPE=CELL:${aman(isi.phone.replace(/\s+/g, ''))}`);
  if (isi.location) baris.push(`ADR;TYPE=HOME:;;;${aman(isi.location)};;;`);
  if (isi.url) baris.push(`URL:${aman(isi.url)}`);
  (isi.social ?? []).filter(Boolean).forEach((alamat) => baris.push(`URL:${aman(alamat)}`));
  baris.push(`REV:${new Date().toISOString()}`);
  baris.push('END:VCARD');

  return baris.join('\r\n');
}

/** Nama berkas yang rapi: huruf kecil, spasi jadi tanda hubung. */
export function namaBerkasVCard(nama) {
  const bersih = String(nama ?? 'kontak')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${bersih || 'kontak'}.vcf`;
}

export default susunVCard;
