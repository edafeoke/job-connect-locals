import { redirect } from "next/navigation";
import { Calendar } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { SectionCard } from "@/components/layout/section-card";
import { getCurrentUser } from "@/lib/auth/session";
import { interviewService } from "@/server/services/interview.service";
import { formatDateTime } from "@/lib/format";

export const metadata = { title: "Employer Interviews — JobConnect Locals" };

export default async function EmployerInterviewsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const interviews = await interviewService.getByEmployer(user.id);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Interview Schedule"
        description="Upcoming interviews with applicants"
      />

      {interviews.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No interviews scheduled"
          description="Schedule interviews from the applicants page on any job listing."
        />
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <SectionCard key={interview.id}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{interview.application.job.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    with {interview.application.applicant.name}
                  </p>
                </div>
                <div className="rounded-lg bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                  {formatDateTime(interview.scheduledAt)}
                </div>
              </div>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                {interview.location && <p>Location: {interview.location}</p>}
                {interview.meetingLink && <p>Link: {interview.meetingLink}</p>}
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}
