import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { savedJobService } from "@/server/services/application.service";
import { JobCard } from "@/components/shared/job-card";
import { Card, CardContent } from "@/components/ui/card";

export const metadata = { title: "Saved Jobs — JobConnect Locals" };

export default async function SavedJobsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const savedJobs = await savedJobService.getByUser(user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Saved Jobs</h1>
        <p className="text-muted-foreground">Jobs you&apos;ve bookmarked</p>
      </div>

      {savedJobs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No saved jobs yet.</p>
            <Link href="/jobs" className="mt-2 inline-block text-primary hover:underline">
              Browse jobs →
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {savedJobs.map(({ job }) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
