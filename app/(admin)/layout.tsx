import { ReactNode } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full flex-col max-w-7xl mx-auto">
      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 bg-gray-100 text-black shadow-sm px-4">
        {/* DESKTOP NAV */}
        <nav className="hidden md:flex font-medium gap-6 text-sm ml-2">
          <Link href="/" className="hover:underline">
            Home
          </Link>

          <Link href="/dashboard/orders" className="hover:underline">
            All Orders
          </Link>
          <Link href="/admin/createProduct" className="hover:underline">
            Add Car
          </Link>

          <Link href="/admin/createTask" className="hover:underline">
            Create Task
          </Link>
          <Link href="/admin/alldemands" className="hover:underline">
            All Demands
          </Link>
          <Link href="/admin/allusers" className="hover:underline">
            All Users
          </Link>
          <Link href="/admin/alltask" className="hover:underline">
              All Task
            </Link>

             <Link href="/admin/allproducts" className="hover:underline">
              All Products
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
            className="bg-gray-100 w-[220px] h-[400px] pl-4 text-black text-sm flex flex-col gap-6 mt-6 font-medium"
          >
            {/* Hidden title for accessibility */}
            <h2 className="sr-only">Mobile Navigation Menu</h2>

            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/dashboard/orders" className="hover:underline">
              All Orders
            </Link>
            <Link href="/admin/createProduct" className="hover:underline">
              Add Car
            </Link>
            <Link href="/admin/createTask" className="hover:underline">
              Create Task
            </Link>
            <Link href="/admin/alltask" className="hover:underline">
              All Task
            </Link>
            <Link href="/admin/alldemands" className="hover:underline">
            All Demands
          </Link>
          <Link href="/admin/allusers" className="hover:underline">
            All Users
          </Link>
          </SheetContent>
        </Sheet>
      </header>

      {/* PAGE CONTENT */}
      <main className="my-5 px-2 md:px-0">{children}</main>
    </div>
  );
}
