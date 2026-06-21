import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { companyService } from "@/server/services/company.service";
import { JobForm } from "@/features/jobs/job-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Post Job — JobConnect Locals" };

export default async function NewJobPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const companies = await companyService.getByOwner(user.id);
  if (companies.length === 0) redirect("/dashboard/employer/company");

  const company = companies[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Post a New Job</h1>
        <p className="text-muted-foreground">Posting as {company.name}</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Job Details</CardTitle></CardHeader>
        <CardContent>
          <JobForm companyId={company.id} />
        </CardContent>
      </Card>
    </div>
  );
}
