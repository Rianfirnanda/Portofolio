'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { withBasePath } from '@/lib/asset';
import Icon from '@/components/Icon';

/**
 * =============================================================================
 *  PostAudio: pemutar audio pendamping satu tulisan.
 * =============================================================================
 *
 *  Menempel di bawah judul artikel, seperti tombol "dengarkan tulisan ini" di
 *  Substack. Dipakai untuk tiga hal:
 *
 *    narasi     rekaman kamu membacakan tulisannya
 *    podcast    obrolan atau wawancara yang jadi dasar tulisan
 *    lagu       musik yang cocok menemani tulisannya
 *
 *  CARA MENGISINYA
 *  Panel, Tulisan Blog, buka tulisannya, lalu bagian "Audio pendamping".
 *  Kosongkan kalau tulisan itu tidak punya audio, dan seluruh pemutar ini
 *  tidak ikut tampil.
 *
 *  Tidak pernah berbunyi sendiri. Pembaca yang menekan tombol putar.
 * =============================================================================
 */

/** Pilihan kecepatan putar, sama seperti pemutar podcast pada umumnya. */
const KECEPATAN = [1, 1.25, 1.5, 2];

const JENIS = {
  narasi: { ikon: 'headphones', id: 'Dengarkan tulisan ini', en: 'Listen to this post' },
  podcast: { ikon: 'music', id: 'Dengarkan podcastnya', en: 'Listen to the podcast' },
  lagu: { ikon: 'music', id: 'Musik penemani', en: 'Music to read along to' },
};

export default function PostAudio({ audio }) {
  const { lang, t } = useLanguage();
  const audioRef = useRef(null);
  const idBar = useId();

  const [main, setMain] = useState(false);
  const [posisi, setPosisi] = useState(0);
  const [durasi, setDurasi] = useState(0);
  const [kecepatan, setKecepatan] = useState(1);
  const [gagal, setGagal] = useState(false);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = kecepatan;
  }, [kecepatan]);

  if (!audio?.file || gagal) return null;

  const jenis = JENIS[audio.kind] ?? JENIS.narasi;
  const judul = t(audio.title) || jenis[lang] || jenis.id;

  const putarJeda = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) el.play().then(() => setMain(true)).catch(() => setMain(false));
    else {
      el.pause();
      setMain(false);
    }
  };

  const mundur = () => {
    const el = audioRef.current;
    if (el) el.currentTime = Math.max(0, el.currentTime - 15);
  };

  const jam = (detik) => {
    if (!Number.isFinite(detik)) return '0:00';
    const m = Math.floor(detik / 60);
    const d = Math.floor(detik % 60);
    return `${m}:${String(d).padStart(2, '0')}`;
  };

  // Persentase dipakai untuk mewarnai bagian yang sudah lewat pada garis waktu.
  const persen = durasi > 0 ? (posisi / durasi) * 100 : 0;

  return (
    <div data-print="hide" className="glass mt-7 rounded-2xl p-3.5 sm:p-4">
      <audio
        ref={audioRef}
        src={withBasePath(audio.file)}
        /*
          preload="none", bukan "metadata".

          Dengan "metadata", Chrome mengunduh berkas MP3-nya utuh hanya untuk
          mencari tahu durasinya. Satu tulisan berlagu jadi memakan hampir
          sembilan megabita kuota pembaca sebelum tombol putar disentuh sama
          sekali. Sekarang tidak ada satu bita pun yang diunduh sampai pembaca
          menekan putar, dan durasinya muncul begitu pemutarannya mulai.
        */
        preload="none"
        onTimeUpdate={(e) => setPosisi(e.currentTarget.currentTime)}
        onDurationChange={(e) => setDurasi(e.currentTarget.duration)}
        onEnded={() => setMain(false)}
        onPlay={() => setMain(true)}
        onPause={() => setMain(false)}
        onError={() => setGagal(true)}
      />

      <div className="flex items-center gap-3 sm:gap-3.5">
        <button
          type="button"
          onClick={putarJeda}
          aria-label={main ? 'Jeda' : `Putar: ${judul}`}
          className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-linear-to-br from-accent-1 to-accent-2 text-white transition-transform hover:scale-105"
        >
          <Icon name={main ? 'pause' : 'play'} className="h-[18px] w-[18px]" />
        </button>

        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 truncate text-sm font-semibold text-fg">
            <Icon name={jenis.ikon} className="h-3.5 w-3.5 shrink-0 text-accent" />
            {judul}
          </p>

          {/* Garis waktu. Bagian yang sudah lewat diwarnai lewat gradien latar. */}
          <label className="sr-only" htmlFor={idBar}>
            Posisi audio
          </label>
          <input
            id={idBar}
            type="range"
            min={0}
            max={durasi || 0}
            step={1}
            value={Math.min(posisi, durasi || 0)}
            onChange={(e) => {
              const nilai = Number(e.target.value);
              setPosisi(nilai);
              if (audioRef.current) audioRef.current.currentTime = nilai;
            }}
            className="pemutar-garis mt-2 w-full"
            style={{ '--lewat': `${persen}%` }}
          />

          <div className="mt-1 flex items-center justify-between text-[0.7rem] tabular-nums text-subtle">
            <span>{jam(posisi)}</span>
            <span>{durasi ? jam(durasi) : ''}</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={mundur}
            aria-label="Mundur 15 detik"
            title="Mundur 15 detik"
            className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg"
          >
            <Icon name="rewind-15" className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setKecepatan((k) => KECEPATAN[(KECEPATAN.indexOf(k) + 1) % KECEPATAN.length])}
            aria-label={`Kecepatan putar ${kecepatan} kali. Klik untuk mengubah.`}
            title="Kecepatan putar"
            className="grid h-9 min-w-11 place-items-center rounded-full px-2 text-xs font-semibold tabular-nums text-muted transition-colors hover:bg-surface hover:text-fg"
          >
            {kecepatan}x
          </button>
        </div>
      </div>
    </div>
  );
}
