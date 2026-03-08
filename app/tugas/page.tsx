import FormTugas from "@/components/FormTugas";

async function getTugas() {
  const res = await fetch("http://localhost:3000/api/tugas", {
    cache: "no-store",
  });

  return res.json();
}

export default async function TugasPage() {
  const tugas = await getTugas();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Upload Tugas Mahasiswa
      </h1>

      <FormTugas />

      <table className="border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nama</th>
            <th className="border p-2">NIM</th>
            <th className="border p-2">Judul</th>
            <th className="border p-2">File</th>
          </tr>
        </thead>

        <tbody>
          {tugas.map((t: any) => (
            <tr key={t.id}>
              <td className="border p-2">{t.nama}</td>
              <td className="border p-2">{t.nim}</td>
              <td className="border p-2">{t.judul}</td>
              <td className="border p-2">
                <a
                  href={`/uploads/tugas/${t.file}`}
                  target="_blank"
                  className="text-blue-600"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
