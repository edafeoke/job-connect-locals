import { redirect } from "next/navigation";
import { PageHeader } from "@/components/layout/page-header";
import { getCurrentUser } from "@/lib/auth/session";
import { profileService } from "@/server/services/application.service";
import { ProfileForm } from "@/features/applications/profile-form";

export const metadata = { title: "Profile — JobConnect Locals" };

export default async function SeekerProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  const profile = await profileService.getByUserId(user.id);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Your Profile"
        description="Complete your profile to improve your applications"
      />
      <ProfileForm profile={profile} />
    </div>
  );
}
