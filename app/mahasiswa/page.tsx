import Sidebar from "@/components/Sidebar";

export default function Mahasiswa() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Mahasiswa</h1>
        <p>Daftar mahasiswa kelas.</p>
      </main>
    </div>
  );
}

