import type { Company, Job } from "@prisma/client";
import { JobCard } from "@/components/shared/job-card";
import { LinkButton } from "@/components/shared/link-button";
import { RevealOnScroll } from "@/components/landing/reveal-on-scroll";
import { SectionHeader } from "@/components/landing/section-header";

type JobWithCompany = Job & { company: Company };

interface LandingFeaturedJobsProps {
  jobs: JobWithCompany[];
}

export function LandingFeaturedJobs({ jobs }: LandingFeaturedJobsProps) {
  return (
    <section className="bg-muted/30 px-4 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <RevealOnScroll>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeader
              align="left"
              eyebrow="Opportunities"
              title="Featured Jobs"
              description="Latest opportunities near you"
              className="mx-0"
            />
            <LinkButton href="/jobs" variant="outline" className="shrink-0">
              View all
            </LinkButton>
          </div>
        </RevealOnScroll>

        {jobs.length === 0 ? (
          <RevealOnScroll delay={100}>
            <div className="mt-10 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
              <p className="text-muted-foreground">No featured jobs yet. Check back soon!</p>
              <LinkButton href="/jobs" variant="link" className="mt-2">
                Browse all jobs
              </LinkButton>
            </div>
          </RevealOnScroll>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job, i) => (
              <RevealOnScroll key={job.id} delay={i * 80}>
                <JobCard job={job} />
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
