import {
  applicationRepository,
  profileRepository,
  savedJobRepository,
} from "@/server/repositories/application.repository";
import { jobRepository } from "@/server/repositories/job.repository";
import { notificationService } from "@/server/services/notification.service";
import type { ApplicationInput, ProfileInput } from "@/lib/validations/profile";
import type { ApplicationStatus } from "@prisma/client";

export const applicationService = {
  async apply(input: ApplicationInput, applicantId: string, _applicantEmail: string) {
    const job = await jobRepository.findById(input.jobId);
    if (!job || job.status !== "PUBLISHED") {
      throw new Error("Job not available");
    }

    const existing = await applicationRepository.findExisting(
      input.jobId,
      applicantId,
    );
    if (existing) {
      throw new Error("You have already applied for this job");
    }

    const profile = await profileRepository.findByUserId(applicantId);
    const application = await applicationRepository.create({
      jobId: input.jobId,
      applicantId,
      coverLetter: input.coverLetter,
      cvUrl: profile?.cvUrl,
      cvFileName: profile?.cvFileName,
    });

    const employer = application.job.company.owner;
    await notificationService.notifyApplicationReceived(
      employer.id,
      employer.email,
      application.job.title,
      application.applicant.name,
    );

    return application;
  },

  async updateStatus(
    applicationId: string,
    status: ApplicationStatus,
    ownerId: string,
    note?: string,
  ) {
    const application = await applicationRepository.findById(applicationId);
    if (!application || application.job.company.ownerId !== ownerId) {
      throw new Error("Application not found or unauthorized");
    }

    const updated = await applicationRepository.updateStatus(
      applicationId,
      status,
      note,
    );

    await notificationService.notifyStatusUpdate(
      updated.applicant.id,
      updated.applicant.email,
      updated.job.title,
      status,
    );

    return updated;
  },

  getByApplicant(applicantId: string) {
    return applicationRepository.findByApplicant(applicantId);
  },

  getByJob(jobId: string) {
    return applicationRepository.findByJob(jobId);
  },

  getById(id: string) {
    return applicationRepository.findById(id);
  },
};

export const profileService = {
  getByUserId(userId: string) {
    return profileRepository.findByUserId(userId);
  },

  upsert(userId: string, input: ProfileInput) {
    return profileRepository.upsert(userId, input);
  },

  updateCv(userId: string, cvUrl: string, cvFileName: string) {
    return profileRepository.updateCv(userId, cvUrl, cvFileName);
  },
};

export const savedJobService = {
  getByUser(userId: string) {
    return savedJobRepository.findByUser(userId);
  },

  toggle(userId: string, jobId: string) {
    return savedJobRepository.toggle(userId, jobId);
  },

  isSaved(userId: string, jobId: string) {
    return savedJobRepository.isSaved(userId, jobId);
  },
};
