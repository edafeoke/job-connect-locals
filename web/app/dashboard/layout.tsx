import { redirect } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { getCurrentUser } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  return (
    <AppShell
      variant="dashboard"
      user={{
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      }}
      hasCompany={user.companies.length > 0}
    >
      {children}
    </AppShell>
  );
}
