'use client';

import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import DokumenBilah from '@/components/DokumenBilah';

/**
 * =============================================================================
 *  DokumenCV: CV satu kolom gaya Harvard, ramah mesin pelacak lamaran.
 * =============================================================================
 *
 *  KENAPA TAMPILANNYA POLOS
 *  Sebagian besar lamaran kerja tidak langsung dibaca manusia. Berkasnya lebih
 *  dulu melewati mesin pelacak lamaran, yang membaca teksnya lalu memilah mana
 *  pendidikan, mana pengalaman, mana keahlian. Mesin seperti itu gampang
 *  tersandung, dan CV yang cantik di mata sering justru tidak terbaca olehnya.
 *
 *  Jadi semua yang ada di sini disengaja:
 *
 *    satu kolom        mesin membaca atas ke bawah, kolom mengacaukan urutan
 *    tanpa tabel       isi tabel sering terbaca berantakan atau terlewat
 *    tanpa foto        gambar tidak terbaca sama sekali, hanya menyita ruang
 *    tanpa ikon        sama alasannya
 *    huruf Arial       ada di semua sistem, tidak perlu disulih
 *    judul baku        PENDIDIKAN, PENGALAMAN, dan seterusnya
 *
 *  Susunannya mengikuti pola Harvard: identitas ringkas di atas, lalu
 *  pendidikan, pengalaman, dan seterusnya, masing masing dari yang terbaru.
 *
 *  Isinya diambil dari sumber yang sama dengan situs, jadi cukup perbarui
 *  lewat panel dan CV ini ikut berubah.
 * =============================================================================
 */

/** Mengabaikan nilai kosong maupun yang cuma berisi tanda hubung. */
function terisi(teks) {
  const bersih = String(teks ?? '').trim();
  if (bersih === '' || /^[-–—.]+$/.test(bersih)) return '';
  return bersih;
}

/**
 * Memecah satu paragraf menjadi beberapa butir.
 *
 * Pemecahan hanya dilakukan pada titik yang diikuti spasi lalu huruf kapital.
 * Aturan itu penting supaya nomor surat seperti "SK Rektor No. 1664/UN30.9"
 * tidak ikut terpotong, karena titik di situ diikuti angka, bukan huruf.
 */
function keBulir(teks) {
  const bersih = terisi(teks);
  if (!bersih) return [];

  const bagian = bersih
    .split(/(?<=\.)\s+(?=[A-Z])/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Kalau pemecahannya cuma menghasilkan satu potong, biarkan utuh.
  return bagian.length > 1 ? bagian : [bersih];
}

export default function DokumenCV() {
  const { lang, t } = useLanguage();
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

  // Baris kontak. Alamat web ditulis tanpa awalan https:// supaya ringkas,
  // tetapi tetap utuh sebagai teks yang bisa disalin.
  const kontak = [
    terisi(profile.location),
    terisi(contact.phone),
    terisi(contact.email),
    // Alamat portofolio ikut dicantumkan. Perekrut sering ingin melihat karya
    // sungguhannya, dan CV satu halaman ini tidak memuat semuanya.
    terisi(meta.baseUrl).replace(/^https?:\/\//, ''),
    ...social
      .filter((s) => s.href?.startsWith('http'))
      .map((s) => s.href.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')),
  ].filter(Boolean);

  const Bagian = ({ judul, children }) => (
    <section className="cv-bagian">
      <h2 className="cv-judul">{judul}</h2>
      {children}
    </section>
  );

  return (
    <div className="dok-lembar">
      <DokumenBilah
        judul="CV"
        lainHref="/cetak/portofolio/"
        lainLabel={lang === 'id' ? 'Lihat versi portofolio' : 'View portfolio version'}
      />

      <div className="dok-kertas">
        <article className="cv">
          {/* ---------------- Identitas ---------------- */}
          <header>
            <h1 className="cv-nama">{profile.name}</h1>
            <p className="cv-kontak">
              {kontak.map((baris) => (
                <span key={baris}>{baris}</span>
              ))}
            </p>
          </header>

          {/* ---------------- Pendidikan ---------------- */}
          {education.length > 0 ? (
            <Bagian judul={L.pendidikan}>
              {education.map((item, i) => (
                <div key={i} className="cv-entri">
                  <div className="cv-baris">
                    <span className="cv-utama">{t(item.school)}</span>
                    <span className="cv-waktu">{t(item.period)}</span>
                  </div>
                  <p className="cv-kedua cv-padat">
                    {[terisi(t(item.degree)), terisi(t(item.gpa))].filter(Boolean).join(', ')}
                  </p>
                  {terisi(t(item.notes)) ? (
                    <ul className="cv-daftar">
                      <li>{t(item.notes)}</li>
                    </ul>
                  ) : null}
                </div>
              ))}
            </Bagian>
          ) : null}

          {/* ---------------- Pengalaman ---------------- */}
          {experience.length > 0 ? (
            <Bagian judul={L.pengalaman}>
              {experience.map((item, i) => {
                const org = terisi(t(item.org));
                const lokasi = terisi(item.location);
                const jenis = terisi(t(item.type));
                const bulir = keBulir(t(item.description));

                return (
                  <div key={i} className="cv-entri">
                    {/* Nama instansi ditaruh di baris pertama kalau ada, karena
                        itu yang paling dicari mesin pelacak maupun perekrut. */}
                    <div className="cv-baris">
                      <span className="cv-utama">{org || t(item.role)}</span>
                      <span className="cv-waktu">{t(item.period)}</span>
                    </div>
                    <p className="cv-kedua cv-padat">
                      {[org ? t(item.role) : '', jenis, lokasi].filter(Boolean).join(', ')}
                    </p>
                    {bulir.length > 0 ? (
                      <ul className="cv-daftar">
                        {bulir.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </Bagian>
          ) : null}

          {/* ---------------- Publikasi ---------------- */}
          {publications.length > 0 ? (
            <Bagian judul={L.publikasi}>
              {publications.map((item, i) => (
                <div key={i} className="cv-entri">
                  <div className="cv-baris">
                    <span className="cv-utama">{t(item.title)}</span>
                    <span className="cv-waktu">{t(item.date)}</span>
                  </div>
                  <p className="cv-kedua cv-padat">
                    {[terisi(t(item.venue)), terisi(t(item.role))].filter(Boolean).join(', ')}
                  </p>
                  {item.url ? <p className="cv-padat">{item.url}</p> : null}
                </div>
              ))}
            </Bagian>
          ) : null}

          {/* ---------------- Kegiatan dan kepemimpinan ---------------- */}
          {volunteering.length > 0 ? (
            <Bagian judul={L.sukarela}>
              {volunteering.map((item, i) => {
                const org = terisi(t(item.org));
                const bulir = keBulir(t(item.description));
                return (
                  <div key={i} className="cv-entri">
                    <div className="cv-baris">
                      <span className="cv-utama">{org || t(item.role)}</span>
                      <span className="cv-waktu">{t(item.period)}</span>
                    </div>
                    {org ? <p className="cv-kedua cv-padat">{t(item.role)}</p> : null}
                    {bulir.length > 0 ? (
                      <ul className="cv-daftar">
                        {bulir.map((b, j) => (
                          <li key={j}>{b}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </Bagian>
          ) : null}

          {/* ---------------- Sertifikasi ---------------- */}
          {certifications.length > 0 ? (
            <Bagian judul={L.sertifikasi}>
              <ul className="cv-daftar">
                {certifications.map((item, i) => (
                  <li key={i}>
                    {/* Skor ikut dicantumkan karena untuk ujian seperti UKBI dan
                        TOEFL, angkanya justru yang paling dicari perekrut. */}
                    {[
                      terisi(t(item.name)),
                      terisi(t(item.issuer)),
                      terisi(item.year),
                      terisi(t(item.score)),
                    ]
                      .filter(Boolean)
                      .join(', ')}
                  </li>
                ))}
              </ul>
            </Bagian>
          ) : null}

          {/* ---------------- Keahlian ---------------- */}
          {skills.groups?.length > 0 ? (
            <Bagian judul={L.keahlian}>
              {skills.groups.map((grup, i) => (
                <p key={i} className="cv-padat">
                  <span className="cv-utama">{t(grup.title)}: </span>
                  {grup.items.join(', ')}
                </p>
              ))}
            </Bagian>
          ) : null}

          {/* ---------------- Bahasa ---------------- */}
          {languages.length > 0 ? (
            <Bagian judul={L.bahasa}>
              <p className="cv-padat">
                {languages.map((b) => `${t(b.name)} (${t(b.level)})`).join(', ')}
              </p>
            </Bagian>
          ) : null}
        </article>
      </div>
    </div>
  );
}
