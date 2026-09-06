import { NextResponse } from 'next/server';
import { bacaKunjungan, catatKunjungan, siap } from '@/lib/kunjungan';

/**
 * =============================================================================
 *  Penghitung kunjungan.
 * =============================================================================
 *
 *  GET   membaca angkanya saja, tanpa menambah
 *  POST  menambah satu hitungan, lalu mengembalikan angka terbarunya
 *
 *  Satu kunjungan dihitung sekali per sesi peramban. Pengaturannya ada di sisi
 *  pengunjung, lihat components/StatistikPengunjung.jsx, supaya berpindah
 *  halaman di dalam situs tidak menambah hitungan berkali kali.
 *
 *  Kalau penyimpanannya belum dipasang, keduanya menjawab { aktif: false } dan
 *  bagian statistik di footer tidak ikut tampil.
 * =============================================================================
 */
export const dynamic = 'force-dynamic';

function jawab(data) {
  return NextResponse.json(
    { aktif: true, ...data },
    // Jangan disimpan di mana pun, angkanya harus selalu yang terbaru.
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

const belumSiap = () =>
  NextResponse.json({ aktif: false }, { headers: { 'Cache-Control': 'no-store' } });

export async function GET() {
  if (!siap()) return belumSiap();
  const data = await bacaKunjungan();
  return data ? jawab(data) : belumSiap();
}

export async function POST() {
  if (!siap()) return belumSiap();
  const data = await catatKunjungan();
  return data ? jawab(data) : belumSiap();
}
