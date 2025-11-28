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
  const details = [
    { label: "Make", value: demand.make ?? "—" },
    { label: "Gearbox", value: demand.gearbox ?? "—" },
    { label: "Fuel", value: demand.fuel ?? "—" },
    { label: "Price", value: `${demand.priceFrom ?? "—"} - ${demand.priceTo ?? "—"}` },
    { label: "Year", value: demand.modelYear ?? "—" },
    { label: "Country", value: demand.country ?? "—" },
    { label: "Warehouse", value: demand.warehouse ?? "—" },
    { label: "CO₂", value: demand.wltpCo2 ?? "—" },
    { label: "Status", value: demand.status ?? "—" },
    { label: "Note", value: demand.lastNote ?? "—" },
  ];

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <EyeIcon className="bg-gray-100 p-1 h-8 w-8 cursor-pointer rounded-xs text-gray-700 hover:bg-gray-200" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />

        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[95%] max-w-lg p-6 rounded-xs shadow-lg">
          <Dialog.Title className="text-xl font-bold mb-4">
            Demand Details
          </Dialog.Title>

          {/* Grid layout for details */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {details.map((item) => (
              <div key={item.label} className="flex">
                <span className="font-semibold w-24">{item.label}:</span>
                <span className="text-gray-700">{item.value}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Dialog.Close asChild>
              <Button variant="outline" className="h-8 rounded-none cursor-pointer">
                Close
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
