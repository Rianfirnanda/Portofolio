import { portfolio } from '@/data/portfolio';
import { t } from '@/lib/i18n';
import BlogIndex from '@/components/BlogIndex';

const { meta, sections } = portfolio;

export const metadata = {
  title: t(sections.blog.title, meta.locale),
  description: t(sections.blog.subtitle, meta.locale),
  alternates: { canonical: '/blog/' },
  openGraph: {
    type: 'website',
    url: '/blog/',
    title: `${t(sections.blog.title, meta.locale)} | ${portfolio.profile.name}`,
    description: t(sections.blog.subtitle, meta.locale),
    images: [meta.ogImage],
  },
};

/** Halaman daftar tulisan. Isinya dirender komponen client BlogIndex. */
export default function BlogPage() {
  return <BlogIndex />;
}
