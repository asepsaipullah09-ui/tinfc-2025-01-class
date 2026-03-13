import { writeFile, readFile } from "fs/promises";
import path from "path";

// File persistensi di public/data.json
const DATA_FILE = path.join(process.cwd(), "public", "data.json");

// Init data dummy
let mahasiswa: any[] = [
  { id: 1, nama: "John Doe", nim: "123456", email: "john@uniku.ac.id" },
  { id: 2, nama: "Jane Smith", nim: "123457", email: "jane@uniku.ac.id" },
  { id: 3, nama: "Budi Santoso", nim: "123458", email: "budi@uniku.ac.id" },
];

let materi: any[] = [
  {
    id: 1,
    judul: "Materi Minggu 1",
    file: "minggu1.pdf",
    created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

let tugas: any[] = [
  {
    id: 1,
    nama: "John Doe",
    nim: "123456",
    judul: "Tugas Minggu 1",
    file: "tugas1.pdf",
    created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

let galeri: any[] = [
  {
    id: 1,
    title: "Foto Kelas 1",
    image: "foto1.jpg",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Foto Kelas 2",
    image: "foto2.jpg",
    created_at: new Date().toISOString(),
  },
];

let kalender: any[] = [
  {
    id: 1,
    tanggal: "2025-01-15",
    event: "Ujian Tengah Semester",
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    tanggal: "2025-01-20",
    event: "Diskusi Kelompok",
    created_at: new Date().toISOString(),
  },
];

let users: any[] = [
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
];

// Load data dari file jika ada
async function loadData() {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(data);
    mahasiswa = parsed.mahasiswa || mahasiswa;
    materi = parsed.materi || materi;
    tugas = parsed.tugas || tugas;
    galeri = parsed.galeri || galeri;
    kalender = parsed.kalender || kalender;
    users = parsed.users || users;
  } catch {}
}

// Save data ke file
async function saveData() {
  const data = { mahasiswa, materi, tugas, galeri, kalender, users };
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

await loadData(); // Load on init

export { mahasiswa, materi, tugas, galeri, kalender, users, saveData };
