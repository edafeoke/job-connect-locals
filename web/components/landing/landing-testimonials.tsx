import { landingTestimonials } from "@/components/landing/landing-content";
import { QuoteIcon } from "@/components/landing/decorations/quote-icon";
import { RevealOnScroll } from "@/components/landing/reveal-on-scroll";
import { SectionHeader } from "@/components/landing/section-header";

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="size-4 fill-warning text-warning" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function LandingTestimonials() {
  return (
    <section className="bg-muted/30 px-4 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="Testimonials"
            title="What people say"
            description="Real stories from job seekers and employers across Nigeria."
          />
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {landingTestimonials.map((t, i) => (
            <RevealOnScroll key={t.author} delay={i * 100}>
              <blockquote className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
                <QuoteIcon className="mb-4" />
                <StarRating />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-sm font-bold text-primary-foreground">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold">{t.author}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
