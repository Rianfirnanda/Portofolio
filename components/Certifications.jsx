'use client';

import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import SectionHeading from '@/components/SectionHeading';
import GlassCard from '@/components/GlassCard';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';

/** Certifications: grid ringkas berisi nama, penerbit, tahun, dan tautan. */
export default function Certifications() {
  const { t } = useLanguage();
  const { certifications, sections, ui } = portfolio;

  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="bagian">
      <div className="wadah">
        <SectionHeading
          id="certifications"
          eyebrow={t(sections.certifications.eyebrow)}
          title={t(sections.certifications.title)}
          subtitle={t(sections.certifications.subtitle)}
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((item, index) => (
            <Reveal as="li" key={`${t(item.name)}-${item.year}`} delay={Math.min(index * 45, 300)} className="h-full">
              <GlassCard className="flex h-full items-stretch gap-3.5 p-4">
                <span
                  style={{ borderRadius: 'var(--r-sm)' }}
                  className="mt-0.5 grid h-9 w-9 shrink-0 self-start place-items-center bg-linear-to-br from-accent-2 to-accent-3 text-white"
                >
                  <Icon name="award" className="h-4 w-4" />
                </span>

                {/* flex-col + mt-auto pada tautan: baris "Lihat kredensial"
                    sejajar di seluruh kartu dalam satu baris grid, walaupun
                    nama sertifikasinya berbeda beda panjangnya. */}
                <div className="flex min-w-0 grow flex-col">
                  <h3 className="text-[0.9375rem] font-semibold leading-snug text-fg">{t(item.name)}</h3>
                  <p className="mt-1.5 text-meta text-subtle">
                    {item.issuer}
                    {item.year ? <span> &bull; {item.year}</span> : null}
                  </p>

                  {/* Skor untuk sertifikasi yang memang berupa ujian bernilai,
                      seperti UKBI dan TOEFL. Kosongkan untuk sertifikasi biasa
                      dan lencana ini tidak ikut tampil. */}
                  {t(item.score) ? (
                    <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-accent/35 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                      <Icon name="star" className="h-3 w-3" />
                      {t(item.score)}
                    </p>
                  ) : null}

                  {item.credentialUrl ? (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1 self-start pt-3 text-xs font-semibold text-accent transition-colors hover:text-fg"
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
