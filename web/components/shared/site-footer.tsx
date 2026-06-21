import Link from "next/link";
import { Logo } from "@/components/shared/logo";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Connect with local employers and find opportunities in your community.
              Built for Nigeria&apos;s job market.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">For Job Seekers</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/jobs" className="hover:text-foreground">Browse Jobs</Link></li>
              <li><Link href="/sign-up" className="hover:text-foreground">Create Account</Link></li>
              <li><Link href="/dashboard/seeker/applications" className="hover:text-foreground">My Applications</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">For Employers</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/sign-up" className="hover:text-foreground">Post a Job</Link></li>
              <li><Link href="/dashboard/employer/company" className="hover:text-foreground">Company Profile</Link></li>
              <li><Link href="/dashboard/employer/jobs" className="hover:text-foreground">Manage Jobs</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} JobConnect Locals. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
