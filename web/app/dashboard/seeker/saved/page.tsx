import { redirect } from "next/navigation";
import { Bookmark } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { LinkButton } from "@/components/shared/link-button";
import { JobCard } from "@/components/shared/job-card";
import { getCurrentUser } from "@/lib/auth/session";
import { savedJobService } from "@/server/services/application.service";

export const metadata = { title: "Saved Jobs — JobConnect Locals" };

export default async function SavedJobsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const savedJobs = await savedJobService.getByUser(user.id);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Saved Jobs"
        description="Jobs you've bookmarked for later"
      />

      {savedJobs.length === 0 ? (
        <EmptyState
          icon={Bookmark}
          title="No saved jobs"
          description="Save jobs while browsing to review them here later."
          action={<LinkButton href="/jobs">Browse Jobs</LinkButton>}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {savedJobs.map(({ job }) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
