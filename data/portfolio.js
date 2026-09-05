/**
 * =============================================================================
 *  data/portfolio.js — SATU-SATUNYA SUMBER KONTEN WEBSITE
 * =============================================================================
 *
 *  Semua teks, tautan, nama ikon, judul section, dan daftar item ada di file ini.
 *  Komponen React di folder `components/` HANYA me-render isi objek `portfolio`.
 *
 *  ATURAN MAIN:
 *  1. Menambah item = cukup tambah satu objek ke array. TIDAK perlu edit komponen.
 *  2. Array kosong ([]) = section-nya otomatis disembunyikan dari halaman.
 *  3. Urutan array = urutan tampil di layar (paling atas = paling baru).
 *
 *  DUA BAHASA (ID/EN):
 *  Field yang perlu diterjemahkan ditulis sebagai objek { id: '...', en: '...' }.
 *  Field yang sama di kedua bahasa (nama orang, nama kampus, URL) cukup string biasa.
 *  Helper `t(value, lang)` di lib/i18n.js yang mengurus pemilihannya:
 *
 *      t('Universitas Bengkulu', 'en')            -> 'Universitas Bengkulu'
 *      t({ id: 'Tentang', en: 'About' }, 'en')    -> 'About'
 *
 *  Panduan lengkap + contoh copy-paste: baca data/README.md
 * =============================================================================
 */

export const portfolio = {
  /* ==========================================================================
   * 1. META — dipakai untuk <title>, SEO, OpenGraph, sitemap, dan JSON-LD.
   * ========================================================================== */
  meta: {
    siteTitle: 'Rian Firnanda Irsyadani — Information Technology & Public Sector Governance',
    // Deskripsi singkat (<160 karakter) untuk hasil pencarian Google.
    description: {
      id: 'Portofolio Rian Firnanda Irsyadani — profesional Teknologi Informasi dengan fokus pada operasional digital, manajemen sistem, dan tata kelola sektor publik.',
      en: 'Portfolio of Rian Firnanda Irsyadani — Information Technology professional focused on digital operations, system management, and public sector governance.',
    },
    keywords: [
      'Rian Firnanda Irsyadani',
      'Portofolio',
      'Information Technology',
      'Public Administration',
      'Administrasi Publik',
      'Universitas Bengkulu',
      'Web Developer',
      'Laravel',
      'CodeIgniter',
      'Cyber Security Analyst',
      'Generative AI Leader',
      'Tata Kelola Sektor Publik',
    ],
    // Gambar preview saat link dibagikan ke WhatsApp/LinkedIn/X (1200x630 px).
    ogImage: '/images/og-image.png',
    // URL final situs (tanpa trailing slash). Ganti kalau pakai custom domain.
    baseUrl: 'https://rianfirnanda.github.io/Portofolio',
    // Bahasa default yang aktif saat halaman pertama dibuka: 'id' atau 'en'.
    locale: 'id',
    // Warna address bar di browser mobile (samakan dengan --color-bg di globals.css).
    themeColor: '#05070f',
  },

  /* ==========================================================================
   * 2. PROFILE — identitas utama, tampil di Hero + About + JSON-LD.
   * ========================================================================== */
  profile: {
    name: 'Rian Firnanda Irsyadani',
    // Sapaan pendek untuk footer & copy-to-clipboard.
    shortName: 'Rian Firnanda',
    headline: {
      id: 'Profesional Teknologi Informasi | Operasional Digital, Manajemen Sistem & Tata Kelola Sektor Publik',
      en: 'Information Technology Professional | Digital Operations, System Management & Public Sector Governance',
    },
    location: 'Bengkulu, Indonesia',
    // Badge status di Hero. Set `available: false` untuk mematikan titik hijau.
    availability: {
      available: true,
      label: { id: 'Terbuka untuk peluang kerja', en: 'Open to work' },
    },
    // GANTI FOTO: taruh file di public/images/ lalu ubah path di bawah.
    // Bisa .jpg/.png/.webp/.svg — rasio 1:1 (persegi) memberi hasil terbaik.
    avatar: '/images/avatar.svg',
    avatarAlt: {
      id: 'Foto profil Rian Firnanda Irsyadani',
      en: 'Profile photo of Rian Firnanda Irsyadani',
    },
    // Tautan tombol "Unduh CV". Isi '' (string kosong) untuk menyembunyikan tombol.
    // Taruh berkas PDF di public/ lalu tulis '/cv-rian-firnanda.pdf'.
    resumeUrl: 'https://www.linkedin.com/in/rian-firnanda/',
    // Ringkasan 3 paragraf. Tiap elemen array = satu paragraf.
    summaryId: [
      'Lulusan Administrasi Publik Universitas Bengkulu dengan predikat Cum Laude (IPK 3,84) yang berdiri di atas fondasi Teknologi Informasi dari SMKN 1 Kota Bengkulu, jurusan Rekayasa Perangkat Lunak. Kombinasi ini membuat saya terbiasa membaca kebutuhan birokrasi sekaligus menerjemahkannya menjadi solusi teknis yang benar-benar dipakai.',
      'Saya tersertifikasi BNSP di bidang Pengembangan Perangkat Lunak dan membangun aplikasi web dengan framework PHP (Laravel, CodeIgniter). Di sisi keamanan, saya memegang Certified Cyber Security Analyst (C3SA, CyberWarFare Labs) dan Foundations of Cybersecurity dari Google, serta sertifikasi Junior Graphic Designer (BNSP & Digitalent Kominfo) dan Operator Komputer Madya.',
      'Belakangan saya memperluas kompetensi ke AI dan Cloud: Google Cloud Generative AI Leader, Anthropic AI Fluency, program produktivitas AI dari Google, serta AWS Educate Machine Learning Foundations. Fokus saya jelas — memakai inovasi digital untuk membenahi pelayanan publik dan mengoptimalkan alur kerja administrasi.',
    ],
    summaryEn: [
      'Cum Laude Public Administration graduate from Universitas Bengkulu (GPA 3.84), standing on an Information Technology foundation from SMKN 1 Kota Bengkulu, Software Engineering major. That combination lets me read bureaucratic needs and translate them into technical solutions people actually use.',
      'I am BNSP-certified in Software Development and build web applications with PHP frameworks (Laravel, CodeIgniter). On the security side I hold the Certified Cyber Security Analyst (C3SA, CyberWarFare Labs) and Google Foundations of Cybersecurity, plus Junior Graphic Designer (BNSP & Digitalent Kominfo) and Intermediate Computer Operator certifications.',
      'More recently I expanded into AI and Cloud: Google Cloud Generative AI Leader, Anthropic AI Fluency, Google AI productivity programs, and AWS Educate Machine Learning Foundations. My focus is clear — using digital innovation to transform public services and optimize administrative workflows.',
    ],
  },

  /* ==========================================================================
   * 3. SOCIAL — deretan ikon di Hero, Contact, dan Footer.
   *    `icon` harus salah satu nama yang terdaftar di components/Icon.jsx
   * ========================================================================== */
  social: [
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/rian-firnanda/',
      icon: 'linkedin',
    },
    {
      // GANTI dengan username GitHub milikmu.
      label: 'GitHub',
      href: 'https://github.com/Rianfirnanda',
      icon: 'github',
    },
    {
      // GANTI dengan alamat email aktif (harus sama dengan contact.email).
      label: 'Email',
      href: 'mailto:rianfirnanda@example.com',
      icon: 'mail',
    },
  ],

  /* ==========================================================================
   * 4. STATS — strip angka di section About.
   * ========================================================================== */
  stats: [
    { value: '3.84', label: { id: 'IPK Cum Laude', en: 'GPA Cum Laude' } },
    { value: '16+', label: { id: 'Sertifikasi Profesional', en: 'Professional Certifications' } },
    { value: '9', label: { id: 'Peran & Pengalaman', en: 'Roles & Experiences' } },
    { value: '1', label: { id: 'Publikasi Terakreditasi', en: 'Accredited Publication' } },
  ],

  /* ==========================================================================
   * 5. EXPERIENCE — timeline vertikal, urut dari yang paling baru.
   *    `highlight: true` memberi kartu animated gradient border.
   *    `skills` boleh dikosongkan ([]) kalau tidak perlu chip.
   * ========================================================================== */
  experience: [
    {
      role: {
        id: 'Tim Penyusun Dokumen Audit Mutu Internal (AMI)',
        en: 'Internal Quality Audit (AMI) Document Team',
      },
      org: 'Jurusan Administrasi Publik, Universitas Bengkulu',
      type: { id: 'Paruh Waktu', en: 'Part-time' },
      period: { id: 'Mar 2026 — sekarang', en: 'Mar 2026 — present' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Ditunjuk sebagai perwakilan mahasiswa melalui Surat Keputusan Rektor No. 1664/UN30.9/HK/2026 untuk mendukung akreditasi jurusan tahun 2026. Menyusun dokumen Audit Mutu Internal bersama dosen, dengan fokus pada tata kelola pendidikan tinggi dan penjaminan mutu.',
        en: 'Appointed student representative under Rector Decree No. 1664/UN30.9/HK/2026 to support the 2026 departmental accreditation. Drafting Internal Quality Audit documents together with faculty members, focused on higher-education governance and quality assurance.',
      },
      skills: ['Quality Assurance', 'Higher Education Governance', 'Technical Documentation'],
      highlight: true,
    },
    {
      role: {
        id: 'Tim Penyusun Dokumen Akreditasi Jurusan 2026',
        en: '2026 Departmental Accreditation Document Team',
      },
      org: 'Jurusan Administrasi Publik, Universitas Bengkulu',
      type: { id: 'Paruh Waktu', en: 'Part-time' },
      period: { id: 'Jan 2026 — sekarang', en: 'Jan 2026 — present' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Menyiapkan berkas dan bukti dukung akreditasi jurusan, mulai dari pengumpulan data internal, penyelarasan dengan instrumen akreditasi, hingga penulisan narasi dokumen.',
        en: 'Preparing accreditation files and supporting evidence for the department — from internal data collection and alignment with the accreditation instrument to writing the document narrative.',
      },
      skills: ['Accreditation', 'Data Collection', 'Documentation'],
      highlight: false,
    },
    {
      role: {
        id: 'Pengelola Website Jurusan Administrasi Publik FISIP',
        en: 'Website Manager, Public Administration Department FISIP',
      },
      org: 'Universitas Bengkulu',
      type: { id: 'Paruh Waktu', en: 'Part-time' },
      period: { id: 'Jan 2026 — sekarang', en: 'Jan 2026 — present' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Ditunjuk melalui Surat Keputusan Rektor No. 019/UN30.9/HK/2026. Mengelola website resmi jurusan: pemeliharaan sistem, strategi konten, dan komunikasi digital publik agar informasi akademik selalu akurat dan mudah diakses.',
        en: 'Appointed under Rector Decree No. 019/UN30.9/HK/2026. Managing the department’s official website: system maintenance, content strategy, and public digital communication so academic information stays accurate and easy to reach.',
      },
      skills: ['Website Management', 'Content Strategy', 'Digital Communication', 'CMS'],
      highlight: true,
    },
    {
      role: {
        id: 'Tim Tracer Study Jurusan Administrasi Publik',
        en: 'Tracer Study Team, Public Administration Department',
      },
      org: 'Universitas Bengkulu',
      type: { id: 'Paruh Waktu', en: 'Part-time' },
      period: { id: 'Jan 2026 — sekarang', en: 'Jan 2026 — present' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Ditunjuk melalui Surat Keputusan Rektor No. 068/UN30.9/HK/2026. Melacak data alumni, melakukan riset dan pengumpulan data, serta menganalisis hasilnya sebagai bahan pendukung akreditasi jurusan.',
        en: 'Appointed under Rector Decree No. 068/UN30.9/HK/2026. Tracking alumni data, running research and data collection, and analysing the results as supporting evidence for departmental accreditation.',
      },
      skills: ['Research', 'Data Analysis', 'Survey Design', 'Alumni Tracking'],
      highlight: false,
    },
    {
      role: {
        id: 'Presenter — 2nd International Conference on SDGs 2030',
        en: 'Presenter — 2nd International Conference on SDGs 2030',
      },
      org: 'Yayasan Bali Sruti, Denpasar',
      type: { id: 'Konferensi', en: 'Conference' },
      period: { id: 'Agu — Sep 2026', en: 'Aug — Sep 2026' },
      location: 'Denpasar, Bali, Indonesia',
      description: {
        id: 'Mempresentasikan makalah "Bridging Design-Reality Gaps in a National Family Information System" di forum internasional, membahas kesenjangan antara desain sistem informasi nasional dan realitas implementasinya di daerah.',
        en: 'Presented the paper "Bridging Design-Reality Gaps in a National Family Information System" at an international forum, discussing the gap between the design of a national information system and the reality of its local implementation.',
      },
      skills: ['Public Speaking', 'Academic Writing', 'SDGs', 'Research Presentation'],
      highlight: true,
    },
    {
      role: { id: 'Magang', en: 'Intern' },
      org: 'Dinas Pemberdayaan Masyarakat dan Desa (DPMD) Provinsi Bengkulu',
      type: { id: 'Magang', en: 'Internship' },
      period: { id: 'Sep — Okt 2025', en: 'Sep — Oct 2025' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Terlibat langsung dalam tata kelola pemerintahan daerah, program pemberdayaan desa, dan proses administrasi pemerintahan — termasuk pengelolaan berkas dan pendampingan kegiatan dinas.',
        en: 'Worked directly on regional governance, village empowerment programs, and government administration processes — including document handling and support for agency activities.',
      },
      skills: ['Regional Governance', 'Village Empowerment', 'Government Administration'],
      highlight: false,
    },
    {
      role: { id: 'Asisten Laboratorium', en: 'Laboratory Assistant' },
      org: 'Laboratorium Administrasi Publik, Universitas Bengkulu',
      type: { id: 'Paruh Waktu', en: 'Part-time' },
      period: { id: 'Nov 2024 — sekarang', en: 'Nov 2024 — present' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Mendukung kegiatan akademik, penelitian, pelatihan, dan pengabdian masyarakat di laboratorium: menyiapkan materi praktikum, mendampingi peserta, serta merapikan dokumentasi kegiatan.',
        en: 'Supporting academic, research, training, and community-service activities in the lab: preparing practicum materials, assisting participants, and maintaining activity documentation.',
      },
      skills: ['Academic Support', 'Training Facilitation', 'Research Assistance'],
      highlight: false,
    },
    {
      role: { id: 'Volunteer Kesmawa', en: 'Kesmawa Volunteer' },
      org: 'Rektorat Universitas Bengkulu',
      type: { id: 'Sukarelawan', en: 'Volunteer' },
      period: { id: 'Apr 2024 — sekarang', en: 'Apr 2024 — present' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Memverifikasi berkas mahasiswa baru, mewawancarai pendaftar beasiswa, dan mengelola data pendaftar agar proses seleksi berjalan tertib dan terdokumentasi.',
        en: 'Verifying new-student files, interviewing scholarship applicants, and managing applicant data so the selection process stays orderly and well documented.',
      },
      skills: ['Data Verification', 'Interviewing', 'Applicant Data Management'],
      highlight: false,
    },
    {
      role: { id: 'Volunteer', en: 'Volunteer' },
      org: 'SDGs Center Universitas Bengkulu',
      type: { id: 'Sukarelawan', en: 'Volunteer' },
      period: { id: 'Okt 2023 — Jan 2025', en: 'Oct 2023 — Jan 2025' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Terlibat dalam program-program keberlanjutan kampus: kegiatan lingkungan, edukasi publik, dan kolaborasi lintas organisasi untuk isu Sustainable Development Goals.',
        en: 'Involved in campus sustainability programs: environmental activities, public education, and cross-organisation collaboration around the Sustainable Development Goals.',
      },
      skills: ['Sustainability', 'Community Engagement', 'Event Support'],
      highlight: false,
    },
  ],

  /* ==========================================================================
   * 6. EDUCATION
   * ========================================================================== */
  education: [
    {
      degree: {
        id: 'S1 Ilmu Administrasi Publik',
        en: "Bachelor's Degree in Public Administration",
      },
      school: 'Universitas Bengkulu',
      period: '2022 — 2026',
      gpa: { id: 'IPK 3,84 — Cum Laude', en: 'GPA 3.84 — Cum Laude' },
      notes: {
        id: 'Fokus pada formulasi kebijakan publik, tata kelola pemerintahan, manajemen sistem informasi, dan administrasi perkantoran.',
        en: 'Focused on public policy formulation, governance, information systems management, and office administration.',
      },
    },
    {
      degree: {
        id: 'Teknik Komputer & Informatika — Rekayasa Perangkat Lunak',
        en: 'Computer & Informatics Engineering — Software Engineering',
      },
      school: 'SMKN 1 Kota Bengkulu',
      period: '2019 — 2022',
      gpa: '',
      notes: {
        id: 'Fondasi pemrograman, basis data, jaringan komputer, dan pengembangan aplikasi web.',
        en: 'Foundation in programming, databases, computer networking, and web application development.',
      },
    },
  ],

  /* ==========================================================================
   * 7. PUBLICATIONS — kartu riset unggulan dengan abstrak yang bisa dibuka.
   * ========================================================================== */
  publications: [
    {
      title:
        'Bridging Centralized Design and Local Realities: Implementation Strategies for the Family Information System (SIGA) in Bengkulu Province',
      venue: {
        id: 'Journal of Social and Policy Issues (JSPI) — Terakreditasi Sinta 4',
        en: 'Journal of Social and Policy Issues (JSPI) — Sinta 4 accredited',
      },
      date: { id: '30 Juni 2026', en: '30 June 2026' },
      role: { id: 'Penulis Utama', en: 'Main Author' },
      // Isi '' untuk menyembunyikan tombol "Baca publikasi".
      url: 'https://www.linkedin.com/in/rian-firnanda/',
      abstract: {
        id: 'Studi kasus kualitatif terhadap implementasi Sistem Informasi Keluarga (SIGA) di BKKBN Provinsi Bengkulu menggunakan kerangka Design-Reality Gap ITPOSMO milik Heeks. Sebanyak 202 unit wawancara dikodekan, dan hasilnya menunjukkan kesenjangan terbesar terkonsentrasi pada dimensi informasi dan manajemen (57,4% dari seluruh bukti terkode). Penelitian ini merekomendasikan tiga strategi penjembatan: verifikasi data berjenjang, pendampingan dan penguatan kapasitas, serta koordinasi formal sekaligus informal antar-tingkat pemerintahan.',
        en: 'A qualitative case study of the Family Information System (SIGA) implementation at BKKBN Bengkulu Province using Heeks’ ITPOSMO Design-Reality Gap framework. 202 interview units were coded, showing that the widest gaps concentrate in the information and management dimensions (57.4% of all coded evidence). The study proposes three bridging strategies: tiered data verification, mentoring and capacity building, and both formal and informal coordination across government levels.',
      },
    },
  ],

  /* ==========================================================================
   * 8. PROJECTS — grid kartu dengan filter tag otomatis dari field `tags`.
   *    `image`: path gambar di public/. Isi null untuk memakai gradient fallback.
   *    `links`: array tombol; array kosong = tidak ada tombol.
   * ========================================================================== */
  projects: [
    {
      name: 'SobatKoding',
      period: '2021 — 2022',
      org: 'SMKN 1 Kota Bengkulu',
      description: {
        id: 'Usaha layanan digital yang saya bangun bersama tim sekolah: pengembangan aplikasi dan website untuk klien kecil, sekaligus jasa pengerjaan dokumen perkantoran profesional (Word, Excel, PowerPoint) untuk mahasiswa dan UMKM sekitar.',
        en: 'A digital service venture I built with a school team: application and website development for small clients, plus professional office document support (Word, Excel, PowerPoint) for students and nearby small businesses.',
      },
      tags: ['Web Development', 'Entrepreneurship', 'Office Productivity'],
      // GANTI GAMBAR: taruh file baru di public/images/projects/ lalu ubah path ini.
      image: '/images/projects/sobatkoding.svg',
      links: [
        // Contoh: { label: { id: 'Lihat repo', en: 'View repo' }, href: 'https://github.com/...', icon: 'github' }
      ],
    },
    {
      name: 'Health Hero',
      period: '2021',
      org: 'Direktorat SMK',
      description: {
        id: 'Proyek kolaboratif tingkat nasional bersama Direktorat SMK yang mengangkat tema kesehatan. Saya terlibat pada sisi pengembangan dan penyusunan aset digital produk.',
        en: 'A national-level collaborative project with Direktorat SMK on a health theme. I contributed on the development side and on preparing the product’s digital assets.',
      },
      tags: ['Collaboration', 'Game Development', 'Health'],
      image: '/images/projects/health-hero.svg',
      links: [],
    },
    {
      name: 'Fly Over Space',
      period: '2020 — 2022',
      org: { id: 'Organisasi riset roket & pengembangan perangkat lunak', en: 'Rocket research & software development organisation' },
      description: {
        id: 'Organisasi riset roket sekaligus pengembangan perangkat lunak. Saya ikut menangani sisi perangkat lunak pendukung riset dan dokumentasi teknis kegiatan tim.',
        en: 'A rocket research and software development organisation. I helped handle the supporting software side of the research and the team’s technical documentation.',
      },
      tags: ['Research', 'Software Development', 'Team Project'],
      image: '/images/projects/fly-over-space.svg',
      links: [],
    },
  ],

  /* ==========================================================================
   * 9. CERTIFICATIONS — grid ringkas. `credentialUrl` kosong = tanpa tautan.
   *    `group` dipakai untuk mengelompokkan (opsional, boleh dihapus).
   * ========================================================================== */
  certifications: [
    { name: 'Generative AI Leader', issuer: 'Google Cloud', year: '2026', group: 'AI & Cloud', credentialUrl: '' },
    { name: 'AI Fluency', issuer: 'Anthropic', year: '2026', group: 'AI & Cloud', credentialUrl: '' },
    { name: 'AI Fundamentals', issuer: 'Google', year: '2026', group: 'AI & Cloud', credentialUrl: '' },
    { name: 'Start Writing Prompts like a Pro', issuer: 'Google', year: '2026', group: 'AI & Cloud', credentialUrl: '' },
    { name: 'AWS Educate Machine Learning Foundations', issuer: 'Amazon Web Services', year: '2026', group: 'AI & Cloud', credentialUrl: '' },
    { name: 'Foundations of Cybersecurity', issuer: 'Google', year: '2025', group: 'Security', credentialUrl: '' },
    { name: 'Certified Cyber Security Analyst (C3SA)', issuer: 'CyberWarFare Labs', year: '2025', group: 'Security', credentialUrl: '' },
    { name: { id: 'Pengembangan Perangkat Lunak', en: 'Software Development' }, issuer: 'BNSP', year: '2022', group: 'Software', credentialUrl: '' },
    { name: 'Game Development', issuer: 'Direktorat SMK', year: '2021', group: 'Software', credentialUrl: '' },
    { name: { id: 'Desainer Grafis Muda', en: 'Junior Graphic Designer' }, issuer: 'BNSP & Digitalent Kominfo', year: '2022', group: 'Design', credentialUrl: '' },
    { name: 'Operator Komputer Madya', issuer: 'Kominfo', year: '2022', group: 'Design', credentialUrl: '' },
    { name: { id: 'UKBI — Uji Kemahiran Berbahasa Indonesia', en: 'UKBI — Indonesian Language Proficiency Test' }, issuer: 'Badan Bahasa', year: '2022', group: 'Language', credentialUrl: '' },
  ],

  /* ==========================================================================
   * 10. SKILLS — chip kaca berkelompok. Tambah grup baru = tambah objek baru.
   *     `icon` merujuk ke nama ikon di components/Icon.jsx
   * ========================================================================== */
  skills: {
    groups: [
      {
        title: { id: 'Web & Perangkat Lunak', en: 'Web & Software' },
        icon: 'code',
        items: ['PHP', 'Laravel', 'CodeIgniter', 'JavaScript', 'HTML/CSS', 'Web Development', 'Git & GitHub', 'Database'],
      },
      {
        title: { id: 'AI & Cloud', en: 'AI & Cloud' },
        icon: 'sparkles',
        items: [
          'Generative AI',
          'Prompt Engineering',
          'Google AI Studio',
          'AWS',
          'Machine Learning Foundations',
          'AI Enablement',
          'AI Product Strategy',
        ],
      },
      {
        title: { id: 'Keamanan & Sistem', en: 'Security & Systems' },
        icon: 'shield',
        items: ['Cyber Security Analysis', 'Operating Systems', 'Computer Hardware', 'Networking', 'Technical Support'],
      },
      {
        title: { id: 'Sektor Publik & Tata Kelola', en: 'Public Sector & Governance' },
        icon: 'building',
        items: [
          'Public Administration',
          'Public Policy',
          'Governance',
          'Quality Assurance (AMI/Akreditasi)',
          'Office Administration',
          'Data Collection & Analysis',
          'Project Management',
        ],
      },
      {
        title: { id: 'Desain & Produktivitas', en: 'Design & Productivity' },
        icon: 'palette',
        items: ['Graphic Design', 'Microsoft Office (advanced)', 'Documentation', 'Information Management'],
      },
    ],
  },

  /* ==========================================================================
   * 11. VOLUNTEERING
   * ========================================================================== */
  volunteering: [
    {
      role: 'Aksi Muda Jaga Iklim (AMJI) 2023 & 2024',
      org: 'SDGs Center Universitas Bengkulu',
      period: '2023 — 2024',
      description: {
        id: 'Penanaman mangrove, bersih-bersih kawasan pesisir, dan webinar isu iklim, bekerja sama dengan Indorelawan dan EcoNusa Foundation.',
        en: 'Mangrove planting, coastal clean-ups, and climate webinars, in collaboration with Indorelawan and the EcoNusa Foundation.',
      },
    },
  ],

  /* ==========================================================================
   * 12. LANGUAGES
   * ========================================================================== */
  languages: [
    { name: { id: 'Bahasa Indonesia', en: 'Indonesian' }, level: { id: 'Penutur asli', en: 'Native speaker' } },
    { name: { id: 'Bahasa Inggris', en: 'English' }, level: { id: 'Kemampuan kerja terbatas', en: 'Limited working proficiency' } },
  ],

  /* ==========================================================================
   * 13. SERVICES — layanan yang ditawarkan, tampil sebagai chip di Contact.
   * ========================================================================== */
  services: [
    { id: 'Desain Web', en: 'Web Design' },
    { id: 'Konsultasi TI', en: 'IT Consulting' },
    { id: 'Bantuan Administrasi', en: 'Administrative Assistance' },
    { id: 'Manajemen Informasi', en: 'Information Management' },
    { id: 'Dukungan Teknis', en: 'Technical Support' },
    { id: 'Jaringan Komputer', en: 'Computer Networking' },
  ],

  /* ==========================================================================
   * 14. CONTACT
   * ========================================================================== */
  contact: {
    // GANTI dengan email aktif. Dipakai untuk tombol mailto + salin ke clipboard.
    email: 'rianfirnanda@example.com',
    // Kosongkan ('') kalau tidak ingin menampilkan nomor telepon.
    phone: '',
    ctaText: { id: 'Kirim Email', en: 'Send an Email' },
    note: {
      id: 'Terbuka untuk kolaborasi, peluang kerja, maupun diskusi seputar transformasi digital sektor publik. Balasan biasanya dalam 1×24 jam.',
      en: 'Open to collaboration, job opportunities, and conversations about digital transformation in the public sector. I usually reply within 24 hours.',
    },
  },

  /* ==========================================================================
   * 15. NAV & SECTIONS — judul section + menu navigasi.
   *     `id` di sini = anchor #id yang dipakai smooth scroll & highlight navbar.
   *     Hapus satu baris dari `nav` untuk menyembunyikannya dari menu.
   * ========================================================================== */
  nav: [
    { id: 'about', label: { id: 'Tentang', en: 'About' } },
    { id: 'experience', label: { id: 'Pengalaman', en: 'Experience' } },
    { id: 'projects', label: { id: 'Proyek', en: 'Projects' } },
    { id: 'publications', label: { id: 'Publikasi', en: 'Publications' } },
    { id: 'skills', label: { id: 'Keahlian', en: 'Skills' } },
    { id: 'certifications', label: { id: 'Sertifikasi', en: 'Certifications' } },
    { id: 'education', label: { id: 'Pendidikan', en: 'Education' } },
    { id: 'contact', label: { id: 'Kontak', en: 'Contact' } },
  ],

  sections: {
    about: {
      eyebrow: { id: '01 — Profil', en: '01 — Profile' },
      title: { id: 'Tentang Saya', en: 'About Me' },
      subtitle: {
        id: 'Perpaduan antara disiplin administrasi publik dan keterampilan teknologi informasi.',
        en: 'A blend of public administration discipline and information technology skills.',
      },
    },
    experience: {
      eyebrow: { id: '02 — Perjalanan', en: '02 — Journey' },
      title: { id: 'Pengalaman', en: 'Experience' },
      subtitle: {
        id: 'Peran akademik, pemerintahan, dan kesukarelawanan yang membentuk cara saya bekerja.',
        en: 'Academic, government, and volunteer roles that shaped the way I work.',
      },
    },
    projects: {
      eyebrow: { id: '03 — Karya', en: '03 — Work' },
      title: { id: 'Proyek', en: 'Projects' },
      subtitle: {
        id: 'Produk dan inisiatif yang saya bangun bersama tim.',
        en: 'Products and initiatives I built together with a team.',
      },
    },
    publications: {
      eyebrow: { id: '04 — Riset', en: '04 — Research' },
      title: { id: 'Publikasi', en: 'Publications' },
      subtitle: {
        id: 'Karya ilmiah yang terbit di jurnal terakreditasi.',
        en: 'Scholarly work published in an accredited journal.',
      },
    },
    skills: {
      eyebrow: { id: '05 — Kompetensi', en: '05 — Competencies' },
      title: { id: 'Keahlian', en: 'Skills' },
      subtitle: {
        id: 'Perangkat yang saya pakai sehari-hari, dari kode sampai kebijakan.',
        en: 'The toolkit I use daily, from code to policy.',
      },
    },
    certifications: {
      eyebrow: { id: '06 — Kredensial', en: '06 — Credentials' },
      title: { id: 'Sertifikasi', en: 'Certifications' },
      subtitle: {
        id: 'Sertifikasi profesional dari BNSP, Google, Anthropic, AWS, dan lembaga lainnya.',
        en: 'Professional certifications from BNSP, Google, Anthropic, AWS, and other institutions.',
      },
    },
    education: {
      eyebrow: { id: '07 — Pendidikan', en: '07 — Education' },
      title: { id: 'Pendidikan', en: 'Education' },
      subtitle: {
        id: 'Jenjang formal yang menjadi fondasi keahlian saya.',
        en: 'The formal education behind my expertise.',
      },
    },
    volunteering: {
      eyebrow: { id: '08 — Kontribusi', en: '08 — Contribution' },
      title: { id: 'Kesukarelawanan', en: 'Volunteering' },
      subtitle: {
        id: 'Kegiatan sosial dan lingkungan di luar ruang kelas.',
        en: 'Social and environmental activities beyond the classroom.',
      },
    },
    contact: {
      eyebrow: { id: '09 — Kontak', en: '09 — Contact' },
      title: { id: 'Mari Terhubung', en: "Let's Connect" },
      subtitle: {
        id: 'Punya proyek, tawaran kerja, atau sekadar ingin berdiskusi? Sapa saya.',
        en: 'Have a project, an offer, or just want to talk? Say hello.',
      },
    },
  },

  /* ==========================================================================
   * 16. UI — label tombol & teks antarmuka. Ubah di sini, berlaku sesitus.
   * ========================================================================== */
  ui: {
    skipToContent: { id: 'Lompat ke konten utama', en: 'Skip to main content' },
    openMenu: { id: 'Buka menu navigasi', en: 'Open navigation menu' },
    closeMenu: { id: 'Tutup menu navigasi', en: 'Close navigation menu' },
    switchLanguage: { id: 'Ganti bahasa', en: 'Switch language' },
    ctaContact: { id: 'Hubungi Saya', en: 'Contact Me' },
    ctaResume: { id: 'Unduh CV', en: 'Download CV' },
    scrollCue: { id: 'Gulir ke bawah', en: 'Scroll down' },
    readMore: { id: 'Selengkapnya', en: 'Read more' },
    readLess: { id: 'Ringkas', en: 'Show less' },
    readAbstract: { id: 'Baca abstrak', en: 'Read abstract' },
    hideAbstract: { id: 'Tutup abstrak', en: 'Hide abstract' },
    viewPublication: { id: 'Baca publikasi', en: 'Read publication' },
    viewCredential: { id: 'Lihat kredensial', en: 'View credential' },
    allTag: { id: 'Semua', en: 'All' },
    filterLabel: { id: 'Saring proyek berdasarkan tag', en: 'Filter projects by tag' },
    copyEmail: { id: 'Salin alamat email', en: 'Copy email address' },
    copied: { id: 'Tersalin!', en: 'Copied!' },
    servicesTitle: { id: 'Layanan yang Ditawarkan', en: 'Services Offered' },
    languagesTitle: { id: 'Bahasa', en: 'Languages' },
    backToTop: { id: 'Kembali ke atas', en: 'Back to top' },
    builtWith: {
      id: 'Dibangun dengan Next.js & Tailwind CSS · Di-deploy di GitHub Pages',
      en: 'Built with Next.js & Tailwind CSS · Deployed on GitHub Pages',
    },
    rights: { id: 'Seluruh hak cipta dilindungi.', en: 'All rights reserved.' },
  },
};

export default portfolio;
