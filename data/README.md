# Panduan Mengubah Konten Portofolio

Semua isi website ada di satu berkas: **`data/portfolio.js`**.
Tidak perlu menyentuh berkas di folder `components/` sama sekali.

> **Aturan emas**
> 1. Menambah item = tambah satu objek ke array. Tampilan menyesuaikan sendiri.
> 2. Array kosong (`[]`) = section-nya otomatis hilang dari halaman.
> 3. Urutan array = urutan tampil di layar (paling atas = paling baru).

Setelah mengubah berkas, simpan lalu jalankan `npm run dev` untuk melihat hasilnya
di `http://localhost:3000`. Kalau sudah cocok, `git commit` dan `git push` ke branch
`main` — GitHub Actions akan otomatis mem-build ulang dan menerbitkan situsnya.

---

## Daftar isi

1. [Menulis teks dua bahasa (ID/EN)](#1-menulis-teks-dua-bahasa-iden)
2. [Menambah pengalaman kerja](#2-menambah-pengalaman-kerja)
3. [Menambah proyek](#3-menambah-proyek)
4. [Menambah sertifikasi](#4-menambah-sertifikasi)
5. [Menambah tautan sosial](#5-menambah-tautan-sosial)
6. [Mengganti foto profil](#6-mengganti-foto-profil)
7. [Mengganti gambar proyek](#7-mengganti-gambar-proyek)
8. [Mengganti gambar preview (OG image)](#8-mengganti-gambar-preview-og-image)
9. [Mengganti warna aksen](#9-mengganti-warna-aksen)
10. [Menambah / menghapus item menu](#10-menambah--menghapus-item-menu)
11. [Memasang tombol Unduh CV](#11-memasang-tombol-unduh-cv)
12. [Menyembunyikan satu section](#12-menyembunyikan-satu-section)
13. [Daftar nama ikon yang tersedia](#13-daftar-nama-ikon-yang-tersedia)

---

## 1. Menulis teks dua bahasa (ID/EN)

Setiap teks boleh ditulis dengan dua cara:

```js
// A. Sama di kedua bahasa (nama orang, nama kampus, URL, nama teknologi)
org: 'Universitas Bengkulu',

// B. Beda per bahasa
role: { id: 'Asisten Laboratorium', en: 'Laboratory Assistant' },
```

Kalau kamu hanya menulis satu bahasa, tulis string biasa — teks itu akan dipakai
untuk ID maupun EN. Tidak akan error.

---

## 2. Menambah pengalaman kerja

Buka bagian `experience: [ ... ]`, lalu **sisipkan objek baru di posisi paling
atas** (karena urutannya dari yang terbaru).

```js
experience: [
  // ---- TEMPEL BLOK BARU DI SINI ----
  {
    role: { id: 'Staf IT', en: 'IT Staff' },
    org: 'PT Contoh Nusantara',
    type: { id: 'Penuh Waktu', en: 'Full-time' },
    period: { id: 'Jan 2027 — sekarang', en: 'Jan 2027 — present' },
    location: 'Bengkulu, Indonesia',
    description: {
      id: 'Mengelola infrastruktur server internal dan mendukung digitalisasi arsip perusahaan.',
      en: 'Managing internal server infrastructure and supporting company archive digitalisation.',
    },
    skills: ['Linux', 'Networking', 'Technical Support'], // boleh []
    highlight: true, // true = kartu dapat border gradien beranimasi
  },
  // ---- akhir blok baru ----

  { /* item lama ... */ },
]
```

| Field         | Wajib? | Keterangan                                              |
| ------------- | ------ | ------------------------------------------------------- |
| `role`        | ya     | Nama posisi                                             |
| `org`         | ya     | Nama instansi/perusahaan                                |
| `type`        | tidak  | Paruh Waktu / Magang / Sukarelawan / dll                |
| `period`      | ya     | Rentang waktu                                           |
| `location`    | tidak  | Kota, negara                                            |
| `description` | ya     | Otomatis dipotong + tombol "Selengkapnya" jika panjang  |
| `skills`      | tidak  | Array chip keahlian; isi `[]` kalau tidak perlu         |
| `highlight`   | tidak  | `true` untuk menyorot kartu                             |

---

## 3. Menambah proyek

Tambahkan objek ke array `projects`. **Tag baru otomatis muncul sebagai tombol
filter** di atas grid — tidak perlu mendaftarkannya di mana pun.

```js
projects: [
  {
    name: 'Nama Proyek',
    period: '2027',
    org: 'Nama Organisasi / Klien',
    description: {
      id: 'Penjelasan singkat proyek dalam 1–3 kalimat.',
      en: 'A short 1–3 sentence description of the project.',
    },
    tags: ['Web Development', 'Laravel'], // tag baru = tombol filter baru
    image: '/images/projects/nama-proyek.jpg', // atau null -> pakai gradien otomatis
    links: [
      { label: { id: 'Lihat situs', en: 'Visit site' }, href: 'https://contoh.com', icon: 'external-link' },
      { label: { id: 'Kode sumber', en: 'Source code' }, href: 'https://github.com/user/repo', icon: 'github' },
    ], // isi [] kalau belum ada tautan
  },
]
```

> Kalau `image` diisi `null`, kartu otomatis memakai latar gradien + inisial
> nama proyek. Aman dipakai kalau gambar belum siap.

---

## 4. Menambah sertifikasi

```js
certifications: [
  {
    name: 'Nama Sertifikasi',       // boleh { id, en }
    issuer: 'Nama Penerbit',
    year: '2027',
    group: 'AI & Cloud',            // pengelompokan bebas, opsional
    credentialUrl: 'https://...',   // '' = tombol "Lihat kredensial" disembunyikan
  },
]
```

Ingat memperbarui angka di `stats` kalau kamu menampilkan jumlah sertifikasi:

```js
stats: [
  { value: '17+', label: { id: 'Sertifikasi Profesional', en: 'Professional Certifications' } },
]
```

---

## 5. Menambah tautan sosial

```js
social: [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/rian-firnanda/', icon: 'linkedin' },
  { label: 'GitHub',    href: 'https://github.com/Rianfirnanda',            icon: 'github' },
  { label: 'Email',     href: 'mailto:emailkamu@gmail.com',                 icon: 'mail' },
  // Tambahan baru:
  { label: 'WhatsApp',  href: 'https://wa.me/6281234567890',                icon: 'phone' },
]
```

Ikon otomatis muncul di **Hero**, **Contact**, dan data terstruktur SEO.
Kalau nama `icon` tidak dikenal, ikonnya saja yang tidak tampil — tata letak
tetap aman. Daftar nama ikon ada di [bagian 13](#13-daftar-nama-ikon-yang-tersedia).

---

## 6. Mengganti foto profil

1. Simpan foto ke folder `public/images/`, misalnya `public/images/avatar.jpg`.
   Gunakan rasio **1:1 (persegi)**, ukuran ideal 640×640 px atau lebih.
2. Ubah dua baris di `data/portfolio.js`:

```js
profile: {
  avatar: '/images/avatar.jpg',   // <- ganti path-nya di sini
  avatarAlt: {
    id: 'Foto profil Rian Firnanda Irsyadani',
    en: 'Profile photo of Rian Firnanda Irsyadani',
  },
}
```

> **Penting:** tulis path relatif dari folder `public/` dan selalu diawali `/`.
> Jangan menulis `/Portofolio/images/...` — prefix repo ditambahkan otomatis
> oleh helper `withBasePath()` saat deploy ke GitHub Pages.

Format yang didukung: `.jpg`, `.png`, `.webp`, `.svg`.

---

## 7. Mengganti gambar proyek

1. Simpan gambar ke `public/images/projects/`, ukuran ideal **800×500 px**
   (rasio 16:10).
2. Ubah field `image` pada proyek yang bersangkutan:

```js
{
  name: 'SobatKoding',
  image: '/images/projects/sobatkoding.jpg', // sebelumnya .svg
}
```

Ingin memakai gradien otomatis alih-alih gambar? Cukup tulis `image: null`.

---

## 8. Mengganti gambar preview (OG image)

Gambar ini yang muncul saat link situs dibagikan ke WhatsApp, LinkedIn, atau X.

1. Siapkan gambar **1200×630 px** (format `.png` atau `.jpg`).
2. Timpa berkas `public/images/og-image.png`, atau simpan dengan nama lain
   lalu ubah:

```js
meta: {
  ogImage: '/images/og-image.png', // <- ganti path-nya di sini
}
```

Cara cepat membuat OG image yang bagus: ambil tangkapan layar bagian Hero
situs kamu sendiri, lalu potong ke 1200×630.

---

## 9. Mengganti warna aksen

Warna aksen dipakai untuk gradien nama, blob latar, border kartu unggulan,
dan efek glow. Semuanya diatur di **`app/globals.css`**, di blok `@theme`:

```css
@theme {
  --color-accent-1: #6366f1; /* indigo */
  --color-accent-2: #a855f7; /* violet */
  --color-accent-3: #22d3ee; /* cyan   */
}
```

Contoh tema alternatif — cukup timpa tiga baris itu:

```css
/* Emerald / Teal / Lime */
--color-accent-1: #10b981;
--color-accent-2: #14b8a6;
--color-accent-3: #a3e635;

/* Rose / Fuchsia / Amber */
--color-accent-1: #f43f5e;
--color-accent-2: #d946ef;
--color-accent-3: #fbbf24;

/* Blue / Sky / Teal */
--color-accent-1: #3b82f6;
--color-accent-2: #0ea5e9;
--color-accent-3: #2dd4bf;
```

Sekalian samakan warna address bar di ponsel (`data/portfolio.js`):

```js
meta: { themeColor: '#05070f' }
```

Ingin animasi blob lebih pelan? Perbesar `--duration-blob` di `app/globals.css`
(misalnya dari `26s` menjadi `40s`).

---

## 10. Menambah / menghapus item menu

Menu navigasi dibangun dari array `nav`. Nilai `id` harus sama dengan `id`
elemen `<section>` yang dituju.

```js
nav: [
  { id: 'about',      label: { id: 'Tentang',   en: 'About' } },
  { id: 'experience', label: { id: 'Pengalaman', en: 'Experience' } },
  // hapus satu baris = item itu hilang dari menu (section-nya tetap ada)
]
```

Ingin menampilkan section **Kesukarelawanan** di menu? Tambahkan:

```js
{ id: 'volunteering', label: { id: 'Relawan', en: 'Volunteering' } },
```

---

## 11. Memasang tombol Unduh CV

1. Simpan berkas PDF ke folder `public/`, misalnya `public/cv-rian-firnanda.pdf`.
2. Ubah:

```js
profile: {
  resumeUrl: '/cv-rian-firnanda.pdf',
}
```

Isi `resumeUrl: ''` (string kosong) kalau tombol "Unduh CV" ingin disembunyikan.

---

## 12. Menyembunyikan satu section

Kosongkan array-nya. Section beserta judulnya akan hilang sepenuhnya.

```js
publications: [],   // section Publikasi hilang
volunteering: [],   // section Kesukarelawanan hilang
projects: [],       // section Proyek hilang
```

Jangan lupa hapus juga barisnya dari array `nav` agar menu tidak menunjuk ke
section yang sudah tidak ada.

---

## 13. Daftar nama ikon yang tersedia

Dipakai pada field `icon` (di `social`, `skills.groups`, dan `projects[].links`).

```
linkedin        github          mail            phone
map-pin         external-link   download        arrow-down
arrow-up        arrow-up-right  chevron-down    menu
close           copy            check           briefcase
graduation-cap  book            folder          sparkles
shield          code            palette         building
globe           award           calendar        users
heart           star            send            quote
languages       layers
```

**Menambah ikon baru:** buka `components/Icon.jsx`, lalu tambahkan satu entri
pada objek `strokeIcons` (gaya garis) atau `fillIcons` (logo solid):

```jsx
const strokeIcons = {
  // ...
  instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" />
    </>
  ),
};
```

Setelah itu langsung bisa dipakai: `{ icon: 'instagram' }`.
