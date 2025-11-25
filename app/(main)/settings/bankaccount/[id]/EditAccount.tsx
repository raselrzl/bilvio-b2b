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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg("");

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
      setMsg(err.message || "Failed to update");
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
          className="h-9 rounded-xs text-sm"
        />
      </div>

      {/* IBAN */}
      <div>
        <Label htmlFor="iban">Bank Account Number (IBAN)</Label>
        <Input
          id="iban"
          value={iban}
          onChange={(e) => setIban(e.target.value)}
          className="h-9 rounded-xs text-sm"
        />
      </div>

      {/* SWIFT */}
      <div>
        <Label htmlFor="swift">Swift/BIC Code</Label>
        <Input
          id="swift"
          value={swift}
          onChange={(e) => setSwift(e.target.value)}
          className="h-9 rounded-xs text-sm"
        />
      </div>

      {/* Main Account */}
      <div>
        <Label>Is this the main account?</Label>
        <Select
          value={isMain}
          onValueChange={(value) => setIsMain(value as "Yes" | "No")}
        >
          <SelectTrigger className="h-9 rounded-xs w-full text-sm">
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
