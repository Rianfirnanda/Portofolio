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
import { portfolio } from '@/data/portfolio';
import { getPublishedPosts } from '@/data/posts';

/**
 * Halaman utama. Server component yang tugasnya hanya menyusun urutan bagian.
 * Tiap bagian membaca datanya sendiri dari data/portfolio.js dan menyembunyikan
 * diri kalau datanya kosong.
 *
 * URUTANNYA DIATUR DARI PANEL, di menu Pengaturan Situs > Urutan Bagian.
 * Geser barisnya di sana, halaman ini ikut berubah. Kotak centangnya
 * menyembunyikan satu bagian tanpa menghapus isinya.
 *
 * Bagian yang belum tercantum di panel tidak hilang, melainkan disusulkan di
 * belakang dengan urutan bawaan di bawah ini. Jadi daftar di panel yang belum
 * diperbarui tidak akan pernah membuat isi situs lenyap diam diam.
 */
const URUTAN_BAWAAN = [
  'about',
  'experience',
  'projects',
  'publications',
  'skills',
  'certifications',
  'education',
  'volunteering',
  'gallery',
  'blog',
  'feedback',
  'contact',
];

export default function HomePage() {
  // Tulisan dibaca di sini, di sisi server, lalu diserahkan ke BlogPreview.
  const latestPosts = getPublishedPosts().slice(0, 3);

  const bagian = {
    about: <About key="about" />,
    experience: <Experience key="experience" />,
    projects: <Projects key="projects" />,
    publications: <Publications key="publications" />,
    skills: <Skills key="skills" />,
    certifications: <Certifications key="certifications" />,
    education: <Education key="education" />,
    volunteering: <Volunteering key="volunteering" />,
    gallery: <Galeri key="gallery" />,
    blog: <BlogPreview key="blog" posts={latestPosts} />,
    feedback: <Feedback key="feedback" />,
    contact: <Contact key="contact" />,
  };

  const daftar = portfolio.layout?.order ?? [];
  const disebut = new Set(daftar.map((baris) => baris?.id));

  // new Set membuang baris yang tidak sengaja tercatat dua kali di panel.
  const urutan = [
    ...new Set([
      ...daftar.filter((baris) => baris?.visible !== false).map((baris) => baris?.id),
      ...URUTAN_BAWAAN.filter((id) => !disebut.has(id)),
    ]),
  ];

  return (
    <>
      <Hero />
      {urutan.map((id) => bagian[id]).filter(Boolean)}
    </>
  );
}
