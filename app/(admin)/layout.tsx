"use client"; // 👈 needed because we use usePathname
import { ReactNode } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/dashboard/orders", label: "All Orders" },
    { href: "/admin/createProduct", label: "Add Car" },
    { href: "/admin/createTask", label: "Create Task" },
    { href: "/admin/alldemands", label: "All Demands" },
    { href: "/admin/allusers", label: "All Users" },
    { href: "/admin/alltask", label: "All Task" },
    { href: "/admin/allproducts", label: "All Products" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex w-full flex-col max-w-7xl mx-auto">
      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between gap-4 bg-gray-100 text-black shadow-sm px-4">
        {/* DESKTOP NAV */}
        <nav className="hidden md:flex font-medium gap-6 text-sm ml-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`border p-1 rounded-xs hover:underline ${
                isActive(link.href) ? "bg-amber-600 text-white" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* MOBILE NAV */}
        <Sheet>
          <SheetTrigger asChild className="border-none rounded-xs md:hidden">
            <Button variant="outline" size="icon" className="rounded-xs">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="bg-gray-100 w-[220px] h-[400px] pl-4 text-black text-sm flex flex-col gap-6 mt-6 font-medium"
          >
            <h2 className="sr-only">Mobile Navigation Menu</h2>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:underline p-1 rounded-xs ${
                  isActive(link.href) ? "bg-amber-600 text-white rounded-sm" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </SheetContent>
        </Sheet>
      </header>

      {/* PAGE CONTENT */}
      <main className="my-5 px-2 md:px-0">{children}</main>
    </div>
  );
}
