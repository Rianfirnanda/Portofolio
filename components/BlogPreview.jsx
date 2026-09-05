'use client';

import Link from 'next/link';
import { portfolio } from '@/data/portfolio';
import { publishedPosts } from '@/data/posts';
import { useLanguage } from '@/components/LanguageProvider';
import SectionHeading from '@/components/SectionHeading';
import PostCard from '@/components/PostCard';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';

/**
 * BlogPreview: tiga tulisan terbaru di halaman utama.
 * Section ini hilang sendiri kalau belum ada tulisan yang terbit.
 */
export default function BlogPreview({ limit = 3 }) {
  const { t } = useLanguage();
  const { sections, ui } = portfolio;
  const latest = publishedPosts.slice(0, limit);

  if (latest.length === 0) return null;

  return (
    <section id="blog" className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow={t(sections.blog.eyebrow)}
            title={t(sections.blog.title)}
            subtitle={t(sections.blog.subtitle)}
          />

          <Reveal delay={60}>
            <Link href="/blog/" className="btn-ghost">
              {t(ui.blogAll)}
              <Icon name="arrow-right" className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, index) => (
            <Reveal key={post.slug} delay={Math.min(index * 70, 240)} className="h-full">
              <PostCard post={post} compact />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
