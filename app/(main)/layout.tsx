
export const dynamic = "force-dynamic";

// Use the same AppHeader you already have
import AppHeader from "@/components/general/LeftDrawer"; // or "@/components/AppHeader" if that's the path

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  // (optional) if you want to guard the app:
  // const jar = await cookies();
  // const raw = jar.get("bilvio_session")?.value ?? "";
  // const isAuthed = Boolean(raw && raw !== "undefined" && raw !== "null");
  // if (!isAuthed) redirect("/login");

  return (
    <>
      <AppHeader />
      <main className="app-content">{children}</main>
    </>
  );
}
