import React from "react";
import LoginForm from "./LoginForm";
import { redirectIfAuthed } from "@/app/utils/Auth";
import Image from "next/image";

export default async function LoginPage() {
  await redirectIfAuthed();
  return (
    <div className="">
      <main className="h-screen grid grid-cols-1 md:grid-cols-2 px-6">
        <div className="relative bg-gray-50">
          <img
            src="/bilvio3.png"
            alt="Homepage illustration"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col items-center justify-center max-w-3xl">
          <LoginForm />
          <div className="flex mt-30 gap-6 justify-center items-center">
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
