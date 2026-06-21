import Link from "next/link";
import Image from "next/image";
import { Briefcase, Users, CheckCircle } from "lucide-react";
import { Logo } from "@/components/shared/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh">
      <div className="relative hidden w-1/2 overflow-hidden text-primary-foreground lg:flex">
        <Image
          src="/auth-brand-panel.png"
          alt=""
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/85 to-primary/95" />
        <div className="relative z-10 flex h-full flex-col justify-between p-10">
          <Logo variant="light" />
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight">
              Find local jobs.<br />Hire local talent.
            </h1>
            <p className="max-w-md text-lg text-primary-foreground/80">
              JobConnect Locals connects businesses and job seekers across Nigeria — from Warri to Lagos and beyond.
            </p>
            <ul className="space-y-4">
              {[
                { icon: Briefcase, text: "Browse thousands of local job listings" },
                { icon: Users, text: "One account for seeking and hiring" },
                { icon: CheckCircle, text: "Apply, track, and schedule interviews" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-primary-foreground/90">
                  <span className="flex size-8 items-center justify-center rounded-lg bg-white/15">
                    <Icon className="size-4" />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <p className="text-sm text-primary-foreground/60">
            © {new Date().getFullYear()} JobConnect Locals
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col bg-surface lg:w-1/2">
        <div className="flex justify-center p-6 lg:hidden">
          <Logo />
        </div>
        <div className="hidden justify-end px-10 pt-8 lg:flex">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center px-4 pb-12 lg:px-12">
          <div className="w-full max-w-[420px]">{children}</div>
        </div>
        <p className="pb-6 text-center text-sm text-muted-foreground lg:hidden">
          <Link href="/" className="hover:text-foreground">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
