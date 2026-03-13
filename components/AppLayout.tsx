"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useTheme } from "@/context/ThemeContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen, toggleSidebar } = useTheme();

  const closeSidebar = () => {
    toggleSidebar();
  };

  const handleMenuClick = () => {
    toggleSidebar();
  };

  return (
    <>
      <Navbar onMenuClick={handleMenuClick} />
      <div className="flex pt-20">
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        <main className="flex-1 p-4 md:p-6 md:ml-64 min-h-screen transition-all duration-300 bg-gray-50 dark:bg-slate-900">
          <div className="max-w-7xl mx-auto">
            <Breadcrumbs />
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
