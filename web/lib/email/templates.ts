import { emailLayout, sendEmail } from "@/lib/email/client";
import { env } from "@/lib/env";

export async function sendWelcomeEmail(to: string, name: string) {
  await sendEmail({
    to,
    subject: "Welcome to JobConnect Locals",
    html: emailLayout(`
      <h1 style="font-size: 24px; margin: 0 0 16px;">Welcome, ${name}!</h1>
      <p>Your account is ready. Browse local jobs or post openings for your business.</p>
      <a href="${env.NEXT_PUBLIC_APP_URL}/jobs" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">Browse Jobs</a>
    `),
  });
}

export async function sendVerificationEmail(to: string, url: string) {
  await sendEmail({
    to,
    subject: "Verify your email — JobConnect Locals",
    html: emailLayout(`
      <h1 style="font-size: 24px; margin: 0 0 16px;">Verify your email</h1>
      <p>Click the button below to verify your email address.</p>
      <a href="${url}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">Verify Email</a>
    `),
  });
}

export async function sendPasswordResetEmail(to: string, url: string) {
  await sendEmail({
    to,
    subject: "Reset your password — JobConnect Locals",
    html: emailLayout(`
      <h1 style="font-size: 24px; margin: 0 0 16px;">Reset your password</h1>
      <p>Click the button below to reset your password. This link expires in 1 hour.</p>
      <a href="${url}" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">Reset Password</a>
    `),
  });
}

export async function sendApplicationReceivedEmail(
  to: string,
  jobTitle: string,
  applicantName: string,
) {
  await sendEmail({
    to,
    subject: `New application for ${jobTitle}`,
    html: emailLayout(`
      <h1 style="font-size: 24px; margin: 0 0 16px;">New Application</h1>
      <p><strong>${applicantName}</strong> applied for <strong>${jobTitle}</strong>.</p>
      <a href="${env.NEXT_PUBLIC_APP_URL}/dashboard/employer" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">View Applicants</a>
    `),
  });
}

export async function sendApplicationStatusEmail(
  to: string,
  jobTitle: string,
  status: string,
) {
  await sendEmail({
    to,
    subject: `Application update: ${jobTitle}`,
    html: emailLayout(`
      <h1 style="font-size: 24px; margin: 0 0 16px;">Application Update</h1>
      <p>Your application for <strong>${jobTitle}</strong> is now: <strong>${status.replace(/_/g, " ")}</strong>.</p>
      <a href="${env.NEXT_PUBLIC_APP_URL}/dashboard/seeker/applications" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">View Applications</a>
    `),
  });
}

export async function sendInterviewScheduledEmail(
  to: string,
  jobTitle: string,
  scheduledAt: string,
  location?: string | null,
  meetingLink?: string | null,
) {
  await sendEmail({
    to,
    subject: `Interview scheduled: ${jobTitle}`,
    html: emailLayout(`
      <h1 style="font-size: 24px; margin: 0 0 16px;">Interview Scheduled</h1>
      <p>You have an interview for <strong>${jobTitle}</strong>.</p>
      <p><strong>When:</strong> ${scheduledAt}</p>
      ${location ? `<p><strong>Location:</strong> ${location}</p>` : ""}
      ${meetingLink ? `<p><a href="${meetingLink}">Join meeting</a></p>` : ""}
      <a href="${env.NEXT_PUBLIC_APP_URL}/dashboard/seeker/interviews" style="display: inline-block; background: #2563eb; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; margin-top: 16px;">View Details</a>
    `),
  });
}

export async function sendApplicationAcceptedEmail(to: string, jobTitle: string) {
  await sendEmail({
    to,
    subject: `Congratulations! Accepted for ${jobTitle}`,
    html: emailLayout(`
      <h1 style="font-size: 24px; margin: 0 0 16px;">Congratulations!</h1>
      <p>Your application for <strong>${jobTitle}</strong> has been accepted.</p>
    `),
  });
}

export async function sendApplicationRejectedEmail(to: string, jobTitle: string) {
  await sendEmail({
    to,
    subject: `Application update: ${jobTitle}`,
    html: emailLayout(`
      <h1 style="font-size: 24px; margin: 0 0 16px;">Application Update</h1>
      <p>Thank you for applying to <strong>${jobTitle}</strong>. Unfortunately, we won't be moving forward at this time.</p>
    `),
  });
}
