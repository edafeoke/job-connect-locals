import Link from "next/link";
import { Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "light";
}) {
  const isLight = variant === "light";

  return (
    <Link href="/" className={cn("flex items-center gap-2.5 font-bold", className)}>
      <span
        className={cn(
          "flex size-9 items-center justify-center rounded-xl shadow-sm",
          isLight ? "bg-white/15 text-white" : "bg-primary text-primary-foreground",
        )}
      >
        <Briefcase className="size-4" />
      </span>
      <span className={cn("text-lg tracking-tight", isLight && "text-white")}>
        JobConnect{" "}
        <span className={isLight ? "text-white/90" : "text-primary"}>Locals</span>
      </span>
    </Link>
  );
}
