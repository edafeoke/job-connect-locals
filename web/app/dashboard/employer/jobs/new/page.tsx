import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/layout/section-card";
import { getCurrentUser } from "@/lib/auth/session";
import { companyService } from "@/server/services/company.service";
import { JobForm } from "@/features/jobs/job-form";

export const metadata = { title: "Post Job — JobConnect Locals" };

export default async function NewJobPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const companies = await companyService.getByOwner(user.id);
  if (companies.length === 0) redirect("/dashboard/employer/company");

  const company = companies[0];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Post a New Job"
        description={`Posting as ${company.name}`}
      />
      <SectionCard title="Job Details">
        <JobForm companyId={company.id} />
      </SectionCard>
    </div>
  );
}
