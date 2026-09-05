'use client';

import { useState } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { portfolio } from '@/data/portfolio';
import GlassCard from '@/components/GlassCard';
import Icon from '@/components/Icon';

/** Batas karakter sebelum deskripsi dipotong dan tombol "Selengkapnya" muncul. */
const CLAMP_LENGTH = 190;

/**
 * ExperienceCard — satu titik pada timeline pengalaman.
 * Deskripsi panjang otomatis dipangkas dan bisa dibuka/tutup.
 */
export default function ExperienceCard({ item }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const description = t(item.description);
  const isLong = description.length > CLAMP_LENGTH;
  const visibleText = isLong && !expanded ? `${description.slice(0, CLAMP_LENGTH).trimEnd()}…` : description;

  return (
    <GlassCard as="article" featured={item.highlight} className="p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-snug text-white sm:text-lg">{t(item.role)}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-accent-3">
            <Icon name="building" className="h-3.5 w-3.5 shrink-0" />
            <span>{t(item.org)}</span>
            {item.type ? (
              <>
                <span aria-hidden="true" className="text-slate-600">
                  ·
                </span>
                <span className="text-slate-400">{t(item.type)}</span>
              </>
            ) : null}
          </p>
        </div>

        <p className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
          <Icon name="calendar" className="h-3.5 w-3.5" />
          {t(item.period)}
        </p>
      </div>

      {item.location ? (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-slate-400">
          <Icon name="map-pin" className="h-3.5 w-3.5" />
          {t(item.location)}
        </p>
      ) : null}

      {description ? (
        <p className="mt-3 text-sm leading-6 text-slate-300">
          {visibleText}{' '}
          {isLong ? (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              className="inline-flex items-center gap-1 rounded-md text-xs font-semibold text-accent-3 transition-colors hover:text-white"
            >
              {expanded ? t(portfolio.ui.readLess) : t(portfolio.ui.readMore)}
              <Icon
                name="chevron-down"
                className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
              />
            </button>
          ) : null}
        </p>
      ) : null}

      {item.skills?.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-2">
          {item.skills.map((skill) => (
            <li key={skill} className="chip">
              {t(skill)}
            </li>
          ))}
        </ul>
      ) : null}
    </GlassCard>
  );
}
