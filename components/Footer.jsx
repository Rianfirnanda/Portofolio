'use client';

import Link from 'next/link';
import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import Icon from '@/components/Icon';

/** Footer: identitas singkat, tautan sosial, kredit, dan tombol ke atas. */
export default function Footer() {
  const { t } = useLanguage();
  const { profile, social, ui, nav } = portfolio;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="text-base font-semibold text-fg">{profile.name}</p>
            <p className="mt-2 text-sm leading-6 text-subtle">{t(profile.headline)}</p>
          </div>

          {/* Tautan cepat ke tiap bagian */}
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2">
            {nav.map((item) =>
              item.type === 'page' ? (
                <Link key={item.id} href={item.href} className="text-sm text-subtle transition-colors hover:text-fg">
                  {t(item.label)}
                </Link>
              ) : (
                <Link key={item.id} href={`/#${item.id}`} className="text-sm text-subtle transition-colors hover:text-fg">
                  {t(item.label)}
                </Link>
              )
            )}
          </nav>
        </div>

        {social.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={item.label}
                  title={item.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-subtle transition-all duration-300 hover:-translate-y-0.5 hover:text-fg"
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-subtle">
            &copy; {year} {profile.name}. {t(ui.rights)}
          </p>
          <p className="text-xs text-subtle">{t(ui.builtWith)}</p>
          <a
            href="#top"
            aria-label={t(ui.backToTop)}
            title={t(ui.backToTop)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-subtle transition-all duration-300 hover:-translate-y-0.5 hover:text-fg"
          >
            <Icon name="arrow-up" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
