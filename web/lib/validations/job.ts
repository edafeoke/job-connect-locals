import { z } from "zod";

export const employmentTypes = [
  "FULL_TIME",
  "PART_TIME",
  "CONTRACT",
  "INTERNSHIP",
  "REMOTE",
] as const;

export const experienceLevels = [
  "ENTRY",
  "MID",
  "SENIOR",
  "EXECUTIVE",
] as const;

export const jobCategories = [
  "Administration",
  "Customer Service",
  "Education",
  "Engineering",
  "Finance",
  "Healthcare",
  "Hospitality",
  "IT & Software",
  "Marketing",
  "Sales",
  "Security",
  "Other",
] as const;

export const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  salary: z.coerce.number().int().positive().optional().nullable(),
  salaryNegotiable: z.boolean().default(false),
  location: z.string().min(2, "Location is required"),
  employmentType: z.enum(employmentTypes),
  experienceLevel: z.enum(experienceLevels),
  category: z.string().min(1, "Category is required"),
  requirements: z.string().optional().nullable(),
  benefits: z.string().optional().nullable(),
  applicationDeadline: z.string().optional().nullable(),
  companyId: z.string().uuid(),
});

export const jobSearchSchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  category: z.string().optional(),
  salaryMin: z.coerce.number().optional(),
  experience: z.enum(experienceLevels).optional(),
  type: z.enum(employmentTypes).optional(),
  page: z.coerce.number().int().positive().default(1),
});

export type JobInput = z.infer<typeof jobSchema>;
export type JobSearchInput = z.infer<typeof jobSearchSchema>;
