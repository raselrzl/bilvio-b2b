"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import SubmitButton from "@/components/general/SubmitButton";
import Link from "next/link";
import { Label } from "@/components/ui/label";

export default function CreateDemandForm({
  action, // optional; if omitted we console.log on client
  defaultValues,
}: {
  action?: (formData: FormData) => void | Promise<void>;
  defaultValues?: Partial<{
    make: string;
    gearbox: "automatic" | "manual";
    fuel: "diesel" | "electric" | "LPG";
    priceFrom: number | string;
    priceTo: number | string;
    demand: number | string;
    modelYear: number | string;
    country: string;
    quantity: number | string;
    warehouse: string;
    wltpCo2: number | string;
    note: string;
  }>;
}) {
  // shadcn Select state mirrors (posted via hidden inputs)
  const [make, setMake] = useState<string | undefined>(defaultValues?.make);
  const [gearbox, setGearbox] = useState<"automatic" | "manual" | undefined>(
    defaultValues?.gearbox
  );
  const [fuel, setFuel] = useState<"diesel" | "electric" | "LPG" | undefined>(
    defaultValues?.fuel
  );
  
  const handleClientSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (action) return; // let server action handle it
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      make: (data.get("make") as string) || undefined,
      gearbox: (data.get("gearbox") as "automatic" | "manual") || undefined,
      fuel: (data.get("fuel") as "diesel" | "electric" | "LPG") || undefined,
      priceFrom: data.get("priceFrom") ? Number(data.get("priceFrom")) : undefined,
      priceTo: data.get("priceTo") ? Number(data.get("priceTo")) : undefined,
      demand: data.get("demand") ? Number(data.get("demand")) : undefined,
      modelYear: data.get("modelYear") ? Number(data.get("modelYear")) : undefined,
      country: (data.get("country") as string) || undefined,
      quantity: data.get("quantity") ? Number(data.get("quantity")) : undefined,
      warehouse: (data.get("warehouse") as string) || "",
      wltpCo2: data.get("wltpCo2") ? Number(data.get("wltpCo2")) : undefined,
      note: (data.get("note") as string) || "",
      intent: (data.get("intent") as string) || "create",
    };

    // eslint-disable-next-line no-console
    console.log("Create demand payload", payload);
  };

  return (
    <form action={action} onSubmit={handleClientSubmit} className="space-y-6">
      {/* shadcn Select mirrors for server action posting */}
      <input type="hidden" name="make" value={make ?? ""} />
      <input type="hidden" name="gearbox" value={gearbox ?? ""} />
      <input type="hidden" name="fuel" value={fuel ?? ""} />
      <input type="hidden" name="status" value={status ?? ""} />

      {/* Top: base fields (layout unchanged: grid-cols-1 sm:grid-cols-3) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        {/* Make */}
        <div>
          <Label htmlFor="make" className="mb-1 block text-sm">Make name</Label>
          <Select value={make} onValueChange={setMake}>
            <SelectTrigger id="make" className="h-9 rounded-xs w-full">
              <SelectValue placeholder="Select make" />
            </SelectTrigger>
            <SelectContent className="max-h-72 rounded-xs">
              <SelectItem value="AUDI">AUDI</SelectItem>
              <SelectItem value="BMW">BMW</SelectItem>
              <SelectItem value="EVO">EVO</SelectItem>
              <SelectItem value="VOLVO">VOLVO</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Gearbox */}
        <div>
          <Label htmlFor="gearbox" className="mb-1 block text-sm">Gearbox type</Label>
          <Select value={gearbox} onValueChange={(v) => setGearbox(v as any)}>
            <SelectTrigger id="gearbox" className="h-9 rounded-xs w-full">
              <SelectValue placeholder="Select gearbox" />
            </SelectTrigger>
            <SelectContent className="rounded-xs">
              <SelectItem value="automatic">automatic</SelectItem>
              <SelectItem value="manual">manual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fuel */}
        <div>
          <Label htmlFor="fuel" className="mb-1 block text-sm">Fuel type</Label>
          <Select value={fuel} onValueChange={(v) => setFuel(v as any)}>
            <SelectTrigger id="fuel" className="h-9 rounded-xs w-full">
              <SelectValue placeholder="Select fuel" />
            </SelectTrigger>
            <SelectContent className="rounded-xs">
              <SelectItem value="diesel">diesel</SelectItem>
              <SelectItem value="electric">electric</SelectItem>
              <SelectItem value="LPG">LPG</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price from */}
        <div>
          <Label htmlFor="priceFrom" className="mb-1 block text-sm">Price from</Label>
          <Input
            id="priceFrom"
            name="priceFrom"
            type="number"
            inputMode="decimal"
            min={0}
            defaultValue={defaultValues?.priceFrom}
            className="h-9 rounded-xs w-full focus:text-black focus:shadow-none focus-visible:ring-0 focus:ring-0 focus:ring-offset-0"
            placeholder="0"
          />
        </div>

        {/* Price to */}
        <div>
          <Label htmlFor="priceTo" className="mb-1 block text-sm">Price to</Label>
          <Input
            id="priceTo"
            name="priceTo"
            type="number"
            inputMode="decimal"
            min={0}
            defaultValue={defaultValues?.priceTo}
            className="h-9 rounded-xs w-full focus:text-black focus:shadow-none focus-visible:ring-0 focus:ring-0 focus:ring-offset-0"
            placeholder="100000"
          />
        </div>

        {/* Demand */}
        <div>
          <Label htmlFor="demand" className="mb-1 block text-sm">Demand number</Label>
          <Input
            id="demand"
            name="demand"
            type="number"
            inputMode="numeric"
            min={0}
            defaultValue={defaultValues?.demand}
            className="h-9 rounded-xs w-full focus:text-black focus:shadow-none focus-visible:ring-0 focus:ring-0 focus:ring-offset-0"
            placeholder="e.g. 5"
          />
        </div>

        {/* Model year */}
        <div>
          <Label htmlFor="modelYear" className="mb-1 block text-sm">Model year</Label>
          <Input
            id="modelYear"
            name="modelYear"
            type="number"
            inputMode="numeric"
            min={1900}
            max={2100}
            defaultValue={defaultValues?.modelYear}
            className="h-9 rounded-xs w-full focus:text-black focus:shadow-none focus-visible:ring-0 focus:ring-0 focus:ring-offset-0"
            placeholder="YYYY"
          />
        </div>

        {/* Country */}
        <div>
          <Label htmlFor="country" className="mb-1 block text-sm">Country</Label>
          <Input
            id="country"
            name="country"
            type="text"
            defaultValue={defaultValues?.country}
            className="h-9 rounded-xs w-full focus:text-black focus:shadow-none focus-visible:ring-0 focus:ring-0 focus:ring-offset-0"
            placeholder="Country"
          />
        </div>

        {/* (kept 3-per-row pattern; leave last cell empty if needed) */}
        <div className="hidden sm:block" />
      </div>

      {/* Section: Basic data (layout unchanged) */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Basic data</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-end">
          {/* Quantity */}
          <div>
            <Label htmlFor="quantity" className="mb-1 block text-sm">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              inputMode="numeric"
              min={0}
              defaultValue={defaultValues?.quantity}
              className="h-9 rounded-xs w-full focus:text-black focus:shadow-none focus-visible:ring-0 focus:ring-0 focus:ring-offset-0"
              placeholder="Quantity"
            />
          </div>

          {/* Warehouse (separate address) */}
          <div>
            <Label htmlFor="warehouse" className="mb-1 block text-sm">Warehouse</Label>
            <Input
              id="warehouse"
              name="warehouse"
              type="text"
              defaultValue={defaultValues?.warehouse}
              className="h-9 rounded-xs w-full focus:text-black focus:shadow-none focus-visible:ring-0 focus:ring-0 focus:ring-offset-0"
              placeholder="Warehouse address"
            />
          </div>

          {/* CO₂ mix (WLTP) */}
          <div>
            <Label htmlFor="wltpCo2" className="mb-1 block text-sm">CO₂ mix (WLTP)</Label>
            <Input
              id="wltpCo2"
              name="wltpCo2"
              type="number"
              step="0.1"
              inputMode="decimal"
              min={0}
              defaultValue={defaultValues?.wltpCo2}
              className="h-9 rounded-xs w-full focus:text-black focus:shadow-none focus-visible:ring-0 focus:ring-0 focus:ring-offset-0"
              placeholder="e.g. 95.2"
            />
          </div>
        </div>
      </section>

      {/* Section: Data visible only for your Company (layout unchanged) */}
      <section className="space-y-3">
        <h3 className="text-base font-semibold">Data visible only for your Company</h3>
        <div>
          <Label htmlFor="note" className="mb-1 block text-sm">Note</Label>
          <textarea
            id="note"
            name="note"
            defaultValue={defaultValues?.note}
            className="w-full rounded-xs border p-3 h-32 resize-none focus:text-black focus:shadow-none focus-visible:ring-0 focus:ring-0 focus:ring-offset-0"
            placeholder="Add a note (only your company can see this)"
          />
        </div>
      </section>

      {/* bottom actions: unchanged */}
      <div className="flex flex-wrap items-center gap-2 pt-2">
        <SubmitButton name="intent" value="create" text="Create" />
        <Button type="submit" name="intent" value="draft" variant="secondary" className="rounded-xs cursor-pointer">
          Save as draft
        </Button>
        <Button asChild variant="destructive" className="rounded-xs bg-amber-600 hover:bg-amber-500">
          <Link href="/demand">Cancel</Link>
        </Button>
      </div>
    </form>
  );
}
