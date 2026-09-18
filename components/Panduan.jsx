'use client';

import Link from 'next/link';
import { panduan } from '@/data/panduan';
import { portfolio } from '@/data/portfolio';
import Icon from '@/components/Icon';

/**
 * =============================================================================
 *  Panduan: modul panduan penggunaan, dalam bentuk halaman.
 * =============================================================================
 *
 *  Isinya diambil dari data/panduan.js, sumber yang sama dengan berkas PDF
 *  di /panduan-penggunaan.pdf. Ditulis sekali, keluar dua bentuk.
 *
 *  Halaman ini sengaja tidak memakai perabot situs. Tidak ada navbar, tidak
 *  ada pemutar musik, tidak ada latar bergerak. Panduan dibaca orang yang
 *  sedang bingung, sering sambil membuka panel di jendela sebelah, dan yang
 *  dia butuhkan waktu itu cuma teks yang tenang.
 * =============================================================================
 */

/** Alamat bagian, dipakai daftar isi untuk melompat. */
const tautanBagian = (i) => `bagian-${i + 1}`;

/**
 * Menebalkan kata yang diapit tanda bintang.
 *
 * Satu satunya penataan yang ada di dalam teks panduan, dan sengaja cuma
 * satu. Penulis PDF-nya harus mengerti aturan yang sama, dan tiap aturan
 * tambahan berarti satu hal lagi yang bisa berbeda antara halaman dan PDF.
 *
 * @param {string} teks
 * @returns {Array<string|JSX.Element>}
 */
function tebalkan(teks) {
  return String(teks)
    .split(/(\*[^*]+\*)/g)
    .filter((potong) => potong !== '')
    .map((potong, i) =>
      potong.startsWith('*') && potong.endsWith('*') && potong.length > 2 ? (
        <strong key={i}>{potong.slice(1, -1)}</strong>
      ) : (
        potong
      ),
    );
}

/** Satu blok isi. Bentuknya ditentukan oleh properti `t`. */
function Blok({ blok }) {
  if (blok.t === 'p') return <p>{tebalkan(blok.teks)}</p>;

  if (blok.t === 'langkah') {
    return (
      <ol className="pan-langkah">
        {blok.butir.map((isi, i) => (
          <li key={i}>{tebalkan(isi)}</li>
        ))}
      </ol>
    );
  }

  if (blok.t === 'butir') {
    return (
      <ul className="pan-butir">
        {blok.butir.map((isi, i) => (
          <li key={i}>{tebalkan(isi)}</li>
        ))}
      </ul>
    );
  }

  if (blok.t === 'tabel') {
    return (
      <div className="pan-tabel-bungkus">
        <table>
          <thead>
            <tr>
              {blok.kepala.map((isi) => (
                <th key={isi}>{isi}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {blok.baris.map((baris, i) => (
              <tr key={i}>
                {baris.map((sel, j) => (
                  <td key={j}>{tebalkan(sel)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (blok.t === 'catatan') {
    return (
      <div className="pan-catatan">
        <p className="pan-catatan-judul">{blok.judul}</p>
        <p>{tebalkan(blok.teks)}</p>
      </div>
    );
  }

  return null;
}

export default function Panduan() {
  const tahun = new Date().getFullYear();

  return (
    <div className="pan-lembar">
      <div className="pan-bilah" data-cetak="sembunyi">
        <Link href="/">Kembali ke situs</Link>

        <div className="pan-bilah-kanan">
          <Link href="/admin">Buka panel</Link>

          {/* Berkas PDF-nya berkas sungguhan di dalam situs, bukan hasil
              mencetak halaman ini. Dibuat dari sumber yang sama, lihat
              scripts/generate-panduan.mjs. */}
          <a href="/panduan-penggunaan.pdf" target="_blank" rel="noopener" className="pan-utama">
            <Icon name="download" className="h-3.5 w-3.5" aria-hidden="true" />
            Unduh PDF
          </a>

          <button type="button" onClick={() => window.print()}>
            <Icon name="printer" className="h-3.5 w-3.5" aria-hidden="true" />
            Cetak
          </button>
        </div>
      </div>

      <div className="pan-kertas">
        <article className="pan">
          <header className="pan-kepala">
            <h1 className="pan-judul">{panduan.judul}</h1>
            <p className="pan-anak">
              {panduan.anak} &middot; {portfolio.profile.name}
            </p>
            {panduan.pembuka.map((teks, i) => (
              <p key={i} className="pan-pembuka">
                {tebalkan(teks)}
              </p>
            ))}
          </header>

          <nav className="pan-daftar-isi" aria-label="Daftar isi">
            <h2>Daftar isi</h2>
            <ol>
              {panduan.bagian.map((bagian, i) => (
                <li key={bagian.judul}>
                  <a href={`#${tautanBagian(i)}`}>{bagian.judul}</a>
                </li>
              ))}
            </ol>
          </nav>

          {panduan.bagian.map((bagian, i) => (
            <section key={bagian.judul} id={tautanBagian(i)} className="pan-bagian">
              <h2 className="pan-bagian-judul">
                <span className="pan-nomor">{String(i + 1).padStart(2, '0')}</span>
                <span>{bagian.judul}</span>
              </h2>

              {bagian.isi.map((blok, j) => (
                <Blok key={j} blok={blok} />
              ))}
            </section>
          ))}

          <footer className="pan-kaki">
            Panduan ini bagian dari situs {portfolio.profile.name}. Versinya selalu mengikuti situs,
            jadi kalau ada fitur yang berubah, halaman ini ikut berubah. {tahun}.
          </footer>
        </article>
      </div>
    </div>
  );
}
