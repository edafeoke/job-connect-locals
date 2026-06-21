import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { adminService } from "@/server/services/admin.service";

export const metadata = { title: "Admin — JobConnect Locals" };

export default async function AdminPage() {
  const stats = await adminService.getStats();
  const appsByStatus = await adminService.getApplicationsByStatus();
  const jobsOverTime = await adminService.getJobsOverTime();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and moderation</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Users", value: stats.users },
          { label: "Jobs", value: stats.jobs },
          { label: "Applications", value: stats.applications },
          { label: "Companies", value: stats.companies },
        ].map(({ label, value }) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
            </CardHeader>
            <CardContent><p className="text-2xl font-bold">{value}</p></CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Applications by Status</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {appsByStatus.map(({ status, _count }) => (
                <li key={status} className="flex justify-between text-sm">
                  <span>{status.replace(/_/g, " ")}</span>
                  <span className="font-medium">{_count.status}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Jobs Posted Over Time</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {jobsOverTime.map(({ month, count }) => (
                <li key={month} className="flex justify-between text-sm">
                  <span>{month}</span>
                  <span className="font-medium">{count}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
