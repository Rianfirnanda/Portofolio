'use client';

import { useState } from 'react';
import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import SectionHeading from '@/components/SectionHeading';
import GlassCard from '@/components/GlassCard';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';

/** Satu kartu publikasi dengan abstrak yang bisa dibuka dan ditutup. */
function PublicationCard({ item }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const abstract = t(item.abstract);

  return (
    <GlassCard as="article" featured className="p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-accent-1 to-accent-2 px-3 py-1 text-xs font-semibold text-white">
          <Icon name="book" className="h-3.5 w-3.5" />
          {t(item.role)}
        </span>
        <span className="chip">{t(item.date)}</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold leading-snug text-fg sm:text-xl">{item.title}</h3>
      <p className="mt-2 text-sm text-accent">{t(item.venue)}</p>

      {abstract ? (
        <>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            className="mt-4 inline-flex min-h-6 items-center gap-1.5 rounded-md py-1 text-sm font-semibold text-muted transition-colors hover:text-fg"
          >
            {open ? t(portfolio.ui.hideAbstract) : t(portfolio.ui.readAbstract)}
            <Icon
              name="chevron-down"
              className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            />
          </button>

          {/*
            Abstraknya selalu ada di halaman, cuma tingginya yang dilipat jadi
            nol saat ditutup. Dulu abstrak ini hanya ditulis ke halaman setelah
            tombolnya diklik, sehingga mesin pencari tidak pernah melihatnya
            sama sekali. Padahal justru di situ isi risetnya.

            Atribut inert membuat isi yang sedang terlipat tidak ikut dibacakan
            pembaca layar dan tidak bisa dijangkau tombol Tab, jadi tetap benar
            secara aksesibilitas.
          */}
          <div
            inert={open ? undefined : ''}
            className={`grid transition-[grid-template-rows] duration-300 ease-out print:grid-rows-[1fr] ${
              open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
            }`}
          >
            <div className="overflow-hidden">
              <p className="mt-3 border-l-2 border-accent/60 pl-4 text-body-sm text-muted">
                {abstract}
              </p>
            </div>
          </div>
        </>
      ) : null}

      {item.url ? (
        <div className="mt-5 border-t border-line pt-4">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-4 py-2 text-xs font-semibold text-fg transition-colors hover:border-line-strong"
          >
            <Icon name="external-link" className="h-3.5 w-3.5" />
            {t(portfolio.ui.viewPublication)}
          </a>
        </div>
      ) : null}
    </GlassCard>
  );
}

/** Publications: daftar karya ilmiah, hilang otomatis kalau array kosong. */
export default function Publications() {
  const { t } = useLanguage();
  const { publications, sections } = portfolio;

  if (publications.length === 0) return null;

  return (
    <section id="publications" className="bagian">
      <div className="wadah wadah-sempit">
        <SectionHeading
          id="publications"
          eyebrow={t(sections.publications.eyebrow)}
          title={t(sections.publications.title)}
          subtitle={t(sections.publications.subtitle)}
        />

        <div className="mt-10 space-y-6">
          {publications.map((item, index) => (
            <Reveal key={item.title} delay={Math.min(index * 80, 240)}>
              <PublicationCard item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
