import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "@/features/auth/sign-in-form";
import { Suspense } from "react";

export const metadata = {
  title: "Sign In — JobConnect Locals",
};

export default function SignInPage() {
  return (
    <Card className="border-border/50 bg-card/80 shadow-xl backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense>
          <SignInForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}
