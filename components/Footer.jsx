'use client';

import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import Icon from '@/components/Icon';

/** Footer — hak cipta, kredit teknologi, dan tombol kembali ke atas. */
export default function Footer() {
  const { t } = useLanguage();
  const { profile, ui } = portfolio;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 px-4 py-8 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <div>
          <p className="text-sm font-semibold text-white">{profile.name}</p>
          <p className="mt-1 text-xs text-slate-400">
            © {year} · {t(ui.rights)}
          </p>
        </div>

        <p className="text-xs text-slate-400">{t(ui.builtWith)}</p>

        <a
          href="#top"
          aria-label={t(ui.backToTop)}
          title={t(ui.backToTop)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
        >
          <Icon name="arrow-up" className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
