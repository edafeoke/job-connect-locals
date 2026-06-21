"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, signUp } from "@/lib/auth/auth-client";
import { signUpSchema, type SignUpInput } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthDivider } from "@/components/layout/auth-divider";
import { GoogleSignInButton } from "@/components/shared/google-sign-in-button";
import { toast } from "sonner";

export function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit(values: SignUpInput) {
    setLoading(true);
    try {
      const result = await signUp.email({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      if (result.error) {
        toast.error(result.error.message ?? "Sign up failed");
        return;
      }
      toast.success("Account created! Check your email to verify.");
      router.push("/sign-in");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" className="h-11" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" className="h-11" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="h-11" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="h-11 w-full font-semibold" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </Form>

      <AuthDivider />

      <GoogleSignInButton onClick={handleGoogleSignIn} />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
