// components/AppHeader.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  X,
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
  LogOut,
} from "lucide-react";
import { logoutAction } from "@/app/actions";

type NavItem = {
  href: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const LINKS: NavItem[] = [
  { href: "/demand",        label: "Demand",        Icon: ClipboardList },
  { href: "/offers-search", label: "Offers search", Icon: Search },
  { href: "/orders",        label: "Orders",        Icon: Package },
  { href: "/tasks",         label: "Tasks",         Icon: CheckSquare },
  { href: "/message",       label: "Message",       Icon: MessageSquare },
  { href: "/documents",     label: "Documents",     Icon: FileText },
  { href: "/users",         label: "Users",         Icon: Users },
  { href: "/settings",      label: "Settings",      Icon: Settings },
];

export default function AppHeader({ email }: { email: string }) {
  // false = collapsed (icons only), true = expanded (drawer with labels)
  const [expanded, setExpanded] = useState(false);
  const pathname = usePathname();

  // Keep page content pushed exactly to the current sidebar width
  useEffect(() => {
    // default collapsed width and expanded width
    document.documentElement.style.setProperty("--sidebar-w", expanded ? "200px" : "3.5rem");
  }, [expanded]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div>
      {/* Top Navbar */}
      <header className="sticky bg-[#2D3748] top-0 z-[70] flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" aria-label="Go home" className="inline-flex">
            <Image
              src="/log3.png"
              alt="Bilvio"
              width={100}
              height={32}
              className="h-8 w-[100px]"
              priority
            />
          </Link>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setExpanded(e => !e)}
            aria-label={expanded ? "Collapse menu" : "Expand menu"}
            aria-expanded={expanded}
            className="rounded-full border-none text-white bg-gray-900 hover:bg-gray-700 hover:text-gray-50 ml-8"
          >
            {expanded ? <X className="h-10 w-10" /> : <Menu className="h-10 w-10" />}
          </Button>
        </div>

        {/* Right: email + notifications + user menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline text-sm font-medium text-white">
            {email || "—"}
          </span>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white bg-gray-900 hover:bg-gray-700 hover:text-gray-50"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white bg-gray-900 hover:bg-gray-700 hover:text-gray-50"
                aria-label="User menu"
              >
                <UserIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-48" sideOffset={8}>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link href="/terms/seller" className="flex items-center">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Regulations</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <form action={logoutAction} className="w-full">
                  <button type="submit" className="flex w-full items-center cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Single sidebar that collapses/expands (no overlay; body stays interactive) */}
      <aside
        className={`fixed left-0 top-14 z-[60] h-[100vh] bg-[#2D3748] text-white
                    transition-[width] duration-200 ${expanded ? "w-[200px]" : "w-14"}`}
        aria-label="Main navigation"
      >
        <nav className="flex h-full flex-col gap-1 py-2">
          {LINKS.map(({ href, label, Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                title={label}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={`group grid items-center
                            ${expanded ? "grid-cols-[2rem_1fr] px-3" : "grid-cols-1 justify-items-center"}
                            h-8 transition
                            ${active ? "bg-[#619aab] text-white" : "hover:bg-gray-700"}`}
              >
                <Icon className="h-8 w-5" />
                {/* Show/hide text smoothly when expanding/collapsing */}
                <span
                  className={`overflow-hidden whitespace-nowrap
                              transition-[opacity,margin] duration-200
                              ${expanded ? "opacity-100 ml-2" : "opacity-0 -ml-2 pointer-events-none"}`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Global push rules (content always uses current --sidebar-w) */}
      <style jsx global>{`
        :root {
          --sidebar-w: 3.5rem; /* default collapsed */
        }
        .app-content {
          margin-left: var(--sidebar-w);
          transition: margin-left 200ms ease;
        }
      `}</style>
    </div>
  );
}
