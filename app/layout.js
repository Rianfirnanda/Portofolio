import localFont from 'next/font/local';
import { portfolio } from '@/data/portfolio';
import { t } from '@/lib/i18n';
import { withBasePath } from '@/lib/asset';
import LanguageProvider from '@/components/LanguageProvider';
import MeshBackground from '@/components/MeshBackground';
import SkipLink from '@/components/SkipLink';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

/**
 * Font variabel Plus Jakarta Sans di-host sendiri lewat next/font/local.
 * Berkasnya ada di app/fonts/, jadi situs tetap tampil benar tanpa koneksi ke
 * Google Fonts — penting untuk GitHub Pages dan build yang reproducible.
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
const canonical = `${meta.baseUrl}/`;

/** Metadata SEO — dibaca Next.js untuk menghasilkan <head> statis. */
export const metadata = {
  metadataBase: new URL(meta.baseUrl),
  title: {
    default: meta.siteTitle,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: meta.keywords,
  authors: [{ name: profile.name, url: social[0]?.href }],
  creator: profile.name,
  publisher: profile.name,
  alternates: { canonical },
  openGraph: {
    type: 'website',
    locale: locale === 'id' ? 'id_ID' : 'en_US',
    url: canonical,
    siteName: profile.name,
    title: meta.siteTitle,
    description,
    images: [
      {
        url: meta.ogImage,
        width: 1200,
        height: 630,
        alt: `${profile.name} — ${t(profile.headline, locale)}`,
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

/** Viewport & theme-color (API terpisah sejak Next.js 14). */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: meta.themeColor,
  colorScheme: 'dark',
};

/**
 * JSON-LD schema.org/Person — dirakit langsung dari data/portfolio.js
 * supaya data terstruktur ikut ter-update saat konten diubah.
 */
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: t(profile.headline, locale),
  description,
  url: canonical,
  image: `${meta.baseUrl}${profile.avatar}`,
  email: `mailto:${contact.email}`,
  address: { '@type': 'PostalAddress', addressLocality: profile.location },
  sameAs: social.filter((item) => item.href.startsWith('http')).map((item) => item.href),
  alumniOf: education.map((item) => ({
    '@type': 'EducationalOrganization',
    name: item.school,
  })),
  knowsAbout: skills.groups.flatMap((group) => group.items),
  knowsLanguage: portfolio.languages.map((language) => t(language.name, 'en')),
};

export default function RootLayout({ children }) {
  return (
    <html lang={locale} className={plusJakarta.variable} suppressHydrationWarning>
      <body className="antialiased">
        {/* Data terstruktur untuk mesin pencari. */}
        <script
          type="application/ld+json"
          // JSON-LD berasal dari data lokal (bukan input pengguna), aman di-inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />

        <MeshBackground />

        <LanguageProvider>
          <SkipLink />
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
