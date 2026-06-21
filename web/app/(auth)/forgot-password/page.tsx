import { AuthFormShell } from "@/components/layout/auth-form-shell";
import { ForgotPasswordForm } from "@/features/auth/forgot-password-form";

export const metadata = {
  title: "Forgot Password — JobConnect Locals",
};

export default function ForgotPasswordPage() {
  return (
    <AuthFormShell
      title="Reset password"
      description="Enter your email and we'll send a reset link"
    >
      <ForgotPasswordForm />
    </AuthFormShell>
  );
}
