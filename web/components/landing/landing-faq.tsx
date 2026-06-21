import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { landingFaqs } from "@/components/landing/landing-content";
import { RevealOnScroll } from "@/components/landing/reveal-on-scroll";
import { SectionHeader } from "@/components/landing/section-header";

export function LandingFAQ() {
  return (
    <section id="faq" className="px-4 py-20 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="Support"
            title="Frequently asked questions"
            description="Everything you need to know about getting started."
          />
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <Accordion className="mt-10">
            {landingFaqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left font-medium">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </RevealOnScroll>
      </div>
    </section>
  );
}
