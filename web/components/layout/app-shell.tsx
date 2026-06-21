"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  DashboardSidebar,
  type AppShellVariant,
} from "@/components/layout/dashboard-sidebar";
import { DashboardHeader } from "@/components/layout/dashboard-header";

interface AppShellProps {
  children: React.ReactNode;
  variant?: AppShellVariant;
  user: {
    name: string;
    email: string;
    isAdmin: boolean;
  };
  hasCompany?: boolean;
}

export function AppShell({
  children,
  variant = "dashboard",
  user,
  hasCompany,
}: AppShellProps) {
  return (
    <SidebarProvider defaultOpen>
      <DashboardSidebar variant={variant} user={user} hasCompany={hasCompany} />
      <SidebarInset className="flex min-h-svh flex-col">
        <DashboardHeader variant={variant} user={user} />
        <main className="dashboard-surface flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
