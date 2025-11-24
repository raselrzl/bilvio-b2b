"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BankAccountForm() {
  const [bankName, setBankName] = useState(""); // NEW
  const [iban, setIban] = useState("");
  const [swift, setSwift] = useState("");
  const [isMain, setIsMain] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log({
      bankName,  // NEW
      iban,
      swift,
      isMain,
    });
  }

  return (
    <div className="max-w-7xl mx-auto w-full p-6">
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto m-6 space-y-6 bg-white border shadow-xs p-6 rounded-xs">
        <h1 className="text-xl font-bold mb-4">Create Bank Account</h1>

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
            className="rounded-xs bg-green-600 hover:bg-green-500 text-white px-5 h-8"
          >
            Save
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
