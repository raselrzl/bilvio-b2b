"use client";

import { useRouter } from "next/navigation";
import WarehouseFormComponentEditForm from "./WarehouseFormComponentEditForm";
import { updateWarehouse } from "@/app/actions";

export default function EditWarehouseWrapper({
  warehouseId,
  defaultValues,
}: {
  warehouseId: string;
  defaultValues: {
    name: string;
    address: string;
    responsible: string;
    comment: string;
    openingHours: Record<string, { open: boolean; from: string; to: string }>;
  };
}) {
  const router = useRouter();

  async function handleSubmit(data: typeof defaultValues) {
    await updateWarehouse(warehouseId, data);
    router.push("/settings/warehouse");
  }

  return (
    <WarehouseFormComponentEditForm
      defaultValues={defaultValues}
      warehouseId={warehouseId}
      onSubmit={handleSubmit}
    />
  );
}
