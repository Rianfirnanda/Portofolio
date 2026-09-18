/**
 * =============================================================================
 *  lib/isi-dokumen.js  |  SATU SUSUNAN ISI, TIGA BENTUK KELUARAN
 * =============================================================================
 *
 *  KENAPA ADA
 *  CV dan portofolio kini bisa keluar dalam tiga bentuk: halaman di layar,
 *  PDF hasil cetak, dan berkas Word. Sebelum berkas Word ada, susunan isinya
 *  ditulis langsung di dalam komponen tampilannya. Begitu bentuk ketiga
 *  muncul, susunan itu harus ditulis dua kali, dan dua salinan yang harus
 *  diingat bersamaan selalu berakhir sama: satu diperbaiki, satunya lupa.
 *
 *  Untuk CV taruhannya besar. Berkas itu dikirim ke lowongan kerja. Kalau
 *  suatu saat kamu menambah bagian baru lewat panel dan yang ikut berubah
 *  cuma versi PDF-nya, kamu baru tahu setelah versi Word yang kurang satu
 *  bagian sudah sampai ke meja perekrut.
 *
 *  Jadi susunannya dipindah ke sini, dalam bentuk yang tidak tahu apa apa
 *  soal HTML maupun Word. Komponen tampilan membacanya jadi elemen, penulis
 *  Word membacanya jadi paragraf. Menambah bagian cukup sekali di sini.
 *
 *  BENTUK SUSUNANNYA
 *  Tiap bagian punya satu dari tiga wujud, dan wujud itu menentukan cara
 *  membacanya:
 *
 *    entri    nama instansi dan tanggal sebaris, keterangan di bawahnya
 *    daftar   deretan butir satu baris, misalnya sertifikasi
 *    padat    baris berlabel, misalnya "Keahlian Teknis: Excel, SPSS"
 * =============================================================================
 */

import { barisInstansi, rapikanTanggal, terisi } from '@/lib/teks-dokumen';
import { labelTautan } from '@/lib/tautan-cv';

/**
 * Memecah satu paragraf menjadi beberapa butir.
 *
 * Pemecahan hanya dilakukan pada titik yang diikuti spasi lalu huruf kapital.
 * Aturan itu penting supaya nomor surat seperti "SK Rektor No. 1664/UN30.9"
 * tidak ikut terpotong, karena titik di situ diikuti angka, bukan huruf.
 *
 * @param {unknown} teks
 * @returns {string[]}
 */
export function keBulir(teks) {
  const bersih = terisi(teks);
  if (!bersih) return [];

  const bagian = bersih
    .split(/(?<=\.)\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Kalau pemecahannya cuma menghasilkan satu potong, biarkan utuh.
  return bagian.length > 1 ? bagian : [bersih];
}

/** Menggabungkan beberapa isian jadi satu baris, melewati yang kosong. */
const gabung = (daftar, pemisah = ', ') => daftar.filter(Boolean).join(pemisah);

/* ===========================================================================
 *  CV gaya Harvard
 * =========================================================================== */

/**
 * Menyusun seluruh isi CV.
 *
 * @param {object} arg
 * @param {object} arg.portfolio seluruh data situs
 * @param {(nilai: unknown) => string} arg.t pemilih bahasa
 * @param {'id'|'en'} arg.lang
 * @returns {{nama: string, kontak: object[][], bagian: object[]}}
 */
export function susunCV({ portfolio, t, lang }) {
  const {
    profile,
    contact,
    social,
    experience,
    education,
    publications,
    certifications,
    skills,
    languages,
    volunteering,
    meta,
  } = portfolio;

  const L =
    lang === 'id'
      ? {
          pendidikan: 'Pendidikan',
          pengalaman: 'Pengalaman',
          publikasi: 'Publikasi',
          sukarela: 'Kegiatan dan Kepemimpinan',
          sertifikasi: 'Sertifikasi',
          keahlian: 'Keahlian',
          bahasa: 'Bahasa',
        }
      : {
          pendidikan: 'Education',
          pengalaman: 'Experience',
          publikasi: 'Publications',
          sukarela: 'Leadership and Activities',
          sertifikasi: 'Certifications',
          keahlian: 'Skills',
          bahasa: 'Languages',
        };

  /*
    Identitas dipecah jadi dua baris, bukan satu baris panjang.

    Baris pertama yang selalu dibaca perekrut lebih dulu: tempat tinggal,
    nomor telepon, surel. Baris kedua barulah alamat web. Dulu kesembilannya
    dijejer dalam satu paragraf, dan hasilnya alamat panjang terpotong di
    tengah tengah sehingga tidak bisa disalin maupun diklik.
  */
  const jati = [terisi(profile.location), terisi(contact.phone)].filter(Boolean);
  const surel = terisi(contact.email);

  const barisSatu = [
    ...jati.map((teks) => ({ teks, utuh: true })),
    ...(surel ? [{ teks: surel, href: `mailto:${surel}` }] : []),
  ];

  /*
    Alamat web. Yang pendek ditulis apa adanya supaya mesin pelacak lamaran
    tetap membaca alamatnya, yang panjang diganti namanya. Lihat
    lib/tautan-cv.js untuk alasan lengkapnya.
  */
  const barisDua = [
    terisi(meta.baseUrl) ? { href: meta.baseUrl, nama: 'Portofolio' } : null,
    ...social
      .filter((s) => s.href?.startsWith('http'))
      .map((s) => ({ href: s.href, nama: terisi(t(s.label)) })),
  ]
    .filter(Boolean)
    .map((item) => ({ teks: labelTautan(item.href, item.nama), href: item.href }));

  const bagian = [];

  /* ---------------- Pendidikan ---------------- */
  if (education.length > 0) {
    bagian.push({
      kunci: 'pendidikan',
      judul: L.pendidikan,
      tipe: 'entri',
      /*
        Sekolah dan kotanya di kiri, tanggal rata kanan, gelar turun ke baris
        kedua. Susunan yang sama dengan bagian Pengalaman, dan itu memang
        disengaja: panduan Harvard memakai satu bentuk entri untuk seluruh CV.
      */
      entri: education.map((item) => ({
        utama: barisInstansi(t(item.school), t(item.location)),
        waktu: rapikanTanggal(t(item.period)),
        kedua: gabung([terisi(t(item.degree)), terisi(t(item.gpa))]),
        bulir: terisi(t(item.notes)) ? [terisi(t(item.notes))] : [],
      })),
    });
  }

  /* ---------------- Pengalaman ---------------- */
  if (experience.length > 0) {
    bagian.push({
      kunci: 'pengalaman',
      judul: L.pengalaman,
      tipe: 'entri',
      entri: experience.map((item) => {
        const org = terisi(t(item.org));
        const peran = terisi(t(item.role));
        const jenis = terisi(t(item.type));

        /*
          Jenis dilewati kalau isinya sama dengan jabatannya. Tanpa penjagaan
          ini, satu entri di data ini tercetak sebagai "Magang, Magang".
        */
        const sama = jenis.toLowerCase() === peran.toLowerCase();
        const barisKedua = gabung([peran, sama ? '' : jenis]);

        /*
          Susunan baku Harvard, dan urutannya bukan selera:

            baris 1 kiri   nama instansi, lalu kotanya
            baris 1 kanan  tanggal
            baris 2        jabatan
        */
        return {
          utama: org ? barisInstansi(org, terisi(t(item.location))) : peran,
          waktu: rapikanTanggal(t(item.period)),
          kedua: org && barisKedua ? barisKedua : null,
          bulir: keBulir(t(item.description)),
        };
      }),
    });
  }

  /* ---------------- Publikasi ---------------- */
  if (publications.length > 0) {
    bagian.push({
      kunci: 'publikasi',
      judul: L.publikasi,
      tipe: 'entri',
      /*
        Judulnya sendiri yang jadi tautan. Alamat publikasi sering panjang
        sekali, dan mencetaknya sebagai baris tersendiri cuma menghabiskan
        ruang tanpa menambah keterangan apa pun buat perekrut.
      */
      entri: publications.map((item) => ({
        utama: terisi(t(item.title)),
        utamaHref: item.url,
        waktu: rapikanTanggal(t(item.date)),
        kedua: gabung([terisi(t(item.venue)), terisi(t(item.role))]),
        bulir: [],
      })),
    });
  }

  /* ---------------- Kegiatan dan kepemimpinan ---------------- */
  if (volunteering.length > 0) {
    bagian.push({
      kunci: 'sukarela',
      judul: L.sukarela,
      tipe: 'entri',
      entri: volunteering.map((item) => {
        const org = terisi(t(item.org));
        return {
          utama: barisInstansi(org || terisi(t(item.role)), terisi(t(item.location))),
          waktu: rapikanTanggal(t(item.period)),
          kedua: org ? terisi(t(item.role)) : null,
          bulir: keBulir(t(item.description)),
        };
      }),
    });
  }

  /* ---------------- Sertifikasi ----------------
     Diurutkan dari tahun terbaru. Panduan Harvard meminta tiap bagian disusun
     terbalik menurut waktu. Urutan di data mengikuti kapan kamu memasukkannya
     lewat panel, dan hasilnya melompat lompat. Diurutkan di sini, bukan di
     data, supaya kamu tetap bebas menyusunnya sesuka hati di panel.

     Angka tahun diambil dengan parseInt supaya isian seperti "2026" maupun
     "Mei 2026" sama sama terbaca. Yang tidak berisi angka ditaruh di belakang. */
  if (certifications.length > 0) {
    const terurut = [...certifications].sort((a, b) => {
      const tahun = (x) => Number.parseInt(String(x.year ?? '').match(/\d{4}/)?.[0] ?? '0', 10);
      return tahun(b) - tahun(a);
    });

    bagian.push({
      kunci: 'sertifikasi',
      judul: L.sertifikasi,
      tipe: 'daftar',
      /*
        Nama sertifikatnya yang jadi tautan ke bukti kreditnya. Alamat bukti
        kredit LinkedIn panjangnya bisa lebih dari dua ratus huruf, jadi
        mencetaknya sebagai teks bukan pilihan.

        Skor ikut dicantumkan karena untuk ujian seperti UKBI dan TOEFL,
        angkanya justru yang paling dicari perekrut.
      */
      butir: terurut.map((item) => ({
        teks: terisi(t(item.name)),
        href: item.credentialUrl,
        ekor: [terisi(t(item.issuer)), terisi(item.year), terisi(t(item.score))]
          .filter(Boolean)
          .map((isi) => `, ${isi}`)
          .join(''),
      })),
    });
  }

  /* ---------------- Keahlian ---------------- */
  if (skills.groups?.length > 0) {
    bagian.push({
      kunci: 'keahlian',
      judul: L.keahlian,
      tipe: 'padat',
      baris: skills.groups.map((grup) => ({
        label: `${terisi(t(grup.title))}: `,
        isi: grup.items.join(', '),
      })),
    });
  }

  /* ---------------- Bahasa ---------------- */
  if (languages.length > 0) {
    bagian.push({
      kunci: 'bahasa',
      judul: L.bahasa,
      tipe: 'padat',
      baris: [{ isi: languages.map((b) => `${terisi(t(b.name))} (${terisi(t(b.level))})`).join(', ') }],
    });
  }

  return {
    nama: profile.name,
    kontak: [barisSatu, barisDua].filter((baris) => baris.length > 0),
    bagian,
  };
}

/* ===========================================================================
 *  Portofolio lengkap
 * =========================================================================== */

/**
 * Menyusun seluruh isi dokumen portofolio.
 *
 * Bedanya dengan CV: dokumen ini untuk dibaca manusia, jadi boleh berfoto,
 * boleh lebih panjang, dan keterangannya tidak dipecah jadi butir.
 *
 * @param {object} arg
 * @param {object} arg.portfolio
 * @param {(nilai: unknown) => string} arg.t
 * @param {'id'|'en'} arg.lang
 */
export function susunPortofolio({ portfolio, t, lang }) {
  const {
    profile,
    contact,
    social,
    experience,
    education,
    publications,
    projects,
    certifications,
    skills,
    languages,
    volunteering,
    meta,
  } = portfolio;

  const L = {
    ringkasan: lang === 'id' ? 'Ringkasan' : 'Summary',
    pengalaman: lang === 'id' ? 'Pengalaman' : 'Experience',
    pendidikan: lang === 'id' ? 'Pendidikan' : 'Education',
    publikasi: lang === 'id' ? 'Publikasi' : 'Publications',
    proyek: lang === 'id' ? 'Proyek' : 'Projects',
    sertifikasi: lang === 'id' ? 'Sertifikasi' : 'Certifications',
    keahlian: lang === 'id' ? 'Keahlian' : 'Skills',
    bahasa: lang === 'id' ? 'Bahasa' : 'Languages',
    sukarela: lang === 'id' ? 'Kesukarelawanan' : 'Volunteering',
    kompetensi: lang === 'id' ? 'Kompetensi' : 'Skills',
  };

  const ringkasan = lang === 'en' ? profile.summaryEn ?? profile.summaryId : profile.summaryId;
  const sosial = social.filter((s) => s.href?.startsWith('http'));

  const bagian = [];

  if (ringkasan?.length > 0) {
    bagian.push({ kunci: 'ringkasan', judul: L.ringkasan, tipe: 'paragraf', paragraf: ringkasan });
  }

  if (experience.length > 0) {
    bagian.push({
      kunci: 'pengalaman',
      judul: L.pengalaman,
      tipe: 'entri',
      entri: experience.map((item) => ({
        utama: terisi(t(item.role)),
        waktu: terisi(t(item.period)),
        kedua: gabung([terisi(t(item.org)), terisi(t(item.type)), terisi(t(item.location))], ' · '),
        teks: terisi(t(item.description)),
        tag: item.skills?.length > 0 ? { label: L.kompetensi, isi: item.skills.join(' · ') } : null,
      })),
    });
  }

  if (education.length > 0) {
    bagian.push({
      kunci: 'pendidikan',
      judul: L.pendidikan,
      tipe: 'entri',
      entri: education.map((item) => ({
        utama: terisi(t(item.degree)),
        waktu: terisi(t(item.period)),
        kedua: gabung([terisi(t(item.school)), terisi(t(item.gpa))], ' · '),
        teks: terisi(t(item.notes)),
        tag: null,
      })),
    });
  }

  if (publications.length > 0) {
    bagian.push({
      kunci: 'publikasi',
      judul: L.publikasi,
      tipe: 'entri',
      entri: publications.map((item) => ({
        utama: terisi(t(item.title)),
        waktu: terisi(t(item.date)),
        kedua: gabung([terisi(t(item.venue)), terisi(t(item.role))], ' · '),
        teks: terisi(t(item.abstract)),
        tag: terisi(item.url) ? { isi: item.url, href: item.url } : null,
      })),
    });
  }

  if (projects.length > 0) {
    bagian.push({
      kunci: 'proyek',
      judul: L.proyek,
      tipe: 'entri',
      entri: projects.map((item) => ({
        utama: terisi(t(item.name)),
        waktu: terisi(t(item.period)),
        kedua: terisi(t(item.org)),
        teks: terisi(t(item.description)),
        tag: item.tags?.length > 0 ? { isi: item.tags.join(' · ') } : null,
      })),
    });
  }

  if (volunteering.length > 0) {
    bagian.push({
      kunci: 'sukarela',
      judul: L.sukarela,
      tipe: 'entri',
      entri: volunteering.map((item) => ({
        utama: terisi(t(item.role)),
        waktu: terisi(t(item.period)),
        kedua: terisi(t(item.org)),
        teks: terisi(t(item.description)),
        tag: null,
      })),
    });
  }

  if (certifications.length > 0) {
    bagian.push({
      kunci: 'sertifikasi',
      judul: L.sertifikasi,
      tipe: 'ringkas',
      butir: certifications.map((item) => ({
        utama: terisi(t(item.name)),
        kedua: gabung(
          [terisi(t(item.issuer)), terisi(item.year), terisi(t(item.score))],
          ' · ',
        ),
      })),
    });
  }

  /* Bahasa digabung ke bagian keahlian, bukan dijadikan bagian tersendiri.
     Isinya cuma satu baris, dan sebagai bagian terpisah dia sering terdorong
     ke halaman baru sendirian sehingga menyisakan lembar yang hampir kosong. */
  if (skills.groups?.length > 0 || languages.length > 0) {
    bagian.push({
      kunci: 'keahlian',
      judul: L.keahlian,
      tipe: 'padat',
      baris: [
        ...(skills.groups ?? []).map((grup) => ({
          label: terisi(t(grup.title)),
          isi: grup.items.join(' · '),
        })),
        ...(languages.length > 0
          ? [
              {
                label: L.bahasa,
                isi: languages
                  .map((b) => `${terisi(t(b.name))} (${terisi(t(b.level))})`)
                  .join(' · '),
              },
            ]
          : []),
      ],
    });
  }

  return {
    nama: profile.name,
    headline: terisi(t(profile.headline)),
    foto: profile.avatar,
    fotoAlt: terisi(t(profile.avatarAlt)),
    /* Alamat situs ditaruh di baris kontak, bukan di catatan kaki. Di sini dia
       langsung terlihat pembaca, dan dokumennya tidak lagi menyisakan satu
       lembar terakhir yang isinya cuma satu baris. */
    kontak: [
      terisi(profile.location),
      terisi(contact.phone),
      terisi(contact.email),
      terisi(meta.baseUrl) ? meta.baseUrl.replace(/^https?:\/\//, '') : '',
    ].filter(Boolean),
    tautan: sosial.map((s) => ({
      label: terisi(t(s.label)),
      alamat: s.href.replace(/^https?:\/\/(www\.)?/, ''),
      href: s.href,
    })),
    bagian,
  };
}
