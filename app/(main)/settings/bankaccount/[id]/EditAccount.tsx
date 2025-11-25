"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { editBankAccountAction } from "@/app/actions";

// IBAN validator
function isValidIBAN(iban: string) {
  const formatted = iban.replace(/\s+/g, "").toUpperCase();

  if (formatted.length < 15 || formatted.length > 34) return false;
  if (!/^[A-Z0-9]+$/.test(formatted)) return false;

  const rearranged = formatted.slice(4) + formatted.slice(0, 4);
  const converted = rearranged.replace(/[A-Z]/g, (letter) =>
    (letter.charCodeAt(0) - 55).toString()
  );

  let total = "";
  for (let i = 0; i < converted.length; i += 6) {
    total = String(parseInt(total + converted.slice(i, i + 6)) % 97);
  }

  return Number(total) === 1;
}

export default function EditBankAccountFormComponent({
  account,
}: {
  account: {
    id: string;
    bankName: string;
    iban: string;
    swift: string;
    isMain: boolean;
  };
}) {
  const [bankName, setBankName] = useState(account.bankName);
  const [iban, setIban] = useState(account.iban);
  const [swift, setSwift] = useState(account.swift);
  const [isMain, setIsMain] = useState(account.isMain ? "Yes" : "No");

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [ibanError, setIbanError] = useState("");
  const [bankError, setBankError] = useState("");
  const [swiftError, setSwiftError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    // Reset errors
    setIbanError("");
    setBankError("");
    setSwiftError("");

    // Validation
    let hasError = false;

    if (!bankName.trim()) {
      setBankError("Bank name is required.");
      hasError = true;
    }

    if (!iban.trim()) {
      setIbanError("IBAN cannot be empty.");
      hasError = true;
    } else if (iban.replace(/\s+/g, "").length < 15) {
      setIbanError("IBAN is too short. Please enter a full IBAN.");
      hasError = true;
    } else if (!isValidIBAN(iban)) {
      setIbanError("Invalid IBAN number. Please enter a correct Swedish or international IBAN.");
      hasError = true;
    }

    if (!swift.trim()) {
      setSwiftError("SWIFT/BIC code is required.");
      hasError = true;
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    // Submit to server
    try {
      await editBankAccountAction({
        id: account.id,
        bankName,
        iban,
        swift,
        isMain: isMain === "Yes",
      });

      setMsg("Bank account updated successfully!");
    } catch (err: any) {
      // Show server errors (e.g., duplicate IBAN)
      setMsg(err.message || "Something went wrong while updating. IBAN may already exist.");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto mt-10 space-y-6 bg-white border shadow-xs p-6 rounded-xs"
    >
      <h1 className="text-xl font-bold mb-4">Edit Bank Account</h1>

      {msg && (
        <div className="p-2 mb-4 text-sm bg-gray-100 border rounded">{msg}</div>
      )}

      {/* Bank Name */}
      <div>
        <Label htmlFor="bankName">Bank Name</Label>
        <Input
          id="bankName"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          className={`h-9 rounded-xs text-sm ${
            bankError ? "border-red-500" : bankName ? "border-green-500" : ""
          }`}
          placeholder="Enter Bank Name"
        />
        {bankError && <p className="text-red-600 text-xs mt-1">{bankError}</p>}
      </div>

      {/* IBAN */}
      <div>
        <Label htmlFor="iban">Bank Account Number (IBAN)</Label>
        <Input
          id="iban"
          value={iban}
          onChange={(e) => {
            setIban(e.target.value);
            setIbanError("");
          }}
          className={`h-9 rounded-xs text-sm ${
            ibanError ? "border-red-500" : iban ? "border-green-500" : ""
          }`}
          placeholder="Example: SE45 5000 0000 0583 9825 7466"
        />
        {ibanError && <p className="text-red-600 text-xs mt-1">{ibanError}</p>}
      </div>

      {/* SWIFT */}
      <div>
        <Label htmlFor="swift">Swift/BIC Code</Label>
        <Input
          id="swift"
          value={swift}
          onChange={(e) => setSwift(e.target.value)}
          className={`h-9 rounded-xs text-sm ${
            swiftError ? "border-red-500" : swift ? "border-green-500" : ""
          }`}
          placeholder="Example: SWEDSESS"
        />
        {swiftError && <p className="text-red-600 text-xs mt-1">{swiftError}</p>}
      </div>

      {/* Main Account */}
      <div>
        <Label>Is this the main account?</Label>
        <Select
          value={isMain}
          onValueChange={(value) => setIsMain(value as "Yes" | "No")}
        >
          <SelectTrigger
            className={`h-9 rounded-xs w-full text-sm ${isMain ? "border-green-500" : ""}`}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <Button
          type="submit"
          disabled={loading}
          className="rounded-xs bg-green-600 hover:bg-green-500 text-white px-5 h-8"
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>

        <Link
          href="/settings/bankaccount"
          className="rounded-xs border bg-gray-100 px-4 py-1 text-sm"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
