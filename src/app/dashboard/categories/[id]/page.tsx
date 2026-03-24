import { CategoryForm } from "@/components";

import { getCategory } from "@/lib/getCategory";
import { getCurrentUser } from "@/lib/getCurrentUser";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const user = await getCurrentUser();
  const { id } = await params;
  const category = await getCategory(id);

  if (!category) {
    return <p>Category not found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Category</h1>

      <CategoryForm category={category} userId={user.userId} />
    </div>
  );
}
