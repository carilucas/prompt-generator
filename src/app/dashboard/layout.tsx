import { getCurrentUser } from "@/lib/getCurrentUser";
import { Sidebar } from "../../components";
import { redirect } from "next/navigation";
import { getUserInfo } from "@/lib/getUserInfo";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/auth/login");
  }
  const userInfo = await getUserInfo(user.userId);

  return (
    <div className="bg-slate-100 overflow-y-scroll w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
      <div className="flex">
        <Sidebar userInfo={userInfo} />
        <main className="p-2 w-full max-w-100 md:max-w-130 lg:max-w-300 text-slate-900 mt-6">
          {children}
        </main>
      </div>
    </div>
  );
}
