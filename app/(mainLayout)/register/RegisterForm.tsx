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

type Intent = "sales" | "purchases" | undefined;
type FieldKey =
  | "intent"
  | "taxNumber"
  | "companyName"
  | "phone"
  | "street"
  | "country"
  | "city"
  | "zip"
  | "email"
  | "password"
  | "confirm"
  | "agree"
  | "dataAccess";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);

  // form state
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

  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});

  // styling helpers (white inputs, blue on focus, black when filled, red on error)
  const inputCls = (filled: boolean, errored?: boolean) =>
    `h-10 w-full rounded-none border bg-white transition-colors
     focus:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0
     ${filled ? "border-black" : ""} ${errored ? "border-red-600" : ""}`;

  function validate(): Partial<Record<FieldKey, string>> {
    const next: Partial<Record<FieldKey, string>> = {};
    if (!intent) next.intent = "Please choose one option.";
    if (!taxNumber.trim()) next.taxNumber = "Tax number is required.";
    if (!companyName.trim()) next.companyName = "Company name is required.";
    if (!phone.trim()) next.phone = "Phone number is required.";
    else if (!/^\+?\d{7,15}$/.test(phone.trim()))
      next.phone = "Enter a valid phone (e.g. +48111222333).";
    if (!street.trim()) next.street = "Street is required.";
    if (!country) next.country = "Country is required.";
    if (!city.trim()) next.city = "City is required.";
    if (!zip.trim()) next.zip = "Zip code is required.";
    if (!email.trim()) next.email = "E-mail is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim()))
      next.email = "Enter a valid e-mail address.";
    const pwdOk =
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /\d/.test(password);
    if (!password) next.password = "Password is required.";
    else if (!pwdOk)
      next.password =
        "Min. 8 chars, with upper, lower, and a number.";
    if (!confirm) next.confirm = "Please confirm your password.";
    else if (password !== confirm) next.confirm = "Passwords do not match.";
    if (!dataAccess) next.dataAccess = "You must grant data access.";
    if (!agree) next.agree = "You must agree to the regulation.";
    return next;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setLoading(false);
      return;
    }

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
      // TODO: send to your API
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full px-8 md:pl-32">
      <h1 className="text-4xl uppercase font-extrabold mb-6">Registration</h1>

      <form onSubmit={onSubmit} className="grid gap-4" aria-busy={loading} noValidate>
        {/* ROW 1 (2 cols): Intent + Tax number */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Intent */}
          <div className="grid gap-1.5 group">
            <Label
              htmlFor="intent"
              className={`transition-colors ${
                errors.intent ? "text-red-600" : "group-focus-within:text-blue-600"
              }`}
            >
              On the Bilvio platform I intend to carry out
            </Label>

            <Select
              value={intent}
              onValueChange={(v) => setIntent(v === "sales" || v === "purchases" ? v : undefined)}
              disabled={loading}
            >
              <SelectTrigger
                id="intent"
                className={`h-10 w-full rounded-none border bg-white transition-colors
                focus:border-blue-600 focus:ring-0 ${
                  intent ? "border-black" : ""
                } ${errors.intent ? "border-red-600" : ""}`}
                aria-invalid={!!errors.intent}
                aria-describedby={errors.intent ? "intent-error" : undefined}
              >
                <SelectValue placeholder="Choose one" />
              </SelectTrigger>

              <SelectContent className="w-[var(--radix-select-trigger-width)]">
                <SelectItem value="sales">Car sales</SelectItem>
                <SelectItem value="purchases">Car purchases</SelectItem>
              </SelectContent>
            </Select>
            {errors.intent && (
              <p id="intent-error" role="alert" className="text-sm text-red-600">
                {errors.intent}
              </p>
            )}
          </div>

          {/* Tax number */}
          <div className="grid gap-1.5 group">
            <Label
              htmlFor="taxNumber"
              className={`transition-colors ${
                errors.taxNumber ? "text-red-600" : "group-focus-within:text-blue-600"
              }`}
            >
              Tax number
            </Label>
            <Input
              id="taxNumber"
              value={taxNumber}
              onChange={(e) => setTaxNumber(e.target.value)}
              disabled={loading}
              className={inputCls(!!taxNumber, !!errors.taxNumber)}
              aria-invalid={!!errors.taxNumber}
              aria-describedby={errors.taxNumber ? "taxNumber-error" : undefined}
            />
            {errors.taxNumber && (
              <p id="taxNumber-error" role="alert" className="text-sm text-red-600">
                {errors.taxNumber}
              </p>
            )}
          </div>
        </div>

        {/* Company name */}
        <div className="grid gap-1.5 group">
          <Label
            htmlFor="companyName"
            className={`transition-colors ${
              errors.companyName ? "text-red-600" : "group-focus-within:text-blue-600"
            }`}
          >
            Company name
          </Label>
          <Input
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            disabled={loading}
            className={inputCls(!!companyName, !!errors.companyName)}
            aria-invalid={!!errors.companyName}
            aria-describedby={errors.companyName ? "companyName-error" : undefined}
          />
          {errors.companyName && (
            <p id="companyName-error" role="alert" className="text-sm text-red-600">
              {errors.companyName}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="grid gap-1.5 group">
          <Label
            htmlFor="phone"
            className={`transition-colors ${
              errors.phone ? "text-red-600" : "group-focus-within:text-blue-600"
            }`}
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
            className={inputCls(!!phone, !!errors.phone)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Street */}
        <div className="grid gap-1.5 group">
          <Label
            htmlFor="street"
            className={`transition-colors ${
              errors.street ? "text-red-600" : "group-focus-within:text-blue-600"
            }`}
          >
            Street
          </Label>
          <Input
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            disabled={loading}
            className={inputCls(!!street, !!errors.street)}
            aria-invalid={!!errors.street}
            aria-describedby={errors.street ? "street-error" : undefined}
          />
          {errors.street && (
            <p id="street-error" role="alert" className="text-sm text-red-600">
              {errors.street}
            </p>
          )}
        </div>

        {/* ROW 2 (3 cols): Country + City + Zip */}
        <div className="grid gap-4 md:grid-cols-3">
          {/* Country */}
          <div className="grid gap-1.5 group">
            <Label
              htmlFor="country"
              className={`transition-colors ${
                errors.country ? "text-red-600" : "group-focus-within:text-blue-600"
              }`}
            >
              Country
            </Label>

            <Select value={country} onValueChange={setCountry} disabled={loading}>
              <SelectTrigger
                id="country"
                className={`h-10 w-full rounded-none border bg-white transition-colors
                  focus:border-blue-600 focus:ring-0 ${
                    country ? "border-black" : ""
                  } ${errors.country ? "border-red-600" : ""}`}
                aria-invalid={!!errors.country}
                aria-describedby={errors.country ? "country-error" : undefined}
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
            {errors.country && (
              <p id="country-error" role="alert" className="text-sm text-red-600">
                {errors.country}
              </p>
            )}
          </div>

          {/* City */}
          <div className="grid gap-1.5 group">
            <Label
              htmlFor="city"
              className={`transition-colors ${
                errors.city ? "text-red-600" : "group-focus-within:text-blue-600"
              }`}
            >
              City
            </Label>
            <Input
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={loading}
              className={inputCls(!!city, !!errors.city)}
              aria-invalid={!!errors.city}
              aria-describedby={errors.city ? "city-error" : undefined}
            />
            {errors.city && (
              <p id="city-error" role="alert" className="text-sm text-red-600">
                {errors.city}
              </p>
            )}
          </div>

          {/* Zip */}
          <div className="grid gap-1.5 group">
            <Label
              htmlFor="zip"
              className={`transition-colors ${
                errors.zip ? "text-red-600" : "group-focus-within:text-blue-600"
              }`}
            >
              Zip code
            </Label>
            <Input
              id="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              disabled={loading}
              className={inputCls(!!zip, !!errors.zip)}
              aria-invalid={!!errors.zip}
              aria-describedby={errors.zip ? "zip-error" : undefined}
            />
            {errors.zip && (
              <p id="zip-error" role="alert" className="text-sm text-red-600">
                {errors.zip}
              </p>
            )}
          </div>
        </div>

        {/* Data access */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="dataAccess"
            checked={dataAccess}
            onCheckedChange={(v) => setDataAccess(Boolean(v))}
            disabled={loading}
            aria-invalid={!!errors.dataAccess}
            aria-describedby={errors.dataAccess ? "dataAccess-error" : undefined}
          />
          <Label
            htmlFor="dataAccess"
            className={errors.dataAccess ? "text-red-600" : undefined}
          >
            Data access
          </Label>
        </div>
        {errors.dataAccess && (
          <p id="dataAccess-error" role="alert" className="text-sm text-red-600 -mt-2">
            {errors.dataAccess}
          </p>
        )}

        {/* Email */}
        <div className="grid gap-1.5 group">
          <Label
            htmlFor="email"
            className={`transition-colors ${
              errors.email ? "text-red-600" : "group-focus-within:text-blue-600"
            }`}
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
            className={inputCls(!!email, !!errors.email)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-sm text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        {/* ROW 3 (2 cols): Password + Confirm password */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Password */}
          <div className="grid gap-1.5 group">
            <div className="grid gap-2">
              <Label
                htmlFor="password"
                className={`transition-colors ${
                  errors.password ? "text-red-600" : "group-focus-within:text-blue-600"
                }`}
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
                className={inputCls(!!password, !!errors.password)}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : "password-hint"}
              />
            </div>
            <p
              id="password-hint"
              className={`text-xs ${
                errors.password ? "text-red-600" : "text-muted-foreground"
              }`}
            >
              min. 8 characters, at least one uppercase and one lowercase letter, and a number
            </p>
            {errors.password && (
              <p id="password-error" role="alert" className="text-sm text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div className="grid gap-1.5 group">
            <Label
              htmlFor="confirm"
              className={`transition-colors ${
                errors.confirm ? "text-red-600" : "group-focus-within:text-blue-600"
              }`}
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
              className={inputCls(!!confirm, !!errors.confirm)}
              aria-invalid={!!errors.confirm}
              aria-describedby={errors.confirm ? "confirm-error" : undefined}
            />
            {errors.confirm && (
              <p id="confirm-error" role="alert" className="text-sm text-red-600">
                {errors.confirm}
              </p>
            )}
          </div>
        </div>

        {/* Regulation agreement */}
        <div className="flex items-start gap-2">
          <Checkbox
            id="agree"
            checked={agree}
            onCheckedChange={(v) => setAgree(Boolean(v))}
            disabled={loading}
            aria-invalid={!!errors.agree}
            aria-describedby={errors.agree ? "agree-error" : undefined}
          />
          <Label htmlFor="agree" className={errors.agree ? "text-red-600 leading-snug" : "leading-snug"}>
            I know and agree to the provisions of the{" "}
            <Link
              href="/terms/seller"
              className="text-black hover:text-black/75 font-bold underline"
            >
              Regulation
            </Link>
          </Label>
        </div>
        {errors.agree && (
          <p id="agree-error" role="alert" className="text-sm text-red-600 -mt-2">
            {errors.agree}
          </p>
        )}

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
