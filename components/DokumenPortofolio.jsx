'use client';

import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import { susunPortofolio } from '@/lib/isi-dokumen';
import { ambilFoto, docxPortofolio, namaBerkasDocx } from '@/lib/docx-dokumen';
import { withBasePath } from '@/lib/asset';
import DokumenBilah from '@/components/DokumenBilah';

/**
 * =============================================================================
 *  DokumenPortofolio: berkas portofolio lengkap, siap disimpan atau diunduh.
 * =============================================================================
 *
 *  Dibuat sebagai halaman tersendiri, bukan hasil mencetak halaman utama.
 *  Alasannya sederhana: halaman utama dirancang untuk layar, dengan latar
 *  bergerak, kartu kaca, gambar hiasan, dan teks yang sengaja dipotong lalu
 *  bisa dibuka. Semua itu bagus di layar dan buruk di atas kertas.
 *
 *  Di sini semuanya kebalikannya:
 *
 *    teks utuh           tidak ada yang dipotong "Selengkapnya"
 *    hitam di atas putih apa pun tema yang sedang dipakai pengunjung
 *    tanpa hiasan        tidak ada gambar penghias yang memakan satu halaman
 *    pemenggalan diatur  satu entri tidak pernah terbelah dua halaman
 *
 *  Susunan isinya diambil dari lib/isi-dokumen.js, sumber yang sama dengan
 *  versi Word. Lihat penjelasan di components/DokumenCV.jsx untuk alasannya.
 * =============================================================================
 */
export default function DokumenPortofolio() {
  const { lang, t } = useLanguage();
  const model = susunPortofolio({ portfolio, t, lang });

  /*
    Versi Word disusun saat tombolnya ditekan, bukan saat halaman dibuka.
    Fotonya perlu diunduh dan diukur dulu, dan pekerjaan sebesar itu tidak
    pantas dibebankan pada pengunjung yang cuma mau membaca.
  */
  const buatDocx = async () => {
    const foto = model.foto ? await ambilFoto(withBasePath(model.foto)) : null;
    return docxPortofolio({ portfolio, t, lang, foto });
  };

  return (
    <div className="dok-lembar">
      <DokumenBilah
        judul={lang === 'id' ? 'Portofolio' : 'Portfolio'}
        lainHref="/cetak/cv/"
        lainLabel={lang === 'id' ? 'Lihat versi CV' : 'View CV version'}
        buatDocx={buatDocx}
        namaDocx={namaBerkasDocx(model.nama, 'portofolio')}
      />

      <div className="dok-kertas">
        <article className="dok">
          {/* ---------------- Kepala dokumen ---------------- */}
          <header className="dok-kepala">
            {model.foto ? (
              <img className="dok-foto" src={withBasePath(model.foto)} alt={model.fotoAlt} />
            ) : null}

            <div>
              <h1 className="dok-nama">{model.nama}</h1>
              <p className="dok-headline">{model.headline}</p>

              {/* Alamat situs ikut di baris kontak, bukan di catatan kaki. Di
                  sini dia langsung terlihat pembaca, dan dokumennya tidak lagi
                  menyisakan lembar terakhir yang isinya cuma satu baris. */}
              <p className="dok-kontak">
                {model.kontak.map((isi) => (
                  <span key={isi}>{isi}</span>
                ))}
              </p>

              {model.tautan.length > 0 ? (
                <p className="dok-kontak">
                  {model.tautan.map((tautan) => (
                    <span key={tautan.href}>
                      {tautan.label}: {tautan.alamat}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </header>

          {model.bagian.map((bagian) => (
            <section key={bagian.kunci} className="dok-bagian">
              <h2 className="dok-judul">{bagian.judul}</h2>

              {bagian.tipe === 'paragraf'
                ? bagian.paragraf.map((teks, i) => (
                    <p key={i} className="dok-teks" style={i === 0 ? { marginTop: 0 } : undefined}>
                      {teks}
                    </p>
                  ))
                : null}

              {bagian.tipe === 'entri'
                ? bagian.entri.map((entri, i) => (
                    <div key={i} className="dok-entri">
                      <div className="dok-baris">
                        <h3 className="dok-peran">{entri.utama}</h3>
                        <span className="dok-waktu">{entri.waktu}</span>
                      </div>
                      {entri.kedua ? <p className="dok-org">{entri.kedua}</p> : null}
                      {entri.teks ? <p className="dok-teks">{entri.teks}</p> : null}
                      {entri.tag ? (
                        <p className="dok-tag">
                          {entri.tag.label ? <strong>{entri.tag.label}:</strong> : null}{' '}
                          {entri.tag.isi}
                        </p>
                      ) : null}
                    </div>
                  ))
                : null}

              {bagian.tipe === 'ringkas' ? (
                <div className="dok-dua-kolom">
                  {bagian.butir.map((butir, i) => (
                    <div key={i} className="dok-entri" style={{ marginBottom: '0.5rem' }}>
                      <p className="dok-peran" style={{ fontSize: '9.5pt' }}>
                        {butir.utama}
                      </p>
                      <p className="dok-tag" style={{ marginTop: '0.05rem' }}>
                        {butir.kedua}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              {/* Bahasa ikut di bagian keahlian, bukan bagian tersendiri.
                  Isinya cuma satu baris, dan sebagai bagian terpisah dia
                  sering terdorong ke halaman baru sendirian. */}
              {bagian.tipe === 'padat'
                ? bagian.baris.map((baris, i) => (
                    <p key={i} className="dok-tag" style={{ marginTop: i === 0 ? 0 : '0.3rem' }}>
                      {baris.label ? <strong>{baris.label}:</strong> : null} {baris.isi}
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
