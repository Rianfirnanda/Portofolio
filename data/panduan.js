/**
 * =============================================================================
 *  data/panduan.js  |  ISI MODUL PANDUAN PENGGUNAAN
 * =============================================================================
 *
 *  Satu berkas ini jadi dua keluaran:
 *
 *    /panduan/                    halaman web, bisa dibuka dari mana saja
 *    /panduan-penggunaan.pdf      berkas PDF, bisa disimpan dan dicetak
 *
 *  Ditulis sebagai data, bukan sebagai HTML, supaya keduanya tidak pernah
 *  berbeda isi. Menambah satu langkah di sini membuat halaman dan PDF-nya
 *  ikut berubah bersamaan.
 *
 *  -----------------------------------------------------------------------------
 *  UNTUK SIAPA PANDUAN INI DITULIS
 *  -----------------------------------------------------------------------------
 *  Untuk orang yang belum pernah menyentuh panel mana pun. Itu sebabnya:
 *
 *    tidak ada istilah teknis yang tidak dijelaskan lebih dulu
 *    tiap langkah menyebut nama tombol persis seperti yang tertulis di layar
 *    tiap bagian dimulai dari "apa gunanya", baru "bagaimana caranya"
 *    hal yang sering bikin panik diberi penjelasan kenapa itu wajar
 *
 *  Yang sudah terbiasa boleh melompati bagian mana pun. Itu sebabnya tiap
 *  bagian berdiri sendiri dan tidak mengandalkan bagian sebelumnya.
 *
 *  -----------------------------------------------------------------------------
 *  BENTUK BLOKNYA
 *  -----------------------------------------------------------------------------
 *    { t: 'p', teks }                    satu paragraf
 *    { t: 'langkah', butir: [] }         langkah bernomor, ada urutannya
 *    { t: 'butir', butir: [] }           daftar bertitik, tidak ada urutannya
 *    { t: 'tabel', kepala: [], baris: [] }
 *    { t: 'catatan', judul, teks }       kotak peringatan atau pengingat
 *
 *  Kata di dalam *bintang* ditebalkan. Itu satu satunya penataan yang ada,
 *  dan sengaja cuma satu supaya penulis PDF-nya tetap sederhana.
 * =============================================================================
 */

export const panduan = {
  judul: 'Panduan Penggunaan',
  anak: 'Cara mengurus situs portofolio ini, dari nol',

  pembuka: [
    'Panduan ini menjelaskan seluruh isi situs dan panelnya, satu per satu, dengan bahasa sehari hari. Tidak ada bagian yang mengandaikan kamu pernah memakai panel konten sebelumnya.',
    'Kamu tidak perlu membacanya dari awal sampai akhir. Cari bagian yang kamu butuhkan di daftar isi, kerjakan langkahnya, lalu tutup lagi.',
  ],

  bagian: [
    /* ===================================================================== */
    {
      judul: 'Tiga alamat yang perlu kamu ingat',
      isi: [
        {
          t: 'p',
          teks: 'Seluruh urusan situs ini berputar di tiga alamat saja. Simpan ketiganya di penanda peramban.',
        },
        {
          t: 'tabel',
          kepala: ['Alamat', 'Apa isinya'],
          baris: [
            ['Situsmu', 'Yang dilihat orang lain. Alamat inilah yang kamu bagikan.'],
            ['Alamat situsmu + /admin', 'Panel tempat kamu mengganti isi situs. Hanya kamu yang bisa masuk.'],
            ['Repositori di GitHub', 'Gudang seluruh berkas situs. Jarang perlu dibuka, tapi di situlah semuanya tersimpan.'],
          ],
        },
        {
          t: 'catatan',
          judul: 'Kenapa panelnya tidak punya alamat sendiri',
          teks: 'Panel menempel di situsmu, bukan di layanan lain. Jadi selama situsmu hidup, panelnya hidup, dan tidak ada langganan tambahan yang perlu dibayar.',
        },
      ],
    },

    /* ===================================================================== */
    {
      judul: 'Bagaimana perubahanmu sampai ke situs',
      isi: [
        {
          t: 'p',
          teks: 'Ini bagian yang paling sering bikin bingung di hari pertama, jadi dijelaskan lebih dulu sebelum kamu menyentuh apa pun.',
        },
        {
          t: 'p',
          teks: 'Waktu kamu menekan *Simpan* di panel, isinya tidak langsung mendarat di situs. Yang terjadi berurutan seperti ini:',
        },
        {
          t: 'langkah',
          butir: [
            'Panel menyimpan perubahanmu ke repositori di GitHub.',
            'Vercel, layanan yang menyajikan situsmu, melihat ada yang berubah lalu membangun ulang situsnya.',
            'Satu sampai dua menit kemudian, versi barunya tayang.',
          ],
        },
        {
          t: 'p',
          teks: 'Jadi kalau kamu menyimpan lalu langsung membuka situs dan belum ada yang berubah, itu bukan berarti gagal. Tunggu dua menit, lalu muat ulang halamannya.',
        },
        {
          t: 'catatan',
          judul: 'Kalau sudah lewat lima menit dan tetap sama',
          teks: 'Muat ulang paksa dulu: Ctrl+Shift+R di Windows, atau Cmd+Shift+R di Mac. Peramban sering menyimpan salinan halaman lama, dan itu yang kamu lihat.',
        },
      ],
    },

    /* ===================================================================== */
    {
      judul: 'Masuk ke panel',
      isi: [
        {
          t: 'langkah',
          butir: [
            'Buka alamat situsmu, lalu tambahkan /admin di belakangnya.',
            'Klik tombol masuk dengan GitHub.',
            'Kalau GitHub meminta izin, setujui. Ini cuma diminta sekali.',
            'Panel terbuka. Di kiri ada daftar menu, di kanan isian yang bisa kamu ubah.',
          ],
        },
        {
          t: 'p',
          teks: 'Kamu bisa masuk dari ponsel juga. Tampilannya menyesuaikan layar kecil, meski mengetik tulisan panjang tetap lebih enak di komputer.',
        },
        {
          t: 'catatan',
          judul: 'Siapa saja yang bisa masuk',
          teks: 'Hanya akun GitHub yang punya akses tulis ke repositori situs ini. Orang lain yang membuka /admin akan melihat layar masuk dan berhenti di situ.',
        },
      ],
    },

    /* ===================================================================== */
    {
      judul: 'Peta panel: empat menu, itu saja',
      isi: [
        {
          t: 'p',
          teks: 'Isi panel dibagi empat. Kalau kamu tahu apa isi keempatnya, kamu tidak akan pernah tersesat mencari satu isian.',
        },
        {
          t: 'tabel',
          kepala: ['Menu', 'Isinya'],
          baris: [
            ['Tulisan Blog', 'Semua tulisan di blog. Satu tulisan satu entri.'],
            [
              'Isi Halaman',
              'Semua yang tampil di halaman depan: profil, pengalaman, proyek, publikasi, keahlian, sertifikasi, pendidikan, kegiatan, galeri, kontak, media sosial, dan daftar lagu.',
            ],
            [
              'Pengaturan Situs',
              'Hal yang mengatur situsnya, bukan isinya: judul tiap bagian, nama situs dan SEO, tampilan, tulisan antarmuka, dan formulir masukan.',
            ],
            ['Masukan Masuk', 'Pesan yang dikirim pengunjung lewat formulir masukan. Hanya bisa dibaca dan dihapus.'],
          ],
        },
        {
          t: 'p',
          teks: 'Tiap isian punya keterangan kecil di bawahnya. Keterangan itu bukan basa basi, di situ biasanya tertulis batas ukuran, contoh penulisan, atau akibat kalau dikosongkan. Baca sekali, dan kamu tidak perlu menebak nebak.',
        },
      ],
    },

    /* ===================================================================== */
    {
      judul: 'Aturan yang berlaku di semua isian',
      isi: [
        {
          t: 'p',
          teks: 'Sebelum masuk ke menu satu per satu, ada empat kebiasaan yang berlaku di mana mana. Mengetahuinya sekali menghemat banyak waktu.',
        },
        {
          t: 'butir',
          butir: [
            '*Dua bahasa.* Hampir tiap isian punya kolom Bahasa Indonesia dan English. Kolom Inggris boleh dikosongkan; kalau kosong, versi Indonesianya yang dipakai untuk pengunjung berbahasa Inggris.',
            '*Kosong berarti sembunyi.* Isian yang kamu kosongkan tidak tampil sebagai ruang kosong, melainkan hilang sama sekali. Bahkan satu bagian penuh ikut hilang kalau seluruh isinya dihapus.',
            '*Urutan bisa digeser.* Daftar seperti pengalaman dan proyek punya pegangan untuk menyeret entri naik atau turun. Urutan di panel sama dengan urutan di situs.',
            '*Tanda hubung berarti kosong.* Isian yang cuma berisi tanda hubung diperlakukan sebagai kosong, jadi kamu tidak perlu takut ada tanda hubung nyasar di CV.',
          ],
        },
      ],
    },

    /* ===================================================================== */
    {
      judul: 'Mengganti profil dan foto',
      isi: [
        {
          t: 'p',
          teks: 'Menu *Isi Halaman*, lalu *Profil Diri*. Di sinilah nama, jabatan, kalimat pembuka, dan foto sampul diatur.',
        },
        {
          t: 'tabel',
          kepala: ['Isian', 'Muncul di mana'],
          baris: [
            ['Nama lengkap', 'Nama besar di sampul, judul tab peramban, CV, dan portofolio'],
            ['Nama pendek', 'Di sebelah foto kecil pada menu atas'],
            ['Jabatan', 'Kalimat di bawah nama'],
            ['Kalimat pegangan', 'Kalimat miring bergaris di sampul'],
            ['Status ketersediaan', 'Baris kecil paling atas, lengkap dengan titik berkedip'],
            ['Foto profil', 'Foto besar di sampul, ikon situs, dan kartu pratinjau saat dibagikan'],
            ['Kartu pada foto', 'Kotak kecil menempel di bawah foto sampul'],
          ],
        },
        {
          t: 'catatan',
          judul: 'Soal foto',
          teks: 'Pakai foto persegi, minimal 800 kali 800 piksel, wajah di tengah. Foto yang terlalu memanjang akan terpotong di sisi kiri dan kanan.',
        },
        {
          t: 'p',
          teks: 'Mengganti foto profil sekaligus mengganti ikon situs dan gambar di halaman masuk panel. Ketiganya dibuat ulang otomatis tiap kali situs dibangun, jadi tidak ada yang perlu kamu kerjakan dua kali.',
        },
      ],
    },

    /* ===================================================================== */
    {
      judul: 'Menambah pengalaman, proyek, dan daftar sejenis',
      isi: [
        {
          t: 'p',
          teks: 'Pengalaman, proyek, publikasi, sertifikasi, pendidikan, dan kegiatan semuanya bekerja dengan cara yang sama persis. Pelajari sekali, berlaku untuk keenamnya.',
        },
        {
          t: 'langkah',
          butir: [
            'Buka menu *Isi Halaman*, pilih daftar yang kamu maksud.',
            'Klik tombol tambah di bawah daftar. Entri baru muncul di paling bawah.',
            'Isi kolomnya. Yang bertanda wajib harus diisi, sisanya boleh dilewati.',
            'Seret entri baru itu ke posisi yang kamu mau.',
            'Klik *Simpan* di kanan atas.',
          ],
        },
        {
          t: 'p',
          teks: 'Tiap entri pengalaman dan pendidikan boleh diberi foto dokumentasi dan berkas untuk diunduh. Fotonya tampil di kartu dan bisa diklik untuk diperbesar. Berkasnya muncul sebagai tombol unduh di bawah kartu, cocok untuk surat keputusan, sertifikat pindaian, atau transkrip.',
        },
        {
          t: 'catatan',
          judul: 'Foto dokumentasi tidak ikut ke CV',
          teks: 'Ini disengaja. CV yang dibaca mesin pelacak lamaran harus bebas gambar, jadi foto dan berkas unduhan hanya tampil di situs, tidak di CV.',
        },
      ],
    },

    /* ===================================================================== */
    {
      judul: 'Menulis tulisan blog',
      isi: [
        {
          t: 'langkah',
          butir: [
            'Buka menu *Tulisan Blog*, klik tombol tambah.',
            'Isi judul. Alamat tulisannya terbentuk sendiri dari judul itu.',
            'Isi tanggal terbit dan topik.',
            'Tulis isinya di kotak besar. Bilah alat di atasnya menyediakan tebal, miring, judul, daftar, tautan, dan tombol sisip media.',
            'Kalau belum siap terbit, matikan sakelar terbit. Tulisan tersimpan tapi tidak terlihat pengunjung.',
            'Klik *Simpan*.',
          ],
        },
        {
          t: 'p',
          teks: 'Di bilah alat ada empat tombol sisip: Gambar, Audio, Video, dan Dokumen. Semuanya bekerja sama: klik, pilih berkas, selesai. Situs yang memilihkan tampilan pemutarnya berdasarkan jenis berkasnya.',
        },
        {
          t: 'p',
          teks: 'Tiap tulisan juga boleh punya satu lagu pendamping yang diputar saat orang membaca. Isiannya ada di bawah kotak tulisan: pilih berkas lagunya, lalu tentukan mulai menit ke berapa dan berhenti di menit ke berapa. Formatnya bebas, mp3 paling aman karena bisa diputar di semua perangkat.',
        },
        {
          t: 'catatan',
          judul: 'Kenapa lagunya kadang tidak langsung berbunyi',
          teks: 'Peramban modern melarang suara menyala sendiri sebelum pengunjung menyentuh halaman. Jadi lagunya menunggu sentuhan pertama, entah klik, ketukan layar, atau tombol keyboard. Ini perilaku peramban, bukan kerusakan situs.',
        },
        {
          t: 'catatan',
          judul: 'Soal hak cipta lagu',
          teks: 'Pakai lagu yang memang boleh kamu sebarkan: karya sendiri, musik berlisensi bebas, atau yang sudah kamu beli izinnya. Situs portofolio itu etalase profesional, dan lagu bajakan di dalamnya merugikan kesan yang justru ingin kamu bangun.',
        },
      ],
    },

    /* ===================================================================== */
    {
      judul: 'Mengunggah berkas',
      isi: [
        {
          t: 'p',
          teks: 'Tiap isian berkas punya tombol unggah. Berkas yang kamu unggah masuk ke satu tempat dan ikut tersimpan bersama situsnya, jadi tidak bergantung pada layanan penyimpanan lain.',
        },
        {
          t: 'tabel',
          kepala: ['Hal', 'Nilainya'],
          baris: [
            ['Ukuran satu berkas', 'Paling besar 40 MB'],
            ['Gambar', 'jpg, png, webp, avif, gif'],
            ['Video', 'mp4, webm, mov, ogv, m4v'],
            ['Musik', 'mp3, m4a, aac, wav, flac, ogg, oga, opus, weba'],
            ['Dokumen', 'pdf'],
          ],
        },
        {
          t: 'catatan',
          judul: 'Kecilkan foto sebelum diunggah',
          teks: 'Foto langsung dari kamera ponsel bisa 5 MB lebih. Situs memang mengecilkannya otomatis saat ditampilkan, tapi berkas aslinya tetap ikut tersimpan selamanya. Mengecilkannya dulu membuat repositori tetap ramping.',
        },
      ],
    },

    /* ===================================================================== */
    {
      judul: 'Mengganti tampilan situs',
      isi: [
        {
          t: 'p',
          teks: 'Menu *Pengaturan Situs*, lalu *Nama Situs dan SEO*, lalu bagian *Tampilan*. Isinya dibagi dua tingkat, dan kamu boleh berhenti di tingkat pertama.',
        },
        {
          t: 'p',
          teks: '*Tingkat pertama: tema siap pakai.* Satu menu berisi enam tema yang warnanya sudah dicocokkan satu sama lain. Pilih satu, simpan, selesai. Seluruh situs berganti rupa.',
        },
        {
          t: 'tabel',
          kepala: ['Tema', 'Kesannya'],
          baris: [
            ['Biru Tenang', 'Bawaan situs ini. Netral dan aman untuk segala keperluan.'],
            ['Tinta Hitam', 'Nyaris tanpa warna. Paling aman kalau situsnya dipakai melamar kerja.'],
            ['Hijau Hutan', 'Tenang dan hangat.'],
            ['Tanah Terakota', 'Hangat dan ramah, sudutnya lebih bulat.'],
            ['Ungu Senja', 'Lebih berani, latarnya lebih ramai.'],
            ['Malam Emas', 'Tegas dan mewah, sudutnya paling kotak.'],
          ],
        },
        {
          t: 'p',
          teks: '*Tingkat kedua: atur sendiri.* Kolom kolom di bawah menu tema. Semuanya boleh dikosongkan, dan yang kosong mengikuti tema yang kamu pilih di atas. Isi satu kolom saja kalau yang ingin kamu ubah memang cuma satu hal.',
        },
        {
          t: 'tabel',
          kepala: ['Kolom', 'Yang diubah'],
          baris: [
            ['Warna utama, kedua, ketiga', 'Tombol, sorotan kartu, dan lapisan warna di latar'],
            ['Warna tautan terang dan gelap', 'Warna tautan. Dipisah karena yang terbaca di atas putih belum tentu terbaca di atas hitam.'],
            ['Keramaian latar', 'Empat lapisan hiasan latar sekaligus, dari polos sampai ramai'],
            ['Kelengkungan sudut', 'Sudut kartu dan sudut tombol sekaligus'],
            ['Tebal buram kaca', 'Seberapa buram permukaan kaca. Nol berarti bening.'],
            ['Kecepatan gerak latar', 'Berapa detik untuk satu putaran penuh. Makin besar makin tenang.'],
            ['Gaya judul besar', 'Satu warna, atau bergradien'],
            ['Huruf judul', 'Berkait seperti huruf di buku, atau polos seperti isi situs'],
          ],
        },
        {
          t: 'catatan',
          judul: 'Kalau hasilnya tidak kamu suka',
          teks: 'Kosongkan lagi kolom yang kamu isi, lalu simpan. Situs kembali ke rupa temanya. Tidak ada perubahan tampilan yang tidak bisa dibatalkan.',
        },
        {
          t: 'p',
          teks: 'Di menu yang sama ada juga sederet sakelar untuk menyalakan dan mematikan sentuhan interaktif: sorotan kursor di kartu, bilah kemajuan gulir, angka yang menghitung naik, tombol kembali ke atas, tombol berbagi, strip keahlian berjalan, pembesar gambar, pencarian cepat, dan tautan salin di judul bagian. Matikan yang tidak kamu perlukan; situsnya tetap utuh.',
        },
      ],
    },

    /* ===================================================================== */
    {
      judul: 'CV dan portofolio: empat berkas, dua tujuan',
      isi: [
        {
          t: 'p',
          teks: 'Situs ini menyediakan dua dokumen, dan masing masing bisa diunduh dalam dua bentuk. Keduanya halaman tersendiri, bukan hasil mencetak halaman depan apa adanya.',
        },
        {
          t: 'tabel',
          kepala: ['Dokumen', 'Alamat', 'Untuk apa'],
          baris: [
            ['Portofolio', '/cetak/portofolio/', 'Dikirim ke orang, dilampirkan di surel, dicetak. Berfoto dan berwarna.'],
            ['CV', '/cetak/cv/', 'Dilamarkan ke lowongan kerja. Satu kolom, polos, tanpa gambar.'],
          ],
        },
        {
          t: 'p',
          teks: 'Di bilah atas tiap halaman ada dua tombol simpan:',
        },
        {
          t: 'butir',
          butir: [
            '*Simpan sebagai PDF.* Rupanya terkunci, sama persis di layar siapa pun. Pakai ini kalau berkasnya cuma akan dibaca.',
            '*Unduh Word.* Berkas .docx yang bisa disunting. Pakai ini kalau sistem lamaran memintanya, dan sebagian memang hanya menerima .docx.',
          ],
        },
        {
          t: 'p',
          teks: 'Berkas Word disusun di perambanmu sendiri saat tombolnya ditekan. Tidak ada yang diunggah ke mana pun, dan tidak ada layanan luar yang terlibat.',
        },
        {
          t: 'p',
          teks: 'Ada juga sakelar bahasa di bilah yang sama. Dokumennya ikut bahasa yang sedang aktif, jadi kamu bisa menyiapkan CV berbahasa Inggris tanpa kembali ke halaman depan.',
        },
        {
          t: 'catatan',
          judul: 'Kenapa CV-nya terlihat polos',
          teks: 'Sebagian besar lamaran dibaca mesin pelacak lamaran lebih dulu, bukan manusia. Mesin itu gampang tersandung kolom, tabel, ikon, dan gambar. CV di sini satu kolom, memakai huruf Arial, tanpa tabel, tanpa foto, dan judul bagiannya baku. Itu bukan kemalasan desain, itu syarat supaya isinya terbaca.',
        },
        {
          t: 'p',
          teks: 'Isi kedua dokumen diambil dari data yang sama dengan situs. Memperbarui satu pengalaman lewat panel membuat situs, PDF, dan Word ikut berubah sekaligus.',
        },
      ],
    },

    /* ===================================================================== */
    {
      judul: 'Yang bisa dilakukan pengunjung',
      isi: [
        {
          t: 'p',
          teks: 'Berguna diketahui, karena sebagian orang akan bertanya kepadamu soal ini.',
        },
        {
          t: 'tabel',
          kepala: ['Fitur', 'Caranya'],
          baris: [
            ['Ganti bahasa', 'Tombol ID/EN di menu atas'],
            ['Mode terang dan gelap', 'Tombol bulan atau matahari di menu atas'],
            ['Pencarian cepat', 'Tekan Ctrl+K, atau Cmd+K di Mac. Bisa mencari bagian, proyek, dan tulisan.'],
            ['Memperbesar foto', 'Klik fotonya. Bisa digeser kiri kanan, ditutup dengan Esc.'],
            ['Memutar musik', 'Pemutar kecil di pojok kiri bawah. Tidak pernah berbunyi sendiri.'],
            ['Membagikan tulisan', 'Tombol berbagi di bawah tiap tulisan blog'],
            ['Menyalin tautan ke satu bagian', 'Ikon rantai yang muncul di samping judul bagian saat kursor mendekat'],
            ['Mengunduh CV', 'Tombol Unduh CV di sampul, atau tautan di bagian bawah halaman'],
          ],
        },
      ],
    },

    /* ===================================================================== */
    {
      judul: 'Menerima masukan dari tamu',
      isi: [
        {
          t: 'p',
          teks: 'Ada formulir di halaman depan tempat pengunjung menulis masukan, boleh dengan nama atau tanpa nama. Kirimannya muncul di panel, menu *Masukan Masuk*.',
        },
        {
          t: 'p',
          teks: 'Masukan yang masuk tidak pernah langsung tampil di situs. Hanya kamu yang membacanya, dan kamu bisa menghapus yang tidak perlu.',
        },
        {
          t: 'p',
          teks: 'Fiturnya bisa dimatikan sepenuhnya lewat menu *Pengaturan Situs*, bagian formulir masukan. Kalau dimatikan, seluruh bagian itu hilang dari halaman depan.',
        },
        {
          t: 'catatan',
          judul: 'Jaga repositorinya tetap privat',
          teks: 'Masukan dari tamu tersimpan sebagai berkas di dalam repositori. Kalau repositorinya publik, siapa pun bisa membacanya. Pastikan repositori situs ini disetel privat di GitHub.',
        },
      ],
    },

    /* ===================================================================== */
    {
      judul: 'Kalau ada yang tidak beres',
      isi: [
        {
          t: 'tabel',
          kepala: ['Keluhan', 'Kemungkinan sebab dan jalan keluarnya'],
          baris: [
            [
              'Sudah disimpan tapi situs belum berubah',
              'Tunggu dua menit, lalu muat ulang paksa dengan Ctrl+Shift+R. Situs dibangun ulang dulu sebelum tayang.',
            ],
            [
              'Panel tidak mau terbuka, layarnya diam saja',
              'Buka ulang halamannya. Kalau tetap, coba peramban lain atau jendela penyamaran, karena pemblokir iklan kadang menahan panel.',
            ],
            [
              'Gagal masuk lewat GitHub',
              'Pastikan kamu masuk ke akun GitHub yang punya akses ke repositori situs ini. Keluar dulu dari GitHub, lalu ulangi.',
            ],
            [
              'Unggahan berkas gagal terus',
              'Periksa ukurannya, batasnya 40 MB. Berkas video dan hasil pindaian paling sering melewati batas ini.',
            ],
            [
              'Satu bagian hilang dari halaman depan',
              'Bagian yang seluruh isinya kosong memang menyembunyikan diri. Isi minimal satu entri dan dia muncul lagi.',
            ],
            [
              'Nomor bagian melompat, misalnya 03 lalu 05',
              'Ada bagian di antaranya yang kosong tapi masih tercantum di menu. Buang dari menu atau isi kembali.',
            ],
            [
              'Tulisan sudah dibuat tapi tidak muncul di blog',
              'Periksa sakelar terbitnya, dan periksa tanggalnya tidak diisi tanggal yang belum tiba.',
            ],
            [
              'Tercetak tulisan aneh di CV',
              'Periksa isian yang bersangkutan di panel. Isian yang kosong atau cuma berisi tanda hubung akan dilewati, jadi kosongkan saja isian yang tidak terpakai.',
            ],
          ],
        },
        {
          t: 'p',
          teks: 'Kalau semuanya sudah dicoba dan tetap bermasalah, isi situs tetap aman. Semua tersimpan sebagai berkas biasa di dalam repositori, dan bisa diubah langsung dari GitHub tanpa lewat panel sama sekali.',
        },
      ],
    },

    /* ===================================================================== */
    {
      judul: 'Perawatan berkala',
      isi: [
        {
          t: 'p',
          teks: 'Tidak banyak, tapi tiga hal ini pantas diperiksa sesekali.',
        },
        {
          t: 'butir',
          butir: [
            '*Tiap beberapa bulan:* baca ulang ringkasan diri dan daftar pengalaman. Bagian ini yang paling cepat basi.',
            '*Tiap kali menang atau selesai sesuatu:* tambahkan entri barunya selagi ingat. Menambah satu entri butuh dua menit, mengingat kembali kejadian setahun lalu butuh satu sore.',
            '*Tiap kali mengganti nomor telepon atau surel:* perbarui di menu Kontak. Isian itu ikut tercetak di CV, dan CV dengan nomor lama sama saja dengan tanpa nomor.',
          ],
        },
        {
          t: 'catatan',
          judul: 'Sebelum melamar kerja',
          teks: 'Buka /cetak/cv/, baca sekali dari atas sampai bawah, lalu unduh ulang. Jangan pakai berkas lama yang tersimpan di komputer, karena isinya belum tentu sama dengan yang sekarang.',
        },
      ],
    },
  ],
};
