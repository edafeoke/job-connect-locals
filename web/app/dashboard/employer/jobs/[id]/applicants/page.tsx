import { notFound, redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { SectionCard } from "@/components/layout/section-card";
import { ApplicationStatusBadge } from "@/components/shared/status-badge";
import { UserAvatar } from "@/components/shared/user-avatar";
import { RichTextContent } from "@/components/shared/rich-text-content";
import { getCurrentUser } from "@/lib/auth/session";
import { jobService } from "@/server/services/job.service";
import { applicationService } from "@/server/services/application.service";
import { ApplicationStatusSelect } from "@/features/applications/application-status-select";
import { ScheduleInterviewForm } from "@/features/interviews/schedule-interview-form";
import { formatDateTime } from "@/lib/format";
import { Users } from "lucide-react";

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
    <div className="space-y-8">
      <PageHeader
        title="Applicants"
        description={`${job.title} — ${applications.length} applicant(s)`}
      />

      {applications.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No applicants yet"
          description="Applications will appear here once candidates apply to this job."
        />
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <SectionCard key={app.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex gap-4">
                  <UserAvatar
                    name={app.applicant.name}
                    imageUrl={app.applicant.image ?? app.applicant.profile?.avatarUrl}
                    className="size-12"
                    fallbackClassName="text-base"
                  />
                  <div>
                    <h3 className="font-semibold">{app.applicant.name}</h3>
                    <p className="text-sm text-muted-foreground">{app.applicant.email}</p>
                    {app.applicant.profile?.headline && (
                      <p className="mt-1 text-sm">{app.applicant.profile.headline}</p>
                    )}
                    <p className="mt-2 text-xs text-muted-foreground">
                      Applied {formatDateTime(app.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <ApplicationStatusBadge status={app.status} />
                  <ApplicationStatusSelect applicationId={app.id} currentStatus={app.status} />
                </div>
              </div>

              {(app.coverLetter || app.cvFileName) && (
                <div className="mt-4 space-y-3 rounded-lg bg-muted/40 p-4">
                  {app.coverLetter && (
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground">Cover Letter</p>
                      <div className="mt-1">
                        <RichTextContent content={app.coverLetter} className="text-sm" />
                      </div>
                    </div>
                  )}
                  {app.cvFileName && (
                    <p className="text-sm">
                      <span className="font-medium">CV: </span>{app.cvFileName}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-4 border-t border-border pt-4">
                <ScheduleInterviewForm applicationId={app.id} />
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}
