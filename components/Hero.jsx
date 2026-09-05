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
 * dan deretan ikon sosial yang ditandai featured di data.
 */
export default function Hero() {
  const { lang, t } = useLanguage();
  const { profile, social, ui, contact } = portfolio;

  const featuredSocial = social.filter((item) => item.featured !== false);
  const isExternalResume = profile.resumeUrl.startsWith('http');

  return (
    <section id="top" className="relative flex min-h-svh items-center px-4 pt-28 pb-20 print:pt-4 sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        {/* ---------------- Kolom teks ---------------- */}
        <div className="flex flex-col items-start gap-5">
          {profile.availability?.label ? (
            <Reveal>
              <p className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-muted">
                {profile.availability.available ? (
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span
                      className="absolute inline-flex h-full w-full rounded-full bg-emerald-500"
                      style={{ animation: 'pulse-dot 2.4s ease-in-out infinite' }}
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                ) : null}
                {t(profile.availability.label)}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={80}>
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              <span className="block text-base font-medium tracking-normal text-subtle sm:text-lg">
                {lang === 'id' ? 'Halo, saya' : "Hi, I'm"}
              </span>
              <span className="gradient-text mt-1 block">{profile.name}</span>
            </h1>
          </Reveal>

          <Reveal delay={130}>
            <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {t(profile.headline)}
            </p>
          </Reveal>

          {profile.tagline ? (
            <Reveal delay={170}>
              <p className="max-w-xl border-l-2 border-accent/50 pl-4 text-sm italic leading-relaxed text-muted">
                {t(profile.tagline)}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={210}>
            <p className="inline-flex items-center gap-2 text-sm text-subtle">
              <Icon name="map-pin" className="h-4 w-4 text-accent" />
              {profile.location}
            </p>
          </Reveal>

          {/* Tombol utama */}
          <Reveal delay={260} className="w-full">
            <div className="flex flex-wrap items-center gap-3">
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

          {/* Ikon sosial */}
          {featuredSocial.length > 0 ? (
            <Reveal delay={310}>
              <ul className="flex flex-wrap items-center gap-2.5">
                {featuredSocial.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={item.label}
                      title={item.label}
                      className="glass glass-hover grid h-11 w-11 place-items-center rounded-full text-muted hover:text-fg"
                    >
                      <Icon name={item.icon} className="h-[18px] w-[18px]" />
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
            {/* Cahaya lembut di belakang foto. */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-full opacity-60 blur-3xl"
              style={{
                background:
                  'radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--accent-2) 55%, transparent), transparent 70%)',
              }}
            />

            <div className="glass glass-featured relative overflow-hidden rounded-[1.75rem] p-2.5">
              <SmartImage
                src={profile.avatar}
                fallbackSrc={profile.avatarFallback}
                alt={t(profile.avatarAlt)}
                width={640}
                height={640}
                loading="eager"
                className="aspect-square w-full rounded-[1.4rem] object-cover"
              />

              {/* Kartu identitas kecil menempel di bawah foto. */}
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-line bg-surface-solid/85 px-4 py-3 backdrop-blur-xl">
                <p className="truncate text-sm font-semibold text-fg">{profile.name}</p>
                <p className="truncate text-xs text-subtle">{contact.email}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Strip keahlian berjalan, mengisi ruang di bawah Hero. */}
      <div className="absolute inset-x-0 bottom-20 hidden px-4 sm:px-6 lg:block">
        <div className="mx-auto max-w-6xl">
          <SkillMarquee />
        </div>
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
