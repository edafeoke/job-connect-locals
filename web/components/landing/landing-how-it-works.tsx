import { Handshake, Search, UserPlus } from "lucide-react";
import { landingSteps } from "@/components/landing/landing-content";
import { StepConnector } from "@/components/landing/decorations/step-connector";
import { RevealOnScroll } from "@/components/landing/reveal-on-scroll";
import { SectionHeader } from "@/components/landing/section-header";

const stepIcons = [UserPlus, Search, Handshake] as const;

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="Simple process"
            title="How it works"
            description="Three simple steps to find your next opportunity or your next hire."
          />
        </RevealOnScroll>

        <div className="relative mt-14 grid gap-8 md:grid-cols-3">
          <StepConnector className="absolute left-[16.67%] right-[16.67%] top-10 w-auto text-primary/25" />

          {landingSteps.map((item, i) => {
            const Icon = stepIcons[i];
            return (
              <RevealOnScroll key={item.step} delay={i * 120}>
                <div className="group relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
                  <span className="absolute right-4 top-4 text-4xl font-bold text-primary/10">
                    {item.step}
                  </span>
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
