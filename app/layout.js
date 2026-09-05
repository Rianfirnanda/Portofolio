import localFont from 'next/font/local';
import { portfolio } from '@/data/portfolio';
import { t } from '@/lib/i18n';
import LanguageProvider from '@/components/LanguageProvider';
import ThemeProvider from '@/components/ThemeProvider';
import { THEME_STORAGE_KEY } from '@/lib/theme';
import MeshBackground from '@/components/MeshBackground';
import SkipLink from '@/components/SkipLink';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

/**
 * Font variabel Plus Jakarta Sans di-host sendiri lewat next/font/local.
 * Berkasnya ada di app/fonts/, jadi situs tetap tampil benar tanpa memanggil
 * server Google Fonts saat halaman dibuka.
 */
const plusJakarta = localFont({
  src: [{ path: './fonts/PlusJakartaSans-Variable-latin.woff2', weight: '200 800', style: 'normal' }],
  variable: '--font-plus-jakarta',
  display: 'swap',
  fallback: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

const { meta, profile, social, contact, education, skills } = portfolio;
const locale = meta.locale;
const description = t(meta.description, locale);

/**
 * Skrip kecil yang berjalan sebelum halaman digambar. Tugasnya memasang
 * atribut data-theme pada <html> sehingga tidak ada kedipan warna terang
 * saat pengunjung memilih mode gelap, atau sebaliknya.
 */
const themeScript = `
(function () {
  try {
    var stored = window.localStorage.getItem('${THEME_STORAGE_KEY}');
    var fallback = '${meta.defaultTheme}';
    var theme = stored;
    if (theme !== 'light' && theme !== 'dark') {
      theme = fallback === 'system'
        ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
        : fallback;
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch (error) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`.trim();

/** Metadata SEO. Next.js memakainya untuk menyusun <head> secara statis. */
export const metadata = {
  metadataBase: new URL(meta.baseUrl),
  title: {
    default: meta.siteTitle,
    template: `%s | ${profile.name}`,
  },
  description,
  keywords: meta.keywords,
  authors: [{ name: profile.name, url: social[0]?.href }],
  creator: profile.name,
  publisher: profile.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: locale === 'id' ? 'id_ID' : 'en_US',
    url: '/',
    siteName: profile.name,
    title: meta.siteTitle,
    description,
    images: [
      {
        url: meta.ogImage,
        width: 1200,
        height: 630,
        alt: `${profile.name}, ${t(profile.headline, locale)}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.siteTitle,
    description,
    images: [meta.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'technology',
};

/** Viewport dan warna address bar, dibedakan untuk mode terang dan gelap. */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: meta.themeColorLight },
    { media: '(prefers-color-scheme: dark)', color: meta.themeColorDark },
  ],
};

/**
 * Data terstruktur schema.org/Person, dirakit langsung dari data/portfolio.js
 * supaya ikut ter-update setiap kali kontennya diubah.
 */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: t(profile.headline, locale),
  description,
  url: meta.baseUrl,
  image: `${meta.baseUrl}${profile.avatar}`,
  email: `mailto:${contact.email}`,
  address: { '@type': 'PostalAddress', addressLocality: profile.location },
  sameAs: social.filter((item) => item.href.startsWith('http')).map((item) => item.href),
  alumniOf: education.map((item) => ({ '@type': 'EducationalOrganization', name: item.school })),
  knowsAbout: skills.groups.flatMap((group) => group.items),
  knowsLanguage: portfolio.languages.map((language) => t(language.name, 'en')),
};

export default function RootLayout({ children }) {
  return (
    <html lang={locale} className={plusJakarta.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          // Isinya berasal dari data lokal, bukan masukan pengguna, jadi aman.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <MeshBackground />

        <ThemeProvider>
          <LanguageProvider>
            <SkipLink />
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
