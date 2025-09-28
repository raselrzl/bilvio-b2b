// components/AppHeader.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerOverlay,
} from "@/components/ui/drawer";
import {
  Menu,
  ClipboardList,
  Search,
  Package,
  CheckSquare,
  MessageSquare,
  FileText,
  Users,
  Settings,
  Bell,
  User as UserIcon,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const LINKS: NavItem[] = [
  { href: "/demand", label: "Demand", Icon: ClipboardList },
  { href: "/offers-search", label: "Offers search", Icon: Search },
  { href: "/orders", label: "Orders", Icon: Package },
  { href: "/tasks", label: "Tasks", Icon: CheckSquare },
  { href: "/message", label: "Message", Icon: MessageSquare },
  { href: "/documents", label: "Documents", Icon: FileText },
  { href: "/users", label: "Users", Icon: Users },
  { href: "/settings", label: "Settings", Icon: Settings },
];

export default function AppHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // push the body content when drawer opens (no visual redesign)
  useEffect(() => {
    document.body.style.setProperty("--rail-w", "3.5rem"); // w-14
    document.body.style.setProperty("--drawer-w", "200px"); // your max-w-[200px]
    document.body.classList.toggle("drawer-push-open", open);
    return () => document.body.classList.remove("drawer-push-open");
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div>
      {/* Top Navbar (unchanged) */}
      <header className="sticky bg-[#2D3748] top-0 z-[70] flex h-14 items-center justify-between  px-4">
        <div className="flex items-center gap-3">
          <img src="/log3.png" alt="Bilvio" className="h-8 w-[90px] ml-2" />
          <Button
            variant="outline"
            size="icon"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="rounded-full border-none text-white bg-gray-900 hover:bg-gray-700 hover:text-gray-50 ml-10"
          >
            <Menu className="h-10 w-10" />
          </Button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline text-sm font-medium text-white">
            demo@bilvio.com
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white bg-gray-900 hover:bg-gray-700 hover:text-gray-50"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white bg-gray-900 hover:bg-gray-700 hover:text-gray-50"
          >
            <UserIcon className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Left icon rail (unchanged) */}
      <aside
        className="fixed left-0 top-14 z-[60] h-[100vh] w-14 bg-[#2D3748] text-white"
        aria-label="Icon navigation"
      >
        <nav className="flex h-full flex-col items-center gap-1 py-2">
          {LINKS.map(({ href, label, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                title={label}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={`flex h-8 w-10 items-center justify-center transition
                  ${active ? "bg-[#619aab] text-white" : "hover:bg-gray-700"}`}
              >
                <Icon className="h-5 w-5" />
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Drawer (same look), but overlay is transparent so nothing covers content */}
      <Drawer direction="left" open={open} onOpenChange={setOpen}>
        <DrawerOverlay className="fixed top-14 left-14 right-0 bottom-0 z-[75] bg-transparent pointer-events-none" />

        <DrawerContent
          className="fixed top-14 left-14 z-[80] h-[calc(100vh)] w-[200px] p-0
             bg-[#2D3748] text-white border-none"
          style={{ width: 200 }} // <- add this if your drawer lib overrides Tailwind widths
        >
          <DrawerHeader className="px-4 py-3">
            <DrawerTitle className="uppercase font-extrabold text-white">
              <div className="flex items-center gap-3">
                <img
                  src="/log3.png"
                  alt="Bilvio"
                  className="h-8 w-[90px] ml-2"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setOpen((o) => !o)}
                  aria-label="Toggle menu"
                  aria-expanded={open}
                  className="rounded-full border-none text-white bg-gray-900 hover:bg-gray-700 hover:text-gray-50 ml-10"
                >
                  <Menu className="h-10 w-10" />
                </Button>
              </div>
            </DrawerTitle>
          </DrawerHeader>

          <nav className="p-2">
            <ul className="space-y-1">
              {LINKS.map(({ href, label, Icon }) => {
                const active = isActive(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`group flex items-center justify-between py-2 transition h-8
                         ${
                           active
                             ? "bg-[#619aab] text-white"
                             : "hover:bg-gray-700"
                         }`}
                    >
                      <span className="flex items-center gap-2 pl-4">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                        <span>{label}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </DrawerContent>
      </Drawer>

      {/* Global push rules (no design change; only shifts your body content) */}
      <style jsx global>{`
        :root {
          --rail-w: 3.5rem; /* w-14 */
          --drawer-w: 200px; /* matches Drawer width */
        }
        /* mark your page/content wrapper with 'app-content' */
        .app-content {
          margin-left: var(--rail-w);
          transition: margin-left 200ms ease;
        }
        body.drawer-push-open .app-content {
          margin-left: calc(var(--rail-w) + var(--drawer-w));
        }
      `}</style>
    </div>
  );
}
