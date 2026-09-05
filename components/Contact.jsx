'use client';

import { useEffect, useRef, useState } from 'react';
import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import SectionHeading from '@/components/SectionHeading';
import GlassCard from '@/components/GlassCard';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';

/**
 * Contact — kartu kaca berisi tombol mailto, salin email ke clipboard
 * (dengan toast "Tersalin!"), daftar layanan, dan ikon sosial.
 */
export default function Contact() {
  const { t } = useLanguage();
  const { contact, social, services, sections, ui } = portfolio;
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  // Bersihkan timer toast kalau komponen di-unmount lebih dulu.
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      // Fallback untuk browser/konteks tanpa Clipboard API.
      const field = document.createElement('textarea');
      field.value = contact.email;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      document.execCommand('copy');
      document.body.removeChild(field);
    }

    setCopied(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow={t(sections.contact.eyebrow)}
          title={t(sections.contact.title)}
          subtitle={t(sections.contact.subtitle)}
          align="center"
        />

        <Reveal delay={80} className="mt-10">
          <GlassCard featured hover={false} className="p-6 text-center sm:p-10">
            <p className="mx-auto max-w-xl text-sm leading-7 text-slate-300">{t(contact.note)}</p>

            {/* Baris email + tombol salin */}
            <div className="mx-auto mt-7 flex max-w-md flex-col items-stretch gap-2 sm:flex-row">
              <span className="flex min-w-0 grow items-center gap-2 truncate rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                <Icon name="mail" className="h-4 w-4 shrink-0 text-accent-3" />
                <span className="truncate">{contact.email}</span>
              </span>

              <button
                type="button"
                onClick={copyEmail}
                aria-label={t(ui.copyEmail)}
                className="relative inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Icon name={copied ? 'check' : 'copy'} className="h-4 w-4" />
                <span className="sm:hidden">{copied ? t(ui.copied) : t(ui.copyEmail)}</span>
              </button>
            </div>

            {/* Toast konfirmasi (dibaca screen reader lewat role="status") */}
            <p
              role="status"
              aria-live="polite"
              className={`mt-3 text-xs font-semibold text-emerald-400 transition-opacity duration-300 ${
                copied ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {copied ? t(ui.copied) : ' '}
            </p>

            {/* Tombol aksi utama */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-accent-1 to-accent-2 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_-16px_var(--color-accent-1)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Icon name="send" className="h-4 w-4" />
                {t(contact.ctaText)}
              </a>

              {contact.phone ? (
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  {contact.phone}
                </a>
              ) : null}
            </div>

            {/* Ikon sosial */}
            {social.length > 0 ? (
              <ul className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
                {social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      aria-label={item.label}
                      title={item.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:text-white"
                    >
                      <Icon name={item.icon} className="h-[18px] w-[18px]" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Layanan yang ditawarkan */}
            {services.length > 0 ? (
              <div className="mt-8 border-t border-white/10 pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {t(ui.servicesTitle)}
                </h3>
                <ul className="mt-3 flex flex-wrap justify-center gap-2">
                  {services.map((service) => (
                    <li key={t(service)} className="chip">
                      {t(service)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
