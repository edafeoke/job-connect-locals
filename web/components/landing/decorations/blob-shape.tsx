import { cn } from "@/lib/utils";

export function BlobShape({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("absolute", className)}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        className="text-primary/15"
        d="M45.7,-58.1C58.9,-47.2,68.8,-31.8,72.4,-14.9C76,2,73.3,21.4,63.1,36.2C52.9,51,35.2,61.2,16.4,65.8C-2.4,70.4,-22.3,69.4,-38.8,60.8C-55.3,52.2,-68.4,36,-73.8,17.5C-79.2,-1,-77,-22.3,-66.9,-38.5C-56.8,-54.7,-39.8,-65.8,-21.8,-69.5C-3.8,-73.2,15.2,-69.5,32.5,-61.2L45.7,-58.1Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
