import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LinkButton } from "@/components/shared/link-button";
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
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user.name.split(" ")[0]}</h1>
        <p className="text-muted-foreground">Your dashboard overview</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Applications</CardTitle>
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{applications.length}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Interviews</CardTitle>
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{interviews.length}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Jobs Posted</CardTitle>
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{totalJobs}</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Unread Notifications</CardTitle>
          </CardHeader>
          <CardContent><p className="text-2xl font-bold">{unreadCount}</p></CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Profile Completion</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <Progress value={profileCompletion} />
            <p className="text-sm text-muted-foreground">
              {profileCompletion}% complete — add your CV and skills to stand out.
            </p>
            <LinkButton href="/dashboard/seeker/profile" variant="outline" size="sm">
              Complete Profile
            </LinkButton>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Upcoming Interviews</CardTitle></CardHeader>
          <CardContent>
            {interviews.length === 0 ? (
              <p className="text-sm text-muted-foreground">No upcoming interviews</p>
            ) : (
              <ul className="space-y-3">
                {interviews.slice(0, 3).map((interview) => (
                  <li key={interview.id} className="text-sm">
                    <p className="font-medium">{interview.application.job.title}</p>
                    <p className="text-muted-foreground">{formatDateTime(interview.scheduledAt)}</p>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
