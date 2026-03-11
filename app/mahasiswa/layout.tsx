import AppLayout from "@/components/AppLayout";

export default function MahasiswaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
