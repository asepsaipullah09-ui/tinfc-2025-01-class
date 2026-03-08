import Sidebar from "@/components/Sidebar";

export default function Materi() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Materi</h1>
        <p>Daftar materi kuliah.</p>
      </main>
    </div>
  );
}

