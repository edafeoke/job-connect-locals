import { Suspense } from "react";
import { JobCard } from "@/components/shared/job-card";
import { JobFilters } from "@/features/jobs/job-filters";
import { jobService } from "@/server/services/job.service";
import { jobSearchSchema } from "@/lib/validations/job";
import { LinkButton } from "@/components/shared/link-button";

export const metadata = {
  title: "Browse Jobs — JobConnect Locals",
};

interface JobsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const filters = jobSearchSchema.parse({
    q: params.q,
    location: params.location,
    category: params.category,
    salaryMin: params.salaryMin,
    experience: params.experience,
    type: params.type,
    page: params.page,
  });

  const { jobs, total, page, totalPages } = await jobService.search(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Browse Jobs</h1>
        <p className="mt-2 text-muted-foreground">
          {total} job{total !== 1 ? "s" : ""} found
        </p>
      </div>

      <Suspense>
        <JobFilters />
      </Suspense>

      {jobs.length === 0 ? (
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">No jobs match your filters.</p>
          <LinkButton href="/jobs" variant="link" className="mt-2">
            Clear filters
          </LinkButton>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {page > 1 && (
            <LinkButton
              href={`/jobs?${new URLSearchParams({ ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v ?? "")])), page: String(page - 1) }).toString()}`}
              variant="outline"
            >
              Previous
            </LinkButton>
          )}
          <span className="flex items-center px-4 text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          {page < totalPages && (
            <LinkButton
              href={`/jobs?${new URLSearchParams({ ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v ?? "")])), page: String(page + 1) }).toString()}`}
              variant="outline"
            >
              Next
            </LinkButton>
          )}
        </div>
      )}
    </div>
  );
}
