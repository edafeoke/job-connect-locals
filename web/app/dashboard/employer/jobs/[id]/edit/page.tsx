import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { jobService } from "@/server/services/job.service";
import { JobForm } from "@/features/jobs/job-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EditJobPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const job = await jobService.getById(id);
  if (!job || job.company.ownerId !== user.id) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Job</h1>
        <p className="text-muted-foreground">{job.title}</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Job Details</CardTitle></CardHeader>
        <CardContent>
          <JobForm companyId={job.companyId} job={job} />
        </CardContent>
      </Card>
    </div>
  );
}
