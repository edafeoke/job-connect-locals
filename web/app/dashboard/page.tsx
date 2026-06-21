import { redirect } from "next/navigation";
import {
  FileText,
  Calendar,
  Briefcase,
  Bell,
} from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/layout/stat-card";
import { SectionCard } from "@/components/layout/section-card";
import { LinkButton } from "@/components/shared/link-button";
import { Progress } from "@/components/ui/progress";
import { getCurrentUser } from "@/lib/auth/session";
import { applicationService } from "@/server/services/application.service";
import { interviewService } from "@/server/services/interview.service";
import { companyService } from "@/server/services/company.service";
import { jobService } from "@/server/services/job.service";
import { notificationRepository } from "@/server/repositories/notification.repository";
import { calculateProfileCompletion, formatDateTime } from "@/lib/format";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const [applications, interviews, companies, unreadCount] = await Promise.all([
    applicationService.getByApplicant(user.id),
    interviewService.getByApplicant(user.id),
    companyService.getByOwner(user.id),
    notificationRepository.countUnread(user.id),
  ]);

  const employerJobs = companies.length
    ? await Promise.all(companies.map((c) => jobService.getByCompany(c.id)))
    : [];

  const totalJobs = employerJobs.flat().length;
  const profileCompletion = calculateProfileCompletion(user.profile);

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${user.name.split(" ")[0]}`}
        description="Here's what's happening with your job search and hiring activity."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Applications" value={applications.length} icon={FileText} variant="blue" />
        <StatCard label="Upcoming Interviews" value={interviews.length} icon={Calendar} variant="green" />
        <StatCard label="Jobs Posted" value={totalJobs} icon={Briefcase} variant="amber" />
        <StatCard label="Unread Notifications" value={unreadCount} icon={Bell} variant="slate" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SectionCard title="Profile Completion">
          <div className="space-y-4">
            <div className="flex items-end justify-between">
              <span className="text-4xl font-bold text-primary">{profileCompletion}%</span>
              <span className="text-sm text-muted-foreground">complete</span>
            </div>
            <Progress value={profileCompletion} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Add your CV and skills to stand out to employers.
            </p>
            <LinkButton href="/dashboard/seeker/profile" variant="outline" size="sm">
              Complete Profile
            </LinkButton>
          </div>
        </SectionCard>

        <SectionCard title="Upcoming Interviews">
          {interviews.length === 0 ? (
            <p className="py-4 text-sm text-muted-foreground">No upcoming interviews scheduled.</p>
          ) : (
            <ul className="divide-y divide-border">
              {interviews.slice(0, 3).map((interview) => (
                <li key={interview.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <div className="flex size-10 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="text-xs font-bold leading-none">
                      {new Date(interview.scheduledAt).getDate()}
                    </span>
                    <span className="text-[10px] uppercase">
                      {new Date(interview.scheduledAt).toLocaleString("en", { month: "short" })}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{interview.application.job.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {interview.application.job.company.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatDateTime(interview.scheduledAt)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
