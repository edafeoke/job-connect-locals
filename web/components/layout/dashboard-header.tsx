"use client";

import { useRouter } from "next/navigation";
import { LogOut, User, LayoutDashboard } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NotificationBell } from "@/features/notifications/notification-bell";
import { signOut } from "@/lib/auth/auth-client";
import type { AppShellVariant } from "@/components/layout/dashboard-sidebar";

interface DashboardHeaderProps {
  variant?: AppShellVariant;
  user: {
    name: string;
    email: string;
  };
}

export function DashboardHeader({ variant = "dashboard", user }: DashboardHeaderProps) {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6">
      <SidebarTrigger className="-ml-1" />
      <div className="flex flex-1 items-center justify-between gap-4">
        <p className="hidden text-sm font-medium text-muted-foreground sm:block">
          {variant === "admin" ? "Administration" : "Dashboard"}
        </p>
        <div className="ml-auto flex items-center gap-2">
          <NotificationBell />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="relative size-9 rounded-full">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <DropdownMenuSeparator />
              {variant === "dashboard" && (
                <>
                  <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                    <LayoutDashboard className="mr-2 size-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/dashboard/seeker/profile")}>
                    <User className="mr-2 size-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 size-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
