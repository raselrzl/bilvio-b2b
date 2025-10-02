"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import SubmitButton from "@/components/general/SubmitButton";

export default function CreateDemandForm({
  action, // optional; if omitted we console.log on client
  applyText = "Apply",
  resetText = "Reset",
  defaultValues,
}: {
  action?: (formData: FormData) => void | Promise<void>;
  applyText?: string;
  resetText?: string;
  defaultValues?: Partial<{
    make: string;
    gearbox: "automatic" | "manual";
    fuel: "diesel" | "electric" | "LPG";
    priceFrom: number | string;
    priceTo: number | string;
    demand: number | string;
    status: "draft" | "active";
  }>;
}) {
  const [make, setMake] = useState<string | undefined>(defaultValues?.make);
  const [gearbox, setGearbox] = useState<"automatic" | "manual" | undefined>(
    defaultValues?.gearbox
  );
  const [fuel, setFuel] = useState<"diesel" | "electric" | "LPG" | undefined>(
    defaultValues?.fuel
  );
  const [status, setStatus] = useState<"draft" | "active" | undefined>(
    defaultValues?.status
  );

  const handleResetUI = () => {
    setMake(undefined);
    setGearbox(undefined);
    setFuel(undefined);
    setStatus(undefined);
  };

  const handleClientSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (action) return; // let server action handle it
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      make: (data.get("make") as string) || undefined,
      gearbox: (data.get("gearbox") as "automatic" | "manual") || undefined,
      fuel: (data.get("fuel") as "diesel" | "electric" | "LPG") || undefined,
      priceFrom: data.get("priceFrom")
        ? Number(data.get("priceFrom"))
        : undefined,
      priceTo: data.get("priceTo") ? Number(data.get("priceTo")) : undefined,
      demand: data.get("demand") ? Number(data.get("demand")) : undefined,
      status: (data.get("status") as "draft" | "active") || undefined,
    };

    // eslint-disable-next-line no-console
    console.log("Filter payload", payload);
  };

  return (
    <form
      action={action}
      onSubmit={handleClientSubmit}
      className="w-full max-w-7xl space-y-4"
    >
      {/* hidden inputs so Select values post with the form (if `action` provided) */}
      <input type="hidden" name="make" value={make ?? ""} />
      <input type="hidden" name="gearbox" value={gearbox ?? ""} />
      <input type="hidden" name="fuel" value={fuel ?? ""} />
      <input type="hidden" name="status" value={status ?? ""} />

      {/* fields: equal gaps across inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2 items-end">
        {/* Make */}
        <div>
          <Select value={make} onValueChange={setMake}>
            <SelectTrigger
              id="make"
              className="h-9 rounded-xs w-full"
              aria-label="Make name"
            >
              <SelectValue placeholder="Make name" />
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
          <Select value={gearbox} onValueChange={(v) => setGearbox(v as any)}>
            <SelectTrigger
              id="gearbox"
              className="h-9 rounded-xs w-full"
              aria-label="Gearbox type"
            >
              <SelectValue placeholder="Gearbox type" />
            </SelectTrigger>
            <SelectContent className="rounded-xs">
              <SelectItem value="automatic">automatic</SelectItem>
              <SelectItem value="manual">manual</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Fuel */}
        <div>
          <Select value={fuel} onValueChange={(v) => setFuel(v as any)}>
            <SelectTrigger
              id="fuel"
              className="h-9 rounded-xs w-full"
              aria-label="Fuel type"
            >
              <SelectValue placeholder="Fuel type" />
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
          <Input
            id="priceFrom"
            name="priceFrom"
            type="number"
            inputMode="decimal"
            min={0}
            defaultValue={defaultValues?.priceFrom}
            className="h-9 rounded-xs w-full"
            placeholder="Price from"
            aria-label="Price from"
          />
        </div>

        {/* Price to */}
        <div>
          <Input
            id="priceTo"
            name="priceTo"
            type="number"
            inputMode="decimal"
            min={0}
            defaultValue={defaultValues?.priceTo}
            className="h-9 rounded-xs w-full"
            placeholder="Price to"
            aria-label="Price to"
          />
        </div>

        {/* Demand */}
        <div>
          <Input
            id="demand"
            name="demand"
            type="number"
            inputMode="numeric"
            min={0}
            defaultValue={defaultValues?.demand}
            className="h-9 rounded-xs w-full"
            placeholder="Demand number"
            aria-label="Demand"
          />
        </div>

        {/* Status */}
        <div>
          <Select value={status} onValueChange={(v) => setStatus(v as any)}>
            <SelectTrigger
              id="status"
              className="h-9 rounded-xs w-full"
              aria-label="Status"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="rounded-xs">
              <SelectItem value="draft">draft</SelectItem>
              <SelectItem value="active">active</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* spacer to complete the 8th column on desktop (optional) */}
        <div className="hidden lg:block" />
        <div className="w-full flex justify-end">
          <Button
            type="reset"
            variant="outline"
            className="shrink-0 rounded-xs max-w-[100px] cursor-pointer"
            onClick={handleResetUI}
          >
            <X className="h-4 w-4 mr-2" aria-hidden="true" /> {resetText}
          </Button>
        </div>
      </div>

      {/* bottom actions */}
      <div className="flex items-center gap-3 justify-between pt-2">
        <SubmitButton text={applyText} />
      </div>
    </form>
  );
}
