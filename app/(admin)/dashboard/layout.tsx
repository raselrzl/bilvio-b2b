import { ReactNode } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex w-full flex-col max-w-7xl mx-auto">

      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 bg-gray-100 text-black shadow-sm px-4">

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex font-medium gap-6 text-sm ml-2">
          <Link href="/" className="hover:underline">
            Home
          </Link>
        </nav>

        {/* MOBILE NAV (Sheet) */}
        <Sheet>
          <SheetTrigger asChild className="border-none md:hidden">
            <Button variant="outline" size="icon">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="bg-gray-100 w-[220px] h-full text-black text-sm"
          >
            <nav className="flex flex-col gap-6 mt-6 font-medium text-lg">
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/dashboard/orders" className="hover:underline">
                All Orders
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </header>

      {/* PAGE CONTENT */}
      <main className="my-5 px-2 md:px-0">{children}</main>
    </div>
  );
}
