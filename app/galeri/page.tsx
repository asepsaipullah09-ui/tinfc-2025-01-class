import Sidebar from "@/components/Sidebar";

export default function Galeri() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Galeri Kelas</h1>
        <p>Dokumentasi kegiatan kelas.</p>
      </main>
    </div>
  );
}