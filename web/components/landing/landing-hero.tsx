import Image from "next/image";
import { ArrowRight, Bell, Briefcase, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/shared/link-button";
import { Input } from "@/components/ui/input";
import { BlobShape } from "@/components/landing/decorations/blob-shape";
import { GridPattern } from "@/components/landing/decorations/grid-pattern";

export function LandingHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 px-4 py-16 sm:py-20 lg:py-28">
      <GridPattern className="opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <span className="size-2 rounded-full bg-primary animate-pulse-dot" />
            Nigeria&apos;s local job platform
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Find local jobs.
            <span className="mt-1 block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Hire local talent.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            JobConnect Locals connects businesses and job seekers across Nigeria —
            from Warri to Lagos and beyond.
          </p>

          <form
            action="/jobs"
            method="GET"
            className="mt-8 flex max-w-xl flex-col gap-3 rounded-2xl border border-border/60 bg-card p-4 shadow-xl sm:flex-row sm:items-center"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="q"
                placeholder="Job title or keyword"
                className="h-12 pl-10"
              />
            </div>
            <Input
              name="location"
              placeholder="Location (e.g. Warri)"
              className="h-12 sm:w-44"
            />
            <Button type="submit" size="lg" className="h-12 px-6">
              Search Jobs
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            <LinkButton href="/jobs" size="lg">
              Browse Jobs <ArrowRight className="ml-2 size-4" />
            </LinkButton>
            <LinkButton href="/sign-up" size="lg" variant="outline">
              Post a Job
            </LinkButton>
          </div>

          <p className="mt-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 shrink-0 text-primary" />
            <span>Warri · Lagos · Port Harcourt · Abuja</span>
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-lg animate-fade-up landing-stagger-2 lg:max-w-none">
          <BlobShape className="-right-8 -top-8 size-72 text-primary/20" />
          <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl ring-1 ring-primary/10">
            <Image
              src="/auth-brand-panel.png"
              alt="Professionals collaborating at work"
              width={640}
              height={480}
              className="aspect-[4/3] w-full object-cover"
              priority
            />
          </div>

          <div className="absolute -left-4 top-8 hidden w-56 animate-float rounded-xl border border-border bg-card p-4 shadow-lg lg:block">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Briefcase className="size-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">Secretary</p>
                <p className="text-xs text-muted-foreground">Delta Enterprises</p>
                <p className="mt-1 text-xs font-medium text-primary">Warri · Full-time</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-2 bottom-12 hidden animate-float-delayed items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 shadow-lg lg:flex">
            <div className="flex size-8 items-center justify-center rounded-full bg-success/10 text-success">
              <Bell className="size-4" />
            </div>
            <p className="text-sm font-medium">New application received</p>
          </div>
        </div>
      </div>
    </section>
  );
}
