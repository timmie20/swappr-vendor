import { Metadata } from "next";

import PageTitle from "@/components/shared/PageTitle";
import EditProfileForm from "./_components/EditProfileForm";
import { fetchStaffDetails } from "@/services/staff";

export const metadata: Metadata = {
  title: "Edit Profile",
};

export default async function EditProfilePage() {
  // TODO: Replace with actual auth check when backend is ready
  // For now, return null to avoid errors during development
  const profile = await fetchStaffDetails();

  // TODO: Re-enable redirect once backend authentication is implemented
  // if (!profile) {
  //   redirect("/login");
  // }

  return (
    <section>
      <PageTitle>Edit Profile</PageTitle>

      <EditProfileForm profile={profile} />
    </section>
  );
}
