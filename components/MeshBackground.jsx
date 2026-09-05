/**
 * MeshBackground — latar mesh-gradient gelap dengan tiga blob blur beranimasi
 * plus lapisan noise. Murni dekoratif, tidak interaktif, dan animasinya otomatis
 * mati saat pengguna mengaktifkan `prefers-reduced-motion` (lihat globals.css).
 *
 * Komponen ini server component: tidak ada state maupun event handler.
 */
export default function MeshBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Dasar gelap + sedikit gradasi vertikal. */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,#0b1024_0%,#05070f_55%,#04050c_100%)]" />

      {/* Blob 1 — indigo, kiri atas. */}
      <div
        className="absolute -left-[18%] -top-[22%] h-[62vmax] w-[62vmax] rounded-full opacity-[0.34] blur-[110px]"
        style={{
          background: 'radial-gradient(circle at 30% 30%, var(--color-accent-1), transparent 68%)',
          animation: 'blob-drift-a var(--duration-blob) ease-in-out infinite',
        }}
      />

      {/* Blob 2 — violet, kanan tengah. */}
      <div
        className="absolute -right-[16%] top-[8%] h-[56vmax] w-[56vmax] rounded-full opacity-[0.28] blur-[120px]"
        style={{
          background: 'radial-gradient(circle at 60% 40%, var(--color-accent-2), transparent 68%)',
          animation: 'blob-drift-b calc(var(--duration-blob) * 1.35) ease-in-out infinite',
        }}
      />

      {/* Blob 3 — cyan, bawah tengah. */}
      <div
        className="absolute bottom-[-24%] left-[24%] h-[52vmax] w-[52vmax] rounded-full opacity-[0.22] blur-[130px]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, var(--color-accent-3), transparent 70%)',
          animation: 'blob-drift-c calc(var(--duration-blob) * 1.7) ease-in-out infinite',
        }}
      />

      {/* Grain halus agar gradien tidak terlihat "plastik". */}
      <div className="noise-overlay absolute inset-0 opacity-[0.05] mix-blend-overlay" />

      {/* Vignette lembut di tepi layar. */}
      <div className="absolute inset-0 bg-[radial-gradient(100%_100%_at_50%_50%,transparent_55%,rgba(2,3,8,0.85)_100%)]" />
    </div>
  );
}
