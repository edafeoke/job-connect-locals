import Link from "next/link";
import { MapPin, Clock, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  formatCurrency,
  employmentTypeLabels,
  experienceLevelLabels,
} from "@/lib/format";
import type { Company, Job } from "@prisma/client";

type JobWithCompany = Job & { company: Company };

export function JobCard({ job }: { job: JobWithCompany }) {
  return (
    <Card className="group transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-lg">
              <Link
                href={`/jobs/${job.id}`}
                className="hover:text-primary transition-colors"
              >
                {job.title}
              </Link>
            </CardTitle>
            <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
              <Building2 className="size-3.5" />
              {job.company.name}
            </p>
          </div>
          <Badge variant="secondary">{job.category}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="size-3.5" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" />
            {employmentTypeLabels[job.employmentType]}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {job.salary ? (
              <p className="font-semibold text-primary">
                {formatCurrency(job.salary)}
                {job.salaryNegotiable && (
                  <span className="ml-1 text-xs font-normal text-muted-foreground">
                    (Negotiable)
                  </span>
                )}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">Salary not specified</p>
            )}
            <p className="text-xs text-muted-foreground">
              {experienceLevelLabels[job.experienceLevel]}
            </p>
          </div>
          <Link
            href={`/jobs/${job.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            View →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
