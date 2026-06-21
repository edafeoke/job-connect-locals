import DOMPurify from "isomorphic-dompurify";
import { cn } from "@/lib/utils";

const HTML_TAG_PATTERN = /<[a-z][\s\S]*>/i;

export function sanitizeRichText(html: string) {
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
  });
}

export function isRichTextHtml(content: string) {
  return HTML_TAG_PATTERN.test(content);
}

export function RichTextContent({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  if (!content.trim()) return null;

  if (!isRichTextHtml(content)) {
    return (
      <p className={cn("whitespace-pre-wrap leading-relaxed text-muted-foreground", className)}>
        {content}
      </p>
    );
  }

  const sanitized = sanitizeRichText(content);

  return (
    <div
      className={cn(
        "prose prose-sm max-w-none text-muted-foreground prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
