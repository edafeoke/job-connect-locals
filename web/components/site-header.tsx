import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { NotificationBell } from "@/features/notifications/notification-bell";
import type { AppShellVariant } from "@/components/app-sidebar";

export function DashboardSiteHeader({
  variant = "dashboard",
}: {
  variant?: AppShellVariant;
}) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center justify-between gap-2 px-4 lg:px-6">
        <div className="flex items-center gap-1 lg:gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 h-4 data-vertical:self-auto"
          />
          <h1 className="text-base font-medium text-muted-foreground">
            {variant === "admin" ? "Administration" : "Dashboard"}
          </h1>
        </div>
        <NotificationBell />
      </div>
    </header>
  );
}
