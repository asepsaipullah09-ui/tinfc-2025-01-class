import AppLayout from "@/components/AppLayout";

export default function GaleriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
