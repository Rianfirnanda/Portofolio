'use client';

import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import SectionHeading from '@/components/SectionHeading';
import GlassCard from '@/components/GlassCard';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';

/**
 * Certifications — grid ringkas berisi nama sertifikasi, penerbit, tahun,
 * dan tautan kredensial (kalau `credentialUrl` diisi di data).
 */
export default function Certifications() {
  const { t } = useLanguage();
  const { certifications, sections, ui } = portfolio;

  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={t(sections.certifications.eyebrow)}
          title={t(sections.certifications.title)}
          subtitle={t(sections.certifications.subtitle)}
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((item, index) => (
            <Reveal as="li" key={`${t(item.name)}-${item.year}`} delay={Math.min(index * 45, 300)} className="h-full">
              <GlassCard className="flex h-full items-start gap-3.5 p-4">
                <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-linear-to-br from-accent-2/30 to-accent-3/20 text-accent-3">
                  <Icon name="award" className="h-4 w-4" />
                </span>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold leading-snug text-white">{t(item.name)}</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    {item.issuer}
                    {item.year ? <span className="text-slate-400"> · {item.year}</span> : null}
                  </p>

                  {item.credentialUrl ? (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-accent-3 transition-colors hover:text-white"
                    >
                      {t(ui.viewCredential)}
                      <Icon name="arrow-up-right" className="h-3.5 w-3.5" />
                    </a>
                  ) : null}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
