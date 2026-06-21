import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { profileService } from "@/server/services/application.service";
import { ProfileForm } from "@/features/applications/profile-form";

export const metadata = { title: "Profile — JobConnect Locals" };

export default async function SeekerProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");
  const profile = await profileService.getByUserId(user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground">Complete your profile to improve your applications</p>
      </div>
      <ProfileForm profile={profile} />
    </div>
  );
}
