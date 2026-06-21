import { z } from "zod";

export const profileSchema = z.object({
  headline: z.string().max(120).optional().nullable(),
  bio: z.string().max(1000).optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  location: z.string().max(100).optional().nullable(),
  skills: z.string().max(500).optional().nullable(),
});

export const companySchema = z.object({
  name: z.string().min(2, "Company name is required"),
  description: z.string().max(2000).optional().nullable(),
  location: z.string().max(100).optional().nullable(),
  website: z.string().url().optional().nullable().or(z.literal("")),
  industry: z.string().max(100).optional().nullable(),
  size: z.string().max(50).optional().nullable(),
});

export const applicationSchema = z.object({
  jobId: z.string().uuid(),
  coverLetter: z.string().max(3000).optional().nullable(),
});

export const interviewSchema = z.object({
  applicationId: z.string().uuid(),
  scheduledAt: z.string().min(1, "Date and time required"),
  location: z.string().max(200).optional().nullable(),
  meetingLink: z.string().url().optional().nullable().or(z.literal("")),
  notes: z.string().max(1000).optional().nullable(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
export type CompanyInput = z.infer<typeof companySchema>;
export type ApplicationInput = z.infer<typeof applicationSchema>;
export type InterviewInput = z.infer<typeof interviewSchema>;
