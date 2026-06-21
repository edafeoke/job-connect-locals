import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { jobService } from "@/server/services/job.service";
import { applicationService } from "@/server/services/application.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApplicationStatusSelect } from "@/features/applications/application-status-select";
import { ScheduleInterviewForm } from "@/features/interviews/schedule-interview-form";
import { applicationStatusLabels, formatDateTime } from "@/lib/format";

interface ApplicantsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplicantsPage({ params }: ApplicantsPageProps) {
  const { id } = await params;
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const job = await jobService.getById(id);
  if (!job || job.company.ownerId !== user.id) notFound();

  const applications = await applicationService.getByJob(id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Applicants</h1>
        <p className="text-muted-foreground">{job.title} — {applications.length} applicant(s)</p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No applications yet for this job.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>{app.applicant.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{app.applicant.email}</p>
                  {app.applicant.profile?.headline && (
                    <p className="text-sm">{app.applicant.profile.headline}</p>
                  )}
                </div>
                <ApplicationStatusSelect applicationId={app.id} currentStatus={app.status} />
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground">
                  Applied {formatDateTime(app.createdAt)} · Status: {applicationStatusLabels[app.status]}
                </p>
                {app.coverLetter && (
                  <div>
                    <p className="text-sm font-medium">Cover Letter</p>
                    <p className="text-sm text-muted-foreground">{app.coverLetter}</p>
                  </div>
                )}
                {app.cvFileName && (
                  <p className="text-sm">CV: {app.cvFileName}</p>
                )}
                <ScheduleInterviewForm applicationId={app.id} />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
