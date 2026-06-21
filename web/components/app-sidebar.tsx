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
import type { LucideIcon } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
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
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export type AppShellVariant = "dashboard" | "admin";

export interface AppShellUser {
  name: string;
  email: string;
  isAdmin: boolean;
  imageUrl?: string;
}

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  exact?: boolean;
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  shellVariant: AppShellVariant;
  user: AppShellUser;
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
        tooltip={item.label}
        className={cn(
          isActive &&
            "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
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

export function AppSidebar({
  shellVariant = "dashboard",
  user,
  hasCompany = false,
  ...props
}: AppSidebarProps) {
  const secondaryItems =
    shellVariant === "dashboard"
      ? [
          {
            title: "Browse public jobs",
            url: "/jobs",
            icon: <ExternalLink className="size-4" />,
          },
        ]
      : [];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <Logo />
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        {shellVariant === "admin" ? (
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

        {secondaryItems.length > 0 && (
          <NavSecondary items={secondaryItems} className="mt-auto" />
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <NavUser user={user} shellVariant={shellVariant} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
