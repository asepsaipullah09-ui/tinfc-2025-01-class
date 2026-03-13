import { auth } from "@/auth";
import { redirect } from "next/navigation";

import DashboardContent from "@/components/DashboardContent";
import { getDashboardData } from "@/lib/dashboard";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/");

  const data = await getDashboardData();
  return <DashboardContent data={data} />;
}
