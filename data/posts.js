/**
 * =============================================================================
 *  data/posts.js  |  SEMUA TULISAN BLOG
 * =============================================================================
 *
 *  MENAMBAH TULISAN BARU
 *  Salin satu objek di bawah, tempel di posisi paling atas array `posts`,
 *  lalu ganti isinya. Halaman daftar, halaman detail, filter topik, dan
 *  sitemap akan menyesuaikan sendiri.
 *
 *  FIELD WAJIB
 *    slug     alamat tulisan di URL, huruf kecil dan pakai tanda hubung.
 *             Contoh: 'sistem-informasi-pemerintah' menghasilkan
 *             /blog/sistem-informasi-pemerintah/
 *    title    judul tulisan
 *    excerpt  ringkasan 1 sampai 2 kalimat, tampil di kartu daftar
 *    date     format YYYY-MM-DD, dipakai untuk mengurutkan
 *    content  isi tulisan berupa array blok, lihat penjelasan di bawah
 *
 *  FIELD OPSIONAL
 *    tags        array topik, otomatis jadi tombol filter di halaman blog
 *    cover       gambar sampul dari folder public/, isi null untuk gradien
 *    coverAlt    penjelasan gambar sampul
 *    readingTime angka menit baca, hitung sendiri atau perkirakan saja
 *    featured    true menaruh tulisan ini sebagai sorotan di halaman blog
 *    draft       true menyembunyikan tulisan dari situs tanpa menghapusnya
 *
 *  JENIS BLOK YANG TERSEDIA UNTUK `content`
 *    { type: 'p',       text: { id: '...', en: '...' } }        paragraf
 *    { type: 'h2',      text: { ... } }                          subjudul besar
 *    { type: 'h3',      text: { ... } }                          subjudul kecil
 *    { type: 'ul',      items: [ { ... }, { ... } ] }            daftar bertitik
 *    { type: 'ol',      items: [ { ... }, { ... } ] }            daftar bernomor
 *    { type: 'quote',   text: { ... }, cite: 'Sumber' }          kutipan
 *    { type: 'callout', text: { ... }, icon: 'sparkles' }        kotak sorotan
 *    { type: 'image',   src: '/images/...', alt: '...',
 *                       caption: { ... } }                       gambar
 *
 *  Teks boleh ditulis sebagai string biasa kalau sama di kedua bahasa.
 * =============================================================================
 */

export const posts = [
  {
    slug: 'kenapa-sistem-informasi-pemerintah-sering-menganggur',
    title: {
      id: 'Kenapa Sistem Informasi Pemerintah Sering Menganggur',
      en: 'Why Government Information Systems Often Sit Idle',
    },
    excerpt: {
      id: 'Sistemnya sudah dibangun, anggarannya sudah keluar, tapi petugas di daerah tetap balik ke Excel. Ini yang saya temukan waktu meneliti SIGA di Bengkulu.',
      en: 'The system is built, the budget is spent, yet officers in the regions still go back to Excel. Here is what I found while researching SIGA in Bengkulu.',
    },
    date: '2026-07-14',
    readingTime: 6,
    tags: ['Kebijakan Publik', 'Sistem Informasi', 'Riset'],
    cover: null,
    coverAlt: '',
    featured: true,
    draft: false,
    content: [
      {
        type: 'p',
        text: {
          id: 'Ada pola yang berulang di banyak proyek digitalisasi pemerintah. Sistem dirancang rapi di tingkat pusat, diluncurkan dengan pelatihan sehari, lalu setahun kemudian petugas di kabupaten masih mengetik data yang sama di spreadsheet terpisah. Anggarannya terserap, laporannya hijau, tapi manfaatnya tidak terasa.',
          en: 'There is a pattern that repeats across government digitalisation projects. A system is designed neatly at the national level, launched with a one day training, and a year later officers in the districts are still typing the same data into separate spreadsheets. The budget is absorbed, the reports look green, but the benefit never quite arrives.',
        },
      },
      {
        type: 'p',
        text: {
          id: 'Waktu meneliti penerapan Sistem Informasi Keluarga di BKKBN Provinsi Bengkulu, saya memakai kerangka Design-Reality Gap milik Richard Heeks. Idenya sederhana: kegagalan sistem informasi jarang soal teknologinya. Yang lebih sering terjadi adalah jarak antara asumsi perancang dan kenyataan tempat sistem itu dipakai.',
          en: 'While researching how the Family Information System is used at BKKBN Bengkulu Province, I applied Richard Heeks Design-Reality Gap framework. The idea is simple. Information system failure is rarely about the technology. More often it is the distance between what the designers assumed and the reality where the system is actually used.',
        },
      },
      {
        type: 'h2',
        text: { id: 'Tujuh dimensi yang perlu diperiksa', en: 'Seven dimensions worth checking' },
      },
      {
        type: 'p',
        text: {
          id: 'Heeks membagi jarak itu ke tujuh dimensi yang disingkat ITPOSMO. Kalau salah satu dimensinya terlalu jauh, sistem akan ditinggalkan meskipun kodenya sempurna.',
          en: 'Heeks splits that distance into seven dimensions abbreviated as ITPOSMO. If any one of them stretches too far, the system gets abandoned even when the code is flawless.',
        },
      },
      {
        type: 'ul',
        items: [
          { id: 'Information, kualitas dan ketersediaan data yang diasumsikan ada', en: 'Information, the quality and availability of data assumed to exist' },
          { id: 'Technology, perangkat dan jaringan yang benar-benar tersedia di lapangan', en: 'Technology, the devices and networks actually available on the ground' },
          { id: 'Processes, alur kerja nyata yang sudah berjalan sebelum sistem datang', en: 'Processes, the real workflows already running before the system arrived' },
          { id: 'Objectives and values, apa yang dianggap penting oleh pengguna', en: 'Objectives and values, what the users themselves consider important' },
          { id: 'Staffing and skills, jumlah orang dan kemampuan mereka', en: 'Staffing and skills, how many people there are and what they can do' },
          { id: 'Management systems, cara kerja itu diawasi dan dipertanggungjawabkan', en: 'Management systems, how the work is supervised and accounted for' },
          { id: 'Other resources, waktu dan uang yang tersedia untuk menjalankannya', en: 'Other resources, the time and money available to keep it running' },
        ],
      },
      {
        type: 'h2',
        text: { id: 'Yang saya temukan di Bengkulu', en: 'What I found in Bengkulu' },
      },
      {
        type: 'p',
        text: {
          id: 'Dari 202 unit wawancara yang saya kode, 57,4 persen bukti menumpuk di dua dimensi saja: informasi dan manajemen. Bukan teknologi, bukan perangkat keras. Masalah utamanya adalah data yang masuk sering tidak konsisten antar tingkat, dan tidak ada mekanisme jelas siapa yang memverifikasi apa.',
          en: 'Out of 202 interview units I coded, 57.4 percent of the evidence clustered in just two dimensions, information and management. Not technology, not hardware. The core problem was that incoming data was often inconsistent between levels, and there was no clear mechanism for who verifies what.',
        },
      },
      {
        type: 'quote',
        text: {
          id: 'Sistemnya bisa jalan. Yang bikin repot itu waktu datanya beda antara desa, kecamatan, dan provinsi. Kita jadi bingung mana yang dipakai.',
          en: 'The system runs fine. The trouble starts when the data differs between the village, the sub district, and the province. Then we no longer know which one to use.',
        },
        cite: { id: 'Ringkasan pola jawaban narasumber lapangan', en: 'Summary of a recurring answer from field respondents' },
      },
      {
        type: 'h2',
        text: { id: 'Tiga hal yang membantu menutup jaraknya', en: 'Three things that help close the gap' },
      },
      {
        type: 'ol',
        items: [
          {
            id: 'Verifikasi data berjenjang. Tetapkan siapa yang bertanggung jawab memeriksa di setiap tingkat, lalu buat aturannya tertulis dan pendek. Satu halaman cukup.',
            en: 'Tiered data verification. Decide who checks at each level, then write the rule down and keep it short. One page is enough.',
          },
          {
            id: 'Pendampingan yang tidak berhenti setelah pelatihan. Kemampuan tumbuh dari mendampingi orang mengerjakan kasus nyata, bukan dari sesi teori sehari.',
            en: 'Mentoring that does not stop after the training. Skill grows from walking people through real cases, not from a one day theory session.',
          },
          {
            id: 'Koordinasi formal yang dibarengi jalur informal. Grup pesan yang aktif sering menyelesaikan masalah lebih cepat daripada surat resmi, dan itu bukan hal buruk selama keputusannya tetap dicatat.',
            en: 'Formal coordination backed by informal channels. An active message group often resolves problems faster than an official letter, and that is fine as long as the decision still gets recorded.',
          },
        ],
      },
      {
        type: 'callout',
        icon: 'sparkles',
        text: {
          id: 'Kalau kamu sedang merancang sistem untuk instansi, luangkan satu hari untuk duduk di samping petugas yang akan memakainya. Satu hari itu biasanya mengubah lebih banyak keputusan desain daripada sepuluh rapat.',
          en: 'If you are designing a system for an institution, spend one day sitting next to the officer who will use it. That single day usually changes more design decisions than ten meetings.',
        },
      },
      {
        type: 'p',
        text: {
          id: 'Kesimpulan yang saya bawa pulang dari riset ini cukup sederhana. Teknologi hampir tidak pernah jadi penghalang utama. Yang menentukan adalah apakah perancangnya sempat memahami kondisi tempat sistemnya akan hidup.',
          en: 'The conclusion I took home from this research is fairly simple. Technology is almost never the main obstacle. What matters is whether the designers took the time to understand the conditions where their system has to live.',
        },
      },
    ],
  },

  {
    slug: 'ai-untuk-pekerjaan-administrasi',
    title: {
      id: 'Tiga Cara AI Benar-benar Membantu Pekerjaan Administrasi',
      en: 'Three Ways AI Genuinely Helps Administrative Work',
    },
    excerpt: {
      id: 'Bukan soal mengganti orang, tapi memotong bagian pekerjaan yang paling melelahkan. Ini yang saya pakai sehari-hari untuk mengurus dokumen dan data.',
      en: 'This is not about replacing people. It is about cutting the most tiring part of the job. Here is what I use day to day for documents and data.',
    },
    date: '2026-06-02',
    readingTime: 5,
    tags: ['AI', 'Produktivitas', 'Administrasi'],
    cover: null,
    coverAlt: '',
    featured: false,
    draft: false,
    content: [
      {
        type: 'p',
        text: {
          id: 'Sejak mengambil Generative AI Leader dari Google Cloud dan AI Fluency dari Anthropic, saya mencoba menerapkan hal-hal itu ke pekerjaan yang benar-benar saya kerjakan: menyusun dokumen akreditasi, merapikan data alumni, dan mengurus konten website jurusan. Tidak semuanya berguna. Tapi tiga hal ini terbukti memangkas waktu paling banyak.',
          en: 'Since taking Generative AI Leader from Google Cloud and AI Fluency from Anthropic, I have been applying them to work I actually do: drafting accreditation documents, tidying alumni data, and running the department website content. Not everything turned out useful. But these three consistently cut the most time.',
        },
      },
      { type: 'h2', text: { id: '1. Merapikan data yang berantakan', en: '1. Cleaning up messy data' } },
      {
        type: 'p',
        text: {
          id: 'Data alumni yang masuk lewat formulir hampir selalu tidak seragam. Ada yang menulis nama instansi dengan singkatan, ada yang huruf besar semua, ada tanggal dengan tiga format berbeda dalam satu kolom. Menjelaskan pola yang diinginkan ke model bahasa lalu memintanya menormalkan seluruh kolom jauh lebih cepat daripada mengetik ulang satu per satu.',
          en: 'Alumni data coming in through forms is almost never uniform. Some write institution names as abbreviations, some type everything in caps, and one column can hold three different date formats. Describing the pattern you want to a language model and asking it to normalise the whole column is far faster than retyping everything by hand.',
        },
      },
      {
        type: 'p',
        text: {
          id: 'Satu catatan penting. Selalu minta hasilnya dalam bentuk tabel yang bisa kamu periksa, dan jangan pernah kirim data pribadi yang sensitif ke layanan yang tidak kamu kendalikan.',
          en: 'One important note. Always ask for the result as a table you can inspect, and never send sensitive personal data to a service you do not control.',
        },
      },
      { type: 'h2', text: { id: '2. Menyusun kerangka dokumen panjang', en: '2. Structuring long documents' } },
      {
        type: 'p',
        text: {
          id: 'Dokumen akreditasi punya struktur yang sudah ditentukan instrumennya. Bagian tersulit biasanya bukan menulis, melainkan memastikan setiap butir instrumen benar-benar terjawab dan tidak ada yang terlewat. Menempelkan daftar butir lalu meminta model memetakan bahan yang sudah ada ke masing-masing butir membuat lubangnya kelihatan sejak awal.',
          en: 'Accreditation documents follow a structure the instrument already dictates. The hardest part is usually not the writing, it is making sure every item is genuinely answered and nothing gets missed. Pasting the item list and asking the model to map existing material onto each item makes the holes visible early.',
        },
      },
      { type: 'h2', text: { id: '3. Menjadi pembaca pertama yang jujur', en: '3. Acting as an honest first reader' } },
      {
        type: 'p',
        text: {
          id: 'Setelah menulis paragraf yang panjang, saya biasanya sudah terlalu dekat dengan tulisannya untuk melihat kalimat yang membingungkan. Meminta model membaca ulang dan menunjukkan bagian mana yang kemungkinan salah tafsir itu murah, cepat, dan sering menyelamatkan saya dari revisi berputar-putar.',
          en: 'After writing a long passage I am usually too close to it to notice confusing sentences. Asking a model to reread it and point out which parts are likely to be misread is cheap, fast, and often saves me from going in circles during revisions.',
        },
      },
      {
        type: 'callout',
        icon: 'shield',
        text: {
          id: 'Aturan pribadi saya: AI boleh menyiapkan bahan, tapi keputusan dan tanggung jawab tetap di tangan manusia. Setiap angka yang masuk dokumen resmi saya periksa ulang ke sumber aslinya.',
          en: 'My personal rule: AI may prepare the material, but the decision and the responsibility stay with a human. Every number that goes into an official document gets checked again against its original source.',
        },
      },
      {
        type: 'p',
        text: {
          id: 'Yang berubah bukan jumlah pekerjaannya, melainkan bagian mana yang menghabiskan energi. Waktu yang tadinya habis untuk menyalin dan merapikan sekarang bisa dipakai untuk memikirkan isinya.',
          en: 'What changed is not the amount of work but which part drains the energy. Time that used to go into copying and tidying can now go into thinking about the substance.',
        },
      },
    ],
  },

  {
    slug: 'dokumentasi-bukan-beban',
    title: {
      id: 'Dokumentasi yang Baik Itu Produk, Bukan Beban',
      en: 'Good Documentation Is a Product, Not a Burden',
    },
    excerpt: {
      id: 'Pelajaran dari menyusun dokumen akreditasi dan audit mutu internal: dokumentasi yang dibuat belakangan selalu terasa berat, yang dibuat sambil jalan hampir tidak terasa.',
      en: 'A lesson from preparing accreditation and internal quality audit documents: documentation written afterwards always feels heavy, documentation written along the way barely registers.',
    },
    date: '2026-04-21',
    readingTime: 4,
    tags: ['Tata Kelola', 'Penjaminan Mutu', 'Kebiasaan Kerja'],
    cover: null,
    coverAlt: '',
    featured: false,
    draft: false,
    content: [
      {
        type: 'p',
        text: {
          id: 'Setiap menjelang akreditasi, ada momen yang selalu sama. Semua orang mendadak mencari bukti kegiatan dua tahun lalu, mencoba mengingat siapa yang menyimpan notulennya, dan menyusun ulang cerita dari potongan foto di grup pesan. Beban itu bukan karena dokumentasinya sulit, tapi karena dikerjakan di waktu yang salah.',
          en: 'Every time accreditation approaches, the same moment arrives. Everyone suddenly hunts for evidence of an activity from two years ago, tries to remember who kept the minutes, and reassembles the story from photo fragments in a message group. That burden is not because documenting is hard, it is because it happens at the wrong time.',
        },
      },
      { type: 'h2', text: { id: 'Tulis saat kejadiannya masih hangat', en: 'Write while it is still warm' } },
      {
        type: 'p',
        text: {
          id: 'Catatan lima menit yang ditulis di hari kegiatan hampir selalu lebih akurat daripada rekonstruksi dua jam enam bulan kemudian. Yang dibutuhkan cuma tiga hal: apa yang terjadi, siapa yang terlibat, dan di mana berkasnya disimpan.',
          en: 'A five minute note written on the day of the activity is almost always more accurate than a two hour reconstruction six months later. You only need three things: what happened, who was involved, and where the files are kept.',
        },
      },
      { type: 'h2', text: { id: 'Simpan di tempat yang bisa ditebak', en: 'Store it somewhere predictable' } },
      {
        type: 'p',
        text: {
          id: 'Struktur folder yang membosankan justru yang paling bertahan. Tahun, lalu jenis kegiatan, lalu nama kegiatan. Orang baru yang bergabung tahun depan harus bisa menemukan berkas tanpa bertanya kepada siapa pun.',
          en: 'A boring folder structure is the one that survives. Year, then activity type, then activity name. Someone who joins next year should be able to find a file without asking anyone.',
        },
      },
      { type: 'h2', text: { id: 'Anggap pembacanya orang asing', en: 'Assume the reader is a stranger' } },
      {
        type: 'p',
        text: {
          id: 'Asesor, auditor, atau rekan kerja yang baru masuk tidak punya konteks yang ada di kepala kita. Menulis satu kalimat pembuka yang menjelaskan kenapa dokumen itu ada membuat sisanya jauh lebih mudah dibaca.',
          en: 'An assessor, an auditor, or a new colleague does not carry the context that sits in our heads. Writing one opening sentence that explains why the document exists makes everything after it much easier to read.',
        },
      },
      {
        type: 'callout',
        icon: 'check',
        text: {
          id: 'Ukuran sederhana untuk menilai dokumentasi: kalau kamu cuti sebulan dan tim tetap bisa melanjutkan pekerjaanmu tanpa menelepon, dokumentasinya sudah cukup baik.',
          en: 'A simple test for documentation: if you take a month off and the team can carry on without calling you, your documentation is good enough.',
        },
      },
      {
        type: 'p',
        text: {
          id: 'Dokumentasi yang rapi bukan hanya soal lolos penilaian. Ia menyimpan ingatan organisasi, dan itu yang membuat kerja tahun berikutnya tidak dimulai dari nol lagi.',
          en: 'Tidy documentation is not only about passing an assessment. It holds the memory of an organisation, and that is what keeps next year from starting over from zero.',
        },
      },
    ],
  },
];

/** Tulisan yang tampil di situs, sudah diurutkan dari yang terbaru. */
export const publishedPosts = posts
  .filter((post) => !post.draft)
  .sort((a, b) => new Date(b.date) - new Date(a.date));

/** Cari satu tulisan berdasarkan slug-nya. */
export function getPostBySlug(slug) {
  return publishedPosts.find((post) => post.slug === slug) ?? null;
}

/** Semua topik unik dari seluruh tulisan, untuk tombol filter. */
export function getAllTags() {
  const unique = [];
  publishedPosts.forEach((post) => {
    (post.tags ?? []).forEach((tag) => {
      if (!unique.includes(tag)) unique.push(tag);
    });
  });
  return unique;
}

export default posts;
