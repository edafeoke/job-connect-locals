import Link from "next/link";
import { redirect } from "next/navigation";
import { FileText } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { SectionCard } from "@/components/layout/section-card";
import { ApplicationStatusBadge } from "@/components/shared/status-badge";
import { LinkButton } from "@/components/shared/link-button";
import { getCurrentUser } from "@/lib/auth/session";
import { applicationService } from "@/server/services/application.service";
import { applicationStatusLabels, formatDateTime } from "@/lib/format";

export const metadata = { title: "My Applications — JobConnect Locals" };

export default async function ApplicationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const applications = await applicationService.getByApplicant(user.id);

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Applications"
        description="Track your job applications and status updates"
      />

      {applications.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No applications yet"
          description="Browse jobs and apply to start tracking your progress here."
          action={<LinkButton href="/jobs">Browse Jobs</LinkButton>}
        />
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <SectionCard key={app.id} contentClassName="p-0">
              <div className="p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/jobs/${app.job.id}`}
                      className="text-lg font-semibold hover:text-primary"
                    >
                      {app.job.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">{app.job.company.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Applied {formatDateTime(app.createdAt)}
                    </p>
                  </div>
                  <ApplicationStatusBadge status={app.status} />
                </div>
              </div>
              {app.events.length > 0 && (
                <div className="border-t border-border bg-muted/30 px-5 py-4">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Timeline
                  </p>
                  <div className="space-y-3 border-l-2 border-primary/30 pl-4">
                    {app.events.map((event) => (
                      <div key={event.id} className="relative text-sm">
                        <span className="absolute -left-[21px] top-1.5 size-2.5 rounded-full bg-primary ring-4 ring-background" />
                        <p className="font-medium">{applicationStatusLabels[event.status]}</p>
                        {event.note && (
                          <p className="text-muted-foreground">{event.note}</p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {formatDateTime(event.createdAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}
