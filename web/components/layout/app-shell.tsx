"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { DashboardSiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { AppShellUser, AppShellVariant } from "@/components/app-sidebar";

interface AppShellProps {
  children: React.ReactNode;
  variant?: AppShellVariant;
  user: AppShellUser;
  hasCompany?: boolean;
}

export function AppShell({
  children,
  variant = "dashboard",
  user,
  hasCompany,
}: AppShellProps) {
  return (
    <SidebarProvider
      defaultOpen
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar
        variant="inset"
        shellVariant={variant}
        user={user}
        hasCompany={hasCompany}
      />
      <SidebarInset className="flex min-h-svh flex-col">
        <DashboardSiteHeader variant={variant} />
        <main className="dashboard-surface flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
