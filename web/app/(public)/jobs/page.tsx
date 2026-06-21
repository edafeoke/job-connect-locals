import { Suspense } from "react";
import { Search } from "lucide-react";
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
    <div className="dashboard-surface min-h-[60vh]">
      <div className="border-b border-border bg-primary px-4 py-10 text-primary-foreground sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight">Find Your Next Job</h1>
          <p className="mt-2 max-w-xl text-primary-foreground/80">
            Browse local opportunities across Nigeria
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <aside className="lg:w-72 lg:shrink-0">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-4 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 font-semibold">
                <Search className="size-4 text-primary" />
                Filters
              </h2>
              <Suspense>
                <JobFilters layout="sidebar" />
              </Suspense>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-6 flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 shadow-sm">
              <p className="text-sm font-medium">
                <span className="text-primary">{total}</span> job{total !== 1 ? "s" : ""} found
              </p>
              {page > 1 && (
                <p className="text-xs text-muted-foreground">Page {page} of {totalPages}</p>
              )}
            </div>

            {jobs.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-card py-16 text-center">
                <p className="text-muted-foreground">No jobs match your filters.</p>
                <LinkButton href="/jobs" variant="link" className="mt-2">
                  Clear filters
                </LinkButton>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
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
        </div>
      </div>
    </div>
  );
}
