import Link from "next/link";
import {
  Briefcase,
  Code2,
  GraduationCap,
  HeartPulse,
  Megaphone,
  Shield,
  TrendingUp,
  UtensilsCrossed,
  Wallet,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import { RevealOnScroll } from "@/components/landing/reveal-on-scroll";
import { SectionHeader } from "@/components/landing/section-header";

const categoryIcons: Record<string, LucideIcon> = {
  Administration: Briefcase,
  "Customer Service": Headphones,
  Education: GraduationCap,
  Engineering: Code2,
  Finance: Wallet,
  Healthcare: HeartPulse,
  Hospitality: UtensilsCrossed,
  "IT & Software": Code2,
  Marketing: Megaphone,
  Sales: TrendingUp,
  Security: Shield,
  Other: Briefcase,
};

interface CategoryCount {
  category: string;
  count: number;
}

interface LandingCategoriesProps {
  categories: CategoryCount[];
}

export function LandingCategories({ categories }: LandingCategoriesProps) {
  return (
    <section className="px-4 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <RevealOnScroll>
          <SectionHeader
            eyebrow="Explore"
            title="Popular Categories"
            description="Find roles across industries that matter in your community."
          />
        </RevealOnScroll>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map(({ category, count }, i) => {
            const Icon = categoryIcons[category] ?? Briefcase;
            return (
              <RevealOnScroll key={category} delay={i * 60}>
                <Link
                  href={`/jobs?category=${encodeURIComponent(category)}`}
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{category}</p>
                    <p className="text-sm text-muted-foreground">
                      {count} job{count !== 1 ? "s" : ""}
                    </p>
                  </div>
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
