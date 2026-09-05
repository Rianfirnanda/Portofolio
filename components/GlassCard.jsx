'use client';

/**
 * GlassCard: satu-satunya primitif permukaan kaca yang dipakai semua kartu.
 *
 * Props:
 *  - as         : elemen HTML pembungkus (default 'div'), mis. 'article' / 'li'
 *  - hover      : aktifkan efek angkat + glow saat kursor di atas kartu
 *  - featured   : aktifkan animated gradient border (kartu unggulan)
 *  - className  : utility Tailwind tambahan (padding, layout, dll)
 */
export default function GlassCard({
  as: Tag = 'div',
  hover = true,
  featured = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'glass',
    hover ? 'glass-hover' : '',
    featured ? 'glass-featured' : '',
    'rounded-2xl',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
