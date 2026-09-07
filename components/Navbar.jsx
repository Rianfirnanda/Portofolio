'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { portfolio } from '@/data/portfolio';
import { useLanguage } from '@/components/LanguageProvider';
import ThemeToggle from '@/components/ThemeToggle';
import SmartImage from '@/components/SmartImage';
import { CommandPaletteTrigger } from '@/components/CommandPalette';
import Icon from '@/components/Icon';

/**
 * Navbar berbentuk pill kaca yang melayang di atas halaman.
 *
 *  - Menu dibangun dari portfolio.nav, hapus satu baris di sana dan item itu
 *    langsung hilang dari sini.
 *  - Item bertipe 'section' melompat ke anchor. Saat pengunjung sedang berada
 *    di halaman lain (misalnya blog), tautannya otomatis berubah jadi '/#id'.
 *  - Item bertipe 'page' pindah halaman lewat komponen Link.
 *  - Section yang sedang terlihat disorot memakai IntersectionObserver.
 *  - Di layar kecil menunya berubah jadi drawer dengan latar peredup.
 */
export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  const items = portfolio.nav ?? [];
  const profile = portfolio.profile;
  const isHome = pathname === '/' || pathname === '';
  const usePhotoLogo = portfolio.appearance?.photoAsLogo !== false && Boolean(profile.avatar);

  // Inisial dari nama, dipakai kalau logo foto dimatikan lewat data.
  const initials = profile.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  // Perkecil tinggi navbar setelah halaman digulir sedikit.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Sorot menu sesuai section yang sedang terlihat. Hanya berlaku di beranda.
  useEffect(() => {
    if (!isHome) {
      // Di halaman blog, sorot item blog.
      setActive(pathname.startsWith('/blog') ? 'blog' : '');
      return;
    }
    if (typeof IntersectionObserver === 'undefined') return;

    const sections = items
      .filter((item) => item.type !== 'page')
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

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
  }, [items, isHome, pathname]);

  // Kunci scroll halaman selama drawer terbuka, dan tutup dengan tombol Escape.
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

  /** Alamat tujuan tiap item menu, menyesuaikan halaman yang sedang dibuka. */
  const hrefFor = (item) => {
    if (item.type === 'page') return item.href ?? `/${item.id}/`;
    return isHome ? `#${item.id}` : `/#${item.id}`;
  };

  /** Section memakai <a> biasa agar smooth scroll bawaan browser tetap jalan. */
  const NavLink = ({ item, className, children, onClick }) => {
    const href = hrefFor(item);
    const shared = {
      className,
      onClick,
      'aria-current': active === item.id ? 'true' : undefined,
    };
    if (item.type === 'page' || !isHome) {
      return (
        <Link href={href} {...shared}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} {...shared}>
        {children}
      </a>
    );
  };

  return (
    <header data-print="hide" className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
      {/* Peredup halaman selama drawer terbuka. */}
      {open ? (
        <button
          type="button"
          aria-label={t(portfolio.ui.closeMenu)}
          onClick={() => setOpen(false)}
          className="fixed inset-0 -z-10 cursor-default bg-black/50 backdrop-blur-sm xl:hidden"
        />
      ) : null}

      <nav
        aria-label={lang === 'id' ? 'Navigasi utama' : 'Main navigation'}
        className={[
          /*
            max-w-6xl, bukan 5xl.

            Lebar pill ini sebenarnya tidak pernah bisa lebih sempit daripada
            isinya: logo, sepuluh item menu, dan tiga tombol di kanan tidak
            boleh dipotong, jadi kotaknya melar melewati batas berapa pun yang
            ditulis di sini. Dulu batasnya 5xl dan isinya butuh lebih dari itu,
            akibatnya pill-nya menonjol ke kanan dan tombol tema ikut terdorong
            keluar layar. Batas baru ini memang muat, jadi pill-nya benar benar
            berada di tengah lagi.
          */
          'glass glass-nav relative z-50 mt-4 w-full max-w-6xl px-3 transition-all duration-300',
          open ? 'rounded-3xl' : 'rounded-full',
          scrolled ? 'py-1.5' : 'py-2.5',
          // Dipekatkan saat halaman digulir, dan saat menu ponsel terbuka.
          scrolled || open ? 'glass-nav-solid' : '',
        ].join(' ')}
      >
        <div className="flex items-center justify-between gap-3">
          {/* Logo, mengarah kembali ke beranda. Memakai foto profil dengan
              bingkai gradien. Isi appearance.photoAsLogo dengan false untuk
              kembali memakai inisial nama. */}
          <Link
            href="/"
            aria-label={`${portfolio.profile.name}, ${lang === 'id' ? 'kembali ke beranda' : 'back to home'}`}
            className="group ml-1 flex shrink-0 items-center gap-2.5 rounded-full py-1 pl-1 pr-2 text-sm font-bold text-fg"
          >
            {usePhotoLogo ? (
              <span className="grid h-8 w-8 place-items-center rounded-full bg-linear-to-br from-accent-1 via-accent-2 to-accent-3 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
                <SmartImage
                  src={profile.avatar}
                  fallbackSrc={profile.avatarFallback}
                  alt=""
                  width={64}
                  height={64}
                  loading="eager"
                  className="h-full w-full rounded-full object-cover"
                />
              </span>
            ) : (
              <span className="grid h-8 w-8 place-items-center rounded-full bg-linear-to-br from-accent-1 to-accent-2 text-xs text-white transition-transform duration-300 group-hover:scale-105">
                {initials}
              </span>
            )}
            <span className="hidden whitespace-nowrap sm:inline">{profile.shortName}</span>
          </Link>

          {/*
            Menu layar besar.

            Ambangnya xl, bukan lg. Di layar 1024 sampai 1279 piksel deretan
            menu ini sebenarnya tidak muat: isinya mendorong tombol pencarian,
            pengalih bahasa, dan tombol tema keluar dari tepi kanan layar,
            sehingga ketiganya tidak bisa dipakai sama sekali. Di lebar itu
            sekarang dipakai menu laci yang memang muat.
          */}
          <ul className="hidden items-center gap-0.5 xl:flex">
            {items.map((item) => (
              <li key={item.id}>
                <NavLink
                  item={item}
                  // inline-flex penting di sini. Tanpa itu tautan ini jadi
                  // elemen sebaris biasa, padding atas bawahnya diabaikan saat
                  // menghitung posisi, dan hurufnya duduk belasan piksel lebih
                  // tinggi daripada nama di logo.
                  className={`link-underline relative inline-flex items-center rounded-full px-2.5 py-2 text-sm font-medium leading-none transition-colors duration-200 ${
                    active === item.id ? 'text-fg' : 'text-subtle hover:text-fg'
                  }`}
                >
                  {active === item.id ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-line bg-surface"
                    />
                  ) : null}
                  <span className="relative">{t(item.label)}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-2">
            {/* Pencarian cepat, juga bisa dibuka dengan Ctrl+K atau Cmd+K */}
            <CommandPaletteTrigger />

            {/* Ganti bahasa */}
            <button
              type="button"
              onClick={toggleLang}
              aria-label={`${t(portfolio.ui.switchLanguage)}, ${lang === 'id' ? 'English' : 'Bahasa Indonesia'}`}
              className="flex items-center gap-1 rounded-full border border-line bg-surface p-0.5 text-xs font-semibold transition-colors hover:border-line-strong"
            >
              <span
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  lang === 'id' ? 'bg-linear-to-r from-accent-1 to-accent-2 text-white' : 'text-subtle'
                }`}
              >
                ID
              </span>
              <span
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  lang === 'en' ? 'bg-linear-to-r from-accent-1 to-accent-2 text-white' : 'text-subtle'
                }`}
              >
                EN
              </span>
            </button>

            {/* Ganti mode terang dan gelap */}
            <ThemeToggle />

            {/* Tombol menu untuk layar kecil */}
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? t(portfolio.ui.closeMenu) : t(portfolio.ui.openMenu)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-fg transition-colors hover:border-line-strong xl:hidden"
            >
              <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Drawer layar kecil */}
        {open ? (
          <div
            id="mobile-menu"
            style={{ animation: 'drawer-in 0.25s ease-out' }}
            className="mt-3 border-t border-line pt-3 xl:hidden"
          >
            <ul className="flex flex-col gap-1 pb-2">
              {items.map((item) => (
                <li key={item.id}>
                  <NavLink
                    item={item}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                      active === item.id
                        ? 'bg-surface text-fg'
                        : 'text-muted hover:bg-surface hover:text-fg'
                    }`}
                  >
                    {t(item.label)}
                    <Icon name="arrow-up-right" className="h-4 w-4 opacity-50" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
