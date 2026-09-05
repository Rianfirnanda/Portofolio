# Panduan Mengubah Isi Portofolio

Hampir semua yang tampil di situs diatur dari dua berkas saja:

| Berkas | Isinya |
| --- | --- |
| `data/portfolio.js` | Profil, pengalaman, proyek, sertifikasi, keahlian, kontak, menu, judul section |
| `data/posts.js` | Semua tulisan blog |

Kamu tidak perlu menyentuh folder `components/` sama sekali.

> **Tiga aturan yang berlaku di mana-mana**
> 1. Menambah item cukup dengan menambah satu objek ke array. Tampilan menyesuaikan sendiri.
> 2. Array kosong (`[]`) membuat section-nya hilang otomatis dari halaman.
> 3. Urutan array sama dengan urutan tampil di layar, paling atas paling baru.

Setelah mengubah berkas, simpan lalu jalankan `npm run dev` dan buka
`http://localhost:3000`. Kalau sudah cocok, `git commit` dan `git push`.
Vercel akan membangun ulang situsnya sendiri dalam satu sampai dua menit.

---

## Daftar isi

1. [Memasang foto profil](#1-memasang-foto-profil)
2. [Menulis teks dua bahasa](#2-menulis-teks-dua-bahasa)
3. [Menambah pengalaman kerja](#3-menambah-pengalaman-kerja)
4. [Menambahkan foto ke pengalaman dan proyek](#4-menambahkan-foto-ke-pengalaman-dan-proyek)
5. [Menambah proyek](#5-menambah-proyek)
6. [Menulis tulisan blog baru](#6-menulis-tulisan-blog-baru)
7. [Menambah sertifikasi](#7-menambah-sertifikasi)
8. [Menambah media sosial](#8-menambah-media-sosial)
9. [Mengganti warna aksen](#9-mengganti-warna-aksen)
10. [Mengatur mode terang dan gelap](#10-mengatur-mode-terang-dan-gelap)
11. [Menyetel intensitas latar belakang](#11-menyetel-intensitas-latar-belakang)
12. [Menambah atau menghapus item menu](#12-menambah-atau-menghapus-item-menu)
13. [Memasang tombol Unduh CV](#13-memasang-tombol-unduh-cv)
14. [Menyembunyikan satu section](#14-menyembunyikan-satu-section)
15. [Daftar nama ikon yang tersedia](#15-daftar-nama-ikon-yang-tersedia)

---

## 1. Memasang foto profil

Ini yang pertama sebaiknya kamu lakukan.

1. Siapkan fotomu dalam bentuk **persegi**, minimal 640 x 640 piksel.
   Foto formal berlatar polos memberi hasil paling rapi.
2. Beri nama `profile.jpg`, lalu simpan ke folder `public/images/`.
   Jadi alamat lengkapnya `public/images/profile.jpg`.
3. Selesai. Path-nya sudah tertulis di `data/portfolio.js`:

```js
profile: {
  avatar: '/images/profile.jpg',        // foto utama kamu
  avatarFallback: '/images/avatar.svg', // dipakai kalau foto di atas belum ada
}
```

Kalau fotomu berformat PNG atau WebP, ganti saja baris `avatar` menjadi
`'/images/profile.png'` atau `'/images/profile.webp'`.

**Cara mengunggah lewat browser tanpa perlu Git:** buka repo di GitHub, masuk
ke folder `public/images`, klik **Add file**, pilih **Upload files**, seret
fotomu ke sana, lalu **Commit changes**. Vercel langsung membangun ulang.

> Situs tidak akan rusak walau fotonya belum ada. Selama `profile.jpg` belum
> diunggah, yang tampil adalah kartu monogram `avatar.svg`.

---

## 2. Menulis teks dua bahasa

Setiap teks boleh ditulis dengan dua cara:

```js
// A. Sama di kedua bahasa. Cocok untuk nama orang, kampus, teknologi, URL.
org: 'Universitas Bengkulu',

// B. Beda per bahasa.
role: { id: 'Asisten Laboratorium', en: 'Laboratory Assistant' },
```

Kalau kamu hanya sempat menulis satu bahasa, tulis string biasa. Teks itu
dipakai untuk ID maupun EN, dan tidak akan menimbulkan error.

---

## 3. Menambah pengalaman kerja

Buka bagian `experience: [ ... ]` di `data/portfolio.js`, lalu sisipkan objek
baru di posisi paling atas karena urutannya dari yang terbaru.

```js
experience: [
  // ---- TEMPEL BLOK BARU DI SINI ----
  {
    role: { id: 'Staf Teknologi Informasi', en: 'IT Staff' },
    org: 'PT Contoh Nusantara',
    type: { id: 'Penuh Waktu', en: 'Full-time' },
    period: { id: 'Jan 2027 - sekarang', en: 'Jan 2027 - present' },
    location: 'Bengkulu, Indonesia',
    description: {
      id: 'Mengelola server internal dan mendampingi digitalisasi arsip perusahaan.',
      en: 'Managing internal servers and supporting the company archive digitalisation.',
    },
    skills: ['Linux', 'Jaringan', 'Technical Support'], // boleh []
    image: null,      // isi path gambar kalau punya dokumentasi, lihat bagian 4
    imageAlt: '',
    logo: null,       // logo instansi berbentuk persegi, opsional
    highlight: true,  // true memberi kartu border gradien beranimasi
  },
  // ---- akhir blok baru ----

  { /* item lama ... */ },
]
```

| Field | Wajib | Keterangan |
| --- | --- | --- |
| `role` | ya | Nama posisi |
| `org` | ya | Nama instansi atau perusahaan |
| `type` | tidak | Paruh Waktu, Magang, Sukarelawan, dan sejenisnya |
| `period` | ya | Rentang waktu |
| `location` | tidak | Kota dan negara |
| `description` | ya | Otomatis dipotong dengan tombol Selengkapnya kalau panjang |
| `skills` | tidak | Array chip keahlian, isi `[]` kalau tidak perlu |
| `image` | tidak | Foto dokumentasi kegiatan |
| `logo` | tidak | Logo instansi |
| `highlight` | tidak | `true` untuk menyorot kartu |

---

## 4. Menambahkan foto ke pengalaman dan proyek

Semua kartu bisa menampilkan gambar, dan semuanya opsional.

**Langkah umum**

1. Simpan gambar ke `public/images/`. Buat sub folder kalau perlu, misalnya
   `public/images/pengalaman/` atau `public/images/projects/`.
2. Tulis path-nya di data, selalu diawali `/` dan dihitung dari folder `public`.

**Pengalaman**

```js
{
  role: { id: 'Magang', en: 'Intern' },
  org: 'Dinas Pemberdayaan Masyarakat dan Desa Provinsi Bengkulu',
  image: '/images/pengalaman/magang-dpmd.jpg',   // rasio 16:9 paling pas
  imageAlt: {
    id: 'Kegiatan pendampingan desa bersama tim DPMD',
    en: 'Village mentoring activity with the DPMD team',
  },
  logo: '/images/logo/dpmd.png',                 // persegi, opsional
}
```

Gambarnya muncul di bagian bawah kartu, lengkap dengan keterangan kecil dari
`imageAlt`. Logo muncul di samping judul posisi.

**Proyek**

```js
{
  name: 'SobatKoding',
  image: '/images/projects/sobatkoding.jpg',  // rasio 16:10 paling pas
  imageAlt: 'Tampilan halaman utama SobatKoding',
}
```

Isi `image: null` kalau belum ada gambarnya. Kartu otomatis memakai latar
gradien dengan inisial nama proyek, dan tetap terlihat rapi.

**Kesukarelawanan** juga mendukung `image` dan `imageAlt` dengan cara yang sama.

> Semua gambar dimuat lewat komponen `SmartImage`. Kalau berkasnya belum ada
> atau salah nama, komponen itu berpindah ke gambar cadangan atau menyembunyikan
> dirinya. Situs tidak pernah menampilkan ikon gambar rusak.

---

## 5. Menambah proyek

Tambahkan objek ke array `projects`. **Tag baru otomatis menjadi tombol filter**
di atas grid, tidak perlu didaftarkan di mana pun.

```js
projects: [
  {
    name: 'Nama Proyek',
    period: '2027',
    org: 'Nama Organisasi atau Klien',
    description: {
      id: 'Penjelasan singkat proyek dalam satu sampai tiga kalimat.',
      en: 'A short one to three sentence description of the project.',
    },
    tags: ['Web Development', 'Laravel'],  // tag baru sama dengan tombol filter baru
    image: '/images/projects/nama-proyek.jpg',
    imageAlt: 'Tangkapan layar halaman utama',
    links: [
      { label: { id: 'Lihat situs', en: 'Visit site' }, href: 'https://contoh.com', icon: 'external-link' },
      { label: { id: 'Kode sumber', en: 'Source code' }, href: 'https://github.com/user/repo', icon: 'github' },
    ],
    featured: false,  // true memberi border gradien beranimasi
  },
]
```

---

## 6. Menulis tulisan blog baru

Buka `data/posts.js`, salin satu objek yang sudah ada, tempel di posisi paling
atas array `posts`, lalu ganti isinya.

```js
{
  slug: 'judul-tulisan-baru',      // jadi alamat /blog/judul-tulisan-baru/
  title: {
    id: 'Judul Tulisan Baru',
    en: 'A New Post Title',
  },
  excerpt: {
    id: 'Ringkasan satu sampai dua kalimat yang tampil di kartu daftar.',
    en: 'A one to two sentence summary shown on the list card.',
  },
  date: '2027-01-15',              // format YYYY-MM-DD
  readingTime: 5,                  // perkiraan menit baca, boleh dihapus
  tags: ['Kebijakan Publik', 'AI'],// otomatis jadi tombol filter di /blog
  cover: '/images/blog/judul-tulisan-baru.jpg',  // atau null untuk gradien
  coverAlt: 'Keterangan singkat gambar sampul',
  featured: false,                 // true memberi border gradien beranimasi
  draft: false,                    // true menyembunyikan dari situs
  content: [
    { type: 'p', text: { id: 'Paragraf pertama.', en: 'First paragraph.' } },
    { type: 'h2', text: { id: 'Subjudul', en: 'Subheading' } },
    { type: 'p', text: { id: 'Paragraf berikutnya.', en: 'Next paragraph.' } },
  ],
},
```

### Jenis blok yang bisa dipakai di `content`

```js
// Paragraf
{ type: 'p', text: { id: '...', en: '...' } }

// Subjudul besar dan kecil
{ type: 'h2', text: { id: '...', en: '...' } }
{ type: 'h3', text: { id: '...', en: '...' } }

// Daftar bertitik
{ type: 'ul', items: [
  { id: 'Poin pertama', en: 'First point' },
  { id: 'Poin kedua', en: 'Second point' },
] }

// Daftar bernomor, angkanya digambar otomatis
{ type: 'ol', items: [
  { id: 'Langkah pertama', en: 'First step' },
  { id: 'Langkah kedua', en: 'Second step' },
] }

// Kutipan
{ type: 'quote',
  text: { id: 'Isi kutipan.', en: 'The quote itself.' },
  cite: { id: 'Nama sumber', en: 'Source name' } }

// Kotak sorotan, ikon boleh diganti, lihat daftar ikon di bagian 15
{ type: 'callout', icon: 'sparkles',
  text: { id: 'Catatan penting.', en: 'An important note.' } }

// Gambar di tengah tulisan
{ type: 'image',
  src: '/images/blog/diagram.png',
  alt: 'Diagram alur verifikasi data',
  caption: { id: 'Alur verifikasi berjenjang.', en: 'The tiered verification flow.' } }
```

Blok yang tidak dikenali akan dilewati begitu saja, jadi salah ketik `type`
tidak pernah membuat halaman gagal tampil.

**Menyimpan draf.** Isi `draft: true` untuk menyembunyikan tulisan dari situs
tanpa menghapusnya. Tulisan itu juga tidak masuk ke sitemap.

**Menambah ikon topik.** Filter topik di `/blog` dibangun otomatis dari field
`tags` seluruh tulisan, tidak ada daftar terpisah yang perlu diurus.

---

## 7. Menambah sertifikasi

```js
certifications: [
  {
    name: 'Nama Sertifikasi',      // boleh { id, en }
    issuer: 'Nama Penerbit',
    year: '2027',
    group: 'AI & Cloud',           // pengelompokan bebas, opsional
    credentialUrl: 'https://...',  // '' menyembunyikan tombol Lihat kredensial
  },
]
```

Jangan lupa memperbarui angka di `stats` kalau kamu menampilkan jumlah
sertifikasi di section Tentang.

---

## 8. Menambah media sosial

```js
social: [
  { label: 'LinkedIn',  handle: 'rian-firnanda',  href: 'https://www.linkedin.com/in/rian-firnanda/', icon: 'linkedin',  featured: true },
  { label: 'Instagram', handle: '@rianfirnanda',  href: 'https://www.instagram.com/rianfirnanda/',    icon: 'instagram', featured: true },
  { label: 'WhatsApp',  handle: 'Chat langsung',  href: 'https://wa.me/6281234567890',                icon: 'whatsapp',  featured: true },

  // Tambahan yang tinggal disalin:
  { label: 'X',              handle: '@rianfirnanda', href: 'https://x.com/rianfirnanda',          icon: 'x',        featured: false },
  { label: 'YouTube',        handle: 'Rian Firnanda', href: 'https://youtube.com/@rianfirnanda',   icon: 'youtube',  featured: false },
  { label: 'TikTok',         handle: '@rianfirnanda', href: 'https://tiktok.com/@rianfirnanda',    icon: 'tiktok',   featured: false },
  { label: 'Facebook',       handle: 'Rian Firnanda', href: 'https://facebook.com/rianfirnanda',   icon: 'facebook', featured: false },
  { label: 'Telegram',       handle: '@rianfirnanda', href: 'https://t.me/rianfirnanda',           icon: 'telegram', featured: false },
  { label: 'Google Scholar', handle: 'Profil riset',  href: 'https://scholar.google.com/',         icon: 'scholar',  featured: false },
  { label: 'Medium',         handle: '@rianfirnanda', href: 'https://medium.com/@rianfirnanda',    icon: 'medium',   featured: false },
]
```

| Field | Keterangan |
| --- | --- |
| `label` | Nama platform, dipakai juga sebagai label untuk pembaca layar |
| `handle` | Nama akun yang tampil di bawah label pada bagian Kontak |
| `href` | Alamat lengkap. WhatsApp memakai format `https://wa.me/62...` tanpa tanda plus dan spasi |
| `icon` | Nama ikon, lihat daftar di bagian 15 |
| `featured` | `true` menampilkannya juga di Hero. Yang `false` tetap muncul di Kontak dan Footer |

Sebaiknya tandai `featured: true` untuk empat sampai lima akun saja supaya
bagian Hero tidak terlalu ramai.

---

## 9. Mengganti warna aksen

Buka `app/globals.css`, cari blok `:root` di bagian paling atas, lalu ubah
tiga baris ini:

```css
:root {
  --accent-1: #6366f1; /* indigo */
  --accent-2: #a855f7; /* violet */
  --accent-3: #06b6d4; /* cyan   */
}
```

Ketiganya otomatis dipakai oleh gradien nama, blob latar, border kartu unggulan,
chip, tombol, dan seluruh efek glow, di kedua mode.

Contoh palet lain yang tinggal ditempel:

```css
/* Hijau tosca */
--accent-1: #10b981;
--accent-2: #14b8a6;
--accent-3: #a3e635;

/* Merah muda hangat */
--accent-1: #f43f5e;
--accent-2: #d946ef;
--accent-3: #fb923c;

/* Biru laut */
--accent-1: #3b82f6;
--accent-2: #0ea5e9;
--accent-3: #2dd4bf;
```

Satu hal lagi. Warna teks beraksen diatur terpisah agar tetap terbaca di kedua
mode, yaitu `--accent-fg`. Di mode terang nilainya gelap, di mode gelap nilainya
cerah. Kalau kamu mengganti palet, sesuaikan juga dua baris ini:

```css
:root                { --accent-fg: #6d28d9; }  /* mode terang, harus gelap */
[data-theme='dark']  { --accent-fg: #22d3ee; }  /* mode gelap, harus cerah  */
```

---

## 10. Mengatur mode terang dan gelap

Pengunjung bisa berpindah mode lewat tombol bulan dan matahari di navbar, dan
pilihannya diingat browser mereka.

Mode yang dipakai saat pengunjung baru pertama kali datang diatur di
`data/portfolio.js`:

```js
meta: {
  defaultTheme: 'system',  // 'system', 'light', atau 'dark'
}
```

| Nilai | Artinya |
| --- | --- |
| `'system'` | Mengikuti pengaturan perangkat pengunjung. Ini pilihan paling ramah. |
| `'light'` | Selalu mulai dari mode terang |
| `'dark'` | Selalu mulai dari mode gelap |

Warna address bar di ponsel diatur di baris berikutnya:

```js
themeColorLight: '#f5f7fc',
themeColorDark: '#05070f',
```

---

## 11. Menyetel intensitas latar belakang

Latar belakang terdiri dari beberapa lapisan: blob warna, garis grid, titik
tekstur, dan butiran noise. Kepekatannya diatur di `app/globals.css` dan
nilainya berbeda antara mode terang dan gelap.

```css
:root {                     /* mode terang */
  --blob-opacity: 0.17;     /* warna blob, naikkan agar lebih berwarna */
  --grid-opacity: 0.045;    /* garis grid */
  --dot-opacity: 0.05;      /* titik tekstur */
  --noise-opacity: 0.03;    /* butiran halus */
}

[data-theme='dark'] {       /* mode gelap */
  --blob-opacity: 0.22;
  --grid-opacity: 0.05;
  --dot-opacity: 0.06;
  --noise-opacity: 0.05;
}
```

Isi `0` untuk mematikan satu lapisan sepenuhnya. Ingin latar benar-benar polos?
Set keempatnya ke `0`.

Kecepatan gerak blob diatur oleh `--blob-speed: 30s`. Perbesar angkanya agar
geraknya lebih tenang. Semua animasi ini otomatis berhenti untuk pengunjung yang
mengaktifkan pengaturan "kurangi gerakan" di perangkatnya.

---

## 12. Menambah atau menghapus item menu

Menu navigasi dibangun dari array `nav`.

```js
nav: [
  // Melompat ke anchor di halaman utama. `id` harus sama dengan id <section>.
  { id: 'about', type: 'section', label: { id: 'Tentang', en: 'About' } },

  // Pindah ke halaman lain.
  { id: 'blog', type: 'page', href: '/blog/', label: { id: 'Blog', en: 'Blog' } },
]
```

Hapus satu baris dan item itu langsung hilang dari navbar dan footer, tanpa
menghilangkan section-nya dari halaman.

Ingin menampilkan section Kesukarelawanan di menu? Tambahkan:

```js
{ id: 'volunteering', type: 'section', label: { id: 'Relawan', en: 'Volunteering' } },
```

---

## 13. Memasang tombol Unduh CV

1. Simpan berkas PDF ke folder `public/`, misalnya `public/cv-rian-firnanda.pdf`.
2. Ubah satu baris:

```js
profile: {
  resumeUrl: '/cv-rian-firnanda.pdf',
}
```

Isi `resumeUrl: ''` untuk menyembunyikan tombolnya sama sekali.

---

## 14. Menyembunyikan satu section

Kosongkan array-nya. Section beserta judulnya hilang sepenuhnya.

```js
publications: [],   // section Publikasi hilang
volunteering: [],   // section Kesukarelawanan hilang
projects: [],       // section Proyek hilang
```

Untuk menyembunyikan blog, isi `draft: true` pada semua tulisan di
`data/posts.js`, lalu hapus baris blog dari array `nav`.

Jangan lupa menghapus barisnya juga dari `nav` agar menu tidak menunjuk ke
section yang sudah tidak ada.

---

## 15. Daftar nama ikon yang tersedia

Dipakai pada field `icon` di `social`, `stats`, `skills.groups`,
`projects[].links`, dan blok `callout` di tulisan blog.

**Media sosial dan kontak**

```
linkedin   github     instagram  whatsapp   mail
x          youtube    facebook   tiktok     telegram
scholar    medium     phone      globe
```

**Antarmuka dan navigasi**

```
sun            moon          menu          close
arrow-left     arrow-right   arrow-up      arrow-down
arrow-up-right chevron-down  external-link download
copy           check         send
```

**Konten**

```
briefcase      graduation-cap  book        newspaper
pen-line       folder          award       calendar
clock          tag             image       map-pin
building       users           heart       star
sparkles       shield          code        palette
languages      layers          quote       compass
rocket
```

**Menambah ikon baru:** buka `components/Icon.jsx`, lalu tambahkan satu entri
pada objek `strokeIcons` untuk ikon bergaya garis, atau `fillIcons` untuk logo
solid.

```jsx
const strokeIcons = {
  // ...
  dribbble: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M8.5 2.9c3 4 4.9 8.5 5.6 13.6M2.6 9.5c6 0 11-1.4 15-4.6M4.5 18.7c3.4-4.4 8.4-6.7 15-6.6" />
    </>
  ),
};
```

Setelah itu langsung bisa dipakai dengan menulis `{ icon: 'dribbble' }`.
