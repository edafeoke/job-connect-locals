import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
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
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Jobs</h1>
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Create a company profile first to post jobs.</p>
            <LinkButton href="/dashboard/employer/company" className="mt-4">
              Create Company
            </LinkButton>
          </CardContent>
        </Card>
      </div>
    );
  }

  const allJobs = (
    await Promise.all(companies.map((c) => jobService.getByCompany(c.id)))
  ).flat();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Jobs</h1>
          <p className="text-muted-foreground">Manage your job listings</p>
        </div>
        <LinkButton href="/dashboard/employer/jobs/new">Post New Job</LinkButton>
      </div>

      {allJobs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No jobs yet.</p>
            <LinkButton href="/dashboard/employer/jobs/new" className="mt-4">
              Post your first job
            </LinkButton>
          </CardContent>
        </Card>
      ) : (
        <EmployerJobsTable jobs={allJobs} />
      )}
    </div>
  );
}
