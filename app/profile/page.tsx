import { Suspense } from "react";
import { ProfileForm } from "@/features/profile/profile-form";
import { ProfileFormSkeleton } from "@/features/profile/profile-form-skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your profile settings",
};

export default function ProfilePage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and profile information.
          </p>
        </div>
        <div className="border rounded-lg p-6">
          <Suspense fallback={<ProfileFormSkeleton />}>
            <ProfileForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
} 