import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Publications from '@/components/Publications';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Education from '@/components/Education';
import Volunteering from '@/components/Volunteering';
import BlogPreview from '@/components/BlogPreview';
import Contact from '@/components/Contact';

/**
 * Halaman utama. Server component yang tugasnya hanya menyusun urutan section.
 * Tiap section membaca datanya sendiri dari data/portfolio.js dan menyembunyikan
 * diri kalau datanya kosong.
 *
 * Ingin mengubah urutan tampilan? Cukup pindahkan barisnya di sini, lalu
 * sesuaikan urutan menu di portfolio.nav.
 */
export default function HomePage() {
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
      <BlogPreview />
      <Contact />
    </>
  );
}
