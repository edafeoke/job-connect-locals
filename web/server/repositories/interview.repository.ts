import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export const interviewRepository = {
  async findByApplication(applicationId: string) {
    return prisma.interview.findUnique({
      where: { applicationId },
      include: {
        application: {
          include: {
            job: { include: { company: true } },
            applicant: true,
          },
        },
      },
    });
  },

  async findByEmployer(ownerId: string) {
    return prisma.interview.findMany({
      where: {
        application: { job: { company: { ownerId } } },
        status: "SCHEDULED",
      },
      include: {
        application: {
          include: {
            job: true,
            applicant: { select: { id: true, name: true, email: true } },
          },
        },
      },
      orderBy: { scheduledAt: "asc" },
    });
  },

  async findByApplicant(applicantId: string) {
    return prisma.interview.findMany({
      where: {
        application: { applicantId },
        status: "SCHEDULED",
      },
      include: {
        application: { include: { job: { include: { company: true } } } },
      },
      orderBy: { scheduledAt: "asc" },
    });
  },

  async upsert(applicationId: string, data: Prisma.InterviewCreateInput) {
    return prisma.interview.upsert({
      where: { applicationId },
      create: { ...data, application: { connect: { id: applicationId } } },
      update: {
        scheduledAt: data.scheduledAt as Date,
        location: data.location as string | undefined,
        meetingLink: data.meetingLink as string | undefined,
        notes: data.notes as string | undefined,
        status: "SCHEDULED",
      },
      include: {
        application: {
          include: {
            job: { include: { company: true } },
            applicant: true,
          },
        },
      },
    });
  },
};
