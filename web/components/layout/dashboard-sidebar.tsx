"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Bookmark,
  Calendar,
  User,
  Building2,
  BarChart3,
  Bell,
  Users,
  ScrollText,
  ExternalLink,
} from "lucide-react";
import { Logo } from "@/components/shared/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type AppShellVariant = "dashboard" | "admin";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

interface DashboardSidebarProps {
  variant?: AppShellVariant;
  user: {
    name: string;
    email: string;
    isAdmin: boolean;
  };
  hasCompany?: boolean;
}

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const isActive = item.exact
    ? pathname === item.href
    : pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        render={<Link href={item.href} />}
        className={cn(
          "h-10 rounded-lg font-medium",
          isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
        )}
      >
        <item.icon className="size-4 shrink-0" />
        <span>{item.label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

const mainLinks: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
];

const seekerLinks: NavItem[] = [
  { href: "/dashboard/seeker/applications", label: "Applications", icon: FileText },
  { href: "/dashboard/seeker/saved", label: "Saved Jobs", icon: Bookmark },
  { href: "/dashboard/seeker/interviews", label: "Interviews", icon: Calendar },
  { href: "/dashboard/seeker/profile", label: "Profile", icon: User },
];

const employerLinks: NavItem[] = [
  { href: "/dashboard/employer/jobs", label: "My Jobs", icon: Briefcase },
  { href: "/dashboard/employer/interviews", label: "Interviews", icon: Calendar },
  { href: "/dashboard/employer/company", label: "Company", icon: Building2 },
  { href: "/dashboard/employer/analytics", label: "Analytics", icon: BarChart3 },
];

const adminLinks: NavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/jobs", label: "Jobs", icon: Briefcase },
  { href: "/admin/applications", label: "Applications", icon: FileText },
  { href: "/admin/audit-log", label: "Audit Log", icon: ScrollText },
];

export function DashboardSidebar({
  variant = "dashboard",
  user,
  hasCompany = false,
}: DashboardSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Logo />
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {variant === "admin" ? (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminLinks.map((item) => (
                  <NavLink key={item.href} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ) : (
          <>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainLinks.map((item) => (
                    <NavLink key={item.href} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator className="my-2" />

            <SidebarGroup>
              <SidebarGroupLabel>Job Seeker</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {seekerLinks.map((item) => (
                    <NavLink key={item.href} item={item} />
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator className="my-2" />

            <SidebarGroup>
              <SidebarGroupLabel>Employer</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {employerLinks.map((item) => (
                    <NavLink key={item.href} item={item} />
                  ))}
                </SidebarMenu>
                {!hasCompany && (
                  <p className="mt-2 px-3 text-xs text-muted-foreground">
                    <Link
                      href="/dashboard/employer/company"
                      className="font-medium text-primary hover:underline"
                    >
                      Create company profile →
                    </Link>
                  </p>
                )}
              </SidebarGroupContent>
            </SidebarGroup>

            {user.isAdmin && (
              <>
                <SidebarSeparator className="my-2" />
                <SidebarGroup>
                  <SidebarGroupLabel>Admin</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <NavLink
                        item={{
                          href: "/admin",
                          label: "Admin Panel",
                          icon: BarChart3,
                          exact: true,
                        }}
                      />
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </>
            )}
          </>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent p-3">
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        {variant === "dashboard" && (
          <Link
            href="/jobs"
            className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          >
            <ExternalLink className="size-3.5" />
            Browse public jobs
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
