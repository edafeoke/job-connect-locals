import Link from "next/link";
import { MapPin, Clock, Building2, Banknote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  formatCurrency,
  employmentTypeLabels,
  experienceLevelLabels,
} from "@/lib/format";
import type { Company, Job } from "@prisma/client";

type JobWithCompany = Job & { company: Company };

export function JobCard({ job }: { job: JobWithCompany }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:border-primary/30 hover:shadow-md">
      <div className="p-5">
        <div className="flex items-start gap-4">
          <Avatar className="size-12 shrink-0 rounded-xl">
            <AvatarFallback className="rounded-xl bg-primary/10 text-base font-bold text-primary">
              {job.company.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-semibold leading-tight">
                  <Link
                    href={`/jobs/${job.id}`}
                    className="transition-colors hover:text-primary"
                  >
                    {job.title}
                  </Link>
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Building2 className="size-3.5 shrink-0" />
                  {job.company.name}
                </p>
              </div>
              <Badge variant="secondary" className="shrink-0 font-medium">
                {job.category}
              </Badge>
            </div>

            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="size-3.5" />
                {employmentTypeLabels[job.employmentType]}
              </span>
              <span className="flex items-center gap-1.5">
                <Banknote className="size-3.5" />
                {job.salary
                  ? `${formatCurrency(job.salary)}${job.salaryNegotiable ? " · Negotiable" : ""}`
                  : "Salary not specified"}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs font-medium text-muted-foreground">
                {experienceLevelLabels[job.experienceLevel]}
              </span>
              <Link
                href={`/jobs/${job.id}`}
                className="text-sm font-semibold text-primary transition-colors hover:text-primary/80"
              >
                View Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
