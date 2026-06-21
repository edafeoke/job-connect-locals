"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/shared/rich-text-editor";
import { Label } from "@/components/ui/label";
import { SectionCard } from "@/components/layout/section-card";
import { createCompanyAction, updateCompanyAction } from "@/server/actions/index";
import { toast } from "sonner";
import type { Company } from "@prisma/client";

export function CompanyForm({ company }: { company?: Company }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = company
        ? await updateCompanyAction(company.id, formData)
        : await createCompanyAction(formData);

      if (result.error) {
        toast.error("Failed to save company");
        return;
      }
      toast.success(company ? "Company updated" : "Company created");
      router.push("/dashboard/employer/jobs");
      router.refresh();
    });
  }

  return (
    <SectionCard title={company ? "Company Details" : "Create Company"} className="max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Company Name</Label>
          <Input id="name" name="name" defaultValue={company?.name} required className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <RichTextEditor
            name="description"
            defaultValue={company?.description ?? ""}
            placeholder="Tell candidates about your company..."
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" defaultValue={company?.location ?? ""} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input id="industry" name="industry" defaultValue={company?.industry ?? ""} className="mt-1.5" />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="website">Website</Label>
            <Input id="website" name="website" type="url" defaultValue={company?.website ?? ""} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="size">Company Size</Label>
            <Input id="size" name="size" placeholder="e.g. 10-50" defaultValue={company?.size ?? ""} className="mt-1.5" />
          </div>
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : company ? "Update Company" : "Create Company"}
        </Button>
      </form>
    </SectionCard>
  );
}
