import { CategoryList } from "@/components";
import { getCategories } from "@/lib/getCategories";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CategoriesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }
  const categories = await getCategories(user.userId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Skills</h1>

        <Link
          href="/dashboard/categories/new"
          className="bg-sky-800 text-white px-4 py-2 rounded"
        >
          + New skill
        </Link>
      </div>

      <CategoryList categories={categories} />
    </div>
  );
}
