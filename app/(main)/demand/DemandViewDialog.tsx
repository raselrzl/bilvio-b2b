"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";

interface DemandView {
  id: string;
  make?: string | null;
  gearbox?: string | null;
  fuel?: string | null;
  priceFrom?: number | null;
  priceTo?: number | null;
  modelYear?: number | null;
  country?: string | null;
  warehouse?: string | null;
  wltpCo2?: number | null;
  status?: string | null;
  createdAt: string;
  lastNote?: string;
}


export default function DemandViewDialog({ demand }: { demand: DemandView }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <EyeIcon className="bg-gray-100 p-1 h-8 w-8 cursor-pointer rounded-xs text-gray-700 hover:bg-gray-200" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[95%] max-w-lg p-6 rounded-md shadow">
          <Dialog.Title className="text-xl font-bold">
            Demand Details
          </Dialog.Title>

          <div className="mt-4 space-y-2 text-sm">
            <p><b>Make:</b> {demand.make ?? "—"}</p>
            <p><b>Gearbox:</b> {demand.gearbox ?? "—"}</p>
            <p><b>Fuel:</b> {demand.fuel ?? "—"}</p>
            <p><b>Price:</b> {demand.priceFrom} - {demand.priceTo}</p>
            <p><b>Year:</b> {demand.modelYear}</p>
            <p><b>Country:</b> {demand.country}</p>
            <p><b>Warehouse:</b> {demand.warehouse}</p>
            <p><b>CO₂:</b> {demand.wltpCo2}</p>
            <p><b>Status:</b> {demand.status}</p>
            <p><b>Note:</b> {demand.lastNote || "—"}</p>
          </div>

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