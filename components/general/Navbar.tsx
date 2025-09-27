import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-white">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between">
        {/* Left: Logo from /public */}
        <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={100}
            priority
            className="h-18 w-auto"
          />
        </Link>

        <img src="/englogo.jpg" alt="Logo" className="h-8 w-8 bg-white p-1 rounded-full object-cover" />

      </div>
    </nav>
  );
}
