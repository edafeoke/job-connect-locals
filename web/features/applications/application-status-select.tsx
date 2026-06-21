"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateApplicationStatusAction } from "@/server/actions/index";
import { applicationStatusLabels } from "@/lib/format";
import { toast } from "sonner";
import type { ApplicationStatus } from "@prisma/client";

const statuses: ApplicationStatus[] = [
  "APPLIED",
  "UNDER_REVIEW",
  "INTERVIEW_SCHEDULED",
  "ACCEPTED",
  "REJECTED",
];

export function ApplicationStatusSelect({
  applicationId,
  currentStatus,
}: {
  applicationId: string;
  currentStatus: ApplicationStatus;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleChange(status: ApplicationStatus) {
    startTransition(async () => {
      const result = await updateApplicationStatusAction(applicationId, status);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("Status updated");
      router.refresh();
    });
  }

  return (
    <Select defaultValue={currentStatus} onValueChange={(v) => handleChange(v as ApplicationStatus)} disabled={pending}>
      <SelectTrigger className="w-44">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((s) => (
          <SelectItem key={s} value={s}>{applicationStatusLabels[s]}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
