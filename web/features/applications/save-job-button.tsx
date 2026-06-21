"use client";

import { useTransition } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toggleSavedJobAction } from "@/server/actions/index";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function SaveJobButton({
  jobId,
  initialSaved,
}: {
  jobId: string;
  initialSaved: boolean;
}) {
  const [pending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleSavedJobAction(jobId);
      if ("error" in result && result.error) {
        toast.error(result.error);
        return;
      }
      if ("saved" in result) {
        toast.success(result.saved ? "Job saved" : "Job removed from saved");
      }
    });
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleToggle}
      disabled={pending}
      aria-label={initialSaved ? "Remove from saved" : "Save job"}
    >
      <Heart
        className={cn("size-4", initialSaved && "fill-primary text-primary")}
      />
    </Button>
  );
}
