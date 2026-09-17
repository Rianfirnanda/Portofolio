'use client';

import { useEffect, useRef, useState } from 'react';
import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import { namaBerkasVCard, susunVCard } from '@/lib/vcard';
import Icon from '@/components/Icon';

/**
 * SimpanKontak: tombol yang mengunduh kartu kontak .vcf.
 *
 * Menyalin email itu satu langkah. Menyimpannya jadi kontak, lengkap dengan
 * nama, jabatan, nomor, dan tautan profil, itu yang sebenarnya diinginkan
 * perekrut yang baru selesai membaca halaman ini. Berkasnya dirakit di
 * peramban, jadi tidak ada data yang dikirim ke mana pun.
 *
 * Matikan lewat panel, Sentuhan Interaktif > Tombol simpan kontak.
 */
export default function SimpanKontak({ className = '' }) {
  const { t } = useLanguage();
  const [selesai, setSelesai] = useState(false);
  const jamRef = useRef(null);

  useEffect(() => () => clearTimeout(jamRef.current), []);

  if (portfolio.appearance?.saveContact === false) return null;

  const { profile, contact, social, meta } = portfolio;

  /*
    TITLE di vCard itu jabatan, dan buku alamat menampilkannya satu baris di
    bawah nama. Kalimat pembuka di panel sering lebih panjang dari itu, jadi
    yang dipakai cuma kalimat pertamanya.
  */
  const jabatan = t(profile.headline).split(/(?<=\.)\s+/)[0].replace(/\.$/, '');

  const unduh = () => {
    const isi = susunVCard({
      name: profile.name,
      headline: jabatan,
      org: t(portfolio.experience?.[0]?.org) || '',
      location: profile.location,
      email: contact.email,
      phone: contact.phone,
      url: meta.baseUrl,
      social: (social ?? []).map((item) => item.href).filter((href) => href.startsWith('http')),
    });

    const berkas = new Blob([isi], { type: 'text/vcard;charset=utf-8' });
    const alamat = URL.createObjectURL(berkas);
    const tautan = document.createElement('a');
    tautan.href = alamat;
    tautan.download = namaBerkasVCard(profile.name);
    document.body.appendChild(tautan);
    tautan.click();
    document.body.removeChild(tautan);
    // Dibebaskan setelah unduhan sempat dimulai. Dicabut seketika, sebagian
    // peramban seluler membatalkan unduhannya sendiri.
    setTimeout(() => URL.revokeObjectURL(alamat), 4000);

    setSelesai(true);
    clearTimeout(jamRef.current);
    jamRef.current = setTimeout(() => setSelesai(false), 2200);
  };

  return (
    <button
      type="button"
      onClick={unduh}
      title={t(portfolio.ui.saveContactHint)}
      className={`btn-ghost ${className}`.trim()}
    >
      <Icon name={selesai ? 'check' : 'user-round-plus'} className="h-4 w-4" />
      {t(portfolio.ui.saveContact)}
    </button>
  );
}
