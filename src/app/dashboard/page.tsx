import { redirect } from "next/navigation";

export default async function NamePage() {
  redirect("/dashboard/prompt");
}
