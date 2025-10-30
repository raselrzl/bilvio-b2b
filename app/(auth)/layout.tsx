import Navbar from "@/components/general/Navbar";

// app/(auth)/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid place-items-center bg-gray-50">
      <Navbar />
      {children}
    </div>
  );
}
