import { redirect } from "next/navigation";
import { Briefcase } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { LinkButton } from "@/components/shared/link-button";
import { getCurrentUser } from "@/lib/auth/session";
import { companyService } from "@/server/services/company.service";
import { jobService } from "@/server/services/job.service";
import { EmployerJobsTable } from "@/features/jobs/employer-jobs-table";

export const metadata = { title: "My Jobs — JobConnect Locals" };

export default async function EmployerJobsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const companies = await companyService.getByOwner(user.id);
  if (companies.length === 0) {
    return (
      <div className="space-y-8">
        <PageHeader title="My Jobs" description="Manage your job listings" />
        <EmptyState
          icon={Briefcase}
          title="Create your company first"
          description="Set up a company profile before posting job openings."
          action={<LinkButton href="/dashboard/employer/company">Create Company</LinkButton>}
        />
      </div>
    );
  }

  const allJobs = (
    await Promise.all(companies.map((c) => jobService.getByCompany(c.id)))
  ).flat();

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Jobs"
        description="Manage your job listings and applicants"
        actions={<LinkButton href="/dashboard/employer/jobs/new">Post New Job</LinkButton>}
      />

      {allJobs.length === 0 ? (
        <EmptyState
          icon={Briefcase}
          title="No jobs posted yet"
          description="Create your first job listing to start receiving applications."
          action={<LinkButton href="/dashboard/employer/jobs/new">Post your first job</LinkButton>}
        />
      ) : (
        <EmployerJobsTable jobs={allJobs} />
      )}
    </div>
  );
}
