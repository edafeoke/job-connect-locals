"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { applyToJobAction } from "@/server/actions/index";
import { toast } from "sonner";

export function ApplyButton({ jobId }: { jobId: string }) {
  const [open, setOpen] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleApply() {
    startTransition(async () => {
      const formData = new FormData();
      formData.set("jobId", jobId);
      formData.set("coverLetter", coverLetter);
      const result = await applyToJobAction(formData);
      if (result.error) {
        toast.error(typeof result.error === "string" ? result.error : "Failed to apply");
        return;
      }
      toast.success("Application submitted!");
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Apply Now</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for this job</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your profile and CV will be shared with the employer.
          </p>
          <div>
            <Label htmlFor="coverLetter">Cover Letter (optional)</Label>
            <Textarea
              id="coverLetter"
              className="mt-2"
              rows={5}
              placeholder="Tell the employer why you're a great fit..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />
          </div>
          <Button onClick={handleApply} disabled={pending} className="w-full">
            {pending ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
