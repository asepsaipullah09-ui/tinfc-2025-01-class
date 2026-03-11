import AppLayout from "@/components/AppLayout";

export default function MateriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
}
