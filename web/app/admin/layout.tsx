import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { getCurrentUser } from "@/lib/auth/session";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  if (!user.isAdmin) redirect("/dashboard");

  return (
    <AppShell
      variant="admin"
      user={{
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      }}
    >
      {children}
    </AppShell>
  );
}
