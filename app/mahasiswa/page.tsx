import Sidebar from "@/components/Sidebar";
import FormMahasiswa from "@/components/FormMahasiswa";

async function getMahasiswa() {
  const res = await fetch("http://localhost:3000/api/mahasiswa", {
    cache: "no-store",
  });
  return res.json();
}

export default async function MahasiswaPage() {
  const mahasiswa = await getMahasiswa();

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">
          Daftar Mahasiswa TINFC-2025-01
        </h1>

        <FormMahasiswa />

        <table className="border w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Nama</th>
              <th className="border p-2">NIM</th>
              <th className="border p-2">Email</th>
            </tr>
          </thead>

          <tbody>
            {mahasiswa.map((m: any) => (
              <tr key={m.id}>
                <td className="border p-2">{m.nama}</td>
                <td className="border p-2">{m.nim}</td>
                <td className="border p-2">{m.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

