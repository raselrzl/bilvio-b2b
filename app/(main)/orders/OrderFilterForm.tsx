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
    productName?: string;
    orderNumber?: string;
  }) => void;
  defaultValues?: Partial<{
    type: "new" | "used";
    productName: string;
    orderNumber: string;
  }>;
  resetText?: string;
}) {
  const [type, setType] = useState<"new" | "used" | undefined>(
    defaultValues?.type
  );
  const [productName, setProductName] = useState(defaultValues?.productName ?? "");
  const [orderNumber, setOrderNumber] = useState(defaultValues?.orderNumber ?? "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange?.({ type, productName, orderNumber });
    }, 300);

    return () => clearTimeout(timeout);
  }, [type, productName, orderNumber, onFilterChange]);

  const handleResetUI = () => {
    setType(undefined);
    setProductName("");
    setOrderNumber("");
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 items-end">
        {/* Type */}
        <div>
          <Select value={type} onValueChange={(v) => setType(v as any)}>
            <SelectTrigger id="type" className={selectClass(type)} aria-label="Type">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="rounded-xs">
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="used">Used</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Product Name */}
        <div>
          <Input
            id="productName"
            name="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className={inputClass(productName)}
            placeholder="Product Name"
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

        {/* Reset Button */}
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
