import { notificationRepository } from "@/server/repositories/notification.repository";
import {
  sendApplicationReceivedEmail,
  sendApplicationStatusEmail,
  sendInterviewScheduledEmail,
  sendApplicationAcceptedEmail,
  sendApplicationRejectedEmail,
} from "@/lib/email/templates";
import { applicationStatusLabels } from "@/lib/format";
import type { NotificationType } from "@prisma/client";

export const notificationService = {
  async notify({
    userId,
    type,
    title,
    message,
    payload,
    email,
    emailFn,
  }: {
    userId: string;
    type: NotificationType;
    title: string;
    message: string;
    payload?: Record<string, unknown>;
    email?: string;
    emailFn?: () => Promise<void>;
  }) {
    await notificationRepository.create({
      userId,
      type,
      title,
      message,
      payload: payload ? JSON.stringify(payload) : undefined,
    });

    if (email && emailFn) {
      try {
        await emailFn();
      } catch (error) {
        console.error("[notification] email failed:", error);
      }
    }
  },

  async notifyApplicationReceived(
    employerId: string,
    employerEmail: string,
    jobTitle: string,
    applicantName: string,
  ) {
    await this.notify({
      userId: employerId,
      type: "APPLICATION_RECEIVED",
      title: "New Application",
      message: `${applicantName} applied for ${jobTitle}`,
      payload: { jobTitle, applicantName },
      email: employerEmail,
      emailFn: () =>
        sendApplicationReceivedEmail(employerEmail, jobTitle, applicantName),
    });
  },

  async notifyStatusUpdate(
    applicantId: string,
    applicantEmail: string,
    jobTitle: string,
    status: string,
  ) {
    const label = applicationStatusLabels[status] ?? status;
    await this.notify({
      userId: applicantId,
      type: "APPLICATION_STATUS_UPDATED",
      title: "Application Updated",
      message: `Your application for ${jobTitle} is now: ${label}`,
      payload: { jobTitle, status },
      email: applicantEmail,
      emailFn: async () => {
        if (status === "ACCEPTED") {
          await sendApplicationAcceptedEmail(applicantEmail, jobTitle);
        } else if (status === "REJECTED") {
          await sendApplicationRejectedEmail(applicantEmail, jobTitle);
        } else {
          await sendApplicationStatusEmail(applicantEmail, jobTitle, status);
        }
      },
    });
  },

  async notifyInterviewScheduled(
    applicantId: string,
    applicantEmail: string,
    jobTitle: string,
    scheduledAt: string,
    location?: string | null,
    meetingLink?: string | null,
  ) {
    await this.notify({
      userId: applicantId,
      type: "INTERVIEW_SCHEDULED",
      title: "Interview Scheduled",
      message: `Interview for ${jobTitle} on ${scheduledAt}`,
      payload: { jobTitle, scheduledAt },
      email: applicantEmail,
      emailFn: () =>
        sendInterviewScheduledEmail(
          applicantEmail,
          jobTitle,
          scheduledAt,
          location,
          meetingLink,
        ),
    });
  },
};
