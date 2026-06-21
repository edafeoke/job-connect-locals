export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function calculateProfileCompletion(profile: {
  headline?: string | null;
  bio?: string | null;
  phone?: string | null;
  location?: string | null;
  skills?: string | null;
  cvUrl?: string | null;
} | null): number {
  if (!profile) return 0;
  const fields = [
    profile.headline,
    profile.bio,
    profile.phone,
    profile.location,
    profile.skills,
    profile.cvUrl,
  ];
  const filled = fields.filter(Boolean).length;
  return Math.round((filled / fields.length) * 100);
}

export const applicationStatusLabels: Record<string, string> = {
  APPLIED: "Applied",
  UNDER_REVIEW: "Under Review",
  INTERVIEW_SCHEDULED: "Interview Scheduled",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

export const employmentTypeLabels: Record<string, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACT: "Contract",
  INTERNSHIP: "Internship",
  REMOTE: "Remote",
};

export const experienceLevelLabels: Record<string, string> = {
  ENTRY: "Entry Level",
  MID: "Mid Level",
  SENIOR: "Senior",
  EXECUTIVE: "Executive",
};

export const jobStatusLabels: Record<string, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  CLOSED: "Closed",
};
