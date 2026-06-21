import { notFound } from "next/navigation";
import {
  MapPin,
  Clock,
  Building2,
  Calendar,
  Banknote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LinkButton } from "@/components/shared/link-button";
import { Separator } from "@/components/ui/separator";
import { jobService } from "@/server/services/job.service";
import { getSession } from "@/lib/auth/session";
import { savedJobService } from "@/server/services/application.service";
import {
  formatCurrency,
  formatDate,
  employmentTypeLabels,
  experienceLevelLabels,
} from "@/lib/format";
import { ApplyButton } from "@/features/applications/apply-button";
import { SaveJobButton } from "@/features/applications/save-job-button";

interface JobDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = await jobService.getById(id);

  if (!job || job.status !== "PUBLISHED") {
    notFound();
  }

  const session = await getSession();
  const isSaved = session?.user
    ? await savedJobService.isSaved(session.user.id, job.id)
    : false;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-xl border border-border/50 bg-card/60 p-8 backdrop-blur-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Badge className="mb-3">{job.category}</Badge>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="mt-2 flex items-center gap-2 text-muted-foreground">
              <Building2 className="size-4" />
              {job.company.name}
            </p>
          </div>
          <div className="flex gap-2">
            {session?.user && (
              <SaveJobButton jobId={job.id} initialSaved={isSaved} />
            )}
            {session?.user ? (
              <ApplyButton jobId={job.id} />
            ) : (
              <LinkButton href={`/sign-in?callbackUrl=/jobs/${job.id}`}>
                Sign in to Apply
              </LinkButton>
            )}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="size-4" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="size-4" />
            {employmentTypeLabels[job.employmentType]}
          </span>
          <span className="flex items-center gap-1">
            <Banknote className="size-4" />
            {job.salary
              ? `${formatCurrency(job.salary)}${job.salaryNegotiable ? " (Negotiable)" : ""}`
              : "Not specified"}
          </span>
          {job.applicationDeadline && (
            <span className="flex items-center gap-1">
              <Calendar className="size-4" />
              Apply by {formatDate(job.applicationDeadline)}
            </span>
          )}
        </div>

        <Badge variant="outline" className="mt-4">
          {experienceLevelLabels[job.experienceLevel]}
        </Badge>

        <Separator className="my-8" />

        <section>
          <h2 className="text-lg font-semibold">Description</h2>
          <p className="mt-3 whitespace-pre-wrap text-muted-foreground">
            {job.description}
          </p>
        </section>

        {job.requirements && (
          <section className="mt-8">
            <h2 className="text-lg font-semibold">Requirements</h2>
            <p className="mt-3 whitespace-pre-wrap text-muted-foreground">
              {job.requirements}
            </p>
          </section>
        )}

        {job.benefits && (
          <section className="mt-8">
            <h2 className="text-lg font-semibold">Benefits</h2>
            <p className="mt-3 whitespace-pre-wrap text-muted-foreground">
              {job.benefits}
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
