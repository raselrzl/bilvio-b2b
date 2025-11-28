"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AlertDialogFooter, AlertDialogHeader } from "@/components/ui/alert-dialog";

interface DemandActionDialogProps {
  demandId: string;
  label: string;
  action: () => Promise<any>;
  children: React.ReactNode;
}

export default function DemandActionDialog({
  demandId,
  label,
  action,
  children,
}: DemandActionDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    const res = await action();
    setLoading(false);
    setOpen(false);

    res?.ok
      ? toast.success(`${label} successful`)
      : toast.error("Action failed");
  };

  return (
    <>
      {/* YOUR ICON STYLE (unchanged) */}
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </span>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40" />

          <Dialog.Content className="rounded-xs bg-white p-6 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow">
            <AlertDialogHeader>
              <Dialog.Title>{label}</Dialog.Title>
            </AlertDialogHeader>

            <p>Are you sure you want to {label.toLowerCase()}?</p>

            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button onClick={handleConfirm} disabled={loading}>
                {loading ? "Processing..." : "Confirm"}
              </Button>
            </AlertDialogFooter>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
