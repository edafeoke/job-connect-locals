import { adminService } from "@/server/services/admin.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { applicationStatusLabels, formatDateTime } from "@/lib/format";

export const metadata = { title: "Admin Applications — JobConnect Locals" };

export default async function AdminApplicationsPage() {
  const { applications } = await adminService.getApplications();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Applications</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job</TableHead>
            <TableHead>Applicant</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applied</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app.id}>
              <TableCell>
                <p className="font-medium">{app.job.title}</p>
                <p className="text-xs text-muted-foreground">{app.job.company.name}</p>
              </TableCell>
              <TableCell>
                <p>{app.applicant.name}</p>
                <p className="text-xs text-muted-foreground">{app.applicant.email}</p>
              </TableCell>
              <TableCell>
                <Badge variant="outline">{applicationStatusLabels[app.status]}</Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDateTime(app.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
