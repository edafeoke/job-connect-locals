"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LinkButton } from "@/components/shared/link-button";
import { JobStatusBadge } from "@/components/shared/status-badge";
import { SectionCard } from "@/components/layout/section-card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { updateJobStatusAction } from "@/server/actions/index";
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
      toast.success(`Job ${status.toLowerCase()}`);
      router.refresh();
    });
  }

  return (
    <SectionCard title="All Jobs" contentClassName="p-0">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40 hover:bg-muted/40">
            <TableHead className="font-semibold">Title</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Applicants</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job, i) => (
            <TableRow key={job.id} className={i % 2 === 1 ? "bg-muted/20" : undefined}>
              <TableCell className="font-medium">{job.title}</TableCell>
              <TableCell><JobStatusBadge status={job.status} /></TableCell>
              <TableCell>
                <span className="font-semibold text-primary">{job._count.applications}</span>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap justify-end gap-2">
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
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SectionCard>
  );
}
