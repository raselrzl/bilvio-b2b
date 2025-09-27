"use client";

import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";

type Errors = { email?: string; password?: string };

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const [submitted, setSubmitted] = useState(false);

  // style helper
  const inputCls = (filled: boolean, errored?: boolean) =>
    `h-10 rounded-none border bg-white transition-colors
     focus:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0
     ${errored ? "border-red-600" : filled ? "border-black" : ""}`;

  function validate(values = { email, password }): Errors {
    const next: Errors = {};
    if (!values.email.trim()) next.email = "E-mail is required.";
    else if (!/^\S+@\S+\.\S+$/.test(values.email.trim()))
      next.email = "Enter a valid e-mail address.";
    if (!values.password) next.password = "Password is required.";
    return next;
  }

  function handleBlur(field: "email" | "password") {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors((prev) => ({ ...prev, ...validate() }));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    console.log({ email, password }); // log immediately

    try {
      // simulate network call for spinner visibility
      await new Promise((r) => setTimeout(r, 1200));
      // TODO: real auth fetch here
      // await fetch("/api/login", { method: "POST", body: JSON.stringify({ email, password }) });
    } finally {
      setLoading(false);
    }
  }

  const showEmailError = (touched.email || submitted) && !!errors.email;
  const showPasswordError = (touched.password || submitted) && !!errors.password;

  return (
    <div className="w-full px-8 md:pl-32">
      <h1 className="text-4xl uppercase font-extrabold mb-10">Login</h1>

      <form onSubmit={onSubmit} className="grid gap-4" aria-busy={loading} noValidate>
        {/* Email */}
        <div className="grid gap-1.5 group">
          <Label
            htmlFor="email"
            className={`transition-colors ${
              showEmailError ? "text-red-600" : "group-focus-within:text-blue-600"
            }`}
          >
            *Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched.email || submitted) setErrors(validate({ email: e.target.value, password }));
            }}
            onBlur={() => handleBlur("email")}
            disabled={loading}
            aria-invalid={showEmailError}
            aria-describedby={showEmailError ? "email-error" : undefined}
            className={inputCls(!!email, showEmailError)}
          />
          {showEmailError && (
            <p id="email-error" role="alert" className="text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="grid gap-1.5 group">
          <Label
            htmlFor="password"
            className={`transition-colors ${
              showPasswordError ? "text-red-600" : "group-focus-within:text-blue-600"
            }`}
          >
            *Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (touched.password || submitted) setErrors(validate({ email, password: e.target.value }));
            }}
            onBlur={() => handleBlur("password")}
            disabled={loading}
            aria-invalid={showPasswordError}
            aria-describedby={showPasswordError ? "password-error" : undefined}
            className={inputCls(!!password, showPasswordError)}
          />
          {showPasswordError && (
            <p id="password-error" role="alert" className="text-sm text-red-600">
              {errors.password}
            </p>
          )}
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
