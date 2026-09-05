'use client';

import { useLanguage } from '@/components/LanguageProvider';
import SmartImage from '@/components/SmartImage';
import Icon from '@/components/Icon';

/**
 * PostBody: mengubah array blok di data/posts.js menjadi tampilan artikel.
 *
 * Menambah jenis blok baru cukup dengan menambah satu case di switch di bawah,
 * lalu memakainya di data. Blok yang tidak dikenali dilewati begitu saja
 * sehingga artikel tidak pernah gagal tampil.
 */
export default function PostBody({ content = [] }) {
  const { t } = useLanguage();

  return (
    <div className="prose-post">
      {content.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case 'h2':
            return <h2 key={key}>{t(block.text)}</h2>;

          case 'h3':
            return <h3 key={key}>{t(block.text)}</h3>;

          case 'p':
            return <p key={key}>{t(block.text)}</p>;

          case 'ul':
            return (
              <ul key={key} className="mb-5 ml-1 space-y-1">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ul>
            );

          case 'ol':
            return (
              <ol key={key} className="mb-5 space-y-2">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex gap-3">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-linear-to-br from-accent-1 to-accent-2 text-xs font-bold text-white">
                      {itemIndex + 1}
                    </span>
                    <span>{t(item)}</span>
                  </li>
                ))}
              </ol>
            );

          case 'quote':
            return (
              <figure key={key} className="my-7 border-l-2 border-accent pl-5">
                <blockquote className="text-base italic leading-8 text-fg">{t(block.text)}</blockquote>
                {block.cite ? (
                  <figcaption className="mt-2 text-xs text-subtle">{t(block.cite)}</figcaption>
                ) : null}
              </figure>
            );

          case 'callout':
            return (
              <aside key={key} className="glass my-7 flex gap-3.5 rounded-2xl p-5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-linear-to-br from-accent-1 to-accent-2 text-white">
                  <Icon name={block.icon || 'sparkles'} className="h-4 w-4" />
                </span>
                <p className="!mb-0 text-body-sm text-muted">{t(block.text)}</p>
              </aside>
            );

          case 'image':
            return (
              <figure key={key} className="my-7">
                <SmartImage
                  src={block.src}
                  alt={t(block.alt)}
                  width={1000}
                  height={560}
                  className="w-full rounded-2xl border border-line object-cover"
                />
                {block.caption ? (
                  <figcaption className="mt-2.5 text-center text-xs text-subtle">
                    {t(block.caption)}
                  </figcaption>
                ) : null}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
