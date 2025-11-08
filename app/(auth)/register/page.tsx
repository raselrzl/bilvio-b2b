import React from "react";
import RegisterForm from "./RegisterForm";

export default async function RegisterPage() {
  return (
    <div className="mx-auto max-w-7xl">
      <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 px-6">
        <div className="relative bg-gray-50">
          <img
            src="/bilvio3.png"
            alt="Homepage illustration"
            className="h-full w-full object-fill"
          />
        </div>

        <div className="flex items-center justify-center py-4">
          <RegisterForm />
        </div>
      </main>
    </div>
  );
}
