import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/layout/section-card";
import { getCurrentUser } from "@/lib/auth/session";
import { jobService } from "@/server/services/job.service";
import { JobForm } from "@/features/jobs/job-form";

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
    <div className="space-y-8">
      <PageHeader title="Edit Job" description={job.title} />
      <SectionCard title="Job Details">
        <JobForm companyId={job.companyId} job={job} />
      </SectionCard>
    </div>
  );
}
