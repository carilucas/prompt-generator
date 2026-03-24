import { PromptForm } from "@/components";
import { getCategories } from "@/lib/getCategories";
import { getCurrentUser } from "@/lib/getCurrentUser";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PromptPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const categories = await getCategories(user.userId);

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Prompt Generator</h1>
      {categories.length === 0 ? (
        <div>
          <p className="text-gray-500 mb-4">
            No skills found. Please create a skill first.
          </p>
          <Link
            href="/dashboard/categories/new"
            className="bg-sky-800 text-white px-4 py-2 rounded"
          >
            + New skill
          </Link>
        </div>
      ) : (
        <PromptForm categories={categories} />
      )}
    </div>
  );
}
