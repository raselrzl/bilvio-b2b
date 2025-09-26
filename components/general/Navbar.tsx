import Link from "next/link";
import Image from "next/image";
import { User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-white">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo from /public */}
        <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={100}
            priority
            className="h-22 w-auto"
          />
        </Link>

        <User className="h-10 w-10 bg-gray-50 p-1 rounded-full"/>
      </div>
    </nav>
  );
}
