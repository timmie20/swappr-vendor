import { Metadata } from "next";

import PageTitle from "@/components/shared/PageTitle";
import EditProfileForm from "./_components/EditProfileForm";
import { fetchStaffDetails } from "@/services/staff";

export const metadata: Metadata = {
  title: "Edit Profile",
};

export default async function EditProfilePage() {
  const { staff } = await fetchStaffDetails();

  return (
    <section>
      <PageTitle>Edit Profile</PageTitle>

      <EditProfileForm profile={staff ?? ({} as import("@/services/staff/types").Staff)} />
    </section>
  );
}
