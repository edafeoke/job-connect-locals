"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  markAllNotificationsReadAction,
  markNotificationReadAction,
} from "@/server/actions/index";
import { formatDateTime } from "@/lib/format";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export function NotificationBell({
  initialNotifications = [],
  initialUnread = 0,
}: {
  initialNotifications?: NotificationItem[];
  initialUnread?: number;
}) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unread, setUnread] = useState(initialUnread);
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    if (!open) return;
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((data: { notifications: NotificationItem[]; unread: number }) => {
        setNotifications(data.notifications);
        setUnread(data.unread);
      })
      .catch(() => {});
  }, [open]);

  function handleMarkRead(id: string) {
    startTransition(async () => {
      await markNotificationReadAction(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );
      setUnread((c) => Math.max(0, c - 1));
    });
  }

  function handleMarkAllRead() {
    startTransition(async () => {
      await markAllNotificationsReadAction();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnread(0);
    });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          {unread > 0 && (
            <Badge className="absolute -right-1 -top-1 size-5 justify-center rounded-full p-0 text-[10px]">
              {unread > 9 ? "9+" : unread}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h4 className="font-semibold">Notifications</h4>
          {unread > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs"
              onClick={handleMarkAllRead}
              disabled={pending}
            >
              Mark all read
            </Button>
          )}
        </div>
        <ScrollArea className="h-72">
          {notifications.length === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">
              No notifications yet
            </p>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                type="button"
                className={`w-full border-b px-4 py-3 text-left transition-colors hover:bg-muted/50 ${!n.read ? "bg-primary/5" : ""}`}
                onClick={() => !n.read && handleMarkRead(n.id)}
              >
                <p className="text-sm font-medium">{n.title}</p>
                <p className="text-xs text-muted-foreground">{n.message}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {formatDateTime(n.createdAt)}
                </p>
              </button>
            ))
          )}
        </ScrollArea>
        <div className="border-t p-2">
          <Link
            href="/dashboard/notifications"
            className="flex h-7 w-full items-center justify-center rounded-lg text-sm hover:bg-muted"
          >
            View all
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
