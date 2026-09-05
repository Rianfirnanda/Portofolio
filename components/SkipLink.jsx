'use client';

import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';

/**
 * SkipLink — tautan "lompat ke konten" untuk pengguna keyboard & screen reader.
 * Tersembunyi sampai menerima fokus (Tab pertama saat halaman dibuka).
 */
export default function SkipLink() {
  const { t } = useLanguage();

  return (
    <a
      href="#main"
      className="sr-only rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]"
    >
      {t(portfolio.ui.skipToContent)}
    </a>
  );
}
