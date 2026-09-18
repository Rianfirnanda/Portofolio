/**
 * =============================================================================
 *  lib/docx-dokumen.js  |  DARI SUSUNAN ISI MENJADI BERKAS WORD
 * =============================================================================
 *
 *  Modul ini jembatan antara dua hal yang sengaja tidak saling kenal:
 *
 *    lib/isi-dokumen.js   tahu apa isinya, tidak tahu bentuk keluarannya
 *    lib/docx.js          tahu cara menulis .docx, tidak tahu isinya apa
 *
 *  Yang diputuskan di sini cuma soal rupa: seberapa jauh jarak antarbagian,
 *  mana yang tebal, mana yang miring. Kalau suatu saat kamu menambah bagian
 *  baru di CV, kamu menambahnya di lib/isi-dokumen.js, dan berkas Word ikut
 *  memuatnya tanpa berkas ini disentuh sama sekali.
 *
 *  KENAPA UKURANNYA MIRIP TAPI TIDAK PERSIS SAMA DENGAN PDF
 *  PDF dibuat peramban dari CSS, Word menatanya sendiri. Dua mesin berbeda
 *  tidak akan pernah menghasilkan halaman yang sama persis. Yang dijaga sama
 *  adalah yang penting: urutan bagian, apa yang tebal, dan seluruh isinya.
 * =============================================================================
 */

import { buatDocx, mm, pt, namaAman } from '@/lib/docx';
import { susunCV, susunPortofolio } from '@/lib/isi-dokumen';

/** Jarak antarentri, disamakan dengan margin-bottom .cv-entri di cetak.css. */
const ANTAR_ENTRI = pt(8);

/**
 * Menyusun paragraf satu entri: baris instansi, baris keterangan, lalu butir.
 *
 * @param {object} entri
 * @param {number} tabKanan posisi tanggal rata kanan, dalam twip
 * @returns {object[]}
 */
function entriCV(entri, tabKanan) {
  const paragraf = [];

  /*
    Nama instansi dan tanggal berada pada baris yang sama, tanggal rata kanan.
    Di HTML itu dikerjakan flexbox. Di Word tidak ada flexbox, jadi caranya
    memasang perhentian tab rata kanan tepat di tepi kertas lalu menaruh satu
    tab di antara keduanya. Hasil cetaknya sama.
  */
  paragraf.push({
    tabKanan,
    lekatBawah: true,
    satuKesatuan: true,
    potong: [
      { teks: entri.utama, tebal: true, href: entri.utamaHref || undefined },
      ...(entri.waktu ? [{ teks: `\t${entri.waktu}` }] : []),
    ],
  });

  if (entri.kedua != null) {
    paragraf.push({
      atas: pt(1),
      lekatBawah: entri.bulir.length > 0,
      potong: [{ teks: entri.kedua, miring: true }],
    });
  }

  for (const isi of entri.bulir) {
    paragraf.push({ gaya: 'Butir', satuKesatuan: true, potong: [{ teks: isi }] });
  }

  // Jarak ke entri berikutnya dipasang pada paragraf terakhir entri ini.
  paragraf[paragraf.length - 1].bawah = ANTAR_ENTRI;
  return paragraf;
}

/**
 * Menyusun berkas Word untuk CV gaya Harvard.
 *
 * Aturan yang dijaga sama dengan versi cetaknya: satu kolom, huruf Arial,
 * tanpa tabel, tanpa gambar, tanpa kotak teks. Semua itu yang membuat mesin
 * pelacak lamaran bisa membacanya.
 *
 * @param {{portfolio: object, t: Function, lang: 'id'|'en'}} arg
 * @returns {Uint8Array}
 */
export function docxCV({ portfolio, t, lang }) {
  const model = susunCV({ portfolio, t, lang });

  // Lebar kertas A4 dikurangi tepi kiri dan kanan.
  const tabKanan = mm(210 - 16 - 16);

  const isi = [{ gaya: 'Judul', potong: [{ teks: model.nama }] }];

  for (const baris of model.kontak) {
    isi.push({
      rata: 'tengah',
      atas: pt(3),
      potong: baris.flatMap((item, i) => [
        ...(i > 0 ? [{ teks: ' | ', ukuran: 9.5 }] : []),
        { teks: item.teks, ukuran: 9.5, href: item.href || undefined },
      ]),
    });
  }

  for (const bagian of model.bagian) {
    isi.push({ gaya: 'Bagian', potong: [{ teks: bagian.judul }] });

    if (bagian.tipe === 'entri') {
      for (const entri of bagian.entri) isi.push(...entriCV(entri, tabKanan));
    }

    if (bagian.tipe === 'daftar') {
      for (const butir of bagian.butir) {
        isi.push({
          gaya: 'Butir',
          satuKesatuan: true,
          potong: [
            { teks: butir.teks, href: butir.href || undefined },
            ...(butir.ekor ? [{ teks: butir.ekor }] : []),
          ],
        });
      }
    }

    if (bagian.tipe === 'padat') {
      for (const baris of bagian.baris) {
        isi.push({
          atas: pt(1),
          potong: [
            ...(baris.label ? [{ teks: baris.label, tebal: true }] : []),
            { teks: baris.isi },
          ],
        });
      }
    }
  }

  return buatDocx({
    judul: `CV ${model.nama}`,
    penulis: model.nama,
    isi,
    huruf: 'Arial',
    ukuran: 10.5,
    // Sama dengan @page cv di app/cetak.css.
    tepi: { atas: mm(15), bawah: mm(15), kiri: mm(16), kanan: mm(16) },
    warnaJudul: '000000',
    // 1,4 kali tinggi baris, sama dengan line-height .cv.
    jarakBaris: 336,
  });
}

/**
 * Menyusun berkas Word untuk dokumen portofolio.
 *
 * Berbeda dari CV, berkas ini untuk dibaca manusia. Boleh berfoto, boleh
 * berwarna, dan keterangannya ditulis utuh sebagai paragraf.
 *
 * @param {{portfolio: object, t: Function, lang: 'id'|'en', foto?: object}} arg
 * @param {{bytes: Uint8Array, jenis: string, lebar: number, tinggi: number}} [arg.foto]
 *   foto profil yang sudah diunduh pemanggil, boleh dikosongkan
 * @returns {Uint8Array}
 */
export function docxPortofolio({ portfolio, t, lang, foto }) {
  const model = susunPortofolio({ portfolio, t, lang });
  const warna = '2F4BB8';
  const tabKanan = mm(210 - 15 - 15);

  const isi = [];

  if (foto) {
    isi.push({ gambar: { ...foto, alt: model.fotoAlt }, bawah: pt(6) });
  }

  isi.push({ gaya: 'Judul', rata: 'kiri', potong: [{ teks: model.nama }] });

  if (model.headline) {
    isi.push({ atas: pt(2), potong: [{ teks: model.headline }] });
  }

  if (model.kontak.length > 0) {
    isi.push({
      atas: pt(4),
      potong: [{ teks: model.kontak.join('  ·  '), ukuran: 9 }],
    });
  }

  for (const tautan of model.tautan) {
    isi.push({
      atas: pt(1),
      potong: [
        { teks: `${tautan.label}: `, ukuran: 9 },
        { teks: tautan.alamat, ukuran: 9, href: tautan.href },
      ],
    });
  }

  for (const bagian of model.bagian) {
    isi.push({ gaya: 'Bagian', potong: [{ teks: bagian.judul }] });

    if (bagian.tipe === 'paragraf') {
      bagian.paragraf.forEach((teks, i) => {
        isi.push({ atas: i === 0 ? 0 : pt(4), potong: [{ teks }] });
      });
    }

    if (bagian.tipe === 'entri') {
      for (const entri of bagian.entri) {
        const paragraf = [
          {
            tabKanan,
            lekatBawah: true,
            satuKesatuan: true,
            potong: [
              { teks: entri.utama, tebal: true },
              ...(entri.waktu ? [{ teks: `\t${entri.waktu}`, ukuran: 8.5 }] : []),
            ],
          },
        ];

        if (entri.kedua) {
          paragraf.push({ atas: pt(1), potong: [{ teks: entri.kedua, ukuran: 9.5, miring: true }] });
        }
        if (entri.teks) {
          paragraf.push({ atas: pt(3), potong: [{ teks: entri.teks }] });
        }
        if (entri.tag) {
          paragraf.push({
            atas: pt(3),
            potong: [
              ...(entri.tag.label ? [{ teks: `${entri.tag.label}: `, tebal: true, ukuran: 8.5 }] : []),
              { teks: entri.tag.isi, ukuran: 8.5, href: entri.tag.href || undefined },
            ],
          });
        }

        paragraf[paragraf.length - 1].bawah = pt(7);
        isi.push(...paragraf);
      }
    }

    /* Sertifikasi ditulis padat: nama di satu baris, penerbit dan tahun di
       bawahnya dengan huruf lebih kecil. Di PDF bagian ini dua kolom, di Word
       satu kolom, karena dua kolom di Word butuh tabel dan tabel adalah hal
       pertama yang dihindari dokumen yang mungkin ikut dibaca mesin. */
    if (bagian.tipe === 'ringkas') {
      for (const butir of bagian.butir) {
        isi.push({ atas: pt(3), lekatBawah: true, potong: [{ teks: butir.utama, tebal: true }] });
        if (butir.kedua) isi.push({ potong: [{ teks: butir.kedua, ukuran: 8.5 }] });
      }
    }

    if (bagian.tipe === 'padat') {
      for (const baris of bagian.baris) {
        isi.push({
          atas: pt(3),
          potong: [
            ...(baris.label ? [{ teks: `${baris.label}: `, tebal: true, ukuran: 9 }] : []),
            { teks: baris.isi, ukuran: 9 },
          ],
        });
      }
    }
  }

  return buatDocx({
    judul: `Portofolio ${model.nama}`,
    penulis: model.nama,
    isi,
    huruf: 'Calibri',
    ukuran: 10.5,
    // Sama dengan @page di app/cetak.css.
    tepi: { atas: mm(16), bawah: mm(16), kiri: mm(15), kanan: mm(15) },
    warnaJudul: warna,
    jarakBaris: 312,
  });
}

/**
 * Mengunduh foto profil lalu mengukurnya, supaya bisa disisipkan ke Word.
 *
 * Dibungkus try supaya kegagalan apa pun, entah gambarnya hilang atau
 * jaringannya putus, cuma berarti dokumennya keluar tanpa foto. Berkas yang
 * kurang satu foto masih berguna, berkas yang gagal dibuat sama sekali tidak.
 *
 * @param {string} alamat
 * @param {number} lebarMm lebar tampil yang diinginkan
 * @returns {Promise<object|null>}
 */
export async function ambilFoto(alamat, lebarMm = 26) {
  try {
    const jawaban = await fetch(alamat);
    if (!jawaban.ok) return null;

    const buffer = await jawaban.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    const jenis = (jawaban.headers.get('content-type') || '').includes('png') ? 'png' : 'jpeg';

    /*
      Ukuran asli gambar dibaca lewat createImageBitmap, bukan ditebak.
      Menebaknya berarti foto persegi panjang tampil gepeng di dalam Word.
    */
    const bitmap = await createImageBitmap(new Blob([bytes]));
    const rasio = bitmap.height / bitmap.width;
    bitmap.close?.();

    return {
      bytes,
      jenis,
      lebar: mm(lebarMm),
      tinggi: mm(lebarMm * rasio),
    };
  } catch {
    return null;
  }
}

/**
 * Menyusun nama berkas unduhan.
 *
 * @param {string} nama nama pemilik situs
 * @param {'cv'|'portofolio'} jenis
 * @returns {string}
 */
export function namaBerkasDocx(nama, jenis) {
  return `${jenis === 'cv' ? 'CV' : 'Portofolio'}-${namaAman(nama)}.docx`;
}
