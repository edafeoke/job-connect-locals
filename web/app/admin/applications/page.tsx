import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/layout/section-card";
import { ApplicationStatusBadge } from "@/components/shared/status-badge";
import { adminService } from "@/server/services/admin.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata = { title: "Admin Applications — JobConnect Locals" };

export default async function AdminApplicationsPage() {
  const { applications } = await adminService.getApplications();

  return (
    <div className="space-y-8">
      <PageHeader title="Applications" description="Platform-wide application oversight" />
      <SectionCard contentClassName="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="font-semibold">Job</TableHead>
              <TableHead className="font-semibold">Applicant</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Applied</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((app, i) => (
              <TableRow key={app.id} className={cn(i % 2 === 1 && "bg-muted/20")}>
                <TableCell>
                  <p className="font-medium">{app.job.title}</p>
                  <p className="text-xs text-muted-foreground">{app.job.company.name}</p>
                </TableCell>
                <TableCell>
                  <p>{app.applicant.name}</p>
                  <p className="text-xs text-muted-foreground">{app.applicant.email}</p>
                </TableCell>
                <TableCell><ApplicationStatusBadge status={app.status} /></TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {formatDateTime(app.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
