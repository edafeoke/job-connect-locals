import { AuthFormShell } from "@/components/layout/auth-form-shell";
import { SignUpForm } from "@/features/auth/sign-up-form";

export const metadata = {
  title: "Sign Up — JobConnect Locals",
};

export default function SignUpPage() {
  return (
    <AuthFormShell
      title="Create your account"
      description="One account for job seeking and hiring"
    >
      <SignUpForm />
    </AuthFormShell>
  );
}
