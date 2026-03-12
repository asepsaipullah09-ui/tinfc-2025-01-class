"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/auth";

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home (unified dashboard)
    router.replace("/");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p>Redirecting to Dashboard Utama...</p>
      </div>
    </div>
  );
}
