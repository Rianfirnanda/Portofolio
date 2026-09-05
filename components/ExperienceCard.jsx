'use client';

import { useState } from 'react';
import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import GlassCard from '@/components/GlassCard';
import SmartImage from '@/components/SmartImage';
import Icon from '@/components/Icon';

/** Panjang teks sebelum deskripsi dipotong dan tombol Selengkapnya muncul. */
const CLAMP_LENGTH = 190;

/**
 * ExperienceCard: satu titik pada timeline pengalaman.
 *
 * Kalau item punya field `image`, gambarnya tampil sebagai dokumentasi kegiatan
 * di bawah deskripsi. Kalau `logo` diisi, logo instansi muncul di samping judul.
 * Keduanya opsional, kartu tetap rapi tanpa keduanya.
 */
export default function ExperienceCard({ item }) {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState(false);

  const description = t(item.description);
  const isLong = description.length > CLAMP_LENGTH;
  const visibleText = isLong && !expanded ? `${description.slice(0, CLAMP_LENGTH).trimEnd()}...` : description;

  return (
    <GlassCard as="article" featured={item.highlight} className="overflow-hidden">
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
          <div className="flex min-w-0 gap-3">
            {item.logo ? (
              <SmartImage
                src={item.logo}
                alt={`Logo ${t(item.org)}`}
                width={44}
                height={44}
                className="mt-0.5 h-11 w-11 shrink-0 rounded-xl border border-line object-cover"
              />
            ) : null}

            <div className="min-w-0">
              <h3 className="text-base font-semibold leading-snug text-fg sm:text-lg">{t(item.role)}</h3>
              <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-accent">
                <Icon name="building" className="h-3.5 w-3.5 shrink-0" />
                <span>{t(item.org)}</span>
                {item.type ? (
                  <>
                    <span aria-hidden="true" className="opacity-40">
                      &bull;
                    </span>
                    <span className="text-subtle">{t(item.type)}</span>
                  </>
                ) : null}
              </p>
            </div>
          </div>

          <p className="chip shrink-0">
            <Icon name="calendar" className="h-3.5 w-3.5" />
            {t(item.period)}
          </p>
        </div>

        {item.location ? (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-subtle">
            <Icon name="map-pin" className="h-3.5 w-3.5" />
            {t(item.location)}
          </p>
        ) : null}

        {description ? (
          <p className="mt-3 text-sm leading-6 text-muted">
            {visibleText}{' '}
            {isLong ? (
              <button
                type="button"
                onClick={() => setExpanded((value) => !value)}
                aria-expanded={expanded}
                className="inline-flex items-center gap-1 rounded-md text-xs font-semibold text-accent transition-colors hover:text-fg"
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
      </div>

      {/* Dokumentasi kegiatan, muncul hanya kalau field image diisi. */}
      {item.image ? (
        <figure className="border-t border-line">
          <SmartImage
            src={item.image}
            alt={t(item.imageAlt) || t(item.role)}
            width={900}
            height={520}
            className="aspect-16/9 w-full object-cover"
          />
          {t(item.imageAlt) ? (
            <figcaption className="px-5 py-2.5 text-xs text-subtle">{t(item.imageAlt)}</figcaption>
          ) : null}
        </figure>
      ) : null}
    </GlassCard>
  );
}
