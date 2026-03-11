import AppLayout from "@/components/AppLayout";

export default function TugasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
