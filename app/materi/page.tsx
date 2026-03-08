import Sidebar from "@/components/Sidebar";
import FormMateri from "@/components/FormMateri";

async function getMateri() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/materi`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching materi:", error);
    return [];
  }
}

export default async function Materi() {
  const materiList = await getMateri();

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Materi Kuliah</h1>
        
        <FormMateri />

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Daftar Materi</h2>
          {materiList.length === 0 ? (
            <p className="text-gray-500">Belum ada materi.</p>
          ) : (
            <ul className="space-y-2">
              {materiList.map((materi: any) => (
                <li key={materi.id} className="border p-3 rounded hover:bg-gray-50">
                  <a 
                    href={`/uploads/${materi.file}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {materi.judul}
                  </a>
                  <p className="text-sm text-gray-500">
                    Upload: {new Date(materi.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}