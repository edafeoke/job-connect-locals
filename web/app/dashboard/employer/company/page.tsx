import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { companyService } from "@/server/services/company.service";
import { CompanyForm } from "@/features/companies/company-form";

export const metadata = { title: "Company Profile — JobConnect Locals" };

export default async function CompanyPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/sign-in");

  const companies = await companyService.getByOwner(user.id);
  const company = companies[0] ?? null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Company Profile</h1>
        <p className="text-muted-foreground">
          {company ? "Update your company information" : "Create your company to start posting jobs"}
        </p>
      </div>
      <CompanyForm company={company ?? undefined} />
    </div>
  );
}
