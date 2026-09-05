'use client';

import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import { withBasePath } from '@/lib/asset';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';

/**
 * Hero — layar pembuka: badge ketersediaan, nama dengan gradien beranimasi,
 * headline, dua CTA, deretan ikon sosial, dan petunjuk gulir.
 * Semua isinya berasal dari portfolio.profile / portfolio.social / portfolio.ui.
 */
export default function Hero() {
  const { lang, t } = useLanguage();
  const { profile, social, ui, contact } = portfolio;

  return (
    <section id="top" className="relative flex min-h-svh items-center px-4 pt-28 pb-20 sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.35fr_1fr]">
        {/* ---------------- Kolom teks ---------------- */}
        <div className="flex flex-col items-start gap-6">
          {profile.availability?.label ? (
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-xl">
                {profile.availability.available ? (
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span
                      className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
                      style={{ animation: 'pulse-dot 2.4s ease-in-out infinite' }}
                    />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                ) : null}
                {t(profile.availability.label)}
              </p>
            </Reveal>
          ) : null}

          <Reveal delay={80}>
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-slate-400 text-base font-medium tracking-normal sm:text-lg">
                {lang === 'id' ? 'Halo, saya' : "Hi, I'm"}
              </span>
              <span className="gradient-text mt-1 block">{profile.name}</span>
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
              {t(profile.headline)}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <p className="inline-flex items-center gap-2 text-sm text-slate-400">
              <Icon name="map-pin" className="h-4 w-4 text-accent-3" />
              {profile.location}
            </p>
          </Reveal>

          {/* CTA utama */}
          <Reveal delay={260} className="w-full">
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-accent-1 to-accent-2 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_var(--color-accent-1)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Icon name="send" className="h-4 w-4" />
                {t(ui.ctaContact)}
              </a>

              {profile.resumeUrl ? (
                <a
                  href={withBasePath(profile.resumeUrl)}
                  target={profile.resumeUrl.startsWith('http') ? '_blank' : undefined}
                  rel={profile.resumeUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-colors duration-300 hover:bg-white/10"
                >
                  <Icon name="download" className="h-4 w-4" />
                  {t(ui.ctaResume)}
                </a>
              ) : null}
            </div>
          </Reveal>

          {/* Ikon sosial */}
          {social.length > 0 ? (
            <Reveal delay={320}>
              <ul className="flex items-center gap-2.5">
                {social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={item.label}
                      title={item.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
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
        <Reveal delay={200} className="order-first mx-auto w-full max-w-xs lg:order-last lg:max-w-sm">
          <div className="glass glass-featured relative overflow-hidden rounded-[1.75rem] p-2.5">
            <img
              src={withBasePath(profile.avatar)}
              alt={t(profile.avatarAlt)}
              width={640}
              height={640}
              loading="eager"
              className="aspect-square w-full rounded-[1.4rem] object-cover"
            />
            {/* Kartu kecil menempel di sudut foto. */}
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
              <p className="truncate text-sm font-semibold text-white">{profile.name}</p>
              <p className="truncate text-xs text-slate-400">{contact.email}</p>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Petunjuk gulir */}
      <a
        href="#about"
        aria-label={t(ui.scrollCue)}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-slate-400 transition-colors hover:text-white sm:flex"
      >
        <span className="text-[0.7rem] uppercase tracking-[0.2em]">{t(ui.scrollCue)}</span>
        <span style={{ animation: 'scroll-cue 2s ease-in-out infinite' }}>
          <Icon name="arrow-down" className="h-4 w-4" />
        </span>
      </a>
    </section>
  );
}
