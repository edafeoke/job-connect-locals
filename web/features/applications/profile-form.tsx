"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateProfileAction, uploadCvAction } from "@/server/actions/index";
import { toast } from "sonner";
import type { Profile } from "@prisma/client";

export function ProfileForm({ profile }: { profile: Profile | null }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function handleProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await updateProfileAction(formData);
      if (result.error) {
        toast.error("Failed to update profile");
        return;
      }
      toast.success("Profile updated");
      router.refresh();
    });
  }

  function handleCvUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await uploadCvAction(formData);
      if (result.error) {
        toast.error(result.error);
        return;
      }
      toast.success("CV uploaded");
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileSubmit} className="space-y-4">
            <div>
              <Label htmlFor="headline">Headline</Label>
              <Input
                id="headline"
                name="headline"
                defaultValue={profile?.headline ?? ""}
                placeholder="e.g. Experienced Office Administrator"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                defaultValue={profile?.bio ?? ""}
                rows={4}
                className="mt-1"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={profile?.phone ?? ""}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={profile?.location ?? ""}
                  placeholder="e.g. Warri, Delta"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="skills">Skills</Label>
              <Textarea
                id="skills"
                name="skills"
                defaultValue={profile?.skills ?? ""}
                placeholder="Comma-separated skills"
                className="mt-1"
              />
            </div>
            <Button type="submit" disabled={pending}>
              {pending ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>CV / Resume</CardTitle>
        </CardHeader>
        <CardContent>
          {profile?.cvFileName && (
            <p className="mb-4 text-sm text-muted-foreground">
              Current: {profile.cvFileName}
            </p>
          )}
          <form onSubmit={handleCvUpload} className="space-y-4">
            <div>
              <Label htmlFor="cv">Upload CV (PDF or DOCX, max 5MB)</Label>
              <Input
                id="cv"
                name="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                className="mt-1"
                required={!profile?.cvUrl}
              />
            </div>
            <Button type="submit" variant="outline" disabled={pending}>
              Upload CV
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
