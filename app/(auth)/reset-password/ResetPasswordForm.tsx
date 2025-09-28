"use client";

import { useState } from "react";
import Link from "next/link"; // ⬅️ added
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{ email?: string }>({});
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inputCls = (filled: boolean, errored?: boolean) =>
    `h-10 w-full rounded-none border bg-white transition-colors
     focus:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0
     ${errored ? "border-red-600" : filled ? "border-black" : ""}`;

  function validate(val = email) {
    const next: { email?: string } = {};
    if (!val.trim()) next.email = "E-mail is required.";
    else if (!/^\S+@\S+\.\S+$/.test(val.trim())) next.email = "Enter a valid e-mail address.";
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    console.log({ email });
    try {
      await new Promise((r) => setTimeout(r, 1200));
    } finally {
      setLoading(false);
    }
  }

  const showError = (touched || submitted) && !!errors.email;

  return (
    <div className="w-full px-8 md:pl-32">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 uppercase">Reset Password</h1>

      <form onSubmit={onSubmit} className="grid gap-4" aria-busy={loading} noValidate>
        <div className="grid gap-1.5 group">
          <Label
            htmlFor="email"
            className={`transition-colors ${
              showError ? "text-red-600" : "group-focus-within:text-blue-600"
            }`}
          >
            E-mail
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (touched || submitted) setErrors(validate(e.target.value));
            }}
            onBlur={() => {
              setTouched(true);
              setErrors(validate());
            }}
            disabled={loading}
            className={inputCls(!!email, showError)}
            aria-invalid={showError}
            aria-describedby={showError ? "email-error" : undefined}
          />
          {showError && (
            <p id="email-error" role="alert" className="text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-[230px] rounded-3xl inline-flex items-center justify-center"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send recovery link"}
          </Button>
        </div>

        {/* Footer link – same style as register form */}
        <p className="text-sm text-muted-foreground text-center">
          Go to{" "}
          <Link
            href="/login"
            className="text-black hover:text-black/75 font-bold underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
