import FormMateri from "@/components/FormMateri";

async function getMateri() {
  const res = await fetch("http://localhost:3000/api/materi", {
    cache: "no-store",
  });

  return res.json();
}

export default async function MateriPage() {

  const materi = await getMateri();

  return (
    <div>

      <h1 className="text-2xl font-bold mb-4">
        Materi Kuliah
      </h1>

      <FormMateri />

      <table className="border w-full">

        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Judul</th>
            <th className="border p-2">File</th>
          </tr>
        </thead>

        <tbody>
          {materi.map((m:any)=>(
            <tr key={m.id}>
              <td className="border p-2">{m.judul}</td>

              <td className="border p-2">
                <a
                  href={`/uploads/${m.file}`}
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