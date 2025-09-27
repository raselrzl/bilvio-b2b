import ResetPasswordForm from "./ResetPasswordForm";


export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 px-6">
      <div className="relative bg-gray-50">
        <img
          src="/homepage.svg"
          alt="Homepage illustration"
          className="h-full w-full object-fill"
        />
      </div>

      <div className="flex items-center justify-center py-10">
        <section className="w-full max-w-2xl
                            mx-4 sm:mx-6 md:mx-8 lg:mx-auto p-6">
          <ResetPasswordForm />
        </section>
      </div>
    </main>
  );
}
