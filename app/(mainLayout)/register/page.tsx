import React from "react";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen grid grid-cols-1 md:grid-cols-2 px-6">
      <div className="relative bg-gray-50">
        <img
          src="/homepage.svg"
          alt="Homepage illustration"
          className="h-full w-full object-fill"
        />
      </div>

      <div className="flex items-center justify-center">
        <RegisterForm />
      </div>
    </main>
  );
}
