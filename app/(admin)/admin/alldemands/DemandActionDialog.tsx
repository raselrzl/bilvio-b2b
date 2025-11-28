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

import { deleteDemandAction, updateDemandStatusAction } from "@/app/actions";

import { 
  Trash2, 
  CheckCircle, 
  FileClock 
} from "lucide-react";

const iconMap = {
  DELETE: Trash2,
  SAVED: CheckCircle,
  DRAFT: FileClock,
};

// Tailwind class-safe color map
const colorClasses = {
  red: {
    text: "text-red-600",
    bg: "bg-red-600",
    hover: "hover:bg-red-700",
  },
  green: {
    text: "text-green-600",
    bg: "bg-green-600",
    hover: "hover:bg-green-700",
  },
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
  },
};

export default function DemandActionDialog({
  demandId,
  action,
  label,
  color,
}: {
  demandId: string;
  action: "DELETE" | "SAVED" | "DRAFT";
  label: string;
  color: "red" | "green" | "blue";
}) {
  const [loading, setLoading] = useState(false);

  const Icon = iconMap[action];
  const styles = colorClasses[color];

  const handleConfirm = async () => {
    setLoading(true);

    let result;

    if (action === "DELETE") {
      result = await deleteDemandAction(demandId);
    } else {
      result = await updateDemandStatusAction(demandId, action);
    }

    if (result.success) {
      toast.success(
        action === "DELETE"
          ? "Demand deleted successfully"
          : `Demand updated to ${action}`
      );
    } else {
      toast.error("Action failed");
    }

    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className={`flex items-center ${styles.text}`}>
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-none">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {action === "DELETE"
              ? "Delete this demand?"
              : `Change status to ${action}?`}
          </AlertDialogTitle>

          <AlertDialogDescription>
            {action === "DELETE"
              ? "This action cannot be undone."
              : "This will update the demand's status."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="h-8 rounded-none cursor-pointer">Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={handleConfirm}
            className={`${styles.bg} ${styles.hover} h-8 rounded-none cursor-pointer`}
          >
            {loading ? "Processing..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
