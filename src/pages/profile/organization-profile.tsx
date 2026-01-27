import OrganizationForm from "@/components/forms/organization-form";

export default function OrganizationProfile() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-6xl">
        <OrganizationForm />
      </div>
    </div>
  );
}
