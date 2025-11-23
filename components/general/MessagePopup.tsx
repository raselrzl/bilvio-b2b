"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { createMessageAction } from "@/app/actions";

interface MessagePopupProps {
  productId: string;
  productName?: string;
  userEmail?: string;
  onMessageSent?: () => void; // callback after sending message
}

export default function MessagePopup({
  productId,
  productName,
  userEmail,
  onMessageSent,
}: MessagePopupProps) {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const sendMessage = async () => {
    setLoading(true);

    const res = await createMessageAction({
      productId,
      message,
    });

    setLoading(false);

    if (res.ok) {
      setSuccess("Message sent!");
      setMessage("");
      setSubject("");
      setTimeout(() => setOpen(false), 800);

      // ✅ trigger callback for parent page
      if (onMessageSent) onMessageSent();
    } else {
      setSuccess(res.message);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm font-semibold hover:underline flex items-center gap-1"
      >
        Send message
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Send Message</h2>
              <X className="cursor-pointer" onClick={() => setOpen(false)} />
            </div>

            {/* ✅ Show product name and email */}
            {productName && <p className="font-semibold mb-1">About Product: {productName}</p>}
            {userEmail && <p className="text-sm text-gray-500 mb-2">From: {userEmail}</p>}


            <textarea
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-28 border p-2 text-sm"
            />

            {success && <p className="text-center text-green-600 mt-2">{success}</p>}

            <Button
              onClick={sendMessage}
              disabled={loading}
              className="w-full mt-4 bg-[#619aab] text-white rounded-2xl"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
