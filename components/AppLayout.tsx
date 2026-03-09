"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Sidebar always visible on desktop, toggleable on mobile
  const isOpen = true;
  
  const closeSidebar = () => {
    // No-op since we always want sidebar open on desktop
  };

  return (
    <>
      <Navbar onMenuClick={() => {}} />
      <div className="flex">
        <Sidebar isOpen={isOpen} onClose={closeSidebar} />
        <main className="flex-1 p-4 md:p-6 min-h-screen transition-all duration-300 bg-gray-50">
          {children}
        </main>
      </div>
    </>
  );
}