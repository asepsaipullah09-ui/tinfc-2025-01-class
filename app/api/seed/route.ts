import { NextResponse } from "next/server";
import {
  mahasiswa,
  materi,
  tugas,
  galeri,
  kalender,
  users,
  saveData,
} from "@/lib/mockData";

export async function GET() {
  // Reset to initial data
  mahasiswa.length = 0;
  materi.length = 0;
  tugas.length = 0;
  galeri.length = 0;
  kalender.length = 0;
  users.length = 0;

  // Add initial data
  mahasiswa.push(
    { id: 1, nama: "John Doe", nim: "123456", email: "john@uniku.ac.id" },
    { id: 2, nama: "Jane Smith", nim: "123457", email: "jane@uniku.ac.id" },
  );
  materi.push({
    id: 1,
    judul: "Materi Minggu 1",
    file: "minggu1.pdf",
    created_at: new Date().toISOString(),
  });
  tugas.push({
    id: 1,
    nama: "John Doe",
    nim: "123456",
    judul: "Tugas Minggu 1",
    file: "tugas1.pdf",
    created_at: new Date().toISOString(),
  });
  galeri.push({
    id: 1,
    title: "Foto Kelas",
    image: "foto1.jpg",
    created_at: new Date().toISOString(),
  });
  kalender.push({
    id: 1,
    tanggal: "2025-01-15",
    event: "Ujian Tengah Semester",
    created_at: new Date().toISOString(),
  });
  users.push(
    {
      id: 1,
      username: "admin",
      password: "admin123",
      nama: "Admin",
      role: "admin",
      email: "admin@uniku.ac.id",
    },
    {
      id: 2,
      username: "mahasiswa1",
      password: "pass123",
      nama: "Mahasiswa 1",
      role: "mahasiswa",
      email: "m1@uniku.ac.id",
    },
  );

  await saveData();

  return NextResponse.json({ message: "Data berhasil di-seed (mock mode)" });
}
