import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignUpForm } from "@/features/auth/sign-up-form";

export const metadata = {
  title: "Sign Up — JobConnect Locals",
};

export default function SignUpPage() {
  return (
    <Card className="border-border/50 bg-card/80 shadow-xl backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>
          One account for job seeking and hiring
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
