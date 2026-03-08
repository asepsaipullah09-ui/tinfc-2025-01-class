async function getDashboard() {
  const res = await fetch("http://localhost:3000/api/dashboard", {
    cache: "no-store",
  });

  return res.json();
}

export default async function DashboardPage() {
  const data = await getDashboard();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Dashboard TINFC-2025-01
      </h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-500 text-white p-6 rounded">
          <h2 className="text-lg">Total Mahasiswa</h2>
          <p className="text-3xl font-bold">
            {data.totalMahasiswa}
          </p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded">
          <h2 className="text-lg">Total Materi</h2>
          <p className="text-3xl font-bold">0</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded">
          <h2 className="text-lg">Total Tugas</h2>
          <p className="text-3xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}