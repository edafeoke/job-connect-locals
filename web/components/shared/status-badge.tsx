import { cn } from "@/lib/utils";
import { applicationStatusLabels, jobStatusLabels } from "@/lib/format";

const applicationStatusStyles: Record<string, string> = {
  APPLIED: "bg-primary/10 text-primary border-primary/20",
  UNDER_REVIEW: "bg-warning/10 text-warning border-warning/20",
  INTERVIEW_SCHEDULED: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  ACCEPTED: "bg-success/10 text-success border-success/20",
  REJECTED: "bg-destructive/10 text-destructive border-destructive/20",
};

const jobStatusStyles: Record<string, string> = {
  DRAFT: "bg-muted text-muted-foreground border-border",
  PUBLISHED: "bg-success/10 text-success border-success/20",
  CLOSED: "bg-destructive/10 text-destructive border-destructive/20",
};

export function ApplicationStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        applicationStatusStyles[status] ?? "bg-muted text-muted-foreground",
      )}
    >
      {applicationStatusLabels[status] ?? status}
    </span>
  );
}

export function JobStatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        jobStatusStyles[status] ?? "bg-muted text-muted-foreground",
      )}
    >
      {jobStatusLabels[status] ?? status}
    </span>
  );
}
