import { NextResponse } from 'next/server';
import { buatBerkas } from '@/lib/github';

/**
 * =============================================================================
 *  Penerima masukan dan saran dari tamu.
 * =============================================================================
 *
 *  Satu kiriman disimpan sebagai satu berkas JSON di content/feedback/, lalu
 *  muncul di panel /admin pada menu Masukan.
 *
 *  PENYARINGAN
 *  Formulir di internet selalu didatangi robot pengirim iklan. Empat lapis
 *  penyaring sederhana di bawah cukup untuk menahan hampir semuanya tanpa
 *  merepotkan tamu sungguhan dengan teka teki gambar:
 *
 *    1. kolom umpan     kolom tersembunyi yang hanya diisi robot
 *    2. jeda mengetik   kiriman instan ditolak, manusia butuh waktu menulis
 *    3. batas panjang   pesan raksasa ditolak
 *    4. jeda antar kirim satu pengirim dibatasi beberapa kiriman per jam
 * =============================================================================
 */
export const dynamic = 'force-dynamic';

const BATAS = { pesan: 3000, nama: 80, kontak: 120 };
const PESAN_MINIMAL = 5;
const JEDA_MENGETIK_MS = 2500;

/**
 * Catatan kiriman terakhir per pengirim.
 *
 * Disimpan di memori, jadi ikut hilang saat server berganti. Itu diterima
 * dengan sadar: ini lapis tambahan, bukan satu satunya penjaga.
 */
const riwayat = new Map();
const JENDELA_MS = 60 * 60 * 1000;
const MAKS_PER_JENDELA = 5;

function terlaluSering(kunci) {
  const sekarang = Date.now();
  const sebelumnya = (riwayat.get(kunci) ?? []).filter((waktu) => sekarang - waktu < JENDELA_MS);

  if (sebelumnya.length >= MAKS_PER_JENDELA) return true;

  sebelumnya.push(sekarang);
  riwayat.set(kunci, sebelumnya);

  // Bersihkan catatan lama supaya memorinya tidak menumpuk.
  if (riwayat.size > 500) {
    for (const [k, v] of riwayat) {
      if (v.every((waktu) => sekarang - waktu >= JENDELA_MS)) riwayat.delete(k);
    }
  }

  return false;
}

/** Merapikan teks kiriman: buang spasi berlebih dan potong sesuai batas. */
function rapikan(nilai, batas) {
  if (typeof nilai !== 'string') return '';
  return nilai.replace(/\r\n/g, '\n').trim().slice(0, batas);
}

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, pesan: 'Kiriman tidak terbaca.' }, { status: 400 });
  }

  // Lapis 1: kolom umpan. Tamu sungguhan tidak pernah melihat kolom ini.
  if (rapikan(data.situs, 200) !== '') {
    // Dijawab seolah berhasil supaya robot tidak belajar dari penolakan.
    return NextResponse.json({ ok: true });
  }

  // Lapis 2: jeda mengetik, dihitung di sisi pengunjung sebagai selisih waktu
  // sehingga jam perangkat yang meleset tidak ikut mempengaruhi.
  const jeda = Number(data.jeda);
  if (!Number.isFinite(jeda) || jeda < JEDA_MENGETIK_MS) {
    return NextResponse.json({ ok: true });
  }

  const pesan = rapikan(data.pesan, BATAS.pesan);
  const nama = rapikan(data.nama, BATAS.nama);
  const kontak = rapikan(data.kontak, BATAS.kontak);

  if (pesan.length < PESAN_MINIMAL) {
    return NextResponse.json(
      { ok: false, pesan: 'Masukannya masih terlalu pendek.' },
      { status: 400 }
    );
  }

  // Lapis 4: batas jumlah kiriman per pengirim.
  const pengirim =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'tak-dikenal';

  if (terlaluSering(pengirim)) {
    return NextResponse.json(
      { ok: false, pesan: 'Kamu sudah mengirim beberapa masukan. Coba lagi nanti ya.' },
      { status: 429 }
    );
  }

  const waktu = new Date();
  // Nama berkas diawali waktu supaya urut, dan diakhiri angka acak supaya dua
  // kiriman pada detik yang sama tidak berebut nama yang sama.
  const berkas = `${waktu.toISOString().replace(/[:.]/g, '-')}-${Math.random().toString(36).slice(2, 8)}`;

  const hasil = await buatBerkas({
    path: `content/feedback/${berkas}.json`,
    pesan: 'masukan: kiriman baru dari tamu lewat situs',
    isi: {
      waktu: waktu.toISOString(),
      nama: nama || '',
      kontak: kontak || '',
      pesan,
      dibaca: false,
      catatan: '',
    },
  });

  if (!hasil.ok) {
    // Alasan teknisnya tidak diperlihatkan ke pengunjung.
    console.error('[masukan] gagal menyimpan:', hasil.detail);
    return NextResponse.json(
      { ok: false, pesan: 'Maaf, masukannya belum bisa tersimpan. Coba lagi sebentar lagi.' },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
