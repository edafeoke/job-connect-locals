"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  employmentTypes,
  experienceLevels,
  jobCategories,
} from "@/lib/validations/job";
import {
  employmentTypeLabels,
  experienceLevelLabels,
} from "@/lib/format";
import { cn } from "@/lib/utils";

export function JobFilters({ layout = "bar" }: { layout?: "bar" | "sidebar" }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`/jobs?${params.toString()}`);
    },
    [router, searchParams],
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      if (value) params.set(key, value.toString());
    }
    router.push(`/jobs?${params.toString()}`);
  }

  if (layout === "sidebar") {
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="q" className="text-xs font-semibold uppercase text-muted-foreground">Keyword</Label>
          <Input id="q" name="q" placeholder="Job title..." defaultValue={searchParams.get("q") ?? ""} className="mt-1.5" />
        </div>
        <div>
          <Label htmlFor="location" className="text-xs font-semibold uppercase text-muted-foreground">Location</Label>
          <Input id="location" name="location" placeholder="City..." defaultValue={searchParams.get("location") ?? ""} className="mt-1.5" />
        </div>
        <div>
          <Label className="text-xs font-semibold uppercase text-muted-foreground">Category</Label>
          <Select defaultValue={searchParams.get("category") ?? "all"} onValueChange={(v) => updateParams("category", v === "all" || !v ? "" : v)}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {jobCategories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs font-semibold uppercase text-muted-foreground">Experience</Label>
          <Select defaultValue={searchParams.get("experience") ?? "all"} onValueChange={(v) => updateParams("experience", v === "all" || !v ? "" : v)}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Experience" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              {experienceLevels.map((l) => (<SelectItem key={l} value={l}>{experienceLevelLabels[l]}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs font-semibold uppercase text-muted-foreground">Job Type</Label>
          <Select defaultValue={searchParams.get("type") ?? "all"} onValueChange={(v) => updateParams("type", v === "all" || !v ? "" : v)}>
            <SelectTrigger className="mt-1.5"><SelectValue placeholder="Job type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              {employmentTypes.map((t) => (<SelectItem key={t} value={t}>{employmentTypeLabels[t]}</SelectItem>))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">Apply Filters</Button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-6"
    >
      <Input name="q" placeholder="Search jobs..." defaultValue={searchParams.get("q") ?? ""} className="lg:col-span-2" />
      <Input name="location" placeholder="Location" defaultValue={searchParams.get("location") ?? ""} />
      <Select defaultValue={searchParams.get("category") ?? "all"} onValueChange={(v) => updateParams("category", v === "all" || !v ? "" : v)}>
        <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {jobCategories.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}
        </SelectContent>
      </Select>
      <Select defaultValue={searchParams.get("experience") ?? "all"} onValueChange={(v) => updateParams("experience", v === "all" || !v ? "" : v)}>
        <SelectTrigger><SelectValue placeholder="Experience" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All levels</SelectItem>
          {experienceLevels.map((l) => (<SelectItem key={l} value={l}>{experienceLevelLabels[l]}</SelectItem>))}
        </SelectContent>
      </Select>
      <Select defaultValue={searchParams.get("type") ?? "all"} onValueChange={(v) => updateParams("type", v === "all" || !v ? "" : v)}>
        <SelectTrigger><SelectValue placeholder="Job type" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All types</SelectItem>
          {employmentTypes.map((t) => (<SelectItem key={t} value={t}>{employmentTypeLabels[t]}</SelectItem>))}
        </SelectContent>
      </Select>
      <Button type="submit" className={cn("sm:col-span-2 lg:col-span-1")}>Filter</Button>
    </form>
  );
}
