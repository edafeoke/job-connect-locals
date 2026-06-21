"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

export function JobFilters() {
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

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 rounded-xl border border-border/50 bg-card/60 p-4 backdrop-blur-sm sm:grid-cols-2 lg:grid-cols-6"
    >
      <Input
        name="q"
        placeholder="Search jobs..."
        defaultValue={searchParams.get("q") ?? ""}
        className="lg:col-span-2"
      />
      <Input
        name="location"
        placeholder="Location"
        defaultValue={searchParams.get("location") ?? ""}
      />
      <Select
        defaultValue={searchParams.get("category") ?? ""}
        onValueChange={(v) => updateParams("category", v === "all" || !v ? "" : v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          {jobCategories.map((c) => (
            <SelectItem key={c} value={c}>
              {c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={searchParams.get("experience") ?? ""}
        onValueChange={(v) => updateParams("experience", v === "all" || !v ? "" : v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Experience" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All levels</SelectItem>
          {experienceLevels.map((l) => (
            <SelectItem key={l} value={l}>
              {experienceLevelLabels[l]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        defaultValue={searchParams.get("type") ?? ""}
        onValueChange={(v) => updateParams("type", v === "all" || !v ? "" : v)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Job type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All types</SelectItem>
          {employmentTypes.map((t) => (
            <SelectItem key={t} value={t}>
              {employmentTypeLabels[t]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" className="sm:col-span-2 lg:col-span-1">
        Filter
      </Button>
    </form>
  );
}
