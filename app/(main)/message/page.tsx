"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getUserMessages } from "@/app/actions";
import MessagePopup from "@/components/general/MessagePopup";

interface UserMessage {
  id: string;
  message: string;
  productName: string;
  productId: string;
  onMessageSent?: () => void;
}

export default function MessagePage() {
  const [messages, setMessages] = useState<UserMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      const msgs = await getUserMessages();
      setMessages(msgs);
      setLoading(false);
    }
    fetchMessages();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <section className="max-w-7xl bg-white border shadow-sm p-6 m-4 sm:mx-6 md:mx-8 lg:mx-auto">
      <header>
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          Your Messages
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          View all your messages and related products.
        </p>
      </header>

      {messages.length === 0 ? (
        <div className="mt-6 text-center text-gray-600">
          No messages yet. Send a new one!
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="border rounded p-4 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{msg.productName}</p>
                <p className="text-gray-700 mt-1">{msg.message}</p>
              </div>
              <div>
                <MessagePopup
                  productId={msg.productId}
                  productName={msg.productName}
                  userEmail="You"
                  onMessageSent={async () => {
                    alert("Message sent successfully!");

                    // Refetch messages only for this page
                    const msgs = await getUserMessages();
                    setMessages(msgs);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
