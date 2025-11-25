"use client";

import { createWarehouse } from "@/app/actions";
import WarehouseFormComponent from "./WarehouseFormComponent";
import { useRouter } from "next/navigation";

export default function CreateWarehousePage() {
  const router = useRouter();

  async function handleCreate(data: any) {
    try {
      await createWarehouse(data);
      alert("Warehouse created successfully!");
      router.push("/settings/warehouse");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to create warehouse");
    }
  }

  return <WarehouseFormComponent onSubmit={handleCreate} />;
}
