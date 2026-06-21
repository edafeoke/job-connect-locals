import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/layout/stat-card";
import { SectionCard } from "@/components/layout/section-card";
import { Briefcase, CheckCircle, Users } from "lucide-react";
import { getCurrentUser } from "@/lib/auth/session";
import { companyService } from "@/server/services/company.service";
import { jobService } from "@/server/services/job.service";
import { applicationService } from "@/server/services/application.service";

export const metadata = { title: "Analytics — JobConnect Locals" };

export default async function EmployerAnalyticsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const companies = await companyService.getByOwner(user.id);
  const allJobs = (
    await Promise.all(companies.map((c) => jobService.getByCompany(c.id)))
  ).flat();

  const published = allJobs.filter((j) => j.status === "PUBLISHED").length;
  const totalApplicants = allJobs.reduce((sum, j) => sum + j._count.applications, 0);

  const applicationsByJob = await Promise.all(
    allJobs.map(async (job) => ({
      title: job.title,
      count: (await applicationService.getByJob(job.id)).length,
    })),
  );

  return (
    <div className="space-y-8">
      <PageHeader
        title="Analytics"
        description="Overview of your hiring activity"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Jobs" value={allJobs.length} icon={Briefcase} variant="blue" />
        <StatCard label="Published" value={published} icon={CheckCircle} variant="green" />
        <StatCard label="Total Applicants" value={totalApplicants} icon={Users} variant="amber" />
      </div>

      <SectionCard title="Applicants by Job">
        {applicationsByJob.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data yet.</p>
        ) : (
          <ul className="space-y-3">
            {applicationsByJob.map(({ title, count }) => (
              <li key={title} className="flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${totalApplicants ? (count / totalApplicants) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="w-40 truncate text-sm">{title}</span>
                <span className="w-8 text-right text-sm font-semibold">{count}</span>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </div>
  );
}
