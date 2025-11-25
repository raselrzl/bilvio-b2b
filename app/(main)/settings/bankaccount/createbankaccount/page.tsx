"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createBankAccountAction } from "@/app/actions";

export default function BankAccountForm() {
  const [bankName, setBankName] = useState("");
  const [iban, setIban] = useState("");
  const [swift, setSwift] = useState("");
  const [isMain, setIsMain] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Example: get userId from session/auth
  const userId = "current-user-id"; // replace with actual user session

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!userId) {
      console.error("User not logged in");
      return;
    }

    const payload = {
      userId,
      bankName,
      iban,
      swift,
      isMain: isMain === "Yes",
    };

    setLoading(true);
    setSuccess(false);

    try {
      await createBankAccountAction(payload);
      setSuccess(true);
      setBankName("");
      setIban("");
      setSwift("");
      setIsMain("");
    } catch (error) {
      console.error("Error creating bank account:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto w-full p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto m-6 space-y-6 bg-white border shadow-xs p-6 rounded-xs"
      >
        <h1 className="text-xl font-bold mb-4">Create Bank Account</h1>

        {/* Success Alert */}
        {success && (
          <div className="p-2 mb-4 text-green-800 bg-green-100 border border-green-300 rounded">
            Bank account created successfully!
          </div>
        )}

        {/* Bank Name */}
        <div>
          <Label htmlFor="bankName" className="mb-1 block text-sm">
            Bank Name
          </Label>
          <Input
            id="bankName"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className={`h-9 rounded-xs text-sm ${bankName ? "border-green-500" : ""}`}
            placeholder="Enter Bank Name"
          />
        </div>

        {/* IBAN */}
        <div>
          <Label htmlFor="iban" className="mb-1 block text-sm">
            Bank Account Number (IBAN)
          </Label>
          <Input
            id="iban"
            value={iban}
            onChange={(e) => setIban(e.target.value)}
            className={`h-9 rounded-xs text-sm ${iban ? "border-green-500" : ""}`}
            placeholder="Enter IBAN number"
          />
        </div>

        {/* SWIFT */}
        <div>
          <Label htmlFor="swift" className="mb-1 block text-sm">
            Swift / BIC Code
          </Label>
          <Input
            id="swift"
            value={swift}
            onChange={(e) => setSwift(e.target.value)}
            className={`h-9 rounded-xs text-sm ${swift ? "border-green-500" : ""}`}
            placeholder="Enter Swift code"
          />
        </div>

        {/* Main Account */}
        <div>
          <Label htmlFor="isMain" className="mb-1 block text-sm">
            Is this the main account?
          </Label>

          <Select value={isMain} onValueChange={setIsMain}>
            <SelectTrigger
              id="isMain"
              className={`h-9 rounded-xs w-full text-sm ${isMain ? "border-green-500" : ""}`}
            >
              <SelectValue placeholder="Select option" />
            </SelectTrigger>

            <SelectContent className="rounded-xs">
              <SelectItem value="Yes">Yes</SelectItem>
              <SelectItem value="No">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            className="rounded-xs bg-green-600 hover:bg-green-500 text-white px-5 h-8 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading && <span className="loader-border h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>}
            {loading ? "Saving..." : "Save"}
          </Button>

          <Link
            href="/settings/bankaccount"
            className="rounded-xs border bg-gray-100 hover:bg-gray-200 px-4 py-1 text-sm h-8"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
