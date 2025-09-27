"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const inputCls = (filled: boolean) =>
    `h-10 w-full rounded-none border bg-white transition-colors
     focus:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0
     ${filled ? "border-black" : ""}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    console.log({ email });
    try {
      await new Promise((r) => setTimeout(r, 1200));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full px-8 md:pl-32">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 uppercase">Reset Password</h1>

      <form onSubmit={onSubmit} className="grid gap-4" aria-busy={loading}>
        <div className="grid gap-2 group">
          <Label
            htmlFor="email"
            className="transition-colors group-focus-within:text-blue-600"
          >
            E-mail
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="vložte svou e-mailovou adresu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className={inputCls(!!email)}
            required
            autoComplete="email"
          />
        </div>

        <div className="flex justify-center mt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-[230px] rounded-3xl inline-flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Odeslat odkaz pro obnovení"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
