import { PageHeader } from "@/components/layout/page-header";
import { SectionCard } from "@/components/layout/section-card";
import { JobStatusBadge } from "@/components/shared/status-badge";
import { adminService } from "@/server/services/admin.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CloseJobButton } from "@/features/admin/close-job-button";
import { cn } from "@/lib/utils";

export const metadata = { title: "Admin Jobs — JobConnect Locals" };

export default async function AdminJobsPage() {
  const { jobs } = await adminService.getJobs();

  return (
    <div className="space-y-8">
      <PageHeader title="Jobs Moderation" description="Review and manage job listings" />
      <SectionCard contentClassName="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Company</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Applicants</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jobs.map((job, i) => (
              <TableRow key={job.id} className={cn(i % 2 === 1 && "bg-muted/20")}>
                <TableCell className="font-medium">{job.title}</TableCell>
                <TableCell className="text-muted-foreground">{job.company.name}</TableCell>
                <TableCell><JobStatusBadge status={job.status} /></TableCell>
                <TableCell className="font-semibold text-primary">{job._count.applications}</TableCell>
                <TableCell className="text-right">
                  {job.status !== "CLOSED" && <CloseJobButton jobId={job.id} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
