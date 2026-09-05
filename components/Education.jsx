'use client';

import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import SectionHeading from '@/components/SectionHeading';
import GlassCard from '@/components/GlassCard';
import SmartImage from '@/components/SmartImage';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';

/** Education: riwayat pendidikan formal. Field `logo` opsional. */
export default function Education() {
  const { t } = useLanguage();
  const { education, sections } = portfolio;

  if (education.length === 0) return null;

  return (
    <section id="education" className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow={t(sections.education.eyebrow)}
          title={t(sections.education.title)}
          subtitle={t(sections.education.subtitle)}
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {education.map((item, index) => (
            <Reveal key={`${item.school}-${item.period}`} delay={Math.min(index * 80, 240)} className="h-full">
              <GlassCard className="h-full p-6">
                {item.logo ? (
                  <SmartImage
                    src={item.logo}
                    alt={`Logo ${item.school}`}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-xl border border-line object-cover"
                  />
                ) : (
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br from-accent-1 to-accent-3 text-white">
                    <Icon name="graduation-cap" className="h-5 w-5" />
                  </span>
                )}

                <h3 className="mt-4 text-base font-semibold leading-snug text-fg">{t(item.degree)}</h3>
                <p className="mt-1 text-sm text-accent">{item.school}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="chip">{item.period}</span>
                  {t(item.gpa) ? <span className="chip">{t(item.gpa)}</span> : null}
                </div>

                {t(item.notes) ? (
                  <p className="mt-4 text-sm leading-6 text-muted">{t(item.notes)}</p>
                ) : null}
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
