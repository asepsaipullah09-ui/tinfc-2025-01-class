import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600">
          TINFC-2025-01 Class
        </h1>

        <p className="mt-4 text-gray-700">
          Portal Kelas Teknik Informatika Angkatan 2025
        </p>
      </main>
    </>
  );
}
