import Link from "next/link";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUser } from "@/lib/auth/session";
import { applicationService } from "@/server/services/application.service";
import { applicationStatusLabels, formatDateTime } from "@/lib/format";

export const metadata = { title: "My Applications — JobConnect Locals" };

export default async function ApplicationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const applications = await applicationService.getByApplicant(user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">My Applications</h1>
        <p className="text-muted-foreground">Track your job applications and status</p>
      </div>

      {applications.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No applications yet.</p>
            <Link href="/jobs" className="mt-2 inline-block text-primary hover:underline">
              Browse jobs →
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <CardTitle className="text-lg">
                    <Link href={`/jobs/${app.job.id}`} className="hover:text-primary">
                      {app.job.title}
                    </Link>
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">{app.job.company.name}</p>
                </div>
                <Badge>{applicationStatusLabels[app.status]}</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Applied {formatDateTime(app.createdAt)}
                </p>
                {app.events.length > 0 && (
                  <div className="mt-4 border-l-2 border-muted pl-4">
                    <p className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Timeline</p>
                    {app.events.map((event) => (
                      <div key={event.id} className="mb-2 text-sm">
                        <span className="font-medium">{applicationStatusLabels[event.status]}</span>
                        {event.note && <span className="text-muted-foreground"> — {event.note}</span>}
                        <p className="text-xs text-muted-foreground">{formatDateTime(event.createdAt)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
