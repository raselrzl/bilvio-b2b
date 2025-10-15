"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createOrderAction } from "@/app/actions";
import { Loader2, ShoppingBag } from "lucide-react";

export function OrderSection({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1);
  const [isPending, startTransition] = useTransition();

  const handleOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("quantity", quantity.toString());

    startTransition(async () => {
      const res = await createOrderAction(formData);
      if (res.ok) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="mt-6">
      <form
        onSubmit={handleOrder}
        className="border-t mt-6 pt-4 bg-white p-4 shadow-sm flex flex-col"
      >
        <div className="flex gap-2 mb-6">
          <h2 className="text-lg font-bold ml-4">Order This product</h2>
          <ShoppingBag />
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="flex gap-2">
            <label className="text-sm text-gray-700 font-medium mt-2">
              Quantity*
            </label>
            <Input
              type="number"
              min={1}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-24 rounded-xs"
            />
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="bg-green-600 text-white hover:bg-green-500 rounded-xs px-4 py-2 text-sm font-semibold"
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              "Place Order"
            )}{" "}
          </Button>
        </div>
      </form>
    </div>
  );
}
