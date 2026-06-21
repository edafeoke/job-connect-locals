import { AuthFormShell } from "@/components/layout/auth-form-shell";
import { SignInForm } from "@/features/auth/sign-in-form";
import { Suspense } from "react";

export const metadata = {
  title: "Sign In — JobConnect Locals",
};

export default function SignInPage() {
  return (
    <AuthFormShell title="Welcome back" description="Sign in to your account">
      <Suspense>
        <SignInForm />
      </Suspense>
    </AuthFormShell>
  );
}
