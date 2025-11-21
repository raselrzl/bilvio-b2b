"use client"; // ✅ This makes it a Client Component
import { Mail } from "lucide-react";

interface SendReminderButtonProps {
  orderId: string;
}

export function SendReminderButton({ orderId }: SendReminderButtonProps) {
  const sendReminder = async () => {
    try {
      const res = await fetch(`/api/email/${orderId}`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to send reminder");
      alert("Reminder email sent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to send reminder email.");
    }
  };

  return (
     <button
      onClick={sendReminder}
      className="flex items-center gap-2 w-full text-left text-sm pl-2 p-1 hover:border rounded-none cursor-pointer"
    >
      <Mail className="w-4 h-4 mr-2" />
      Send Payment Reminder
    </button>
  );
}
