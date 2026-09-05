import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Publications from '@/components/Publications';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import Education from '@/components/Education';
import Volunteering from '@/components/Volunteering';
import Contact from '@/components/Contact';

/**
 * Halaman utama — server component yang hanya menyusun urutan section.
 * Tiap section membaca datanya sendiri dari data/portfolio.js dan otomatis
 * menyembunyikan diri kalau datanya kosong.
 *
 * Mengubah urutan section = cukup pindahkan barisnya di sini
 * (lalu sesuaikan urutan menu di portfolio.nav).
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
      <Contact />
    </>
  );
}
