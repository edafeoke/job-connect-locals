import { cn } from "@/lib/utils";

interface SectionCardProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
  contentClassName,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
        className,
      )}
    >
      {(title || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
          <div>
            {title && <h2 className="font-semibold">{title}</h2>}
            {description && (
              <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          {action}
        </div>
      )}
      <div className={cn("p-5", contentClassName)}>{children}</div>
    </div>
  );
}
