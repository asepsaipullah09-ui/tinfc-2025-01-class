import Sidebar from "@/components/Sidebar";

export default function Kalender() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Kalender Akademik</h1>
        <p>Jadwal kegiatan kelas.</p>
      </main>
    </div>
  );
}

