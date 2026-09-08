/**
 * =============================================================================
 *  lib/teks-dokumen.js  |  MEMBERSIHKAN TEKS UNTUK CV DAN PORTOFOLIO
 * =============================================================================
 *
 *  Dipakai bersama oleh components/DokumenCV.jsx dan
 *  components/DokumenPortofolio.jsx. Dulu fungsi ini ditulis dua kali, satu di
 *  tiap berkas, dan itu artinya tiap perbaikan harus diingat dua kali juga.
 * =============================================================================
 */

/**
 * Mengabaikan nilai kosong maupun yang cuma berisi tanda hubung.
 *
 * -----------------------------------------------------------------------------
 * KENAPA FUNGSI INI IKUT MENGURUS ISIAN DUA BAHASA
 * -----------------------------------------------------------------------------
 * Ini jaring pengaman, bukan jalur utama. Jalur utamanya tetap membungkus
 * nilainya dengan t() lebih dulu, supaya isinya ikut berganti saat pengunjung
 * menekan tombol ID/EN.
 *
 * Jaringnya dipasang karena satu kejadian nyata. Kolom Lokasi di menu
 * Pengalaman diubah jadi dua bahasa, jadi isinya bukan lagi teks biasa
 * melainkan objek {id, en}. Di satu baris kode, t() terlewat, dan objek itu
 * dipaksa jadi teks oleh join(). Hasilnya CV yang dicetak memuat tulisan
 * "[object Object]" di setiap entri pengalaman.
 *
 * Yang membuatnya buruk bukan cuma jeleknya, tapi ke mana berkas itu pergi:
 * CV dikirim ke lowongan kerja. Kesalahan seperti itu tidak boleh menunggu
 * dilihat orang lebih dulu.
 *
 * Jadi kalau suatu saat ada kolom lain yang diubah jadi dua bahasa dan t()-nya
 * terlewat lagi, yang tercetak adalah teks Indonesianya, bukan sampah. Salah
 * bahasa masih bisa dimaafkan pembaca, "[object Object]" tidak.
 *
 * @param {unknown} teks nilai dari data, boleh teks, angka, atau objek {id, en}
 * @returns {string} teks yang siap dicetak, atau string kosong
 */
export function terisi(teks) {
  /*
    Dipilih dengan || dan pemeriksaan isi, bukan dengan ??.

    Tanda ?? cuma jatuh ke cadangan saat nilainya null atau undefined, padahal
    bentuk yang paling sering muncul di data ini adalah { id: 'sesuatu',
    en: '' }. Dengan ??, kolom Inggris yang berisi string kosong dianggap
    sudah terisi, dan yang tercetak justru kekosongan.
  */
  const mentah =
    teks && typeof teks === 'object' && !Array.isArray(teks)
      ? [teks.id, teks.en].find((n) => typeof n === 'string' && n.trim() !== '') ?? ''
      : teks;

  const bersih = String(mentah ?? '').trim();
  if (bersih === '' || /^[-–—.]+$/.test(bersih)) return '';
  return bersih;
}
