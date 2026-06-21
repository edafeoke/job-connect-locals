import Link from "next/link";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 font-semibold", className)}>
      <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Briefcase className="size-4" />
      </span>
      <span className="text-lg tracking-tight">
        JobConnect <span className="text-primary">Locals</span>
      </span>
    </Link>
  );
}
