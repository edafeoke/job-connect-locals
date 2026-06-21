import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { companyService } from "@/server/services/company.service";
import { jobService } from "@/server/services/job.service";
import { applicationService } from "@/server/services/application.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Overview of your hiring activity</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Jobs</CardTitle>
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{allJobs.length}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{published}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Applicants</CardTitle>
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{totalApplicants}</p></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Applicants by Job</CardTitle></CardHeader>
        <CardContent>
          {applicationsByJob.length === 0 ? (
            <p className="text-sm text-muted-foreground">No data yet</p>
          ) : (
            <ul className="space-y-2">
              {applicationsByJob.map(({ title, count }) => (
                <li key={title} className="flex justify-between text-sm">
                  <span>{title}</span>
                  <span className="font-medium">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
