import { CategoryForm } from "@/components";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

export default async function NewCategoryPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">New Skill</h1>

      <CategoryForm userId={user.userId} />
    </div>
  );
}
