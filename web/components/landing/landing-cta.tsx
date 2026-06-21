import { ArrowRight, Sparkles } from "lucide-react";
import { LinkButton } from "@/components/shared/link-button";
import { GridPattern } from "@/components/landing/decorations/grid-pattern";
import { RevealOnScroll } from "@/components/landing/reveal-on-scroll";

export function LandingCTA() {
  return (
    <section className="px-4 py-20 lg:py-24">
      <RevealOnScroll>
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 px-8 py-14 text-primary-foreground sm:px-12">
          <GridPattern className="opacity-30" dotClassName="fill-white/25" />

          <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:text-left">
            <div className="flex-1">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
                <Sparkles className="size-4" />
                Free to get started
              </div>
              <h2 className="text-3xl font-bold sm:text-4xl">Ready to get started?</h2>
              <p className="mt-4 max-w-lg text-lg text-primary-foreground/90">
                Join thousands of job seekers and employers on JobConnect Locals.
              </p>
            </div>

            <div className="hidden shrink-0 lg:block">
              <div className="flex size-32 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                <svg viewBox="0 0 80 80" className="size-20 text-white/80" aria-hidden="true">
                  <rect x="8" y="16" width="64" height="48" rx="6" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M8 28h64" stroke="currentColor" strokeWidth="2" />
                  <circle cx="18" cy="22" r="3" fill="currentColor" opacity="0.6" />
                  <circle cx="28" cy="22" r="3" fill="currentColor" opacity="0.4" />
                  <rect x="16" y="36" width="32" height="4" rx="2" fill="currentColor" opacity="0.5" />
                  <rect x="16" y="46" width="48" height="4" rx="2" fill="currentColor" opacity="0.3" />
                  <rect x="16" y="56" width="24" height="4" rx="2" fill="currentColor" opacity="0.3" />
                </svg>
              </div>
            </div>

            <LinkButton
              href="/sign-up"
              size="lg"
              variant="secondary"
              className="shrink-0 transition-transform hover:scale-105"
            >
              Create free account
              <ArrowRight className="ml-2 size-4" />
            </LinkButton>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
