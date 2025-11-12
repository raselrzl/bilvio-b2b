import React from "react";
import LoginForm from "./LoginForm";
import { redirectIfAuthed } from "@/app/utils/Auth";

export default async  function LoginPage() {
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

      <div className="flex items-center justify-center max-w-3xl">
        <LoginForm />
      </div>
    </main>
    </div>
   
  );
}
