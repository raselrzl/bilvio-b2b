
export const dynamic = "force-dynamic";
import AppHeader from "@/components/general/LeftDrawer"; 
export default async function MainLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <AppHeader />
      <main className="app-content">{children}</main>
    </>
  );
}

