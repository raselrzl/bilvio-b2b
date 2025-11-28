import AppHeader from "@/components/general/AppHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "../utils/db";
export const dynamic = "force-dynamic";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const jar = await cookies();
  const raw = jar.get("bilvio_session")?.value ?? "";

  if (!raw || raw === "undefined" || raw === "null") {
    redirect("/login");
  }

  const email = raw; // <-- your current session contains only email

  // ⭐ Fetch user from DB to get userType
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) redirect("/login");

  return (
    <div className="bg-gray-100 h-screen">
      <AppHeader email={email} userType={user.userType} /> {/* <-- ADD userType */}
      <main className="app-content">{children}</main>
    </div>
  );
}
