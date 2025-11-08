import Navbar from "@/components/general/Navbar";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Navbar at the top */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white">
        <Navbar />
      </header>

      {/* Page content below the Navbar */}
      <main className="flex-1 grid place-items-center mt-15 md:mt-10">
        {children}
      </main>
    </div>
  );
}
