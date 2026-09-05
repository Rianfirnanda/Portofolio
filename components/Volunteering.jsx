'use client';

import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import SectionHeading from '@/components/SectionHeading';
import GlassCard from '@/components/GlassCard';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';

/** Volunteering — kegiatan sukarela; hilang otomatis kalau array kosong. */
export default function Volunteering() {
  const { t } = useLanguage();
  const { volunteering, sections } = portfolio;

  if (volunteering.length === 0) return null;

  return (
    <section id="volunteering" className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow={t(sections.volunteering.eyebrow)}
          title={t(sections.volunteering.title)}
          subtitle={t(sections.volunteering.subtitle)}
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {volunteering.map((item, index) => (
            <Reveal key={`${t(item.role)}-${item.period}`} delay={Math.min(index * 80, 240)} className="h-full">
              <GlassCard className="h-full p-6">
                <div className="flex items-start gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-linear-to-br from-accent-2/30 to-accent-1/20 text-accent-3">
                    <Icon name="heart" className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-base font-semibold leading-snug text-white">{t(item.role)}</h3>
                    <p className="mt-1 text-sm text-accent-3">{t(item.org)}</p>
                    <span className="chip mt-3">{item.period}</span>
                  </div>
                </div>

                {t(item.description) ? (
                  <p className="mt-4 text-sm leading-6 text-slate-400">{t(item.description)}</p>
                ) : null}
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
