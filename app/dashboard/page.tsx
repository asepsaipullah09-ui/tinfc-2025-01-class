import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Welcome to TINFC-2025-01 Class Dashboard</p>
      </main>
    </div>
  );
}

