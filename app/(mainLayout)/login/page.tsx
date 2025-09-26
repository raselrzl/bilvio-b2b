import React from "react";
import LoginForm from "./LoginForm";

export default function LoginPage() {
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
            <LoginForm />
      </div>
    </main>
  );
}
