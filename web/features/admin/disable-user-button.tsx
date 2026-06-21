"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { adminDisableUserAction } from "@/server/actions/index";
import { toast } from "sonner";

export function DisableUserButton({ userId }: { userId: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          const result = await adminDisableUserAction(userId);
          if (result.error) {
            toast.error(result.error);
            return;
          }
          toast.success("User disabled");
          router.refresh();
        })
      }
    >
      Disable
    </Button>
  );
}
