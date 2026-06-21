import { interviewRepository } from "@/server/repositories/interview.repository";
import { applicationRepository } from "@/server/repositories/application.repository";
import { notificationService } from "@/server/services/notification.service";
import { formatDateTime } from "@/lib/format";
import type { InterviewInput } from "@/lib/validations/profile";

export const interviewService = {
  async schedule(input: InterviewInput, ownerId: string) {
    const application = await applicationRepository.findById(input.applicationId);
    if (!application || application.job.company.ownerId !== ownerId) {
      throw new Error("Application not found or unauthorized");
    }

    const scheduledAt = new Date(input.scheduledAt);
    const interview = await interviewRepository.upsert(input.applicationId, {
      scheduledAt,
      location: input.location ?? null,
      meetingLink: input.meetingLink || null,
      notes: input.notes ?? null,
      status: "SCHEDULED",
      application: { connect: { id: input.applicationId } },
    });

    await applicationRepository.updateStatus(
      input.applicationId,
      "INTERVIEW_SCHEDULED",
      "Interview scheduled",
    );

    await notificationService.notifyInterviewScheduled(
      application.applicant.id,
      application.applicant.email,
      application.job.title,
      formatDateTime(scheduledAt),
      input.location,
      input.meetingLink,
    );

    return interview;
  },

  getByEmployer(ownerId: string) {
    return interviewRepository.findByEmployer(ownerId);
  },

  getByApplicant(applicantId: string) {
    return interviewRepository.findByApplicant(applicantId);
  },

  getByApplication(applicationId: string) {
    return interviewRepository.findByApplication(applicationId);
  },
};
