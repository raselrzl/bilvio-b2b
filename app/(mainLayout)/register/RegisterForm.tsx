"use client";

import { useState } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Loader2 } from "lucide-react";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  // form state
  type Intent = "sales" | "purchases" | undefined;
  const [intent, setIntent] = useState<Intent>(undefined);

  const [taxNumber, setTaxNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [dataAccess, setDataAccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);

  // helpers for styling (white inputs, blue on focus, black when filled)
  const inputCls = (filled: boolean) =>
    `h-10 w-full rounded-none border bg-white transition-colors
   focus:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0
   ${filled ? "border-black" : ""}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const pwdOk =
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password);

    if (!pwdOk) console.warn("Password does not meet complexity requirements.");
    if (password !== confirm) console.warn("Passwords do not match.");
    if (!agree) console.warn("You must agree to the regulation.");

    // Log values immediately
    console.log({
      intent,
      taxNumber,
      companyName,
      phone,
      street,
      country,
      city,
      zip,
      dataAccess,
      email,
      password,
      confirm,
      agree,
    });

    try {
      // Simulate request so the spinner is visible
      await new Promise((r) => setTimeout(r, 1200));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full px-8 md:pl-32">
      <h1 className="text-4xl uppercase font-extrabold mb-6">Registration</h1>

      <form onSubmit={onSubmit} className="grid gap-4" aria-busy={loading}>
        {/* ROW 1 (2 cols): Intent + Tax number */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Intent */}
          <div className="grid gap-2 group">
            <Label
              htmlFor="intent"
              className="transition-colors group-focus-within:text-blue-600"
            >
              On the Bilvio platform I intend to carry out
            </Label>

            <Select
              value={intent}
              onValueChange={(v) =>
                setIntent(v === "sales" || v === "purchases" ? v : undefined)
              }
              disabled={loading}
            >
              <SelectTrigger
                id="intent"
                className={`h-10 w-full rounded-none border bg-white transition-colors
        focus:border-blue-600 focus:ring-0 ${intent ? "border-black" : ""}`}
              >
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>

              {/* keep the dropdown as wide as the trigger */}
              <SelectContent className="w-[var(--radix-select-trigger-width)]">
                <SelectItem value="sales">Car sales</SelectItem>
                <SelectItem value="purchases">Car purchases</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tax number */}
          <div className="grid gap-2 group">
            <Label
              htmlFor="taxNumber"
              className="transition-colors group-focus-within:text-blue-600"
            >
              Tax number
            </Label>
            <Input
              id="taxNumber"
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
              disabled={loading}
              className={inputCls(!!taxNumber)}
            />
          </div>
        </div>

        {/* One per row: Company name */}
        <div className="grid gap-2 group">
          <Label
            htmlFor="companyName"
            className="transition-colors group-focus-within:text-blue-600"
          >
            Company name
          </Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            disabled={loading}
            className={inputCls(!!companyName)}
          />
        </div>

        {/* One per row: Phone */}
        <div className="grid gap-2 group">
          <Label
            htmlFor="phone"
            className="transition-colors group-focus-within:text-blue-600"
          >
            Phone number (e.g. +48111222333)
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+48111222333"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            className={inputCls(!!phone)}
          />
        </div>

        {/* One per row: Street */}
        <div className="grid gap-2 group">
          <Label
            htmlFor="street"
            className="transition-colors group-focus-within:text-blue-600"
          >
            Street
          </Label>
          <Input
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            disabled={loading}
            className={inputCls(!!street)}
          />
        </div>

        {/* ROW 2 (3 cols): Country + City + Zip */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Country */}
          <div className="grid gap-2 group">
            <Label
              htmlFor="country"
              className="transition-colors group-focus-within:text-blue-600"
            >
              Country
            </Label>

            <Select
              value={country}
              onValueChange={setCountry}
              disabled={loading}
            >
              <SelectTrigger
                id="country"
                className={`h-10 w-full rounded-none border bg-white transition-colors
        focus:border-blue-600 focus:ring-0 ${country ? "border-black" : ""}`}
              >
                <SelectValue placeholder="Select country" />
              </SelectTrigger>

              <SelectContent className="w-[var(--radix-select-trigger-width)]">
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="sweden">Sweden</SelectItem>
                <SelectItem value="norway">Norway</SelectItem>
                <SelectItem value="finland">Finland</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* City */}
          <div className="grid gap-2 group">
            <Label
              htmlFor="city"
              className="transition-colors group-focus-within:text-blue-600"
            >
              City
            </Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loading}
              className={inputCls(!!city)}
            />
          </div>

          {/* Zip */}
          <div className="grid gap-2 group">
            <Label
              htmlFor="zip"
              className="transition-colors group-focus-within:text-blue-600"
            >
              Zip code
            </Label>
            <Input
              id="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              disabled={loading}
              className={inputCls(!!zip)}
            />
          </div>
        </div>

        {/* One per row: Data access */}
        <div className="flex items-center gap-2">
          <p>Data access</p>
        </div>

        {/* One per row: Email */}
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
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className={inputCls(!!email)}
            placeholder="you@example.com"
            required
          />
        </div>

        {/* ROW 3 (2 cols): Password + Confirm password */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Password (with helper text) */}
          <div className="grid gap-1.5 group">
            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className="transition-colors group-focus-within:text-blue-600"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className={inputCls(!!password)}
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              min. 8 characters, at least one uppercase and one lowercase
              letter, and a number
            </p>
          </div>

          {/* Confirm password */}
          <div className="grid gap-2 group">
            <Label
              htmlFor="confirm"
              className="transition-colors group-focus-within:text-blue-600"
            >
              Confirm password
            </Label>
            <Input
              id="confirm"
              type="password"
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              disabled={loading}
              className={inputCls(!!confirm)}
              required
            />
          </div>
        </div>

        {/* One per row: Regulation agreement */}
        <div className="flex items-start gap-2">
          <Checkbox
            id="agree"
            checked={agree}
            onCheckedChange={(v) => setAgree(Boolean(v))}
            disabled={loading}
          />
          <Label htmlFor="agree" className="leading-snug">
            I know and agree to the provisions of the{" "}
            <Link
              href="/terms/seller"
              className="text-black hover:text-black/75 font-bold underline"
            >
              Regulation
            </Link>
          </Label>
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-[170px] rounded-3xl inline-flex items-center justify-center"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Register
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>

        {/* Footer link */}
        <p className="text-sm text-muted-foreground text-center">
          Do you have an account?{" "}
          <Link
            href="/login"
            className="text-black hover:text-black/75 font-bold underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}
