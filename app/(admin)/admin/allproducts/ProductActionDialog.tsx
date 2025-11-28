"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { deleteProductAction, checkProductAvailabilityAction } from "@/app/actions";

interface ProductActionDialogProps {
  productId: string;
  label: string;
  color?: "red" | "blue" | "green";
  checkAvailability?: boolean; // if true, allow checking availability
}

export default function ProductActionDialog({
  productId,
  label,
  color = "red",
  checkAvailability = false,
}: ProductActionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

 const handleDelete = async () => {
  startTransition(async () => {
    try {
      const result = await deleteProductAction(productId);
      if (result.ok) {
        toast.success("Product deleted successfully!");
        setOpen(false);
        window.location.reload();
      } else {
        toast.error(result.error || "Failed to delete product");
      }
    } catch (err) {
      toast.error("Failed to delete product");
    }
  });
};

const handleCheckAvailability = async () => {
  startTransition(async () => {
    try {
      const result = await checkProductAvailabilityAction(productId);
      toast.success(`Availability: ${result.availability}, Stock: ${result.stock}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to check availability");
    }
  });
};


  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" className="h-8 rounded-xs">
          {label}
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white p-6 rounded-xs shadow-lg space-y-4">
          <Dialog.Title className="text-lg font-semibold">{label}</Dialog.Title>
          <p className="text-sm text-gray-700">
            Are you sure you want to perform this action on this product?
          </p>

          <div className="flex flex-col gap-2">
            {checkAvailability && (
              <Button
                variant="outline"
                onClick={handleCheckAvailability}
                disabled={isPending}
                className="h-8 rounded-xs"
              >
                {isPending ? "Checking..." : "Check Availability"}
              </Button>
            )}

            {color === "red" && (
              <Button
                onClick={handleDelete}
                className="bg-red-600 text-white h-8 rounded-xs"
                disabled={isPending}
              >
                {isPending ? "Processing..." : "Delete Product"}
              </Button>
            )}
          </div>

          <div className="flex justify-end">
            <Dialog.Close asChild>
              <Button variant="outline" disabled={isPending} className="h-8 rounded-none">
                Cancel
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
