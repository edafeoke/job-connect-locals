"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { Label } from "@/components/ui/label";
import { scheduleInterviewAction } from "@/server/actions/index";
import { toast } from "sonner";

export function ScheduleInterviewForm({ applicationId }: { applicationId: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("applicationId", applicationId);

    startTransition(async () => {
      const result = await scheduleInterviewAction(formData);
      if (result.error) {
        toast.error("Failed to schedule interview");
        return;
      }
      toast.success("Interview scheduled");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-4">
      <h3 className="font-semibold">Schedule Interview</h3>
      <div>
        <Label htmlFor="scheduledAt">Date & Time</Label>
        <Input id="scheduledAt" name="scheduledAt" type="datetime-local" required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" placeholder="Office address" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="meetingLink">Meeting Link</Label>
        <Input id="meetingLink" name="meetingLink" type="url" placeholder="https://..." className="mt-1" />
      </div>
      <div>
        <Label htmlFor="notes">Notes</Label>
        <RichTextEditor
          name="notes"
          placeholder="Add interview details or instructions..."
        />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Scheduling..." : "Schedule Interview"}
      </Button>
    </form>
  );
}
