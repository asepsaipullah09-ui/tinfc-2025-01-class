export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold">TINFC-2025-01 Class</h1>

      <ul className="flex gap-6">
        <li>Dashboard</li>
        <li>Materi</li>
        <li>Tugas</li>
        <li>Kalender</li>
        <li>Galeri</li>
        <li>Mahasiswa</li>
      </ul>
    </nav>
  );
}