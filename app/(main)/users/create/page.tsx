"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { ArrowRight, Loader2 } from "lucide-react";
import { registerUserAction } from "@/app/actions";

export default function CreateUserPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [intent, setIntent] = useState<"" | "sales" | "purchases">("");
  const [taxNumber, setTaxNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [userConcent, setUserConcent] = useState(true);

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const inputCls = (filled: boolean, errored?: boolean) =>
    `h-10 w-full rounded-none border bg-white transition-colors
     focus:border-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0
     ${filled ? "border-black" : ""} ${errored ? "border-red-600" : ""}`;

  const validate = () => {
    const next: Partial<Record<string, string>> = {};
    if (!intent) next.intent = "Please choose one option.";
    if (!taxNumber.trim()) next.taxNumber = "Tax number is required.";
    if (!companyName.trim()) next.companyName = "Company name is required.";
    if (!phone.trim()) next.phone = "Phone number is required.";
    if (!street.trim()) next.street = "Street is required.";
    if (!country) next.country = "Country is required.";
    if (!city.trim()) next.city = "City is required.";
    if (!zip.trim()) next.zip = "Zip code is required.";
    if (!email.trim()) next.email = "E-mail is required.";
    if (!password) next.password = "Password is required.";
    if (password !== confirm) next.confirm = "Passwords do not match.";
    if (!userConcent) next.userConcent = "You must agree to regulations.";
    return next;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setLoading(false);
      return;
    }

    try {
      await registerUserAction({
        email,
        password,
        confirm,
        intent: intent || "sales",
        taxNumber,
        companyName,
        phone,
        street,
        country,
        city,
        zip,
        userConcent,
      });
      alert("User created successfully!");
      router.push("/admin/users");
    } catch (err: any) {
      console.error(err);
      alert("Failed to create user: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl p-2 m-2 sm:mx-6 md:mx-8 lg:mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-4">Users / Create User</h1>
      <div className="bg-white border shadow-sm p-4">
        <form className="grid gap-4" onSubmit={handleSave}>
          {/* Intent + Tax */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label className={errors.intent ? "text-red-600" : ""}>User Intent</Label>
              <Select value={intent} onValueChange={(v) => setIntent(v as "" | "sales" | "purchases")}>
                <SelectTrigger className={inputCls(!!intent, !!errors.intent)}>
                  <SelectValue placeholder="Select intent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="purchases">Purchases</SelectItem>
                </SelectContent>
              </Select>
              {errors.intent && <p className="text-red-600 text-sm">{errors.intent}</p>}
            </div>

            <div className="grid gap-1.5">
              <Label className={errors.taxNumber ? "text-red-600" : ""}>Tax Number</Label>
              <Input
                value={taxNumber}
                onChange={(e) => setTaxNumber(e.target.value)}
                className={inputCls(!!taxNumber, !!errors.taxNumber)}
              />
              {errors.taxNumber && <p className="text-red-600 text-sm">{errors.taxNumber}</p>}
            </div>
          </div>

          {/* Company */}
          <div className="grid gap-1.5">
            <Label className={errors.companyName ? "text-red-600" : ""}>Company Name</Label>
            <Input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className={inputCls(!!companyName, !!errors.companyName)}
            />
            {errors.companyName && <p className="text-red-600 text-sm">{errors.companyName}</p>}
          </div>

          {/* Address */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-1.5">
              <Label className={errors.phone ? "text-red-600" : ""}>Phone</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputCls(!!phone, !!errors.phone)}
                placeholder="+48111222333"
              />
              {errors.phone && <p className="text-red-600 text-sm">{errors.phone}</p>}
            </div>

            <div className="grid gap-1.5">
              <Label className={errors.street ? "text-red-600" : ""}>Street</Label>
              <Input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className={inputCls(!!street, !!errors.street)}
              />
              {errors.street && <p className="text-red-600 text-sm">{errors.street}</p>}
            </div>
          </div>

          {/* Country / City / Zip */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="grid gap-1.5">
              <Label className={errors.country ? "text-red-600" : ""}>Country</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className={inputCls(!!country, !!errors.country)}>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="germany">Germany</SelectItem>
                  <SelectItem value="sweden">Sweden</SelectItem>
                  <SelectItem value="norway">Norway</SelectItem>
                  <SelectItem value="finland">Finland</SelectItem>
                </SelectContent>
              </Select>
              {errors.country && <p className="text-red-600 text-sm">{errors.country}</p>}
            </div>

            <div className="grid gap-1.5">
              <Label className={errors.city ? "text-red-600" : ""}>City</Label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={inputCls(!!city, !!errors.city)}
              />
              {errors.city && <p className="text-red-600 text-sm">{errors.city}</p>}
            </div>

            <div className="grid gap-1.5">
              <Label className={errors.zip ? "text-red-600" : ""}>Zip</Label>
              <Input
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className={inputCls(!!zip, !!errors.zip)}
              />
              {errors.zip && <p className="text-red-600 text-sm">{errors.zip}</p>}
            </div>
          </div>

          {/* Email / Password */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="grid gap-1.5">
              <Label className={errors.email ? "text-red-600" : ""}>Email</Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls(!!email, !!errors.email)}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
            </div>

            <div className="grid gap-1.5">
              <Label className={errors.password ? "text-red-600" : ""}>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputCls(!!password, !!errors.password)}
              />
              {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
            </div>

            <div className="grid gap-1.5">
              <Label className={errors.confirm ? "text-red-600" : ""}>Confirm Password</Label>
              <Input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className={inputCls(!!confirm, !!errors.confirm)}
              />
              {errors.confirm && <p className="text-red-600 text-sm">{errors.confirm}</p>}
            </div>
          </div>

          {/* Regulation Checkbox */}
          <div className="flex items-start gap-2">
            <Checkbox checked={userConcent} onCheckedChange={(v) => setUserConcent(Boolean(v))} />
            <Label>
              I agree to the <Link href="/terms" className="font-bold underline">Regulations</Link>
            </Label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <Button type="submit" disabled={loading} className="rounded-3xl inline-flex items-center">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Register <ArrowRight className="ml-2 h-4 w-4" /></>}
            </Button>
            <Button type="button" onClick={() => router.back()} variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
