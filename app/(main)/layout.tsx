
export const dynamic = "force-dynamic";
import AppHeader from "@/components/general/AppHeader"; 
import { cookies } from "next/headers";

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const email = (await cookies()).get("bilvio_session")?.value ?? "demo@bilvio.com";

  return (
    <html lang="en">
      <body>
        <AppHeader email={email}>
          {children}
        </AppHeader>
      </body>
    </html>
  );
}

