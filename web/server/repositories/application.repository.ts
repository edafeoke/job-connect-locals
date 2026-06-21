import { prisma } from "@/lib/prisma";
import type { ApplicationStatus, Prisma } from "@prisma/client";

export const applicationRepository = {
  async findByApplicant(applicantId: string) {
    return prisma.application.findMany({
      where: { applicantId },
      include: {
        job: { include: { company: true } },
        events: { orderBy: { createdAt: "asc" } },
        interview: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async findByJob(jobId: string) {
    return prisma.application.findMany({
      where: { jobId },
      include: {
        applicant: { include: { profile: true } },
        events: { orderBy: { createdAt: "asc" } },
        interview: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async findById(id: string) {
    return prisma.application.findUnique({
      where: { id },
      include: {
        job: { include: { company: true } },
        applicant: { include: { profile: true } },
        events: { orderBy: { createdAt: "asc" } },
        interview: true,
      },
    });
  },

  async findExisting(jobId: string, applicantId: string) {
    return prisma.application.findUnique({
      where: { jobId_applicantId: { jobId, applicantId } },
    });
  },

  async create(data: {
    jobId: string;
    applicantId: string;
    coverLetter?: string | null;
    cvUrl?: string | null;
    cvFileName?: string | null;
  }) {
    return prisma.application.create({
      data: {
        ...data,
        events: {
          create: { status: "APPLIED", note: "Application submitted" },
        },
      },
      include: {
        job: { include: { company: { include: { owner: true } } } },
        applicant: true,
      },
    });
  },

  async updateStatus(id: string, status: ApplicationStatus, note?: string) {
    return prisma.application.update({
      where: { id },
      data: {
        status,
        events: { create: { status, note } },
      },
      include: {
        job: { include: { company: true } },
        applicant: true,
      },
    });
  },

  async count() {
    return prisma.application.count();
  },
};

export const profileRepository = {
  async findByUserId(userId: string) {
    return prisma.profile.findUnique({ where: { userId } });
  },

  async upsert(userId: string, data: Prisma.ProfileUpdateInput) {
    return prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        headline: (data.headline as string) ?? null,
        bio: (data.bio as string) ?? null,
        phone: (data.phone as string) ?? null,
        location: (data.location as string) ?? null,
        skills: (data.skills as string) ?? null,
      },
      update: data,
    });
  },

  async updateCv(userId: string, cvUrl: string, cvFileName: string) {
    return prisma.profile.upsert({
      where: { userId },
      create: { userId, cvUrl, cvFileName },
      update: { cvUrl, cvFileName },
    });
  },
};

export const savedJobRepository = {
  async findByUser(userId: string) {
    return prisma.savedJob.findMany({
      where: { userId },
      include: { job: { include: { company: true } } },
      orderBy: { createdAt: "desc" },
    });
  },

  async toggle(userId: string, jobId: string) {
    const existing = await prisma.savedJob.findUnique({
      where: { userId_jobId: { userId, jobId } },
    });
    if (existing) {
      await prisma.savedJob.delete({ where: { id: existing.id } });
      return { saved: false };
    }
    await prisma.savedJob.create({ data: { userId, jobId } });
    return { saved: true };
  },

  async isSaved(userId: string, jobId: string) {
    const saved = await prisma.savedJob.findUnique({
      where: { userId_jobId: { userId, jobId } },
    });
    return Boolean(saved);
  },
};
