import { Briefcase, Building2, Users, type LucideIcon } from "lucide-react";
import { StatCard } from "@/components/layout/stat-card";
import { AnimatedCounter } from "@/components/landing/animated-counter";
import { RevealOnScroll } from "@/components/landing/reveal-on-scroll";

interface StatItem {
  label: string;
  value: number;
  icon: LucideIcon;
  variant: "blue" | "green" | "amber";
}

interface LandingStatsProps {
  jobCount: number;
  companyCount: number;
  applicationCount: number;
}

export function LandingStats({
  jobCount,
  companyCount,
  applicationCount,
}: LandingStatsProps) {
  const stats: StatItem[] = [
    { label: "Active Jobs", value: jobCount, icon: Briefcase, variant: "blue" },
    { label: "Companies", value: companyCount, icon: Building2, variant: "green" },
    { label: "Applications", value: applicationCount, icon: Users, variant: "amber" },
  ];

  return (
    <section className="dashboard-surface border-y px-4 py-14">
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
        {stats.map(({ label, value, icon, variant }, i) => (
          <RevealOnScroll key={label} delay={i * 100}>
            <StatCard
              label={label}
              value={<AnimatedCounter value={value} />}
              icon={icon}
              variant={variant}
              className="transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md"
            />
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
