import { cn } from "@/lib/utils";

export function StepConnector({ className }: { className?: string }) {
  return (
    <svg
      className={cn("hidden md:block", className)}
      width="100%"
      height="24"
      viewBox="0 0 200 24"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="12"
        x2="200"
        y2="12"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="6 6"
        className="text-primary/25"
      />
    </svg>
  );
}
