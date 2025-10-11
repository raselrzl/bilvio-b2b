"use client";

import { useEffect, useState } from "react";
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

export default function OrderFilterForm({
  onFilterChange,
  defaultValues,
  resetText = "Reset",
}: {
  onFilterChange?: (filters: {
    type?: "new" | "used";
    makeModel?: string;
    orderNumber?: string;
    vin?: string;
  }) => void;
  defaultValues?: Partial<{
    type: "new" | "used";
    makeModel: string;
    orderNumber: string;
    vin: string;
  }>;
  resetText?: string;
}) {
  const [type, setType] = useState<"new" | "used" | undefined>(
    defaultValues?.type
  );
  const [makeModel, setMakeModel] = useState(defaultValues?.makeModel ?? "");
  const [orderNumber, setOrderNumber] = useState(
    defaultValues?.orderNumber ?? ""
  );
  const [vin, setVin] = useState(defaultValues?.vin ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filters = { type, makeModel, orderNumber, vin };
      onFilterChange?.(filters);
    }, 300);
    return () => clearTimeout(timeout);
  }, [type, makeModel, orderNumber, vin, onFilterChange]);

  const handleResetUI = () => {
    setType(undefined);
    setMakeModel("");
    setOrderNumber("");
    setVin("");
  };

  const inputClass = (value: string | undefined) =>
    `h-9 w-full rounded-xs bg-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-0 ${
      value ? "bg-[#619aab] text-white placeholder-white" : ""
    }`;

  const selectClass = (value: string | undefined) =>
    `h-9 w-full rounded-xs bg-white focus:outline-none focus:ring-0 focus:border-0 ${
      value ? "bg-[#619aab] text-white" : ""
    }`;

  return (
    <form className="w-full max-w-7xl space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 items-end">
        {/* Type */}
        <div>
          <Select value={type} onValueChange={(v) => setType(v as any)}>
            <SelectTrigger id="type" className={selectClass(type)} aria-label="Type">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="rounded-xs">
              <SelectItem value="new">New cars</SelectItem>
              <SelectItem value="used">Used cars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Make & Model */}
        <div>
          <Input
            id="makeModel"
            name="makeModel"
            type="text"
            value={makeModel}
            onChange={(e) => setMakeModel(e.target.value)}
            className={inputClass(makeModel)}
            placeholder="Make, Model"
          />
        </div>

        {/* Order Number */}
        <div>
          <Input
            id="orderNumber"
            name="orderNumber"
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className={inputClass(orderNumber)}
            placeholder="Order Number"
          />
        </div>

        {/* VIN */}
        <div>
          <Input
            id="vin"
            name="vin"
            type="text"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            className={inputClass(vin)}
            placeholder="VIN"
          />
        </div>

        {/* Reset button */}
        <div className="w-full flex justify-end">
          <Button
            type="button"
            variant="outline"
            className="shrink-0 rounded-xs max-w-[100px] cursor-pointer"
            onClick={handleResetUI}
          >
            <X className="h-4 w-4 mr-2" aria-hidden="true" /> {resetText}
          </Button>
        </div>
      </div>
    </form>
  );
}
