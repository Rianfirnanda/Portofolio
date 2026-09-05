'use client';

import Reveal from '@/components/Reveal';

/**
 * Judul section standar: eyebrow kecil + judul besar + subjudul opsional.
 * Semua teksnya berasal dari portfolio.sections di data/portfolio.js.
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = 'left' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

  return (
    <Reveal className={`flex flex-col gap-3 ${alignment} max-w-2xl`}>
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent-3">
          <span aria-hidden="true" className="h-px w-6 bg-accent-3/60" />
          {eyebrow}
        </span>
      ) : null}

      <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl">{title}</h2>

      {subtitle ? <p className="text-base leading-relaxed text-slate-400">{subtitle}</p> : null}
    </Reveal>
  );
}
