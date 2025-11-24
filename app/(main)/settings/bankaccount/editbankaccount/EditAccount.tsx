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

export default function EditBankAccountFormComponent({
  defaultValues,
}: {
  defaultValues?: {
    iban: string;
    swift: string;
    main: "Yes" | "No";
  };
}) {
  // SAFE VALUES
  const [iban, setIban] = useState(defaultValues?.iban ?? "");
  const [swift, setSwift] = useState(defaultValues?.swift ?? "");
  const [isMain, setIsMain] = useState<"Yes" | "No">(defaultValues?.main ?? "No");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ iban, swift, isMain });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto mt-10 space-y-6 bg-white border shadow-xs p-6 rounded-xs"
    >
      <h1 className="text-xl font-bold mb-4">Edit Bank Account</h1>

      {/* IBAN */}
      <div>
        <Label htmlFor="iban" className="mb-1 block text-sm">
          Bank Account Number (IBAN)
        </Label>
        <Input
          id="iban"
          value={iban}
          onChange={(e) => setIban(e.target.value)}
          className="h-9 rounded-xs text-sm"
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
          className="h-9 rounded-xs text-sm"
          placeholder="Enter Swift code"
        />
      </div>

      {/* Main Account */}
      <div>
        <Label htmlFor="isMain" className="mb-1 block text-sm">
          Is this the main account?
        </Label>

        <Select value={isMain} onValueChange={(v) => setIsMain(v as any)}>
          <SelectTrigger id="isMain" className="h-9 rounded-xs w-full text-sm">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>

          <SelectContent className="rounded-xs">
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* BUTTONS */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          className="rounded-xs bg-amber-600 hover:bg-amber-500 text-white px-5"
        >
          Save changes
        </Button>

        <Link
          href="/buyer/bank"
          className="rounded-xs border bg-gray-100 hover:bg-gray-200 px-4 py-1 text-sm"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
