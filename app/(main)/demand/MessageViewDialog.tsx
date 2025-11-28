"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MessageViewDialog({ note }: { note: string }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <MessageCircle className="bg-gray-100 p-1 h-8 w-8 cursor-pointer rounded-xs text-gray-700 hover:bg-gray-200" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[93%] max-w-md p-6 rounded-md shadow">
          <Dialog.Title className="text-xl font-bold">
            Last Message
          </Dialog.Title>

          <p className="mt-4 text-gray-700">
            {note || "No message available."}
          </p>

          <div className="flex justify-end mt-6">
            <Dialog.Close asChild>
              <Button variant="outline">Close</Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
