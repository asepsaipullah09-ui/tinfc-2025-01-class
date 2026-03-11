import AppLayout from "@/components/AppLayout";

export default function KalenderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
