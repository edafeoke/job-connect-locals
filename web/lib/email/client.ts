import { Resend } from "resend";
import { env } from "@/lib/env";

export const resend = env.RESEND_API_KEY
  ? new Resend(env.RESEND_API_KEY)
  : null;

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!resend || !env.EMAIL_FROM) {
    console.log(`[email:dev] To: ${to} | Subject: ${subject}`);
    return { id: "dev" };
  }

  return resend.emails.send({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
  });
}

export function emailLayout(content: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8" /></head>
      <body style="font-family: system-ui, sans-serif; background: #f4f4f5; padding: 24px;">
        <div style="max-width: 560px; margin: 0 auto; background: white; border-radius: 12px; padding: 32px;">
          <div style="margin-bottom: 24px;">
            <strong style="color: #2563eb; font-size: 18px;">JobConnect Locals</strong>
          </div>
          ${content}
          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
          <p style="color: #71717a; font-size: 12px;">© JobConnect Locals. Find local jobs near you.</p>
        </div>
      </body>
    </html>
  `;
}
