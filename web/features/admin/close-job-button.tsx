"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { adminCloseJobAction } from "@/server/actions/index";
import { toast } from "sonner";

export function CloseJobButton({ jobId }: { jobId: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const result = await adminCloseJobAction(jobId);
          if (result.error) {
            toast.error(result.error);
            return;
          }
          toast.success("Job closed");
          router.refresh();
        })
      }
    >
      Force Close
    </Button>
  );
}
