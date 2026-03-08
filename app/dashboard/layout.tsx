import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="p-6 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}