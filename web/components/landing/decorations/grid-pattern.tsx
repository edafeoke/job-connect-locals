import { cn } from "@/lib/utils";

export function GridPattern({
  className,
  dotClassName = "fill-primary/10",
}: {
  className?: string;
  dotClassName?: string;
}) {
  return (
    <svg
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden="true"
    >
      <defs>
        <pattern id="landing-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" className={dotClassName} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#landing-grid)" />
    </svg>
  );
}
