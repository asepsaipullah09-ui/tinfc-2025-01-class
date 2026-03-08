import Sidebar from "@/components/Sidebar";

export default function Tugas() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Tugas</h1>
        <p>Daftar tugas mahasiswa.</p>
      </main>
    </div>
  );
}