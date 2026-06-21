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
import { CloseJobButton } from "@/features/admin/close-job-button";
import { jobStatusLabels } from "@/lib/format";

export const metadata = { title: "Admin Jobs — JobConnect Locals" };

export default async function AdminJobsPage() {
  const { jobs } = await adminService.getJobs();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Jobs Moderation</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Applicants</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell>{job.company.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{jobStatusLabels[job.status]}</Badge>
              </TableCell>
              <TableCell>{job._count.applications}</TableCell>
              <TableCell>
                {job.status !== "CLOSED" && <CloseJobButton jobId={job.id} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
