"use client";
import WarehouseFormComponent from "../createwarehouse/WarehouseFormComponent";
export default function EditWarehousePage() {
  // Mock default values
  const defaultValues = {
    name: "Central Warehouse",
    address: "Kista, Stockholm, Sweden",
    hours: "10:00–18:00 | 5 days/week",
    responsible: "John Andersson",
  };

  function handleEdit(data: any) {
    console.log("Warehouse edited:", data);
    // TODO: Call server action or API to update data
  }

  return <WarehouseFormComponent defaultValues={defaultValues} onSubmit={handleEdit} />;
}
