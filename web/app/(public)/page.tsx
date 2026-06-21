import Link from "next/link";
import { ArrowRight, Search, Briefcase, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/shared/link-button";
import { Input } from "@/components/ui/input";
import { JobCard } from "@/components/shared/job-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { jobService } from "@/server/services/job.service";
import { companyRepository } from "@/server/repositories/company.repository";
import { applicationRepository } from "@/server/repositories/application.repository";
import { jobRepository } from "@/server/repositories/job.repository";

export default async function HomePage() {
  const [featuredJobs, categoryCounts, jobCount, companyCount, applicationCount] =
    await Promise.all([
      jobService.getFeatured(6),
      jobService.getCategoryCounts(),
      jobRepository.countPublished(),
      companyRepository.count(),
      applicationRepository.count(),
    ]);

  const stats = [
    { label: "Active Jobs", value: jobCount, icon: Briefcase },
    { label: "Companies", value: companyCount, icon: Building2 },
    { label: "Applications", value: applicationCount, icon: Users },
  ];

  const steps = [
    {
      step: "01",
      title: "Create your profile",
      description: "Sign up once — use the same account to apply for jobs or post openings.",
    },
    {
      step: "02",
      title: "Find or post jobs",
      description: "Browse local opportunities or create a company profile and publish listings.",
    },
    {
      step: "03",
      title: "Apply & hire",
      description: "Apply with your CV, track status, and schedule interviews — all in one place.",
    },
  ];

  const testimonials = [
    {
      quote: "Found my secretary role in Warri within a week. The process was simple and direct.",
      author: "Blessing O.",
      role: "Job Seeker",
    },
    {
      quote: "We filled three positions quickly. Managing applicants from one dashboard saved us hours.",
      author: "Emeka N.",
      role: "Employer, Delta Enterprises",
    },
    {
      quote: "Finally a platform focused on local jobs in Nigeria. Salary in Naira, locations I know.",
      author: "Fatima A.",
      role: "Job Seeker, Lagos",
    },
  ];

  const faqs = [
    {
      q: "Is JobConnect Locals free?",
      a: "Yes! Creating an account, browsing jobs, and applying is free. Premium features for employers and job seekers are coming soon.",
    },
    {
      q: "Can I both apply for jobs and post jobs?",
      a: "Absolutely. One account works for both — create a seeker profile and a company profile whenever you're ready.",
    },
    {
      q: "How do I apply for a job?",
      a: "Sign in, complete your profile, upload your CV, and click Apply on any published job listing.",
    },
    {
      q: "How do employers receive applications?",
      a: "You'll get an in-app notification and email when someone applies. Review applicants from your employer dashboard.",
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4 py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find local jobs.
            <span className="block text-primary">Hire local talent.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            JobConnect Locals connects businesses and job seekers across Nigeria —
            from Warri to Lagos and beyond.
          </p>

          <form
            action="/jobs"
            method="GET"
            className="mx-auto mt-10 flex max-w-2xl flex-col gap-3 rounded-2xl border border-border/50 bg-card/60 p-4 shadow-lg backdrop-blur-sm sm:flex-row"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="q"
                placeholder="Job title or keyword"
                className="pl-10"
              />
            </div>
            <Input name="location" placeholder="Location (e.g. Warri)" className="sm:w-44" />
            <Button type="submit" size="lg">
              Search Jobs
            </Button>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <LinkButton href="/jobs" size="lg">
              Browse Jobs <ArrowRight className="ml-2 size-4" />
            </LinkButton>
            <LinkButton href="/sign-up" size="lg" variant="outline">
              Post a Job
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30 px-4 py-12">
        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-xl border border-border/50 bg-card/60 p-6 text-center backdrop-blur-sm"
            >
              <Icon className="mb-3 size-8 text-primary" />
              <p className="text-3xl font-bold">{value.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">How it works</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            Three simple steps to find your next opportunity or your next hire.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((item) => (
              <div
                key={item.step}
                className="rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm"
              >
                <span className="text-4xl font-bold text-primary/30">{item.step}</span>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">Featured Jobs</h2>
              <p className="mt-2 text-muted-foreground">Latest opportunities near you</p>
            </div>
            <LinkButton href="/jobs" variant="outline">
              View all
            </LinkButton>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">Popular Categories</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {categoryCounts.map(({ category, count }) => (
              <Link
                key={category}
                href={`/jobs?category=${encodeURIComponent(category)}`}
                className="rounded-full border border-border/50 bg-card/60 px-5 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
              >
                {category} ({count})
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-muted/30 px-4 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-3xl font-bold">What people say</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <blockquote
                key={t.author}
                className="rounded-xl border border-border/50 bg-card/60 p-6 backdrop-blur-sm"
              >
                <p className="text-sm italic text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                <footer className="mt-4">
                  <p className="font-semibold">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-4 py-20">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center text-3xl font-bold">Frequently asked questions</h2>
          <Accordion className="mt-10">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-10 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="mt-4 opacity-90">
            Join thousands of job seekers and employers on JobConnect Locals.
          </p>
          <LinkButton href="/sign-up" size="lg" variant="secondary" className="mt-8">
            Create free account
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
