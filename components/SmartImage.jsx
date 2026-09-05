'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { withBasePath } from '@/lib/asset';

/**
 * Tag <img> yang mengurus dua hal merepotkan secara otomatis:
 *
 *  1. Menambahkan base path, jadi di data cukup ditulis '/images/foto.jpg'
 *     tanpa memikirkan situsnya di-hosting di mana.
 *  2. Berpindah ke `fallbackSrc` kalau gambar aslinya belum ada atau gagal
 *     dimuat, sehingga tampilan tidak pernah rusak.
 *
 * Pemeriksaan kegagalan dilakukan dua kali: lewat event onError, dan sekali
 * lagi saat komponen selesai dipasang. Yang kedua penting karena gambar bisa
 * saja sudah gagal dimuat sebelum React sempat memasang event handler-nya.
 */
export default function SmartImage({
  src,
  fallbackSrc = '',
  alt = '',
  className = '',
  width,
  height,
  loading = 'lazy',
  ...rest
}) {
  const [failed, setFailed] = useState(false);
  const nodeRef = useRef(null);

  // Coba lagi dari awal kalau path-nya diganti di data.
  useEffect(() => {
    setFailed(false);
  }, [src]);

  // Tangkap gambar yang sudah gagal sebelum handler terpasang.
  const checkNode = useCallback((node) => {
    if (!node) return;
    if (node.complete && node.naturalWidth === 0) setFailed(true);
  }, []);

  useEffect(() => {
    checkNode(nodeRef.current);
  });

  const active = failed && fallbackSrc ? fallbackSrc : src;
  if (!active) return null;

  return (
    <img
      ref={(node) => {
        nodeRef.current = node;
        checkNode(node);
      }}
      src={withBasePath(active)}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
}
