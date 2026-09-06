# Panduan Mengubah Isi Portofolio

## Ada dua cara, pilih yang paling nyaman

### Cara 1: lewat panel konten, tanpa membuka GitHub

Buka **https://rianfirnanda.vercel.app/admin** lalu login dengan GitHub. Semua
isi situs bisa diubah dari form biasa di sana, termasuk menambah tulisan blog
dan mengunggah foto langsung dari ponsel.

Kalau panelnya belum bisa login, berarti pemasangan awalnya belum selesai.
Langkahnya ada di [bagian 17](#17-panel-konten-di-admin), cukup sekali saja.

### Cara 2: lewat berkas di folder `content/`

Semua isi situs tersimpan sebagai berkas JSON biasa. Bisa diedit di komputer,
atau langsung lewat tampilan web GitHub.

| Berkas | Isinya |
| --- | --- |
| `content/profile.json` | Nama, headline, ringkasan, foto, galeri |
| `content/settings.json` | Judul situs, SEO, bahasa awal, tema awal, sakelar tampilan |
| `content/contact.json` | Email, telepon, catatan kontak |
| `content/social.json` | Tautan media sosial |
| `content/experience.json` | Daftar pengalaman |
| `content/projects.json` | Daftar proyek |
| `content/certifications.json` | Daftar sertifikasi |
| `content/education.json` | Riwayat pendidikan |
| `content/publications.json` | Karya ilmiah |
| `content/skills.json` | Kelompok keahlian |
| `content/volunteering.json` | Kegiatan sukarela |
| `content/languages.json` | Bahasa yang dikuasai |
| `content/services.json` | Layanan yang ditawarkan |
| `content/stats.json` | Angka sorotan di section Tentang |
| `content/navigation.json` | Isi menu navigasi |
| `content/sections.json` | Judul dan subjudul tiap bagian |
| `content/labels.json` | Label tombol dan teks antarmuka |
| `content/posts/*.json` | Satu berkas per tulisan blog |

Berkas `data/portfolio.js` dan `data/posts.js` sekarang hanya bertugas
menyatukan berkas-berkas di atas. Isinya tidak perlu disentuh.

Kamu juga tidak perlu menyentuh folder `components/` sama sekali.

> **Tiga aturan yang berlaku di mana-mana**
> 1. Menambah item cukup dengan menambah satu objek ke daftar. Tampilan menyesuaikan sendiri.
> 2. Daftar kosong (`[]`) membuat section-nya hilang otomatis dari halaman.
> 3. Urutan daftar sama dengan urutan tampil di layar, paling atas paling baru.

Kalau mengedit lewat berkas, jalankan `npm run dev` dan buka
`http://localhost:3000` untuk melihat hasilnya. Setelah cocok, `git commit` dan
`git push`. Vercel akan membangun ulang situsnya sendiri dalam satu sampai dua
menit. Kalau mengedit lewat panel, semua itu terjadi otomatis begitu kamu
menekan Publish.

Cuplikan kode di panduan ini ditulis dalam gaya JavaScript agar mudah dibaca.
Isi berkas JSON yang sebenarnya sama persis strukturnya, hanya perlu tanda kutip
ganda pada setiap nama field.

---

## Daftar isi

1. [Mengganti foto profil](#1-mengganti-foto-profil)
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
16. [Menyalakan dan mematikan sentuhan interaktif](#16-menyalakan-dan-mematikan-sentuhan-interaktif)
17. [Panel konten di /admin](#17-panel-konten-di-admin)

---

## 1. Mengganti foto profil

Foto kamu dipakai di **lima tempat sekaligus**: kartu besar di Hero, logo
bundar di navbar, favicon di tab browser, ikon layar utama iOS, dan kartu
preview saat tautan situs dibagikan.

**Kalau kamu mengganti fotonya, ikuti dua langkah ini.**

**Langkah 1. Ganti berkasnya.**
Siapkan foto **persegi**, minimal 640 x 640 piksel. Timpa berkas
`public/images/profile.jpg` dengan foto baru itu.

Cara lewat browser tanpa perlu Git: buka repo di GitHub, masuk ke folder
`public/images`, klik **Add file**, pilih **Upload files**, seret fotomu ke
sana, lalu **Commit changes**.

**Langkah 2. Buat ulang aset turunannya.**

```bash
npm run assets
```

Perintah itu membaca `profile.avatar` di `content/profile.json`, lalu menulis
ulang tiga berkas sekaligus:

| Berkas | Isi |
| --- | --- |
| `app/icon.png` | Favicon bundar berbingkai gradien, 512 x 512 |
| `app/apple-icon.png` | Ikon layar utama iOS, 180 x 180 |
| `public/images/og-image.png` | Kartu preview 1200 x 630 berisi foto, nama, dan status |

Setelah itu `git commit` dan `git push`. Vercel akan membangun ulang sendiri.

> Kalau kamu melewatkan langkah 2, foto di Hero dan navbar tetap berganti,
> hanya favicon dan kartu preview yang masih memakai foto lama.

**Kalau foto barumu berformat PNG atau WebP**, ubah dua baris di
`content/profile.json` supaya cocok, atau ganti lewat panel di menu Profil Diri:

```js
profile: {
  avatar: '/images/profile.png',         // foto utama
  avatarFallback: '/images/profile.png', // cadangan kalau yang utama gagal dimuat
}
```

`avatarFallback` adalah gambar pengganti kalau berkas utamanya tidak ditemukan.
Arahkan ke berkas lain kalau kamu ingin ada cadangan yang berbeda, misalnya
`'/images/avatar.svg'` yang berisi kartu monogram.

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

Lewat panel: menu **Isi Halaman**, lalu **Pengalaman**, lalu tombol tambah.

Lewat berkas: buka `content/experience.json`, lalu sisipkan objek baru di
posisi paling atas array `items` karena urutannya dari yang terbaru.

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
2. Tulis path-nya di berkas terkait, selalu diawali `/` dan dihitung dari
   folder `public`. Kalau mengunggah lewat panel, path-nya diisi otomatis.

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

### Galeri di section Tentang Saya

Strip tiga gambar di bawah ringkasan diatur lewat field `gallery` di
`content/profile.json`, atau lewat panel di menu Profil Diri:

```js
profile: {
  gallery: [
    {
      src: '/images/about/riset.jpg',
      alt: { id: 'Kegiatan riset lapangan', en: 'Field research activity' },
      caption: { id: 'Riset lapangan dan data', en: 'Field research and data' },
    },
    // tambah objek lain di sini, gridnya menyesuaikan sendiri
  ],
}
```

Kosongkan `gallery: []` untuk menyembunyikan seluruh strip-nya. Gambar bisa
diklik untuk dibuka besar, dan `caption` tampil di atas gambarnya.

### Gambar placeholder bawaan

Gambar yang sekarang terpasang di bagian Pengalaman dan galeri Tentang Saya
masih **placeholder**, bukan foto asli. Bentuknya SVG abstrak bergradien dengan
motif geometris, dibuat oleh:

```bash
npm run placeholders
```

Placeholder ini sengaja **tidak memuat teks apa pun** supaya tetap utuh saat
dipotong ke rasio mana pun oleh kartu yang menampilkannya.

Ganti dengan foto asli kapan saja: unggah lewat panel, atau simpan foto ke
folder yang sama lalu ubah field `image` atau `src` di berkas terkait. Ingin menambah placeholder baru
dengan gaya yang sama? Tambahkan satu baris ke array `ITEMS` di
`scripts/generate-placeholders.mjs`, pilih palet warna dan motifnya, lalu
jalankan perintah di atas.

| Palet tersedia | Motif tersedia |
| --- | --- |
| `indigo`, `violet`, `cyan`, `teal`, `slate`, `rose` | `documents`, `network`, `broadcast`, `territory`, `lab`, `community`, `growth` |

---

## 5. Menambah proyek

Tambahkan objek ke `items` di `content/projects.json`, atau lewat panel di menu
**Isi Halaman**, lalu **Proyek**. **Tag baru otomatis menjadi tombol filter**
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

Menulis blog sekarang seperti menulis di aplikasi catatan biasa. Tidak ada blok
yang perlu disusun satu per satu lagi.

### Lewat panel, cara yang disarankan

Buka `/admin`, menu **Tulisan Blog**, klik tombol tambah. Yang wajib diisi cuma
tiga:

| Kolom | Keterangan |
|---|---|
| Judul | Alamat tulisannya dibuat otomatis dari sini |
| Tanggal terbit | Pilih dari kalender |
| Isi tulisan | Ketik biasa, ada tombol tebal, miring, daftar, dan kutipan |

Sisanya boleh dilewati. Tiga hal ini dihitung sendiri oleh situs:

- **Alamat tulisan** dibuat dari judul, jadi tidak ada lagi slug salah ketik
- **Waktu baca** dihitung dari panjang tulisan
- **Ringkasan** diambil dari kalimat pertama kalau kamu mengosongkannya

Kolom **English** di setiap bagian boleh dibiarkan kosong. Kalau kosong, versi
Inggris situs akan memakai teks Indonesianya.

### Menyisipkan foto, video, musik, atau PDF ke dalam tulisan

Klik tombol gambar di bilah alat editor, pilih atau unggah berkasnya, selesai.
Situs otomatis memilihkan tampilan yang pas berdasarkan jenis berkasnya:

| Jenis berkas | Tampil sebagai |
|---|---|
| `jpg` `png` `webp` `gif` `avif` | gambar dengan keterangan di bawahnya |
| `mp4` `webm` `mov` | pemutar video lengkap dengan tombol putar |
| `mp3` `wav` `ogg` `m4a` | pemutar musik ramping |
| `pdf` | pembaca dokumen, plus tombol buka di tab baru |
| lainnya | tombol unduh |

Kamu tidak perlu memilih jenisnya sendiri. Tempel saja tautan berkasnya.

**Untuk video panjang, pakai YouTube.** Semua berkas yang diunggah lewat panel
ikut tersimpan di repositori, dan repositori yang gemuk membuat situs makin lama
dibangun setiap kali kamu menyimpan. Batas satu berkas dipasang di 40 MB. Video
di atas satu dua menit sebaiknya diunggah ke YouTube, lalu tempel tautannya
sebagai tautan biasa di dalam tulisan.

### Lewat berkas, kalau kamu memang ingin

Salin salah satu berkas di `content/posts/`, beri nama baru. **Nama berkas itu
yang menjadi alamat tulisan**, jadi pakai huruf kecil dan tanda hubung.

```json
{
  "title": {
    "id": "Judul Tulisan Baru",
    "en": ""
  },
  "date": "2027-01-15",
  "cover": "/media/sampul.jpg",
  "coverAlt": { "id": "Keterangan singkat gambar sampul", "en": "" },
  "excerpt": { "id": "", "en": "" },
  "tags": ["Kebijakan Publik", "AI"],
  "featured": false,
  "draft": false,
  "body": {
    "id": "Paragraf pertama.\n\n## Subjudul\n\nParagraf berikutnya.\n\n- poin pertama\n- poin kedua\n\n> Ini kutipan.\n\n![Keterangan gambar](/media/diagram.png)",
    "en": ""
  }
}
```

### Cara menata tulisan

Kalau kamu memakai mode teks biasa di editor, atau menulis langsung di berkas,
ini semua aturannya. Cuma segini.

```
# Judul besar
## Subjudul
### Subjudul kecil

Baris kosong memisahkan paragraf.

**tebal**  dan  *miring*

- daftar bertitik
- baris kedua

1. daftar bernomor
2. baris kedua

> kutipan

[teks tautan](https://alamat-tujuan.com)
![keterangan gambar](/media/gambar.jpg)
```

**Kode HTML tidak akan dijalankan.** Kalau kamu menempel potongan HTML ke dalam
tulisan, isinya dibuang, bukan dijalankan. Ini disengaja supaya tidak ada skrip
berbahaya yang bisa masuk lewat isi tulisan.

**Menyimpan draf.** Centang "Simpan sebagai draf" untuk menyembunyikan tulisan
dari situs tanpa menghapusnya. Draf juga tidak masuk ke sitemap.

**Topik.** Tombol penyaring di halaman `/blog` dibangun otomatis dari kolom
Topik seluruh tulisan, tidak ada daftar terpisah yang perlu diurus.

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
`content/settings.json`:

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

Menu navigasi dibangun dari `content/navigation.json`.

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

---

## 16. Menyalakan dan mematikan sentuhan interaktif

Semua gerakan halus di situs ini punya sakelar sendiri di blok `appearance`
pada `content/settings.json`, atau lewat panel di menu **Pengaturan Situs**. Ubah jadi `false` kalau ada yang terasa terlalu ramai.
Tidak ada yang rusak kalau dimatikan, halamannya hanya jadi lebih tenang.

```js
appearance: {
  spotlight: true,       // sorotan lembut mengikuti kursor di dalam kartu
  scrollProgress: true,  // garis bergradien di tepi atas layar
  countUpStats: true,    // angka statistik menghitung naik dari nol
  backToTop: true,       // tombol bundar di sudut kanan bawah
  photoAsLogo: true,     // foto profil sebagai logo navbar
  shareButtons: true,    // tombol berbagi di bawah tulisan blog
  heroMarquee: true,     // strip keahlian berjalan di bawah Hero
  printLink: true,       // tautan simpan sebagai PDF di footer
  lightbox: true,        // gambar bisa diklik untuk dibuka besar
  commandPalette: true,  // pencarian cepat Ctrl+K atau Cmd+K
}
```

| Sakelar | Kalau diisi `false` |
| --- | --- |
| `spotlight` | Kartu tetap punya efek angkat saat disentuh kursor, hanya sorotan cahayanya yang hilang |
| `scrollProgress` | Garis tipis di tepi atas layar tidak dirender sama sekali |
| `countUpStats` | Angka statistik langsung tampil utuh tanpa animasi |
| `backToTop` | Tombol melayang hilang. Pengunjung tetap bisa menggulir sendiri |
| `photoAsLogo` | Logo navbar kembali memakai inisial dari `profile.name` |
| `shareButtons` | Baris tombol berbagi di bawah artikel tidak muncul |
| `heroMarquee` | Strip keahlian berjalan di bawah Hero dilepas |
| `printLink` | Tautan "Simpan sebagai PDF" di footer disembunyikan |
| `lightbox` | Gambar tetap tampil, hanya tidak bisa diklik untuk diperbesar |
| `commandPalette` | Tombol Ctrl+K di navbar dan pintasan keyboardnya dimatikan |

### Pencarian cepat Ctrl+K

Pengunjung bisa menekan **Ctrl+K** (atau **Cmd+K** di Mac) untuk membuka
pencarian yang melompat ke bagian mana pun. Isinya dirakit otomatis dari data
yang sudah ada, jadi menambah proyek, tulisan blog, atau tautan sosial langsung
menambahnya ke pencarian tanpa pekerjaan tambahan.

| Tombol | Fungsi |
| --- | --- |
| `Ctrl+K` atau `Cmd+K` | Buka dan tutup |
| Panah atas dan bawah | Pindah pilihan |
| `Enter` | Buka pilihan yang sedang disorot |
| `Esc` | Tutup |

Selain bagian halaman, proyek, tulisan, dan tautan sosial, pencarian ini juga
memuat tindakan cepat: ganti tema, ganti bahasa, kirim email, buka CV, dan
simpan halaman sebagai PDF.

### Mode cetak dan simpan PDF

Tautan **Simpan sebagai PDF** di footer membuka dialog cetak browser. Tata
letak khususnya sudah disiapkan di blok `@media print` pada `app/globals.css`:
latar bergradien dilepas, warna dipaksa terang supaya hemat tinta, navigasi dan
tombol melayang disembunyikan, dan kartu tidak terbelah dua halaman.

Ingin menyembunyikan elemen tertentu saat dicetak? Tambahkan atribut
`data-print="hide"` pada elemen itu.

```jsx
<div data-print="hide">Ini tidak ikut tercetak</div>
```

### Menghormati pengaturan perangkat

Semua animasi di situs ini otomatis berhenti untuk pengunjung yang menyalakan
"kurangi gerakan" di perangkat mereka. Tidak ada pengaturan tambahan yang perlu
kamu urus, dan tidak ada konten yang hilang, hanya geraknya yang tidak dijalankan.

---

## 17. Panel konten di /admin

Panel ini memungkinkan kamu mengubah seluruh isi situs lewat form biasa, tanpa
membuka GitHub sama sekali. Bisa dipakai dari laptop maupun ponsel.

### Cara kerjanya

```
Kamu tekan Publish  ->  panel menulis commit ke repo  ->  Vercel membangun ulang  ->  situs terbarui
```

Jedanya sekitar satu sampai dua menit. Kamu tidak perlu melakukan apa pun
selama proses itu berjalan.

Perubahan tersimpan sebagai commit biasa di repositori, atas nama akun GitHub
kamu. Artinya seluruh riwayat perubahan tercatat, dan apa pun bisa dikembalikan
kalau ada yang salah.

### Pemasangan awal, cukup sekali seumur hidup

Panelnya sudah terpasang di kode. Yang belum ada hanya izin login, karena itu
menyangkut akun GitHub kamu sendiri. Dua langkah, sekitar lima menit.

#### Langkah 1. Daftarkan aplikasi OAuth di GitHub

1. Buka **https://github.com/settings/developers**
2. Pilih tab **OAuth Apps**, lalu klik **New OAuth App**
3. Isi seperti ini:

   | Kolom | Isi |
   | --- | --- |
   | Application name | `Panel Konten Portofolio` (bebas) |
   | Homepage URL | `https://rianfirnanda.vercel.app` |
   | Authorization callback URL | `https://rianfirnanda.vercel.app/api/callback/` |

   > **Perhatikan garis miring di akhir callback URL.** Alamat itu harus sama
   > persis, termasuk garis miringnya. Kalau berbeda, GitHub akan menolak login
   > dengan pesan `redirect_uri_mismatch`.

4. Klik **Register application**
5. Salin **Client ID** yang muncul
6. Klik **Generate a new client secret**, lalu salin nilainya.
   Rahasia ini hanya ditampilkan sekali, jadi simpan dulu di tempat aman.

#### Langkah 2. Masukkan kredensialnya ke Vercel

1. Buka dashboard Vercel, pilih proyek portofolio ini
2. Masuk ke **Settings**, lalu **Environment Variables**
3. Tambahkan dua variabel:

   | Name | Value |
   | --- | --- |
   | `GITHUB_CLIENT_ID` | Client ID dari langkah 1 |
   | `GITHUB_CLIENT_SECRET` | Client secret dari langkah 1 |

4. Pastikan keduanya berlaku untuk environment **Production**
5. Masuk ke tab **Deployments**, buka deployment terakhir, klik menu tiga titik,
   lalu **Redeploy**. Variabel baru hanya terbaca oleh deployment baru.

Selesai. Buka `https://rianfirnanda.vercel.app/admin`, klik **Sign In with
GitHub**, beri izin sekali, dan panelnya siap dipakai.

### Isi panelnya

| Menu | Untuk mengubah |
| --- | --- |
| **Tulisan Blog** | Menambah, mengedit, dan menghapus tulisan |
| **Isi Halaman** | Pengalaman, proyek, sertifikasi, pendidikan, publikasi, keahlian, kesukarelawanan, angka sorotan, bahasa, layanan |
| **Pengaturan** | Profil diri, kontak, media sosial, pengaturan situs, menu navigasi, judul tiap bagian |

Gambar yang kamu unggah lewat panel otomatis tersimpan di
`public/images/uploads/` dan ikut masuk ke repositori.

### Menulis tulisan blog di panel

Isi tulisan disusun dari blok. Klik tombol tambah di bagian **Isi tulisan**,
lalu pilih jenis bloknya: Paragraf, Subjudul besar, Subjudul kecil, Daftar
bertitik, Daftar bernomor, Kutipan, Kotak sorotan, atau Gambar.

Setiap blok teks punya dua kolom, Bahasa Indonesia dan English. Kolom English
boleh dikosongkan, nanti teks Indonesia yang dipakai untuk keduanya.

Isi **Simpan sebagai draf** dengan aktif kalau tulisannya belum siap terbit.
Draf tersimpan di repositori tapi tidak muncul di situs dan tidak masuk sitemap.

### Siapa saja yang bisa masuk

Hanya akun GitHub yang punya akses tulis ke repositori `Rianfirnanda/Portofolio`.
Orang lain bisa membuka halaman `/admin`, tapi tidak akan bisa menyimpan apa pun.
Halaman panel juga ditandai `noindex` sehingga tidak muncul di hasil pencarian.

Client secret hanya dipakai di sisi server, di berkas `app/api/callback/route.js`,
dan tidak pernah ikut terkirim ke browser.

### Yang belum ada di panel

Dua hal sengaja tidak dimasukkan karena hampir tidak pernah diubah:

| Yang ingin diubah | Tempatnya |
| --- | --- |
| Label tombol dan teks antarmuka | `content/labels.json` |
| Warna aksen dan kepekatan latar | `app/globals.css`, lihat bagian 9 dan 11 |

### Kalau ada yang tidak beres

| Gejala | Penyebab dan perbaikannya |
| --- | --- |
| Halaman `/admin` kosong terus | Berkas panelnya gagal disalin saat build. Jalankan `npm install` lalu `npm run build` lagi. |
| Tombol Sign In tidak melakukan apa-apa | Popup diblokir browser. Izinkan popup untuk domain ini. |
| `redirect_uri_mismatch` | Authorization callback URL di GitHub tidak sama persis. Periksa garis miring di akhirnya. |
| `Konfigurasi OAuth belum lengkap` | `GITHUB_CLIENT_ID` atau `GITHUB_CLIENT_SECRET` belum terisi di Vercel, atau belum di-redeploy setelah diisi. |
| `Kode keamanan tidak cocok` | Proses login memakan waktu lebih dari sepuluh menit, atau cookie diblokir. Tutup jendela login lalu ulangi. |
| Sudah Publish tapi situs belum berubah | Vercel masih membangun. Tunggu satu sampai dua menit, lalu muat ulang halaman. |

---

## 18. Menyalakan pemutar musik

Pemutar kecil di pojok kiri bawah situs. Isinya kamu atur sendiri.

**Cara memasangnya:** panel, menu **Pengaturan**, lalu **Musik**.

1. Centang **Tampilkan pemutar musik**
2. Di **Daftar lagu**, klik tambah
3. Unggah berkas lagunya, isi judulnya, selesai

Pemutar baru muncul kalau sakelarnya menyala **dan** ada minimal satu lagu.
Kalau salah satu tidak terpenuhi, seluruh pemutar tidak ikut tampil.

**Musik tidak pernah berbunyi sendiri.** Ini disengaja dan sebaiknya jangan
diubah. Suara yang tiba tiba muncul saat halaman dibuka itu mengagetkan, memakan
kuota pengunjung, dan mengganggu orang yang sedang mendengarkan hal lain. Semua
peramban modern juga memblokirnya. Pengunjung yang memutuskan untuk memutar.

Pilihan terakhir pengunjung, lagu yang sedang diputar dan besar suaranya,
diingat di perangkat mereka sendiri dan tidak dikirim ke mana pun.

**Soal hak cipta.** Pakai lagu yang memang boleh kamu sebarkan: karya sendiri,
musik berlisensi bebas, atau yang sudah kamu beli izinnya. Situs portofolio itu
etalase profesional, dan lagu bajakan di dalamnya bisa merugikan kesan yang
justru ingin kamu bangun.

Format `mp3` paling aman karena bisa diputar di semua perangkat.

---

## 19. Menerima masukan dan saran dari tamu

Formulir di halaman depan tempat pengunjung menulis masukan, boleh dengan nama
atau tanpa nama sama sekali. Kirimannya muncul di panel pada menu
**Masukan Masuk**.

### PENTING: jadikan repositori privat dulu

Masukan yang masuk tersimpan sebagai berkas di dalam repositori ini. Selama
repositorinya masih publik, **siapa pun bisa membaca masukan yang dikirim orang
ke kamu**, termasuk nama dan kontak yang mereka tulis. Itu melanggar janji
privasi yang tertulis di formulirnya sendiri.

Jadi lakukan ini lebih dulu:

1. Buka `https://github.com/Rianfirnanda/Portofolio/settings`
2. Gulir ke bawah sampai **Danger Zone**
3. Klik **Change visibility**, pilih **Make private**

Situsmu tetap bisa diakses publik seperti biasa. Yang berubah cuma kode dan
isinya jadi tidak bisa diintip orang lain. Vercel dan panel `/admin` tetap
bekerja normal dengan repositori privat.

### Menyiapkan izin menulis

Formulirnya belum bisa menyimpan apa pun sampai langkah ini selesai. Jadi tidak
ada data yang bisa bocor sebelum kamu siap.

1. Buka `https://github.com/settings/personal-access-tokens/new`
2. **Token name**: `Masukan Portofolio`
3. **Expiration**: pilih yang panjang, misalnya satu tahun
4. **Repository access**: pilih **Only select repositories**, lalu pilih
   `Rianfirnanda/Portofolio`
5. **Permissions**, bagian Repository permissions: cari **Contents**, ubah jadi
   **Read and write**. Biarkan yang lain apa adanya.
6. Klik **Generate token**, lalu salin hasilnya

Lalu di Vercel, Settings, Environment Variables, tambahkan:

| Key | Value | Type |
|---|---|---|
| `GITHUB_CONTENT_TOKEN` | token yang baru disalin | Secret |

Deploy ulang, dan formulirnya langsung aktif.

Token ini sengaja dibuat sesempit mungkin. Dia hanya bisa membaca dan menulis
berkas di satu repositori ini, tidak bisa menghapus repositori, tidak bisa
mengubah pengaturan, dan tidak bisa menyentuh repositori lain.

### Membaca masukan yang masuk

Panel, menu **Masukan Masuk**. Ada penyaring **Belum dibaca** dan
**Sudah dibaca** di atas daftarnya.

Tiap kiriman punya dua kolom yang bisa kamu ubah:

- **Sudah dibaca**, centang setelah kamu baca supaya yang baru gampang dikenali
- **Catatan pribadi**, untuk dirimu sendiri, tidak pernah tampil di situs

Kolom nama, kontak, dan isi masukan sengaja dikunci supaya kamu tidak sengaja
mengubah kiriman orang. Kalau ada kiriman sampah, hapus saja berkasnya.

Isi masukan **tidak pernah ditampilkan di situs**. Ini disengaja: teks dari orang
asing tidak boleh langsung tampil di halaman yang kamu tanggung namanya.

### Penyaring robot

Formulir di internet selalu didatangi robot pengirim iklan. Ada empat lapis
penyaring yang bekerja diam diam, tanpa merepotkan tamu dengan teka teki gambar:

| Lapis | Cara kerjanya |
|---|---|
| Kolom umpan | Kolom tersembunyi yang cuma diisi robot |
| Jeda mengetik | Kiriman yang datang kurang dari 2,5 detik ditolak |
| Batas panjang | Pesan dibatasi 3000 huruf, nama 80, kontak 120 |
| Jeda antar kirim | Satu pengirim dibatasi lima kiriman per jam |

Robot yang tertangkap tetap dijawab "berhasil" supaya tidak belajar dari
penolakan dan mencoba cara lain.

### Mematikan fiturnya

Panel, menu **Pengaturan**, lalu **Masukan, Pengaturan**, hilangkan centang
**Tampilkan formulir masukan**. Seluruh bagian itu langsung hilang dari situs.

---

## 20. Tempat berkas yang kamu unggah

Semua berkas yang diunggah lewat panel masuk ke satu folder: `public/media/`.
Di dalam tulisan dan isian, alamatnya ditulis `/media/nama-berkas.jpg`.

Dulu namanya `public/images/uploads/`. Diganti karena isinya sekarang bukan cuma
gambar, tapi juga video, musik, dan PDF. Berkas lama sudah dipindahkan dan semua
rujukannya ikut diperbarui, jadi tidak ada yang perlu kamu kerjakan.

Foto profil dan gambar bawaan situs tetap di `public/images/`. Itu berkas yang
jarang berubah dan bukan hasil unggahan panel.

| Batas | Nilai |
|---|---|
| Ukuran satu berkas | 40 MB |
| Jenis berkas | bebas, tapi gambar, video, musik, dan PDF punya tampilan khusus |

Berkas di `public/media/` sengaja ikut masuk ke Git supaya jadi bagian dari
repositori dan tidak bergantung pada layanan lain.
