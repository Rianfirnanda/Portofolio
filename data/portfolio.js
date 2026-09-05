/**
 * =============================================================================
 *  data/portfolio.js  |  SATU-SATUNYA SUMBER KONTEN WEBSITE
 * =============================================================================
 *
 *  Semua teks, tautan, gambar, nama ikon, dan judul section ada di file ini.
 *  Komponen di folder components/ hanya membaca dan menampilkan isinya.
 *
 *  ATURAN MAIN
 *  1. Menambah item cukup dengan menambah satu objek ke array. Tampilan
 *     menyesuaikan sendiri, tidak perlu menyentuh komponen apa pun.
 *  2. Array kosong ([]) membuat section-nya hilang otomatis dari halaman.
 *  3. Urutan array sama dengan urutan tampil di layar, paling atas paling baru.
 *
 *  DUA BAHASA (ID/EN)
 *  Teks yang perlu diterjemahkan ditulis sebagai objek { id: '...', en: '...' }.
 *  Teks yang sama di kedua bahasa (nama orang, nama kampus, URL) cukup string
 *  biasa. Helper t() di lib/i18n.js yang memilihkan mana yang dipakai.
 *
 *  GAMBAR
 *  Semua path gambar ditulis relatif dari folder public/ dan diawali "/".
 *  Contoh: '/images/profile.jpg'. Jangan menulis nama repo di depannya.
 *
 *  Panduan lengkap dengan contoh siap tempel ada di data/README.md
 * =============================================================================
 */

export const portfolio = {
  /* ==========================================================================
   * 1. META  |  judul halaman, SEO, OpenGraph, sitemap, JSON-LD
   * ========================================================================== */
  meta: {
    siteTitle: 'Rian Firnanda Irsyadani | Teknologi Informasi & Tata Kelola Sektor Publik',
    description: {
      id: 'Portofolio Rian Firnanda Irsyadani. Menggabungkan teknologi informasi dan administrasi publik untuk membenahi layanan pemerintahan.',
      en: 'Portfolio of Rian Firnanda Irsyadani. Bringing information technology and public administration together to improve government services.',
    },
    keywords: [
      'Rian Firnanda Irsyadani',
      'Portofolio',
      'Information Technology',
      'Administrasi Publik',
      'Universitas Bengkulu',
      'Web Developer',
      'Laravel',
      'CodeIgniter',
      'Cyber Security Analyst',
      'Generative AI Leader',
      'Tata Kelola Sektor Publik',
    ],
    // Gambar preview saat link dibagikan ke WhatsApp, LinkedIn, atau X.
    ogImage: '/images/og-image.png',
    // GANTI dengan domain Vercel milikmu, tanpa garis miring di akhir.
    // Nilai ini dipakai untuk canonical URL, sitemap, dan robots.txt.
    baseUrl: 'https://rianfirnanda.vercel.app',
    // Bahasa yang aktif saat halaman pertama dibuka: 'id' atau 'en'.
    locale: 'id',
    // Tema saat pengunjung baru pertama kali datang: 'dark', 'light',
    // atau 'system' untuk mengikuti pengaturan perangkat mereka.
    defaultTheme: 'system',
    themeColorLight: '#f5f7fc',
    themeColorDark: '#05070f',
  },

  /* ==========================================================================
   * 2. PROFILE  |  identitas utama, tampil di Hero, About, dan JSON-LD
   * ========================================================================== */
  profile: {
    name: 'Rian Firnanda Irsyadani',
    shortName: 'Rian Firnanda',
    headline: {
      id: 'Profesional Teknologi Informasi. Fokus pada operasional digital, manajemen sistem, dan tata kelola sektor publik.',
      en: 'Information Technology professional focused on digital operations, system management, and public sector governance.',
    },
    // Kalimat pendek di bawah nama, terasa lebih personal daripada headline.
    tagline: {
      id: 'Saya senang mengubah proses administrasi yang berbelit menjadi sesuatu yang sederhana dan benar-benar dipakai orang.',
      en: 'I enjoy turning tangled administrative processes into something simple that people actually use.',
    },
    location: 'Bengkulu, Indonesia',
    availability: {
      available: true,
      label: { id: 'Terbuka untuk peluang kerja', en: 'Open to work' },
    },

    /* ---- FOTO PROFIL ----------------------------------------------------
     * Taruh foto kamu di public/images/ lalu tulis path-nya di bawah.
     * Rasio persegi (1:1) memberi hasil paling rapi, minimal 640x640 piksel.
     * Kalau file-nya belum ada, situs otomatis memakai avatarFallback
     * sehingga tampilan tidak pernah rusak.
     * -------------------------------------------------------------------- */
    avatar: '/images/profile.jpg',
    avatarFallback: '/images/profile.jpg',
    avatarAlt: {
      id: 'Foto profil Rian Firnanda Irsyadani',
      en: 'Profile photo of Rian Firnanda Irsyadani',
    },

    // Tautan tombol Unduh CV. Isi '' untuk menyembunyikan tombolnya.
    // Kalau CV berupa PDF, taruh di public/ lalu tulis '/cv-rian-firnanda.pdf'.
    resumeUrl: 'https://www.linkedin.com/in/rian-firnanda/',

    // Ringkasan tiga paragraf. Satu elemen array sama dengan satu paragraf.
    summaryId: [
      'Saya lulus Administrasi Publik di Universitas Bengkulu dengan predikat Cum Laude dan IPK 3,84. Sebelum itu saya sekolah di SMKN 1 Kota Bengkulu jurusan Rekayasa Perangkat Lunak, jadi saya terbiasa membaca kebutuhan birokrasi sekaligus menerjemahkannya jadi solusi teknis yang benar-benar bisa dipakai sehari-hari.',
      'Di sisi teknis, saya tersertifikasi BNSP untuk Pengembangan Perangkat Lunak dan membangun aplikasi web dengan Laravel serta CodeIgniter. Untuk keamanan, saya memegang Certified Cyber Security Analyst dari CyberWarFare Labs dan Foundations of Cybersecurity dari Google. Saya juga punya sertifikasi Junior Graphic Designer dari BNSP bersama Digitalent Kominfo dan Operator Komputer Madya.',
      'Belakangan saya banyak belajar AI dan cloud lewat Google Cloud Generative AI Leader, Anthropic AI Fluency, program produktivitas AI dari Google, serta AWS Educate Machine Learning Foundations. Tujuannya satu, memakai teknologi untuk membuat pelayanan publik lebih cepat dan alur kerja administrasi lebih masuk akal.',
    ],
    summaryEn: [
      'I graduated in Public Administration from Universitas Bengkulu with Cum Laude honours and a 3.84 GPA. Before that I studied Software Engineering at SMKN 1 Kota Bengkulu, so I am used to reading what a bureaucracy actually needs and turning it into something technical that people can use day to day.',
      'On the technical side I am BNSP-certified in Software Development and build web applications with Laravel and CodeIgniter. For security I hold the Certified Cyber Security Analyst credential from CyberWarFare Labs and Foundations of Cybersecurity from Google. I am also a BNSP and Digitalent Kominfo certified Junior Graphic Designer and an Intermediate Computer Operator.',
      'More recently I have been learning AI and cloud through Google Cloud Generative AI Leader, Anthropic AI Fluency, Google AI productivity programs, and AWS Educate Machine Learning Foundations. The goal stays the same, using technology to make public services faster and administrative workflows make more sense.',
    ],
  },

  /* ==========================================================================
   * 3. SOCIAL  |  deretan ikon di Hero, Contact, dan Footer
   *
   *    Nama pada field `icon` harus terdaftar di components/Icon.jsx.
   *    Ikon siap pakai: linkedin, github, instagram, whatsapp, mail, x,
   *    youtube, facebook, tiktok, telegram, scholar, medium, globe.
   *
   *    `featured: true` menampilkan ikon itu di Hero. Yang lain tetap muncul
   *    di bagian Kontak dan Footer, jadi Hero tidak penuh sesak.
   * ========================================================================== */
  social: [
    {
      label: 'LinkedIn',
      handle: 'rian-firnanda',
      href: 'https://www.linkedin.com/in/rian-firnanda/',
      icon: 'linkedin',
      featured: true,
    },
    {
      // GANTI dengan username Instagram kamu.
      label: 'Instagram',
      handle: '@rianfirnanda',
      href: 'https://www.instagram.com/rianfirnanda/',
      icon: 'instagram',
      featured: true,
    },
    {
      // GANTI dengan username GitHub kamu.
      label: 'GitHub',
      handle: 'Rianfirnanda',
      href: 'https://github.com/Rianfirnanda',
      icon: 'github',
      featured: true,
    },
    {
      // GANTI dengan nomor WhatsApp kamu, format 62 tanpa tanda plus dan spasi.
      label: 'WhatsApp',
      handle: 'Chat langsung',
      href: 'https://wa.me/6289606032177',
      icon: 'whatsapp',
      featured: true,
    },
    {
      // GANTI dengan email aktif, harus sama dengan contact.email.
      label: 'Email',
      handle: 'rianfirnanda1@gmail.com',
      href: 'mailto:rianfirnanda1@gmail.com',
      icon: 'mail',
      featured: true,
    },

    /* Contoh tambahan, hapus tanda komentar kalau mau dipakai:
    { label: 'X', handle: '@rianfirnanda', href: 'https://x.com/rianfirnanda', icon: 'x', featured: false },
    { label: 'YouTube', handle: 'Rian Firnanda', href: 'https://youtube.com/@rianfirnanda', icon: 'youtube', featured: false },
    { label: 'Google Scholar', handle: 'Profil peneliti', href: 'https://scholar.google.com/', icon: 'scholar', featured: false },
    { label: 'Telegram', handle: '@rianfirnanda', href: 'https://t.me/rianfirnanda', icon: 'telegram', featured: false },
    { label: 'Facebook', handle: 'Rian Firnanda', href: 'https://facebook.com/rianfirnanda', icon: 'facebook', featured: false },
    { label: 'TikTok', handle: '@rianfirnanda', href: 'https://tiktok.com/@rianfirnanda', icon: 'tiktok', featured: false },
    { label: 'Medium', handle: '@rianfirnanda', href: 'https://medium.com/@rianfirnanda', icon: 'medium', featured: false },
    */
  ],

  /* ==========================================================================
   * 4. STATS  |  strip angka di section Tentang
   * ========================================================================== */
  stats: [
    { value: '3.84', label: { id: 'IPK Cum Laude', en: 'GPA Cum Laude' }, icon: 'graduation-cap' },
    { value: '16+', label: { id: 'Sertifikasi Profesional', en: 'Professional Certifications' }, icon: 'award' },
    { value: '9', label: { id: 'Peran & Pengalaman', en: 'Roles & Experiences' }, icon: 'briefcase' },
    { value: '1', label: { id: 'Publikasi Terakreditasi', en: 'Accredited Publication' }, icon: 'book' },
  ],

  /* ==========================================================================
   * 5. EXPERIENCE  |  timeline vertikal, urut dari yang paling baru
   *
   *    Field opsional per item:
   *      image     path gambar dokumentasi kegiatan (rasio 16:10 paling pas).
   *                Isi null kalau belum ada, kartunya tetap rapi.
   *      imageAlt  penjelasan singkat isi gambar untuk pembaca layar.
   *      logo      logo instansi berbentuk persegi, tampil kecil di kartu.
   *      highlight true memberi kartu border gradien beranimasi.
   * ========================================================================== */
  experience: [
    {
      role: {
        id: 'Tim Penyusun Dokumen Audit Mutu Internal (AMI)',
        en: 'Internal Quality Audit (AMI) Document Team',
      },
      org: 'Jurusan Administrasi Publik, Universitas Bengkulu',
      type: { id: 'Paruh Waktu', en: 'Part-time' },
      period: { id: 'Mar 2026 - sekarang', en: 'Mar 2026 - present' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Saya ditunjuk sebagai perwakilan mahasiswa lewat SK Rektor No. 1664/UN30.9/HK/2026 untuk membantu persiapan akreditasi jurusan 2026. Tugas saya menyusun dokumen Audit Mutu Internal bersama dosen, mulai dari mengumpulkan bukti dukung sampai merapikan narasinya agar sesuai instrumen penjaminan mutu.',
        en: 'I was appointed student representative through Rector Decree No. 1664/UN30.9/HK/2026 to help prepare the 2026 departmental accreditation. My job is drafting the Internal Quality Audit documents with faculty members, from gathering supporting evidence to shaping the narrative so it fits the quality assurance instrument.',
      },
      skills: ['Quality Assurance', 'Tata Kelola Pendidikan Tinggi', 'Dokumentasi Teknis'],
      image: null,
      imageAlt: '',
      logo: null,
      highlight: true,
    },
    {
      role: {
        id: 'Tim Penyusun Dokumen Akreditasi Jurusan 2026',
        en: '2026 Departmental Accreditation Document Team',
      },
      org: 'Jurusan Administrasi Publik, Universitas Bengkulu',
      type: { id: 'Paruh Waktu', en: 'Part-time' },
      period: { id: 'Jan 2026 - sekarang', en: 'Jan 2026 - present' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Menyiapkan berkas akreditasi jurusan dari nol, mulai dari mengumpulkan data internal, menyelaraskannya dengan instrumen akreditasi, sampai menulis narasi dokumennya supaya enak dibaca asesor.',
        en: 'Preparing the departmental accreditation files from scratch, from collecting internal data and aligning it with the accreditation instrument to writing the document narrative so assessors can follow it easily.',
      },
      skills: ['Akreditasi', 'Pengumpulan Data', 'Dokumentasi'],
      image: null,
      imageAlt: '',
      logo: null,
      highlight: false,
    },
    {
      role: {
        id: 'Pengelola Website Jurusan Administrasi Publik FISIP',
        en: 'Website Manager, Public Administration Department FISIP',
      },
      org: 'Universitas Bengkulu',
      type: { id: 'Paruh Waktu', en: 'Part-time' },
      period: { id: 'Jan 2026 - sekarang', en: 'Jan 2026 - present' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Ditunjuk lewat SK Rektor No. 019/UN30.9/HK/2026 untuk mengelola website resmi jurusan. Saya menangani pemeliharaan sistem, menyusun strategi kontennya, dan menjaga komunikasi digital ke publik supaya informasi akademik selalu akurat dan gampang dicari.',
        en: 'Appointed through Rector Decree No. 019/UN30.9/HK/2026 to manage the department official website. I handle system maintenance, shape the content strategy, and keep public digital communication running so academic information stays accurate and easy to find.',
      },
      skills: ['Pengelolaan Website', 'Strategi Konten', 'Komunikasi Digital', 'CMS'],
      image: null,
      imageAlt: '',
      logo: null,
      highlight: true,
    },
    {
      role: {
        id: 'Tim Tracer Study Jurusan Administrasi Publik',
        en: 'Tracer Study Team, Public Administration Department',
      },
      org: 'Universitas Bengkulu',
      type: { id: 'Paruh Waktu', en: 'Part-time' },
      period: { id: 'Jan 2026 - sekarang', en: 'Jan 2026 - present' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Ditunjuk lewat SK Rektor No. 068/UN30.9/HK/2026. Saya melacak data alumni, menjalankan riset dan pengumpulan datanya, lalu menganalisis hasilnya sebagai bahan pendukung akreditasi jurusan.',
        en: 'Appointed through Rector Decree No. 068/UN30.9/HK/2026. I track alumni data, run the research and data collection, then analyse the results as supporting evidence for the departmental accreditation.',
      },
      skills: ['Riset', 'Analisis Data', 'Desain Survei', 'Pelacakan Alumni'],
      image: null,
      imageAlt: '',
      logo: null,
      highlight: false,
    },
    {
      role: {
        id: 'Presenter, 2nd International Conference on SDGs 2030',
        en: 'Presenter, 2nd International Conference on SDGs 2030',
      },
      org: 'Yayasan Bali Sruti, Denpasar',
      type: { id: 'Konferensi', en: 'Conference' },
      period: { id: 'Agu - Sep 2026', en: 'Aug - Sep 2026' },
      location: 'Denpasar, Bali, Indonesia',
      description: {
        id: 'Mempresentasikan makalah berjudul "Bridging Design-Reality Gaps in a National Family Information System" di forum internasional. Isinya soal jarak antara desain sistem informasi yang dibuat di pusat dengan kenyataan di lapangan saat dipakai daerah.',
        en: 'Presented a paper titled "Bridging Design-Reality Gaps in a National Family Information System" at an international forum. It looks at the distance between an information system designed at the national level and the reality of using it in the regions.',
      },
      skills: ['Public Speaking', 'Penulisan Akademik', 'SDGs', 'Presentasi Riset'],
      image: null,
      imageAlt: '',
      logo: null,
      highlight: true,
    },
    {
      role: { id: 'Magang', en: 'Intern' },
      org: 'Dinas Pemberdayaan Masyarakat dan Desa (DPMD) Provinsi Bengkulu',
      type: { id: 'Magang', en: 'Internship' },
      period: { id: 'Sep - Okt 2025', en: 'Sep - Oct 2025' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Terlibat langsung di tata kelola pemerintahan daerah dan program pemberdayaan desa. Saya ikut menangani proses administrasi, pengelolaan berkas, dan pendampingan kegiatan dinas, jadi bisa melihat sendiri bagaimana kebijakan bekerja di lapangan.',
        en: 'Worked directly on regional governance and village empowerment programs. I helped with administrative processes, document handling, and support for agency activities, which let me see first hand how policy plays out on the ground.',
      },
      skills: ['Tata Kelola Daerah', 'Pemberdayaan Desa', 'Administrasi Pemerintahan'],
      image: null,
      imageAlt: '',
      logo: null,
      highlight: false,
    },
    {
      role: { id: 'Asisten Laboratorium', en: 'Laboratory Assistant' },
      org: 'Laboratorium Administrasi Publik, Universitas Bengkulu',
      type: { id: 'Paruh Waktu', en: 'Part-time' },
      period: { id: 'Nov 2024 - sekarang', en: 'Nov 2024 - present' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Mendukung kegiatan akademik, penelitian, pelatihan, dan pengabdian masyarakat di laboratorium. Saya menyiapkan materi praktikum, mendampingi peserta selama kegiatan, dan merapikan dokumentasinya.',
        en: 'Supporting academic, research, training, and community service activities in the lab. I prepare practicum materials, assist participants during sessions, and keep the documentation tidy.',
      },
      skills: ['Pendampingan Akademik', 'Fasilitasi Pelatihan', 'Asistensi Riset'],
      image: null,
      imageAlt: '',
      logo: null,
      highlight: false,
    },
    {
      role: { id: 'Volunteer Kesmawa', en: 'Kesmawa Volunteer' },
      org: 'Rektorat Universitas Bengkulu',
      type: { id: 'Sukarelawan', en: 'Volunteer' },
      period: { id: 'Apr 2024 - sekarang', en: 'Apr 2024 - present' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Memverifikasi berkas mahasiswa baru, mewawancarai pendaftar beasiswa, dan mengelola data pendaftar supaya proses seleksinya tertib dan bisa dipertanggungjawabkan.',
        en: 'Verifying new student files, interviewing scholarship applicants, and managing applicant data so the selection process stays orderly and accountable.',
      },
      skills: ['Verifikasi Data', 'Wawancara', 'Pengelolaan Data Pendaftar'],
      image: null,
      imageAlt: '',
      logo: null,
      highlight: false,
    },
    {
      role: { id: 'Volunteer', en: 'Volunteer' },
      org: 'SDGs Center Universitas Bengkulu',
      type: { id: 'Sukarelawan', en: 'Volunteer' },
      period: { id: 'Okt 2023 - Jan 2025', en: 'Oct 2023 - Jan 2025' },
      location: 'Bengkulu, Indonesia',
      description: {
        id: 'Ikut menjalankan program keberlanjutan kampus, mulai dari kegiatan lingkungan, edukasi publik, sampai kolaborasi lintas organisasi untuk isu Sustainable Development Goals.',
        en: 'Helped run campus sustainability programs, from environmental activities and public education to cross organisation collaboration around the Sustainable Development Goals.',
      },
      skills: ['Keberlanjutan', 'Pelibatan Masyarakat', 'Dukungan Acara'],
      image: null,
      imageAlt: '',
      logo: null,
      highlight: false,
    },
  ],

  /* ==========================================================================
   * 6. EDUCATION
   * ========================================================================== */
  education: [
    {
      degree: { id: 'S1 Ilmu Administrasi Publik', en: "Bachelor's Degree in Public Administration" },
      school: 'Universitas Bengkulu',
      period: '2022 - 2026',
      gpa: { id: 'IPK 3,84 Cum Laude', en: 'GPA 3.84 Cum Laude' },
      notes: {
        id: 'Fokus saya di formulasi kebijakan publik, tata kelola pemerintahan, manajemen sistem informasi, dan administrasi perkantoran.',
        en: 'I focused on public policy formulation, governance, information systems management, and office administration.',
      },
      logo: null,
    },
    {
      degree: {
        id: 'Teknik Komputer & Informatika, Rekayasa Perangkat Lunak',
        en: 'Computer & Informatics Engineering, Software Engineering',
      },
      school: 'SMKN 1 Kota Bengkulu',
      period: '2019 - 2022',
      gpa: '',
      notes: {
        id: 'Tempat saya membangun dasar pemrograman, basis data, jaringan komputer, dan pengembangan aplikasi web.',
        en: 'Where I built my foundation in programming, databases, computer networking, and web application development.',
      },
      logo: null,
    },
  ],

  /* ==========================================================================
   * 7. PUBLICATIONS  |  kartu riset dengan abstrak yang bisa dibuka
   * ========================================================================== */
  publications: [
    {
      title:
        'Bridging Centralized Design and Local Realities: Implementation Strategies for the Family Information System (SIGA) in Bengkulu Province',
      venue: {
        id: 'Journal of Social and Policy Issues (JSPI), terakreditasi Sinta 4',
        en: 'Journal of Social and Policy Issues (JSPI), Sinta 4 accredited',
      },
      date: { id: '30 Juni 2026', en: '30 June 2026' },
      role: { id: 'Penulis Utama', en: 'Main Author' },
      // Isi '' untuk menyembunyikan tombol baca publikasi.
      url: 'https://www.linkedin.com/in/rian-firnanda/',
      abstract: {
        id: 'Studi kasus kualitatif tentang penerapan Sistem Informasi Keluarga (SIGA) di BKKBN Provinsi Bengkulu, memakai kerangka Design-Reality Gap ITPOSMO milik Heeks. Saya mengkode 202 unit wawancara dan menemukan bahwa kesenjangan terbesar menumpuk di dimensi informasi dan manajemen, yaitu 57,4 persen dari seluruh bukti terkode. Riset ini menawarkan tiga cara menjembataninya: verifikasi data berjenjang, pendampingan dan penguatan kapasitas, serta koordinasi formal yang dibarengi jalur informal antartingkat pemerintahan.',
        en: 'A qualitative case study on how the Family Information System (SIGA) is implemented at BKKBN Bengkulu Province, using Heeks ITPOSMO Design-Reality Gap framework. I coded 202 interview units and found the widest gaps clustered in the information and management dimensions, at 57.4 percent of all coded evidence. The study proposes three ways to bridge them: tiered data verification, mentoring and capacity building, and formal coordination backed by informal channels across government levels.',
      },
    },
  ],

  /* ==========================================================================
   * 8. PROJECTS  |  grid kartu dengan filter tag otomatis
   *
   *    image  path gambar sampul, rasio 16:10 paling pas.
   *           Isi null untuk memakai latar gradien otomatis.
   *    links  array kosong berarti tidak ada tombol yang dirender.
   * ========================================================================== */
  projects: [
    {
      name: 'SobatKoding',
      period: '2021 - 2022',
      org: 'SMKN 1 Kota Bengkulu',
      description: {
        id: 'Usaha layanan digital yang saya bangun bareng teman-teman sekolah. Kami mengerjakan aplikasi dan website untuk klien kecil, sekaligus membuka jasa pengerjaan dokumen perkantoran seperti Word, Excel, dan PowerPoint untuk mahasiswa dan UMKM sekitar.',
        en: 'A digital service venture I built with school friends. We took on apps and websites for small clients, and also offered office document work in Word, Excel, and PowerPoint for students and nearby small businesses.',
      },
      tags: ['Web Development', 'Wirausaha', 'Produktivitas Kantor'],
      image: '/images/projects/sobatkoding.svg',
      imageAlt: 'Sampul proyek SobatKoding',
      links: [
        // Contoh: { label: { id: 'Lihat situs', en: 'Visit site' }, href: 'https://...', icon: 'external-link' },
      ],
      featured: true,
    },
    {
      name: 'Health Hero',
      period: '2021',
      org: 'Direktorat SMK',
      description: {
        id: 'Proyek kolaboratif tingkat nasional bersama Direktorat SMK yang mengangkat tema kesehatan. Saya masuk di sisi pengembangan sekaligus penyusunan aset digital produknya.',
        en: 'A national level collaborative project with Direktorat SMK on a health theme. I worked on the development side and on preparing the product digital assets.',
      },
      tags: ['Kolaborasi', 'Game Development', 'Kesehatan'],
      image: '/images/projects/health-hero.svg',
      imageAlt: 'Sampul proyek Health Hero',
      links: [],
      featured: false,
    },
    {
      name: 'Fly Over Space',
      period: '2020 - 2022',
      org: { id: 'Organisasi riset roket dan perangkat lunak', en: 'Rocket research and software organisation' },
      description: {
        id: 'Organisasi yang menggabungkan riset roket dengan pengembangan perangkat lunak. Saya menangani sisi perangkat lunak pendukung riset dan merapikan dokumentasi teknis tim.',
        en: 'An organisation that mixes rocket research with software development. I handled the software side supporting the research and kept the team technical documentation in order.',
      },
      tags: ['Riset', 'Software Development', 'Kerja Tim'],
      image: '/images/projects/fly-over-space.svg',
      imageAlt: 'Sampul proyek Fly Over Space',
      links: [],
      featured: false,
    },
  ],

  /* ==========================================================================
   * 9. CERTIFICATIONS  |  credentialUrl kosong berarti tanpa tautan
   * ========================================================================== */
  certifications: [
    { name: 'Generative AI Leader', issuer: 'Google Cloud', year: '2026', group: 'AI & Cloud', credentialUrl: '' },
    { name: 'AI Fluency', issuer: 'Anthropic', year: '2026', group: 'AI & Cloud', credentialUrl: '' },
    { name: 'AI Fundamentals', issuer: 'Google', year: '2026', group: 'AI & Cloud', credentialUrl: '' },
    { name: 'Start Writing Prompts like a Pro', issuer: 'Google', year: '2026', group: 'AI & Cloud', credentialUrl: '' },
    { name: 'AWS Educate Machine Learning Foundations', issuer: 'Amazon Web Services', year: '2026', group: 'AI & Cloud', credentialUrl: '' },
    { name: 'Foundations of Cybersecurity', issuer: 'Google', year: '2025', group: 'Keamanan', credentialUrl: '' },
    { name: 'Certified Cyber Security Analyst (C3SA)', issuer: 'CyberWarFare Labs', year: '2025', group: 'Keamanan', credentialUrl: '' },
    { name: { id: 'Pengembangan Perangkat Lunak', en: 'Software Development' }, issuer: 'BNSP', year: '2022', group: 'Perangkat Lunak', credentialUrl: '' },
    { name: 'Game Development', issuer: 'Direktorat SMK', year: '2021', group: 'Perangkat Lunak', credentialUrl: '' },
    { name: { id: 'Desainer Grafis Muda', en: 'Junior Graphic Designer' }, issuer: 'BNSP & Digitalent Kominfo', year: '2022', group: 'Desain', credentialUrl: '' },
    { name: 'Operator Komputer Madya', issuer: 'Kominfo', year: '2022', group: 'Desain', credentialUrl: '' },
    { name: { id: 'UKBI, Uji Kemahiran Berbahasa Indonesia', en: 'UKBI, Indonesian Language Proficiency Test' }, issuer: 'Badan Bahasa', year: '2022', group: 'Bahasa', credentialUrl: '' },
  ],

  /* ==========================================================================
   * 10. SKILLS  |  tambah grup baru cukup dengan menambah objek baru
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
        items: ['Cyber Security Analysis', 'Sistem Operasi', 'Perangkat Keras', 'Jaringan', 'Technical Support'],
      },
      {
        title: { id: 'Sektor Publik & Tata Kelola', en: 'Public Sector & Governance' },
        icon: 'building',
        items: [
          'Administrasi Publik',
          'Kebijakan Publik',
          'Tata Kelola',
          'Penjaminan Mutu (AMI/Akreditasi)',
          'Administrasi Perkantoran',
          'Pengumpulan & Analisis Data',
          'Manajemen Proyek',
        ],
      },
      {
        title: { id: 'Desain & Produktivitas', en: 'Design & Productivity' },
        icon: 'palette',
        items: ['Desain Grafis', 'Microsoft Office tingkat lanjut', 'Dokumentasi', 'Manajemen Informasi'],
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
      period: '2023 - 2024',
      description: {
        id: 'Menanam mangrove, bersih-bersih kawasan pesisir, dan ikut mengisi webinar isu iklim bersama Indorelawan dan EcoNusa Foundation.',
        en: 'Planting mangroves, cleaning up coastal areas, and helping run climate webinars together with Indorelawan and the EcoNusa Foundation.',
      },
      image: null,
      imageAlt: '',
    },
  ],

  /* ==========================================================================
   * 12. LANGUAGES
   * ========================================================================== */
  languages: [
    { name: { id: 'Bahasa Indonesia', en: 'Indonesian' }, level: { id: 'Penutur asli', en: 'Native speaker' } },
    { name: { id: 'Bahasa Inggris', en: 'English' }, level: { id: 'Terbatas namun Fungsional', en: 'Limited working proficiency' } },
  ],

  /* ==========================================================================
   * 13. SERVICES  |  chip layanan di bagian Kontak
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
    // GANTI dengan email aktif. Dipakai untuk tombol mailto dan salin cepat.
    email: 'rianfirnanda1@gmail.com',
    // Kosongkan ('') kalau nomor telepon tidak ingin ditampilkan.
    phone: '',
    ctaText: { id: 'Kirim Email', en: 'Send an Email' },
    note: {
      id: 'Terbuka untuk kolaborasi, tawaran kerja, atau sekadar ngobrol soal transformasi digital di sektor publik. Biasanya saya balas dalam satu hari kerja.',
      en: 'Open to collaboration, job offers, or just a chat about digital transformation in the public sector. I usually reply within one working day.',
    },
  },

  /* ==========================================================================
   * 15. NAV  |  menu navigasi
   *
   *     type 'section' melompat ke anchor di halaman utama.
   *     type 'page'    pindah ke halaman lain, misalnya blog.
   *     Hapus satu baris untuk menyembunyikannya dari menu.
   * ========================================================================== */
  nav: [
    { id: 'about', type: 'section', label: { id: 'Tentang', en: 'About' } },
    { id: 'experience', type: 'section', label: { id: 'Pengalaman', en: 'Experience' } },
    { id: 'projects', type: 'section', label: { id: 'Proyek', en: 'Projects' } },
    { id: 'publications', type: 'section', label: { id: 'Publikasi', en: 'Publications' } },
    { id: 'skills', type: 'section', label: { id: 'Keahlian', en: 'Skills' } },
    { id: 'certifications', type: 'section', label: { id: 'Sertifikasi', en: 'Certifications' } },
    { id: 'blog', type: 'page', href: '/blog/', label: { id: 'Blog', en: 'Blog' } },
    { id: 'contact', type: 'section', label: { id: 'Kontak', en: 'Contact' } },
  ],

  /* ==========================================================================
   * 16. SECTIONS  |  judul tiap bagian halaman
   * ========================================================================== */
  sections: {
    about: {
      eyebrow: { id: '01 / Profil', en: '01 / Profile' },
      title: { id: 'Tentang Saya', en: 'About Me' },
      subtitle: {
        id: 'Latar administrasi publik yang bertemu dengan kebiasaan ngoprek teknologi.',
        en: 'A public administration background that meets a habit of tinkering with technology.',
      },
    },
    experience: {
      eyebrow: { id: '02 / Perjalanan', en: '02 / Journey' },
      title: { id: 'Pengalaman', en: 'Experience' },
      subtitle: {
        id: 'Peran akademik, pemerintahan, dan kesukarelawanan yang membentuk cara saya bekerja.',
        en: 'Academic, government, and volunteer roles that shaped the way I work.',
      },
    },
    projects: {
      eyebrow: { id: '03 / Karya', en: '03 / Work' },
      title: { id: 'Proyek', en: 'Projects' },
      subtitle: {
        id: 'Hal-hal yang saya bangun bareng tim, dari usaha kecil sampai proyek nasional.',
        en: 'Things I built together with a team, from a small venture to a national project.',
      },
    },
    publications: {
      eyebrow: { id: '04 / Riset', en: '04 / Research' },
      title: { id: 'Publikasi', en: 'Publications' },
      subtitle: {
        id: 'Karya ilmiah yang terbit di jurnal terakreditasi.',
        en: 'Scholarly work published in an accredited journal.',
      },
    },
    skills: {
      eyebrow: { id: '05 / Kompetensi', en: '05 / Competencies' },
      title: { id: 'Keahlian', en: 'Skills' },
      subtitle: {
        id: 'Perkakas yang saya pakai sehari-hari, dari baris kode sampai dokumen kebijakan.',
        en: 'The tools I use day to day, from lines of code to policy documents.',
      },
    },
    certifications: {
      eyebrow: { id: '06 / Kredensial', en: '06 / Credentials' },
      title: { id: 'Sertifikasi', en: 'Certifications' },
      subtitle: {
        id: 'Sertifikasi profesional dari BNSP, Google, Anthropic, AWS, dan lembaga lain.',
        en: 'Professional certifications from BNSP, Google, Anthropic, AWS, and other institutions.',
      },
    },
    education: {
      eyebrow: { id: '07 / Pendidikan', en: '07 / Education' },
      title: { id: 'Pendidikan', en: 'Education' },
      subtitle: {
        id: 'Jenjang formal yang jadi fondasi semuanya.',
        en: 'The formal education that everything else stands on.',
      },
    },
    volunteering: {
      eyebrow: { id: '08 / Kontribusi', en: '08 / Contribution' },
      title: { id: 'Kesukarelawanan', en: 'Volunteering' },
      subtitle: {
        id: 'Kegiatan sosial dan lingkungan di luar ruang kelas.',
        en: 'Social and environmental activities outside the classroom.',
      },
    },
    blog: {
      eyebrow: { id: '09 / Tulisan', en: '09 / Writing' },
      title: { id: 'Blog', en: 'Blog' },
      subtitle: {
        id: 'Catatan singkat soal teknologi, kebijakan, dan hal-hal yang saya pelajari sepanjang jalan.',
        en: 'Short notes on technology, policy, and things I pick up along the way.',
      },
    },
    contact: {
      eyebrow: { id: '10 / Kontak', en: '10 / Contact' },
      title: { id: 'Mari Terhubung', en: "Let's Connect" },
      subtitle: {
        id: 'Punya proyek, tawaran kerja, atau ide yang ingin didiskusikan? Sapa saya.',
        en: 'Have a project, an offer, or an idea worth discussing? Say hello.',
      },
    },
  },

  /* ==========================================================================
   * 17. UI  |  label tombol dan teks antarmuka
   * ========================================================================== */
  ui: {
    skipToContent: { id: 'Lompat ke konten utama', en: 'Skip to main content' },
    openMenu: { id: 'Buka menu navigasi', en: 'Open navigation menu' },
    closeMenu: { id: 'Tutup menu navigasi', en: 'Close navigation menu' },
    switchLanguage: { id: 'Ganti bahasa', en: 'Switch language' },
    themeToLight: { id: 'Ganti ke mode terang', en: 'Switch to light mode' },
    themeToDark: { id: 'Ganti ke mode gelap', en: 'Switch to dark mode' },
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
    // Label khusus blog
    blogAll: { id: 'Lihat semua tulisan', en: 'View all writing' },
    blogBack: { id: 'Kembali ke blog', en: 'Back to blog' },
    blogHome: { id: 'Kembali ke beranda', en: 'Back to home' },
    blogEmpty: {
      id: 'Belum ada tulisan yang terbit. Sebentar lagi ya.',
      en: 'No posts published yet. Coming soon.',
    },
    blogReadPost: { id: 'Baca tulisan', en: 'Read post' },
    blogMinutes: { id: 'menit baca', en: 'min read' },
    blogPublished: { id: 'Terbit', en: 'Published' },
    blogRelated: { id: 'Tulisan lainnya', en: 'More writing' },
    blogShare: { id: 'Bagikan tulisan ini', en: 'Share this post' },
    blogFilterLabel: { id: 'Saring tulisan berdasarkan topik', en: 'Filter posts by topic' },
    builtWith: {
      id: '',
      en: '',
    },
    rights: { id: '', en: 'All rights reserved.' },
  },
};

export default portfolio;
