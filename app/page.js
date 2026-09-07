import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Publications from '@/components/Publications';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Education from '@/components/Education';
import Volunteering from '@/components/Volunteering';
import Galeri from '@/components/Galeri';
import BlogPreview from '@/components/BlogPreview';
import Feedback from '@/components/Feedback';
import Contact from '@/components/Contact';
import { getPublishedPosts } from '@/data/posts';

/**
 * Halaman utama. Server component yang tugasnya hanya menyusun urutan section.
 * Tiap section membaca datanya sendiri dari data/portfolio.js dan menyembunyikan
 * diri kalau datanya kosong.
 *
 * Ingin mengubah urutan tampilan? Cukup pindahkan barisnya di sini, lalu
 * sesuaikan urutan menu di portfolio.nav.
 */
export default function HomePage() {
  // Tulisan dibaca di sini, di sisi server, lalu diserahkan ke BlogPreview.
  const latestPosts = getPublishedPosts().slice(0, 3);

  return (
    <>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Publications />
      <Skills />
      <Certifications />
      <Education />
      <Volunteering />
      <Galeri />
      <BlogPreview posts={latestPosts} />
      <Feedback />
      <Contact />
    </>
  );
}
