import Link from 'next/link';

/**
 * Halaman 404 statis. Diekspor sebagai out/404.html sehingga GitHub Pages
 * menampilkannya untuk URL yang tidak dikenal.
 */
export const metadata = {
  title: 'Halaman tidak ditemukan',
};

export default function NotFound() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-accent-3">404</p>
      <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Halaman tidak ditemukan</h1>
      <p className="mt-3 max-w-md text-sm leading-7 text-slate-400">
        Tautan yang kamu buka sudah tidak tersedia atau alamatnya salah ketik.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-accent-1 to-accent-2 px-6 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
      >
        Kembali ke beranda
      </Link>
    </section>
  );
}
