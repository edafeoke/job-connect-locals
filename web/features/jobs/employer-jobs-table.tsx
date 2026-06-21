"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LinkButton } from "@/components/shared/link-button";
import { updateJobStatusAction } from "@/server/actions/index";
import { jobStatusLabels } from "@/lib/format";
import { toast } from "sonner";
import type { Job, JobStatus } from "@prisma/client";

type JobWithCount = Job & { _count: { applications: number } };

export function EmployerJobsTable({ jobs }: { jobs: JobWithCount[] }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function updateStatus(jobId: string, status: JobStatus) {
    startTransition(async () => {
      const result = await updateJobStatusAction(jobId, status);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success(`Job ${jobStatusLabels[status].toLowerCase()}`);
      router.refresh();
    });
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Applicants</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobs.map((job) => (
          <TableRow key={job.id}>
            <TableCell className="font-medium">{job.title}</TableCell>
            <TableCell><Badge variant="outline">{jobStatusLabels[job.status]}</Badge></TableCell>
            <TableCell>{job._count.applications}</TableCell>
            <TableCell className="space-x-2">
              <LinkButton href={`/dashboard/employer/jobs/${job.id}/edit`} variant="outline" size="sm">
                Edit
              </LinkButton>
              <LinkButton href={`/dashboard/employer/jobs/${job.id}/applicants`} variant="outline" size="sm">
                Applicants
              </LinkButton>
              {job.status === "DRAFT" && (
                <Button size="sm" disabled={pending} onClick={() => updateStatus(job.id, "PUBLISHED")}>
                  Publish
                </Button>
              )}
              {job.status === "PUBLISHED" && (
                <Button size="sm" variant="secondary" disabled={pending} onClick={() => updateStatus(job.id, "CLOSED")}>
                  Close
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
