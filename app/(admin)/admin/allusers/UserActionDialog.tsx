"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import {
  deleteUserAction,
  updateApprovalStatusAction,
  updateUserTypeAction,
} from "@/app/actions";

interface UserActionDialogProps {
  userId: string;
  action:
    | "DELETE"
    | "USER"
    | "ADMIN"
    | "SUPERADMIN"
    | "APPROVED"
    | "REJECTED"
    | "ACTIVE"
    | "INACTIVE";
  label: string;
  color?: "red" | "green" | "blue";
}

export default function UserActionDialog({
  userId,
  action,
  label,
  color = "blue",
}: UserActionDialogProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAction = async () => {
    startTransition(async () => {
      try {
        if (action === "DELETE") {
          await deleteUserAction(userId);
          toast.success("User deleted successfully");
        } else if (["USER", "ADMIN", "SUPERADMIN"].includes(action)) {
          await updateUserTypeAction(userId, action as "USER" | "ADMIN" | "SUPERADMIN");
          toast.success(`User role updated to ${action}`);
        } else {
          await updateApprovalStatusAction(
            userId,
            action as "APPROVED" | "REJECTED" | "ACTIVE" | "INACTIVE"
          );
          toast.success(`Status updated to ${action}`);
        }

        setOpen(false); // ✅ close dialog after action
      } catch (err) {
        toast.error("Action failed");
      }
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          {label}
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4">
          <Dialog.Title className="text-lg font-semibold">{label}</Dialog.Title>
          <p className="text-sm text-gray-700">
            Are you sure you want to perform this action?
          </p>
          <div className="flex justify-end gap-2">
            <Dialog.Close asChild>
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              onClick={handleAction}
              className={
                color === "red"
                  ? "bg-red-600 text-white"
                  : color === "green"
                  ? "bg-green-600 text-white"
                  : "bg-blue-600 text-white"
              }
              disabled={isPending}
            >
              {isPending ? "Processing..." : "Confirm"}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
