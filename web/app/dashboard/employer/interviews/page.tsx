import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { interviewService } from "@/server/services/interview.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/format";

export const metadata = { title: "Employer Interviews — JobConnect Locals" };

export default async function EmployerInterviewsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const interviews = await interviewService.getByEmployer(user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Interview Schedule</h1>
        <p className="text-muted-foreground">Upcoming interviews with applicants</p>
      </div>

      {interviews.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No interviews scheduled yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {interviews.map((interview) => (
            <Card key={interview.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>{interview.application.job.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    with {interview.application.applicant.name}
                  </p>
                </div>
                <Badge>{interview.status}</Badge>
              </CardHeader>
              <CardContent className="space-y-1 text-sm">
                <p><strong>When:</strong> {formatDateTime(interview.scheduledAt)}</p>
                {interview.location && <p><strong>Location:</strong> {interview.location}</p>}
                {interview.meetingLink && <p><strong>Link:</strong> {interview.meetingLink}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
