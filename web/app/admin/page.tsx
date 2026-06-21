import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/layout/stat-card";
import { SectionCard } from "@/components/layout/section-card";
import { adminService } from "@/server/services/admin.service";
import { Users, Briefcase, FileText, Building2 } from "lucide-react";

export const metadata = { title: "Admin — JobConnect Locals" };

export default async function AdminPage() {
  const stats = await adminService.getStats();
  const appsByStatus = await adminService.getApplicationsByStatus();
  const jobsOverTime = await adminService.getJobsOverTime();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Admin Dashboard"
        description="Platform overview and moderation"
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Users" value={stats.users} icon={Users} variant="blue" />
        <StatCard label="Jobs" value={stats.jobs} icon={Briefcase} variant="green" />
        <StatCard label="Applications" value={stats.applications} icon={FileText} variant="amber" />
        <StatCard label="Companies" value={stats.companies} icon={Building2} variant="slate" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Applications by Status">
          <ul className="space-y-3">
            {appsByStatus.map(({ status, _count }) => (
              <li key={status} className="flex items-center justify-between text-sm">
                <span className="capitalize">{status.replace(/_/g, " ").toLowerCase()}</span>
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary">
                  {_count.status}
                </span>
              </li>
            ))}
          </ul>
        </SectionCard>
        <SectionCard title="Jobs Posted Over Time">
          <ul className="space-y-3">
            {jobsOverTime.map(({ month, count }) => (
              <li key={month} className="flex items-center gap-3 text-sm">
                <span className="w-20 shrink-0 text-muted-foreground">{month}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${Math.max(8, (count / Math.max(...jobsOverTime.map((j) => j.count), 1)) * 100)}%`,
                    }}
                  />
                </div>
                <span className="w-6 text-right font-semibold">{count}</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
