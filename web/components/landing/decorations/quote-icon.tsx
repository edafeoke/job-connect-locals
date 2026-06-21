import { cn } from "@/lib/utils";

export function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("size-10 text-primary/20", className)}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M14 28c0-5.5 3.5-10.3 8.5-12.2L20 10C10.6 12.8 4 21.4 4 31v5h14v-8H14zm22 0c0-5.5 3.5-10.3 8.5-12.2L42 10C32.6 12.8 26 21.4 26 31v5h14v-8H36z"
      />
    </svg>
  );
}
