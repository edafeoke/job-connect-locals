import Link from "next/link";
import { redirect } from "next/navigation";
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
} from "lucide-react";
import { SiteHeader } from "@/components/shared/site-header";
import { getCurrentUser } from "@/lib/auth/session";

const seekerLinks = [
  { href: "/dashboard/seeker/applications", label: "Applications", icon: FileText },
  { href: "/dashboard/seeker/saved", label: "Saved Jobs", icon: Bookmark },
  { href: "/dashboard/seeker/interviews", label: "Interviews", icon: Calendar },
  { href: "/dashboard/seeker/profile", label: "Profile", icon: User },
];

const employerLinks = [
  { href: "/dashboard/employer/jobs", label: "My Jobs", icon: Briefcase },
  { href: "/dashboard/employer/interviews", label: "Interviews", icon: Calendar },
  { href: "/dashboard/employer/company", label: "Company", icon: Building2 },
  { href: "/dashboard/employer/analytics", label: "Analytics", icon: BarChart3 },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const hasCompany = user.companies.length > 0;

  return (
    <>
      <SiteHeader />
      <div className="mx-auto flex max-w-7xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="sticky top-24 space-y-6">
            <div>
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <LayoutDashboard className="size-4" />
                Overview
              </Link>
              <Link
                href="/dashboard/notifications"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <Bell className="size-4" />
                Notifications
              </Link>
            </div>

            <div>
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Job Seeker
              </p>
              {seekerLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted"
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              ))}
            </div>

            <div>
              <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Employer
              </p>
              {employerLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted"
                >
                  <Icon className="size-4" />
                  {label}
                </Link>
              ))}
              {!hasCompany && (
                <p className="mt-2 px-3 text-xs text-muted-foreground">
                  <Link href="/dashboard/employer/company" className="text-primary hover:underline">
                    Create company profile →
                  </Link>
                </p>
              )}
            </div>

            {user.isAdmin && (
              <div>
                <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Admin
                </p>
                <Link
                  href="/admin"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-muted"
                >
                  <BarChart3 className="size-4" />
                  Admin Panel
                </Link>
              </div>
            )}
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </>
  );
}
