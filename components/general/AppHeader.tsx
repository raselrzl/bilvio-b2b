"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
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
  SquarePlus,
  ChevronDown,
  ChevronUp,
  ChevronRight,
} from "lucide-react";
import { logoutAction } from "@/app/actions";

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

const SETTINGS_LINKS = [
  { href: "/settings/bankaccount", label: "Bank Account" },
  { href: "/settings/company", label: "Company Setting" },
  { href: "/settings/warehouse", label: "Warehouse" },
];

export default function AppHeader({ email }: { email: string }) {
  const [expanded, setExpanded] = useState(false);
  const [offersOpen, setOffersOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-w",
      expanded ? "200px" : "3.5rem"
    );
  }, [expanded]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div>
      {/* Top Navbar */}
      <header className="fixed inset-x-0 top-0 z-80 flex h-14 items-center justify-between px-4 bg-[#2D3748]">
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
            onClick={() => setExpanded((e) => !e)}
            aria-label={expanded ? "Collapse menu" : "Expand menu"}
            aria-expanded={expanded}
            className="rounded-full border-none cursor-pointer text-white bg-gray-900 hover:bg-gray-700 hover:text-gray-50 ml-8"
          >
            {expanded ? <X className="h-10 w-10" /> : <Menu className="h-10 w-10" />}
          </Button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline text-sm font-medium text-white">
            {email || "—"}
          </span>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white cursor-pointer bg-gray-900 hover:bg-gray-700 hover:text-gray-50"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-white cursor-pointer bg-gray-900 hover:bg-gray-700 hover:text-gray-50"
                aria-label="User menu"
              >
                <UserIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-40 rounded-none"
              sideOffset={8}
            >
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link
                  href="/profile"
                  className="flex items-center hover:rounded-none hover:bg-[#619aab] hover:text-white"
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/regulations/buyer"
                  className="flex items-center hover:rounded-none hover:bg-[#619aab] hover:text-white"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Regulations</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem asChild>
                <Link
                  href="/dashboard/orders"
                  className="flex items-center hover:rounded-none hover:bg-[#619aab] hover:text-white"
                >
                  <SquarePlus className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <form
                  action={logoutAction}
                  className="w-full hover:rounded-none hover:bg-[#619aab] hover:text-white"
                >
                  <button
                    type="submit"
                    className="flex w-full items-center cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 z-60 h-screen bg-[#2D3748] text-white transition-[width] duration-200 ${
          expanded ? "w-[210px]" : "w-14"
        }`}
        style={{ top: "var(--header-h)" }}
        aria-label="Main navigation"
      >
        <nav className="flex h-full flex-col gap-1 py-2">
          {LINKS.map(({ href, label, Icon }) => {
            const active = isActive(href);

            // Offers search (keep your original code exactly)
            if (href === "/offers-search") {
              return (
                <div key={href} className="contents">
                  <Link
                    href={href}
                    title={label}
                    aria-label={label}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={expanded && offersOpen}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!expanded) router.push("/offers-search/new");
                      else setOffersOpen((v) => !v);
                    }}
                    className={`group grid items-center
                      ${
                        expanded
                          ? "grid-cols-[2rem_1fr] px-3"
                          : "grid-cols-1 justify-items-center"
                      }
                      h-8 transition
                      ${
                        active ? "bg-[#619aab] text-white" : "hover:bg-gray-700"
                      }`}
                  >
                    <Icon className="h-8 w-5" />
                    <span
                      className={`overflow-hidden flex items-center justify-between whitespace-nowrap transition-[opacity,margin] duration-200
                        ${
                          expanded
                            ? "opacity-100 ml-2"
                            : "opacity-0 -ml-2 pointer-events-none"
                        }`}
                    >
                      {label}
                      {expanded && offersOpen ? (
                        <span className="ml-6 text-white text-xl"><ChevronUp className="h-5 w-5"/></span>
                      ) : (
                        <span className="ml-6 text-white text-xl"><ChevronRight className="h-5 w-5"/></span>
                      )}
                    </span>
                  </Link>

                  {expanded && offersOpen && (
                    <div className="px-3 mt-1">
                      <Link
                        href="/offers-search/new"
                        className={`flex items-center gap-2 h-8 pl-8 px-2
                          ${isActive("/offers-search/new") ? "text-white" : "hover:bg-gray-700"} rounded-none`}
                        title="New cars"
                        aria-current={isActive("/offers-search/new") ? "page" : undefined}
                      >
                        <span
                          className={`inline-block h-3.5 w-3.5 rounded-full border ${
                            isActive("/offers-search/new") ? "bg-white border-white" : "border-white/70"
                          }`}
                        />
                        <span className="text-sm">New cars</span>
                      </Link>

                      <Link
                        href="/offers-search/used"
                        className={`flex items-center gap-2 h-8 pl-8 px-2
                          ${isActive("/offers-search/used") ? "text-white" : "hover:bg-gray-700"} rounded-none`}
                        title="Used cars"
                        aria-current={isActive("/offers-search/used") ? "page" : undefined}
                      >
                        <span
                          className={`inline-block h-3.5 w-3.5 rounded-full border ${
                            isActive("/offers-search/used") ? "bg-white border-white" : "border-white/70"
                          }`}
                        />
                        <span className="text-sm">Used cars</span>
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            // Settings submenu
            if (href === "/settings") {
              return (
                <div key={href} className="contents">
                  <Link
                    href={href}
                    title={label}
                    aria-label={label}
                    aria-current={active ? "page" : undefined}
                    aria-expanded={expanded && settingsOpen}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!expanded) router.push("/settings/company");
                      else setSettingsOpen((v) => !v);
                    }}
                    className={`group grid items-center
                      ${
                        expanded
                          ? "grid-cols-[2rem_1fr] px-3"
                          : "grid-cols-1 justify-items-center"
                      }
                      h-8 transition
                      ${
                        active ? "bg-[#619aab] text-white" : "hover:bg-gray-700"
                      }`}
                  >
                    <Icon className="h-8 w-5" />
                    <span
                      className={`overflow-hidden flex items-center justify-between whitespace-nowrap transition-[opacity,margin] duration-200
                        ${
                          expanded
                            ? "opacity-100 ml-2"
                            : "opacity-0 -ml-2 pointer-events-none"
                        }`}
                    >
                      {label}
                      {expanded && settingsOpen ? (
                        <span className="ml-6 text-white text-xl"><ChevronUp className="h-5 w-5"/></span>
                      ) : (
                        <span className="ml-6 text-white text-xl"><ChevronRight className="h-5 w-5"/></span>
                      )}
                    </span>
                  </Link>

                  {expanded && settingsOpen && (
                    <div className="px-3 mt-1">
                      {SETTINGS_LINKS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-2 h-8 pl-8 px-2
                            ${isActive(item.href) ? "text-white" : "hover:bg-gray-700"} rounded-none`}
                          title={item.label}
                          aria-current={isActive(item.href) ? "page" : undefined}
                        >
                          <span
                            className={`inline-block h-3.5 w-3.5 rounded-full border ${
                              isActive(item.href) ? "bg-white border-white" : "border-white/70"
                            }`}
                          />
                          <span className="text-sm">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // All other regular items
            return (
              <Link
                key={href}
                href={href}
                title={label}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className={`group grid items-center
                  ${
                    expanded ? "grid-cols-[2rem_1fr] px-3" : "grid-cols-1 justify-items-center"
                  } h-8 transition
                  ${active ? "bg-[#619aab] text-white" : "hover:bg-gray-700"}`}
              >
                <Icon className="h-8 w-5" />
                <span
                  className={`overflow-hidden whitespace-nowrap transition-[opacity,margin] duration-200
                    ${expanded ? "opacity-100 ml-2" : "opacity-0 -ml-2 pointer-events-none"}`}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Global spacing rules */}
      <style jsx global>{`
        :root {
          --sidebar-w: 3.5rem;
          --header-h: 3.5rem;
        }
        .app-content {
          margin-left: var(--sidebar-w);
          padding-top: var(--header-h);
          transition: margin-left 200ms ease;
        }
      `}</style>
    </div>
  );
}
