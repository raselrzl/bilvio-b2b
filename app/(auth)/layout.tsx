import Navbar from "@/components/general/Navbar";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Navbar at the top */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white">
        <Navbar />
      </header>

      {/* Page content below the Navbar */}
      <main className="flex flex-col items-center justify-center flex-1 mt-16 md:mt-10 space-y-6">
        {children}

        
      </main>
    </div>
  );
}
