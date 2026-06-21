import { redirect } from "next/navigation";
import { Calendar } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { EmptyState } from "@/components/layout/empty-state";
import { SectionCard } from "@/components/layout/section-card";
import { getCurrentUser } from "@/lib/auth/session";
import { interviewService } from "@/server/services/interview.service";
import { RichTextContent } from "@/components/shared/rich-text-content";
import { formatDateTime } from "@/lib/format";

export const metadata = { title: "Interviews — JobConnect Locals" };

export default async function SeekerInterviewsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const interviews = await interviewService.getByApplicant(user.id);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Upcoming Interviews"
        description="Your scheduled interviews with employers"
      />

      {interviews.length === 0 ? (
        <EmptyState
          icon={Calendar}
          title="No interviews scheduled"
          description="When an employer schedules an interview, it will appear here."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {interviews.map((interview) => (
            <SectionCard key={interview.id}>
              <div className="flex gap-4">
                <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <span className="text-lg font-bold leading-none">
                    {new Date(interview.scheduledAt).getDate()}
                  </span>
                  <span className="text-[10px] font-medium uppercase">
                    {new Date(interview.scheduledAt).toLocaleString("en", { month: "short" })}
                  </span>
                </div>
                <div className="min-w-0 flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold">{interview.application.job.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {interview.application.job.company.name}
                    </p>
                  </div>
                  <p className="text-sm">
                    <span className="font-medium">When: </span>
                    {formatDateTime(interview.scheduledAt)}
                  </p>
                  {interview.location && (
                    <p className="text-sm text-muted-foreground">{interview.location}</p>
                  )}
                  {interview.meetingLink && (
                    <a
                      href={interview.meetingLink}
                      className="inline-block text-sm font-medium text-primary hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Join meeting →
                    </a>
                  )}
                  {interview.notes && (
                    <div className="rounded-lg bg-muted/50 p-3">
                      <RichTextContent content={interview.notes} className="text-sm" />
                    </div>
                  )}
                </div>
              </div>
            </SectionCard>
          ))}
        </div>
      )}
    </div>
  );
}
