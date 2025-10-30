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
import { createDemandAction } from "@/app/actions";

export default function CreateDemandForm({
  defaultValues,
}: {
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
  const [make, setMake] = useState<string | undefined>(defaultValues?.make);
  const [gearbox, setGearbox] = useState<"automatic" | "manual" | undefined>(
    defaultValues?.gearbox
  );
  const [fuel, setFuel] = useState<"diesel" | "electric" | "LPG" | undefined>(
    defaultValues?.fuel
  );

  return (
    <form action={createDemandAction} className="space-y-6">
      <input type="hidden" name="make" value={make ?? ""} />
      <input type="hidden" name="gearbox" value={gearbox ?? ""} />
      <input type="hidden" name="fuel" value={fuel ?? ""} />
      <input type="hidden" name="intent" value="create" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
        <div>
          <Label htmlFor="make" className="mb-1 block text-sm">
            Make name
          </Label>
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

        <div>
          <Label htmlFor="gearbox" className="mb-1 block text-sm">
            Gearbox type
          </Label>
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

        <div>
          <Label htmlFor="fuel" className="mb-1 block text-sm">
            Fuel type
          </Label>
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

        <div>
          <Label htmlFor="priceFrom" className="mb-1 block text-sm">
            Price from
          </Label>
          <Input
            id="priceFrom"
            name="priceFrom"
            type="number"
            min={0}
            defaultValue={defaultValues?.priceFrom}
            className="h-9 rounded-xs w-full focus:text-black focus:ring-0"
            placeholder="0"
          />
        </div>

        <div>
          <Label htmlFor="priceTo" className="mb-1 block text-sm">
            Price to
          </Label>
          <Input
            id="priceTo"
            name="priceTo"
            type="number"
            min={0}
            defaultValue={defaultValues?.priceTo}
            className="h-9 rounded-xs w-full focus:text-black focus:ring-0"
            placeholder="100000"
          />
        </div>

        <div>
          <Label htmlFor="demand" className="mb-1 block text-sm">
            Demand number
          </Label>
          <Input
            id="demand"
            name="demand"
            type="number"
            min={0}
            defaultValue={defaultValues?.demand}
            className="h-9 rounded-xs w-full focus:text-black focus:ring-0"
            placeholder="e.g. 5"
          />
        </div>

        <div>
          <Label htmlFor="modelYear" className="mb-1 block text-sm">
            Model year
          </Label>
          <Input
            id="modelYear"
            name="modelYear"
            type="number"
            min={1900}
            max={2100}
            defaultValue={defaultValues?.modelYear}
            className="h-9 rounded-xs w-full focus:text-black focus:ring-0"
            placeholder="YYYY"
          />
        </div>

        <div>
          <Label htmlFor="country" className="mb-1 block text-sm">
            Country
          </Label>
          <Input
            id="country"
            name="country"
            type="text"
            defaultValue={defaultValues?.country}
            className="h-9 rounded-xs w-full focus:text-black focus:ring-0"
            placeholder="Country"
          />
        </div>
        <div className="hidden sm:block" />
      </div>

      <section className="space-y-3">
        <h3 className="text-base font-semibold">Basic data</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-end">
          <div>
            <Label htmlFor="quantity" className="mb-1 block text-sm">
              Quantity
            </Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min={0}
              defaultValue={defaultValues?.quantity}
              className="h-9 rounded-xs w-full focus:text-black focus:ring-0"
              placeholder="Quantity"
            />
          </div>

          <div>
            <Label htmlFor="warehouse" className="mb-1 block text-sm">
              Warehouse
            </Label>
            <Input
              id="warehouse"
              name="warehouse"
              type="text"
              defaultValue={defaultValues?.warehouse}
              className="h-9 rounded-xs w-full focus:text-black focus:ring-0"
              placeholder="Warehouse address"
            />
          </div>

          <div>
            <Label htmlFor="wltpCo2" className="mb-1 block text-sm">
              CO₂ mix (WLTP)
            </Label>
            <Input
              id="wltpCo2"
              name="wltpCo2"
              type="number"
              step="0.1"
              min={0}
              defaultValue={defaultValues?.wltpCo2}
              className="h-9 rounded-xs w-full focus:text-black focus:ring-0"
              placeholder="e.g. 95.2"
            />
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-base font-semibold">
          Data visible only for your Company
        </h3>
        <div>
          <Label htmlFor="note" className="mb-1 block text-sm">
            Note
          </Label>
          <textarea
            id="note"
            name="note"
            defaultValue={defaultValues?.note}
            className="w-full rounded-xs border p-3 h-32 resize-none focus:text-black focus:ring-0"
            placeholder="Add a note (only your company can see this)"
          />
        </div>
      </section>

      <div className="flex flex-wrap items-center gap-2 pt-2">
        <SubmitButton text="Save" />
        <Link
          href="/demand"
          className="rounded-xs bg-amber-600 hover:bg-amber-500 px-4 py-1"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
