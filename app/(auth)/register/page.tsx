import React from "react";
import RegisterForm from "./RegisterForm";
import Image from "next/image";

export default async function RegisterPage() {
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

        <div className="flex flex-col items-center justify-center py-4 max-w-3xl">
          <RegisterForm />

          <div className="flex mt-20 gap-6">
            <Image
              src="/11.png"
              alt="Besikta logo"
              height={60}
              width={100}
              className="object-contain"
            />

            <Image
              src="/22.png"
              alt="handlarfinans logo"
              height={60}
              width={100}
              className="object-contain"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
