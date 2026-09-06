import { notFound } from 'next/navigation';
import { portfolio } from '@/data/portfolio';
import { getPublishedPosts, getPostBySlug } from '@/data/posts';
import { t } from '@/lib/i18n';
import { renderMarkdown } from '@/lib/markdown';
import PostArticle from '@/components/PostArticle';

const { meta, profile } = portfolio;

/**
 * Daftar alamat yang perlu dibuatkan halaman saat build.
 * Menambah tulisan di data/posts.js otomatis menambah halamannya di sini.
 */
export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

/** Metadata SEO per tulisan, termasuk kartu OpenGraph bertipe article. */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const title = t(post.title, meta.locale);
  const description = t(post.excerpt, meta.locale);
  const image = post.cover || meta.ogImage;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: 'article',
      url: `/blog/${post.slug}/`,
      title,
      description,
      publishedTime: post.date,
      authors: [profile.name],
      tags: post.tags,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

/** Halaman detail satu tulisan. */
export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const all = getPublishedPosts();
  const post = all.find((item) => item.slug === slug);
  if (!post) notFound();

  // Dua tulisan lain sebagai bacaan lanjutan di bawah artikel.
  const others = all.filter((item) => item.slug !== slug).slice(0, 2);

  // Tulisan diubah jadi HTML di sini, saat situs dibangun. Keduanya dikirim
  // sekaligus supaya tombol ID dan EN bisa berpindah seketika tanpa memuat
  // ulang halaman.
  const isiId = typeof post.body === 'string' ? post.body : (post.body?.id ?? '');
  const isiEn = typeof post.body === 'string' ? post.body : (post.body?.en || isiId);
  const bodyHtml = { id: renderMarkdown(isiId), en: renderMarkdown(isiEn) };

  // Data terstruktur agar tulisan bisa muncul sebagai artikel di mesin pencari.
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: t(post.title, meta.locale),
    description: t(post.excerpt, meta.locale),
    datePublished: post.date,
    author: { '@type': 'Person', name: profile.name, url: meta.baseUrl },
    image: `${meta.baseUrl}${post.cover || meta.ogImage}`,
    mainEntityOfPage: `${meta.baseUrl}/blog/${post.slug}/`,
    keywords: (post.tags ?? []).join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <PostArticle post={post} others={others} bodyHtml={bodyHtml} />
    </>
  );
}
