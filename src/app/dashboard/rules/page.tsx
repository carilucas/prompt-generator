import { RulesForm } from "@/components";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

export default async function RulesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Rules Configuration</h1>
        <p className="text-gray-600 mt-1">
          Define the rules that will be applied when generating prompts.
        </p>
      </div>
      <RulesForm />
    </div>
  );
}