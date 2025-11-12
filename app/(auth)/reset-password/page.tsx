import Navbar from "@/components/general/Navbar";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="">
      
      <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 px-6">
        <div className="relative bg-gray-50">
          <img
            src="/bilvio3.png"
            alt="Homepage illustration"
            className="h-full w-full object-fill"
          />
        </div>

        <div className="flex items-center justify-center max-w-3xl">
          <ResetPasswordForm />
        </div>
      </main>
    </div>
  );
}
