// app/(main)/layout.tsx
import AppHeader from "@/components/general/AppHeader";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jar = await cookies();
  const raw = jar.get("bilvio_session")?.value ?? "";
  const isAuthed = Boolean(raw && raw !== "undefined" && raw !== "null");
  if (!isAuthed) redirect("/login");

  const email =
    (await cookies()).get("bilvio_session")?.value ?? "demo@bilvio.com";

  return (
    <div className="bg-gray-100 h-screen">
      <AppHeader email={email as string} />
      <main className="app-content">{children}</main>
    </div>
  );
}
