'use client';

import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import { withBasePath } from '@/lib/asset';
import SmartImage from '@/components/SmartImage';
import SkillMarquee from '@/components/SkillMarquee';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';

/**
 * Hero: layar pembuka berisi foto, nama, kalimat pembuka, dua tombol utama,
 * dan deretan tautan sosial yang ditandai featured di data.
 *
 * -----------------------------------------------------------------------------
 * KENAPA SUSUNANNYA SEPERTI INI
 * -----------------------------------------------------------------------------
 * Sampul situs pribadi punya satu tugas: dalam tiga detik, pengunjung harus
 * tahu siapa ini dan apa kerjanya. Semua yang tidak membantu dua hal itu cuma
 * memperlambat.
 *
 * Yang berubah dari versi sebelumnya, dan alasannya:
 *
 *   Baris keterangan diri   dulu lencana kapsul berkaca. Kapsul itu menarik
 *                           perhatian ke dirinya sendiri, padahal isinya cuma
 *                           keterangan. Sekarang jadi satu baris tipis
 *                           bergaris rambut, seperti kepala surat.
 *
 *   Nama                    dulu bergradien warna. Gradien pada teks sebesar
 *                           ini membuat sebagian hurufnya lebih pucat dari
 *                           yang lain, dan nama orang tidak pantas separuh
 *                           pudar. Sekarang huruf berkait, satu warna.
 *
 *   Tautan sosial           dulu lingkaran berisi ikon saja. Ikon tanpa
 *                           tulisan memaksa pengunjung menebak, dan tebakan
 *                           itu sering salah untuk lambang yang mirip.
 *                           Sekarang ikonnya ditemani namanya.
 *
 *   Cahaya di balik foto    dulu lingkaran berpendar besar. Diganti bingkai
 *                           tipis yang bergeser sedikit ke belakang foto,
 *                           cara lama di desain cetak untuk memberi kedalaman
 *                           tanpa menambah cahaya.
 */
export default function Hero() {
  const { lang, t } = useLanguage();
  const { profile, social, ui } = portfolio;

  const featuredSocial = social.filter((item) => item.featured !== false);
  const isExternalResume = profile.resumeUrl.startsWith('http');

  return (
    // flex-col + justify-center: isinya tetap di tengah layar saat jendelanya
    // tinggi, tetapi saat jendelanya pendek bagian ini tumbuh ke bawah dan
    // halaman jadi bisa digulir. Tidak ada yang saling menimpa.
    <section
      id="top"
      // overflow-x-clip menahan bingkai foto yang sengaja menonjol keluar
      // kotaknya. Di layar 320px kelebihannya membuat halaman bisa digeser
      // ke samping kalau tidak ditahan.
      className="relative flex min-h-svh flex-col justify-center overflow-x-clip px-4 pt-28 pb-28 print:pt-4 sm:px-6"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        {/* ---------------- Kolom teks ---------------- */}
        <div className="flex flex-col items-start">
          {/* Baris keterangan diri: status dan tempat tinggal, dipisah garis
              rambut yang mengisi sisa lebar. */}
          <Reveal className="w-full">
            <div className="flex w-full flex-wrap items-center gap-x-3 gap-y-2 text-[0.8125rem] text-subtle">
              {profile.availability?.label ? (
                <span className="inline-flex items-center gap-2">
                  {/* Titik status. Warnanya kamu atur sendiri lewat panel, di
                      menu Profil Diri bagian Status Ketersediaan. Kalau
                      dikosongkan, dipakai hijau seperti semula. */}
                  {profile.availability.available ? (
                    <span
                      className="relative flex h-[7px] w-[7px]"
                      aria-hidden="true"
                      style={{ color: profile.availability.dotColor || '#10b981' }}
                    >
                      <span
                        className="absolute inline-flex h-full w-full rounded-full bg-current"
                        style={{ animation: 'pulse-dot 2.4s ease-in-out infinite' }}
                      />
                      <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-current" />
                    </span>
                  ) : null}
                  {t(profile.availability.label)}
                </span>
              ) : null}

              {profile.location ? (
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="map-pin" className="h-3.5 w-3.5" aria-hidden="true" />
                  {profile.location}
                </span>
              ) : null}

              <hr className="aturan hidden min-w-8 flex-1 sm:block" />
            </div>
          </Reveal>

          <Reveal delay={80} className="w-full">
            <h1 className="mt-7">
              <span className="block text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-subtle">
                {lang === 'id' ? 'Halo, saya' : "Hi, I'm"}
              </span>
              {/* Huruf berkait, satu warna, baris dirapatkan. Ukurannya
                  dibiarkan tumbuh sampai layar lebar karena ini satu satunya
                  hal di halaman yang boleh sebesar itu. */}
              <span className="judul-tampil mt-3 block text-[2.9rem] text-fg sm:text-[4.1rem] lg:text-[4.9rem]">
                {profile.name}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={130} className="w-full">
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-muted sm:text-lg">
              {t(profile.headline)}
            </p>
          </Reveal>

          {t(profile.tagline) ? (
            <Reveal delay={170} className="w-full">
              {/* Kalimat pegangan, ditulis miring dengan huruf berkait yang
                  sama dengan judul. Satu satunya kalimat di halaman ini yang
                  bersuara pribadi, jadi wajar kalau rupanya juga berbeda. */}
              <p className="mt-6 max-w-xl border-l border-line-strong pl-5 font-tampil text-[1.2rem] italic leading-snug text-muted">
                {t(profile.tagline)}
              </p>
            </Reveal>
          ) : null}

          {/* Tombol utama */}
          <Reveal delay={230} className="w-full">
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="btn-primary">
                <Icon name="send" className="h-4 w-4" />
                {t(ui.ctaContact)}
              </a>

              {profile.resumeUrl ? (
                <a
                  href={isExternalResume ? profile.resumeUrl : withBasePath(profile.resumeUrl)}
                  target={isExternalResume ? '_blank' : undefined}
                  rel={isExternalResume ? 'noopener noreferrer' : undefined}
                  className="btn-ghost"
                >
                  <Icon name="download" className="h-4 w-4" />
                  {t(ui.ctaResume)}
                </a>
              ) : null}
            </div>
          </Reveal>

          {/* Tautan sosial, lengkap dengan namanya. */}
          {featuredSocial.length > 0 ? (
            <Reveal delay={280} className="w-full">
              <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2.5">
                {featuredSocial.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="tautan-samar inline-flex items-center gap-2 text-[0.8125rem] text-subtle"
                    >
                      <Icon name={item.icon} className="h-4 w-4" aria-hidden="true" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>

        {/* ---------------- Kolom foto ---------------- */}
        <Reveal delay={180} className="order-first mx-auto w-full max-w-[19rem] lg:order-last lg:max-w-sm">
          <div className="relative">
            {/* Bingkai tipis yang bergeser ke kanan bawah, di belakang foto.
                Memberi kedalaman tanpa cahaya berpendar. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-[1.5rem] border border-line-strong"
            />

            <div className="glass relative overflow-hidden rounded-[1.5rem] p-2.5">
              <SmartImage
                src={profile.avatar}
                fallbackSrc={profile.avatarFallback}
                alt={t(profile.avatarAlt)}
                width={640}
                height={640}
                // Foto ini yang pertama dilihat pengunjung, jadi diunduh lebih
                // dulu. Petunjuk ukurannya mengikuti lebar kolom fotonya.
                priority
                sizes="(max-width: 1024px) 304px, 384px"
                className="aspect-square w-full rounded-[1.1rem] object-cover"
              />

              {/*
                Kartu kecil yang menempel di bawah foto. Isinya cuma dua baris
                dan keduanya kamu atur sendiri lewat panel, di menu Profil
                bagian "Kartu pada foto". Kosongkan mottonya kalau kamu ingin
                namanya saja yang tampil.
              */}
              <div className="absolute inset-x-5 bottom-5 rounded-xl border border-line bg-surface-solid/85 px-4 py-3 backdrop-blur-xl">
                <p className="truncate text-sm font-semibold text-fg">
                  {profile.photoCard?.name || profile.name}
                </p>
                {t(profile.photoCard?.motto) ? (
                  <p className="line-clamp-2 text-xs leading-snug text-subtle">
                    {t(profile.photoCard.motto)}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/*
        Strip keahlian berjalan. Ikut aliran halaman, jadi posisinya selalu di
        bawah isi Hero berapa pun tinggi jendelanya. Sebelumnya dibuat melayang
        dan sempat menimpa deretan ikon sosial di layar yang pendek.
      */}
      <div className="mx-auto mt-16 hidden w-full max-w-6xl lg:block">
        <SkillMarquee />
      </div>

      {/* Petunjuk gulir */}
      <a
        href="#about"
        data-print="hide"
        aria-label={t(ui.scrollCue)}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-subtle transition-colors hover:text-fg sm:flex"
      >
        <span className="text-[0.7rem] uppercase tracking-[0.2em]">{t(ui.scrollCue)}</span>
        <span style={{ animation: 'scroll-cue 2s ease-in-out infinite' }}>
          <Icon name="arrow-down" className="h-4 w-4" />
        </span>
      </a>
    </section>
  );
}
