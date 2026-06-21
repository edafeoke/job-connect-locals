import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

const iconVariants = {
  blue: "bg-primary/10 text-primary",
  green: "bg-success/10 text-success",
  amber: "bg-warning/10 text-warning",
  slate: "bg-muted text-muted-foreground",
} as const;

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  icon: LucideIcon;
  variant?: keyof typeof iconVariants;
  className?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  variant = "blue",
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold tracking-tight">{value}</p>
        </div>
        <div
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl",
            iconVariants[variant],
          )}
        >
          <Icon className="size-5" />
        </div>
      </div>
    </div>
  );
}
