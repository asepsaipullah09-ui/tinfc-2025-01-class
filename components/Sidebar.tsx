import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-5">
      <h2 className="text-xl font-bold mb-6">TINFC-2025-01</h2>

      <ul className="space-y-3">

        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>

        <li>
          <Link href="/materi">Materi</Link>
        </li>

        <li>
          <Link href="/tugas">Tugas</Link>
        </li>

        <li>
          <Link href="/kalender">Kalender</Link>
        </li>

        <li>
          <Link href="/galeri">Galeri</Link>
        </li>

        <li>
          <Link href="/mahasiswa">Mahasiswa</Link>
        </li>

      </ul>
    </aside>
  );
}
