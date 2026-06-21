import { notFound } from "next/navigation";
import {
  MapPin,
  Clock,
  Building2,
  Calendar,
  Banknote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
    <div className="dashboard-surface min-h-[60vh]">
      <div className="border-b border-border bg-primary px-4 py-10 text-primary-foreground sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <Avatar className="size-16 shrink-0 rounded-xl border-2 border-white/20">
              <AvatarFallback className="rounded-xl bg-white/15 text-2xl font-bold text-white">
                {job.company.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <Badge className="mb-2 border-white/20 bg-white/15 text-white hover:bg-white/20">
                {job.category}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight">{job.title}</h1>
              <p className="mt-2 flex items-center gap-2 text-primary-foreground/80">
                <Building2 className="size-4" />
                {job.company.name}
              </p>
            </div>
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
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 font-medium">
              <MapPin className="size-4 text-primary" />
              {job.location}
            </span>
            <span className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 font-medium">
              <Clock className="size-4 text-primary" />
              {employmentTypeLabels[job.employmentType]}
            </span>
            <span className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 font-medium">
              <Banknote className="size-4 text-primary" />
              {job.salary
                ? `${formatCurrency(job.salary)}${job.salaryNegotiable ? " (Negotiable)" : ""}`
                : "Not specified"}
            </span>
            {job.applicationDeadline && (
              <span className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 font-medium">
                <Calendar className="size-4 text-primary" />
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
            <p className="mt-3 whitespace-pre-wrap text-muted-foreground leading-relaxed">
              {job.description}
            </p>
          </section>

          {job.requirements && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold">Requirements</h2>
              <p className="mt-3 whitespace-pre-wrap text-muted-foreground leading-relaxed">
                {job.requirements}
              </p>
            </section>
          )}

          {job.benefits && (
            <section className="mt-8">
              <h2 className="text-lg font-semibold">Benefits</h2>
              <p className="mt-3 whitespace-pre-wrap text-muted-foreground leading-relaxed">
                {job.benefits}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
