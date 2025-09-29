import Link from "next/link";
import { Bell, User as UserIcon, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/app/actions";

export default function UserNav() {
  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <span className="hidden sm:inline text-sm font-medium text-white">
        demo@bilvio.com
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

        <DropdownMenuContent
          align="end"
          className="w-48"
          sideOffset={8}
        >
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
  );
}
