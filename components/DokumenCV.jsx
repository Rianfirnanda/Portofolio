'use client';

import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import { susunCV } from '@/lib/isi-dokumen';
import { docxCV, namaBerkasDocx } from '@/lib/docx-dokumen';
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
 *  -----------------------------------------------------------------------------
 *  DARI MANA ISINYA
 *  -----------------------------------------------------------------------------
 *  Berkas ini cuma menggambar. Susunan isinya, termasuk urutan bagian dan
 *  aturan aturan kecil seperti melewati lokasi yang sudah termuat di nama
 *  instansi, ada di lib/isi-dokumen.js.
 *
 *  Pemisahan itu bukan kerapian belaka. CV ini keluar dalam dua bentuk, PDF
 *  dan Word, dan keduanya membaca susunan yang sama. Kalau susunannya ditulis
 *  di sini, menambah satu bagian lewat panel berarti mengubah dua berkas, dan
 *  yang terlupa baru ketahuan setelah berkasnya sampai ke perekrut.
 * =============================================================================
 */
export default function DokumenCV() {
  const { lang, t } = useLanguage();
  const model = susunCV({ portfolio, t, lang });

  /**
   * Satu tautan di dalam CV. Warnanya diwarisi dari teks sekitarnya, jadi
   * tetap hitam seperti CV Harvard pada umumnya, tapi di dalam PDF tetap
   * bisa diklik.
   */
  const Tautan = ({ href, children }) =>
    href ? (
      <a className="cv-tautan" href={href} rel="noopener noreferrer">
        {children}
      </a>
    ) : (
      children
    );

  return (
    <div className="dok-lembar">
      <DokumenBilah
        judul="CV"
        lainHref="/cetak/portofolio/"
        lainLabel={lang === 'id' ? 'Lihat versi portofolio' : 'View portfolio version'}
        buatDocx={() => docxCV({ portfolio, t, lang })}
        namaDocx={namaBerkasDocx(model.nama, 'cv')}
      />

      <div className="dok-kertas">
        <article className="cv">
          {/* ---------------- Identitas ----------------
              Dipecah jadi dua baris, bukan satu baris panjang. Baris pertama
              yang selalu dibaca perekrut lebih dulu: tempat tinggal, nomor
              telepon, surel. Baris kedua barulah alamat web. */}
          <header>
            <h1 className="cv-nama">{model.nama}</h1>

            {model.kontak.map((baris, b) => (
              <p key={b} className="cv-kontak">
                {baris.map((item, i) => (
                  <span key={`${item.teks}-${i}`}>
                    {i > 0 ? <span className="cv-pemisah"> | </span> : null}
                    {item.href ? (
                      <Tautan href={item.href}>{item.teks}</Tautan>
                    ) : (
                      <span className={item.utuh ? 'cv-utuh' : undefined}>{item.teks}</span>
                    )}
                  </span>
                ))}
              </p>
            ))}
          </header>

          {model.bagian.map((bagian) => (
            <section key={bagian.kunci} className="cv-bagian">
              <h2 className="cv-judul">{bagian.judul}</h2>

              {/* Entri: nama instansi dan kotanya di kiri, tanggal rata kanan,
                  jabatan turun ke baris kedua. Satu bentuk yang sama untuk
                  seluruh CV, sesuai panduan Harvard. */}
              {bagian.tipe === 'entri'
                ? bagian.entri.map((entri, i) => (
                    <div key={i} className="cv-entri">
                      <div className="cv-baris">
                        <span className="cv-utama">
                          <Tautan href={entri.utamaHref}>{entri.utama}</Tautan>
                        </span>
                        <span className="cv-waktu">{entri.waktu}</span>
                      </div>

                      {entri.kedua != null ? (
                        <p className="cv-kedua cv-padat">{entri.kedua}</p>
                      ) : null}

                      {entri.bulir.length > 0 ? (
                        <ul className="cv-daftar">
                          {entri.bulir.map((isi, j) => (
                            <li key={j}>{isi}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))
                : null}

              {/* Daftar: dipakai sertifikasi. Nama sertifikatnya yang jadi
                  tautan ke bukti kreditnya, karena alamat bukti kredit
                  LinkedIn bisa lebih dari dua ratus huruf. */}
              {bagian.tipe === 'daftar' ? (
                <ul className="cv-daftar">
                  {bagian.butir.map((butir, i) => (
                    <li key={i}>
                      <Tautan href={butir.href}>{butir.teks}</Tautan>
                      {butir.ekor}
                    </li>
                  ))}
                </ul>
              ) : null}

              {/* Padat: baris berlabel, dipakai keahlian dan bahasa. */}
              {bagian.tipe === 'padat'
                ? bagian.baris.map((baris, i) => (
                    <p key={i} className="cv-padat">
                      {baris.label ? <span className="cv-utama">{baris.label}</span> : null}
                      {baris.isi}
                    </p>
                  ))
                : null}
            </section>
          ))}
        </article>
      </div>
    </div>
  );
}
