'use client';

import { useEffect, useState } from 'react';
import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import Icon from '@/components/Icon';

/**
 * Navbar — pill kaca melayang di atas halaman.
 *  - Menu dibangun dari portfolio.nav (hapus satu baris di data = hilang di sini).
 *  - Section aktif dideteksi dengan IntersectionObserver.
 *  - Di mobile berubah jadi drawer kaca yang meluncur turun.
 *  - Tombol ID/EN mengubah satu state bahasa global.
 */
export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  const items = portfolio.nav ?? [];

  // Perkecil padding navbar setelah halaman digulir.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sorot menu sesuai section yang sedang terlihat di viewport.
  useEffect(() => {
    if (items.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((element) => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  // Kunci scroll body selama drawer mobile terbuka + tutup dengan tombol Escape.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (items.length === 0) return null;

  const linkClass = (id) =>
    [
      'relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200',
      active === id ? 'text-white' : 'text-slate-400 hover:text-white',
    ].join(' ');

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      {/* Scrim: meredupkan halaman selama drawer mobile terbuka. */}
      {open ? (
        <button
          type="button"
          aria-label={t(portfolio.ui.closeMenu)}
          onClick={() => setOpen(false)}
          className="fixed inset-0 -z-10 cursor-default bg-black/60 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <nav
        aria-label={lang === 'id' ? 'Navigasi utama' : 'Main navigation'}
        className={[
          'glass glass-nav relative z-50 mt-4 w-full max-w-4xl px-3 transition-all duration-300',
          // Pill saat tertutup, kartu membulat saat drawer mobile terbuka.
          open ? 'rounded-3xl' : 'rounded-full',
          scrolled ? 'py-1.5' : 'py-2.5',
        ].join(' ')}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Inisial sebagai logo, mengarah kembali ke atas halaman. */}
          <a
            href="#top"
            className="ml-1 flex items-center gap-2 rounded-full px-2 py-1 text-sm font-bold text-white"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full bg-linear-to-br from-accent-1 to-accent-2 text-xs text-white">
              RF
            </span>
            <span className="hidden whitespace-nowrap sm:inline">{portfolio.profile.shortName}</span>
          </a>

          {/* Menu desktop */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {items.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className={linkClass(item.id)} aria-current={active === item.id ? 'true' : undefined}>
                  {active === item.id ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-white/10 bg-white/10"
                    />
                  ) : null}
                  <span className="relative">{t(item.label)}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Toggle bahasa ID / EN */}
            <button
              type="button"
              onClick={toggleLang}
              aria-label={`${t(portfolio.ui.switchLanguage)} — ${lang === 'id' ? 'English' : 'Bahasa Indonesia'}`}
              className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-0.5 text-xs font-semibold transition-colors hover:bg-white/10"
            >
              <span
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  lang === 'id' ? 'bg-white/15 text-white' : 'text-slate-400'
                }`}
              >
                ID
              </span>
              <span
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  lang === 'en' ? 'bg-white/15 text-white' : 'text-slate-400'
                }`}
              >
                EN
              </span>
            </button>

            {/* Tombol hamburger (mobile & tablet) */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? t(portfolio.ui.closeMenu) : t(portfolio.ui.openMenu)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Drawer mobile */}
        {open ? (
          <div
            id="mobile-menu"
            style={{ animation: 'drawer-in 0.25s ease-out' }}
            className="mt-3 border-t border-white/10 pt-3 lg:hidden"
          >
            <ul className="flex flex-col gap-1 pb-2">
              {items.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                      active === item.id
                        ? 'bg-white/10 text-white'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {t(item.label)}
                    <Icon name="arrow-up-right" className="h-4 w-4 opacity-50" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
