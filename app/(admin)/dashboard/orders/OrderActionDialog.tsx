"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import {
  CheckCircle,
  XCircle,
  Ban,
  Trash2,
  CircleCheckBig,
} from "lucide-react";
import { orderAction } from "@/app/actions";

// Icons mapping
const iconMap = {
  ACCEPTED: CheckCircle,
  REJECTED: XCircle,
  CANCELLED: Ban,
  COMPLETED: CircleCheckBig,
  DELETE: Trash2,
};

// Tailwind color-safe class map
const colorClasses = {
  green: {
    text: "text-green-600",
    bg: "bg-green-600",
    hover: "hover:bg-green-700",
  },
  red: {
    text: "text-red-600",
    bg: "bg-red-600",
    hover: "hover:bg-red-700",
  },
  orange: {
    text: "text-orange-600",
    bg: "bg-orange-600",
    hover: "hover:bg-orange-700",
  },
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
  },
};

export default function OrderActionDialog({
  orderId,
  action,
  label,
  color,
}: {
  orderId: string;
  action: "ACCEPTED" | "REJECTED" | "CANCELLED" | "COMPLETED" | "DELETE";
  label: string;
  color: "green" | "red" | "orange" | "blue";
}) {
  const [loading, setLoading] = useState(false);

  const Icon = iconMap[action];
  const styles = colorClasses[color]; // <-- SAFE classes

  const handleConfirm = async () => {
    setLoading(true);

    const result = await orderAction(orderId, action);

    if (result.success) {
      toast.success(
        action === "DELETE"
          ? "Order deleted successfully!"
          : `Order marked as ${action}!`
      );
    } else {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className={`flex items-center h-8 cursor-pointer ${styles.text}`}>
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-xs">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {action === "DELETE"
              ? "Delete this order?"
              : `Set status to ${action}?`}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {action === "DELETE"
              ? "This action is permanent and cannot be undone."
              : `This will update the order status to ${action}.`}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="h-8 rounded-xs cursor-pointer">Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleConfirm}
            disabled={loading}
            className={`${styles.bg}  ${styles.hover} h-8 rounded-xs cursor-pointer`}
          >
            {loading ? "Processing..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
