"use client";

import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    // Log values immediately on click/submit
    console.log({ email, password });

    try {
      // Simulate a network call so the spinner is visible
      await new Promise((r) => setTimeout(r, 1200));
      // TODO: replace with real auth fetch
      // const res = await fetch("/api/login", { method: "POST", body: JSON.stringify({ email, password }) })
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full px-8 md:pl-32">
      <h1 className="text-4xl uppercase font-extrabold mb-10">Login</h1>

      <form onSubmit={onSubmit} className="grid gap-4" aria-busy={loading}>
        {/* Email */}
        <div className="grid gap-2 group">
          <Label
            htmlFor="email"
            className="transition-colors group-focus-within:text-blue-600"
          >
            *Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className={`h-10 rounded-none border transition-colors bg-white
              focus:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0
              ${email ? "border-black" : ""}`}
          />
        </div>

        {/* Password */}
        <div className="grid gap-2 group">
          <Label
            htmlFor="password"
            className="transition-colors group-focus-within:text-blue-600"
          >
            *Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className={`h-10 rounded-none border transition-colors bg-white
              focus:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0
              ${password ? "border-black" : ""}`}
          />
        </div>

        {/* Forgot link */}
        <p className="text-sm text-muted-foreground text-right">
          Can’t log in?{" "}
          <Link
            href="/reset-password"
            className="text-black hover:text-black/75 font-bold underline"
          >
            Reset password
          </Link>
        </p>

        {/* Centered button */}
        <div className="flex justify-center mt-8">
          <Button
            type="submit"
            className="w-[150px] rounded-3xl cursor-pointer inline-flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Login
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>

        {/* Register link */}
        <p className="text-sm text-muted-foreground text-center">
          Don’t have account?{" "}
          <Link
            href="/register"
            className="text-black hover:text-black/75 font-bold underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
