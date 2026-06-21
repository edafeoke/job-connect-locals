import { redirect } from "next/navigation";
import { Bell } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { MarkAllReadButton } from "@/features/notifications/mark-all-read-button";
import { getCurrentUser } from "@/lib/auth/session";
import { notificationRepository } from "@/server/repositories/notification.repository";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata = { title: "Notifications — JobConnect Locals" };

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const notifications = await notificationRepository.findByUser(user.id, 50);
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Notifications"
        description={`${unread} unread notification${unread !== 1 ? "s" : ""}`}
        actions={unread > 0 ? <MarkAllReadButton /> : undefined}
      />

      {notifications.length === 0 ? (
        <EmptyState
          icon={Bell}
          title="No notifications"
          description="Updates about applications, interviews, and status changes will appear here."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          {notifications.map((n, i) => (
            <div
              key={n.id}
              className={cn(
                "flex gap-4 border-b border-border px-5 py-4 last:border-b-0",
                !n.read && "bg-primary/5",
                i % 2 === 1 && n.read && "bg-muted/20",
              )}
            >
              {!n.read && (
                <span className="mt-2 size-2 shrink-0 rounded-full bg-primary" />
              )}
              {n.read && <span className="mt-2 size-2 shrink-0" />}
              <div className="min-w-0 flex-1">
                <p className="font-medium">{n.title}</p>
                <p className="text-sm text-muted-foreground">{n.message}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDateTime(n.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
