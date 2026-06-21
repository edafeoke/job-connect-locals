"use server";

import { revalidatePath } from "next/cache";
import { requireSession, requireAdmin } from "@/lib/auth/session";
import { jobService } from "@/server/services/job.service";
import { companyService } from "@/server/services/company.service";
import {
  applicationService,
  profileService,
  savedJobService,
} from "@/server/services/application.service";
import { interviewService } from "@/server/services/interview.service";
import { adminService } from "@/server/services/admin.service";
import { jobSchema } from "@/lib/validations/job";
import {
  companySchema,
  profileSchema,
  applicationSchema,
  interviewSchema,
} from "@/lib/validations/profile";
import { notificationRepository } from "@/server/repositories/notification.repository";
import { put } from "@vercel/blob";
import { env } from "@/lib/env";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import type { ApplicationStatus, JobStatus } from "@prisma/client";

function revalidateAll() {
  revalidatePath("/", "layout");
}

export async function createCompanyAction(formData: FormData) {
  const session = await requireSession();
  const parsed = companySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  try {
    const company = await companyService.create(session.user.id, parsed.data);
    revalidateAll();
    return { success: true, companyId: company.id };
  } catch (e) {
    return { error: { _form: [(e as Error).message] } };
  }
}

export async function updateCompanyAction(companyId: string, formData: FormData) {
  const session = await requireSession();
  const parsed = companySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  try {
    await companyService.update(companyId, parsed.data, session.user.id);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { error: { _form: [(e as Error).message] } };
  }
}

export async function createJobAction(formData: FormData) {
  const session = await requireSession();
  const raw = Object.fromEntries(formData);
  const parsed = jobSchema.safeParse({
    ...raw,
    salaryNegotiable: raw.salaryNegotiable === "on" || raw.salaryNegotiable === "true",
    salary: raw.salary ? Number(raw.salary) : null,
  });
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  try {
    const job = await jobService.create(parsed.data, session.user.id);
    revalidateAll();
    return { success: true, jobId: job.id };
  } catch (e) {
    return { error: { _form: [(e as Error).message] } };
  }
}

export async function updateJobAction(jobId: string, formData: FormData) {
  const session = await requireSession();
  const raw = Object.fromEntries(formData);
  const parsed = jobSchema.safeParse({
    ...raw,
    salaryNegotiable: raw.salaryNegotiable === "on" || raw.salaryNegotiable === "true",
    salary: raw.salary ? Number(raw.salary) : null,
  });
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  try {
    await jobService.update(jobId, parsed.data, session.user.id);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { error: { _form: [(e as Error).message] } };
  }
}

export async function updateJobStatusAction(jobId: string, status: JobStatus) {
  const session = await requireSession();
  try {
    await jobService.updateStatus(jobId, status, session.user.id);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function updateProfileAction(formData: FormData) {
  const session = await requireSession();
  const parsed = profileSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  try {
    await profileService.upsert(session.user.id, parsed.data);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { error: { _form: [(e as Error).message] } };
  }
}

export async function uploadCvAction(formData: FormData) {
  const session = await requireSession();
  const file = formData.get("cv") as File | null;
  if (!file) return { error: "No file provided" };

  const allowed = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (!allowed.includes(file.type)) {
    return { error: "Only PDF and DOCX files are allowed" };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { error: "File must be under 5MB" };
  }

  try {
    let url: string;
    if (env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`cv/${session.user.id}/${file.name}`, file, {
        access: "public",
      });
      url = blob.url;
    } else {
      const uploadsDir = path.join(process.cwd(), "public", "uploads", "cv");
      await mkdir(uploadsDir, { recursive: true });
      const buffer = Buffer.from(await file.arrayBuffer());
      const filePath = path.join(uploadsDir, `${session.user.id}-${file.name}`);
      await writeFile(filePath, buffer);
      url = `/uploads/cv/${session.user.id}-${file.name}`;
    }

    await profileService.updateCv(session.user.id, url, file.name);
    revalidateAll();
    return { success: true, url };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function applyToJobAction(formData: FormData) {
  const session = await requireSession();
  const parsed = applicationSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  try {
    await applicationService.apply(
      parsed.data,
      session.user.id,
      session.user.email,
    );
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function updateApplicationStatusAction(
  applicationId: string,
  status: ApplicationStatus,
  note?: string,
) {
  const session = await requireSession();
  try {
    await applicationService.updateStatus(
      applicationId,
      status,
      session.user.id,
      note,
    );
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function toggleSavedJobAction(jobId: string) {
  const session = await requireSession();
  try {
    const result = await savedJobService.toggle(session.user.id, jobId);
    revalidateAll();
    return { success: true, ...result };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function scheduleInterviewAction(formData: FormData) {
  const session = await requireSession();
  const parsed = interviewSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  try {
    await interviewService.schedule(parsed.data, session.user.id);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { error: { _form: [(e as Error).message] } };
  }
}

export async function markNotificationReadAction(id: string) {
  const session = await requireSession();
  await notificationRepository.markRead(id, session.user.id);
  revalidateAll();
  return { success: true };
}

export async function markAllNotificationsReadAction() {
  const session = await requireSession();
  await notificationRepository.markAllRead(session.user.id);
  revalidateAll();
  return { success: true };
}

export async function adminDisableUserAction(userId: string) {
  const session = await requireAdmin();
  try {
    await adminService.disableUser(session.user.id, userId);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function adminCloseJobAction(jobId: string) {
  const session = await requireAdmin();
  try {
    await adminService.closeJob(session.user.id, jobId);
    revalidateAll();
    return { success: true };
  } catch (e) {
    return { error: (e as Error).message };
  }
}

export async function getUnreadNotificationCountAction() {
  const session = await requireSession();
  return notificationRepository.countUnread(session.user.id);
}
