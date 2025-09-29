// app/(main)/layout.tsx
import AppHeader from "@/components/general/AppHeader";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";

// Use the same AppHeader you already have
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // (optional) if you want to guard the app:
  // const jar = await cookies();
  // const raw = jar.get("bilvio_session")?.value ?? "";
  // const isAuthed = Boolean(raw && raw !== "undefined" && raw !== "null");
  // if (!isAuthed) redirect("/login");

  const email =
    (await cookies()).get("bilvio_session")?.value ?? "demo@bilvio.com";

  return (
    <>
      <AppHeader email={email}>BILVIO</AppHeader>
      <main className="app-content">{children}</main>
    </>
  );
}
