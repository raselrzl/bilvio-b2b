"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTransition } from "react";
import { toggleProductStockAction } from "@/app/actions";

interface ToggleStockButtonProps {
  productId: string;
}

export default function ToggleStockButton({ productId }: ToggleStockButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggleStock = () => {
    startTransition(async () => {
      try {
        const updated = await toggleProductStockAction(productId);
        toast.success(
          `Product "${updated.name}" is now ${updated.stock === "IN_STOCK" ? "in stock" : "out of stock"}!`
        );
        window.location.reload(); // refresh table to show updated stock
      } catch (err: any) {
        toast.error(err.message || "Failed to update stock");
      }
    });
  };

  return (
    <Button size="sm" variant="outline" onClick={handleToggleStock} disabled={isPending}>
      {isPending ? "Updating..." : "Toggle Stock"}
    </Button>
  );
}
