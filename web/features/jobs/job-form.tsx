"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  employmentTypes,
  experienceLevels,
  jobCategories,
} from "@/lib/validations/job";
import {
  employmentTypeLabels,
  experienceLevelLabels,
} from "@/lib/format";
import { createJobAction, updateJobAction } from "@/server/actions/index";
import { toast } from "sonner";
import type { Job } from "@prisma/client";

export function JobForm({
  companyId,
  job,
}: {
  companyId: string;
  job?: Job;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.set("companyId", companyId);

    startTransition(async () => {
      const result = job
        ? await updateJobAction(job.id, formData)
        : await createJobAction(formData);

      if (result.error) {
        toast.error("Failed to save job");
        return;
      }
      toast.success(job ? "Job updated" : "Job created as draft");
      router.push("/dashboard/employer/jobs");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Job Title</Label>
        <Input id="title" name="title" defaultValue={job?.title} required className="mt-1" />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={job?.description} rows={6} required className="mt-1" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="salary">Salary (₦)</Label>
          <Input id="salary" name="salary" type="number" defaultValue={job?.salary ?? ""} className="mt-1" />
        </div>
        <div className="flex items-end gap-2 pb-2">
          <Checkbox id="salaryNegotiable" name="salaryNegotiable" defaultChecked={job?.salaryNegotiable} />
          <Label htmlFor="salaryNegotiable">Negotiable</Label>
        </div>
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input id="location" name="location" defaultValue={job?.location} required className="mt-1" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="employmentType">Employment Type</Label>
          <select
            id="employmentType"
            name="employmentType"
            defaultValue={job?.employmentType ?? "FULL_TIME"}
            className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
          >
            {employmentTypes.map((t) => (
              <option key={t} value={t}>{employmentTypeLabels[t]}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="experienceLevel">Experience Level</Label>
          <select
            id="experienceLevel"
            name="experienceLevel"
            defaultValue={job?.experienceLevel ?? "MID"}
            className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
          >
            {experienceLevels.map((l) => (
              <option key={l} value={l}>{experienceLevelLabels[l]}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          name="category"
          defaultValue={job?.category ?? jobCategories[0]}
          className="mt-1 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs"
        >
          {jobCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <Label htmlFor="requirements">Requirements</Label>
        <Textarea id="requirements" name="requirements" defaultValue={job?.requirements ?? ""} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="benefits">Benefits</Label>
        <Textarea id="benefits" name="benefits" defaultValue={job?.benefits ?? ""} className="mt-1" />
      </div>
      <div>
        <Label htmlFor="applicationDeadline">Application Deadline</Label>
        <Input id="applicationDeadline" name="applicationDeadline" type="date" defaultValue={job?.applicationDeadline ? new Date(job.applicationDeadline).toISOString().split("T")[0] : ""} className="mt-1" />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : job ? "Update Job" : "Create Job"}
      </Button>
    </form>
  );
}
