import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

interface OpeningHour {
  open: boolean;
  from: string;
  to: string;
}

interface Warehouse {
  id: number;
  name: string;
  address: string;
  openingHours: Record<Day, OpeningHour>;
  responsible: string;
  comment?: string;
}

export default function WarehouseSettingsPage() {
  // Temporary mock warehouses
  const warehouses: Warehouse[] = [
    {
      id: 1,
      name: "Central Warehouse",
      address: "Kista, Stockholm, Sweden",
      responsible: "John Andersson",
      comment: "Main hub",
      openingHours: {
        Monday: { open: true, from: "10:00", to: "18:00" },
        Tuesday: { open: true, from: "10:00", to: "18:00" },
        Wednesday: { open: true, from: "10:00", to: "18:00" },
        Thursday: { open: true, from: "10:00", to: "18:00" },
        Friday: { open: true, from: "10:00", to: "18:00" },
        Saturday: { open: false, from: "00:00", to: "00:00" },
        Sunday: { open: false, from: "00:00", to: "00:00" },
      },
    },
 /*    {
      id: 2,
      name: "South Delivery Hub",
      address: "Malmö City Industrial Area",
      responsible: "Sara Nilsson",
      comment: "Temporary storage",
      openingHours: {
        Monday: { open: true, from: "10:00", to: "18:00" },
        Tuesday: { open: true, from: "10:00", to: "18:00" },
        Wednesday: { open: true, from: "10:00", to: "18:00" },
        Thursday: { open: true, from: "10:00", to: "18:00" },
        Friday: { open: true, from: "10:00", to: "18:00" },
        Saturday: { open: false, from: "00:00", to: "00:00" },
        Sunday: { open: false, from: "00:00", to: "00:00" },
      },
    },
    {
      id: 3,
      name: "North Auto Storage",
      address: "Uppsala Logistics Park",
      responsible: "Mohammed Karim",
      comment: "Spare parts only",
      openingHours: {
        Monday: { open: true, from: "10:00", to: "18:00" },
        Tuesday: { open: true, from: "10:00", to: "18:00" },
        Wednesday: { open: true, from: "10:00", to: "18:00" },
        Thursday: { open: true, from: "10:00", to: "18:00" },
        Friday: { open: true, from: "10:00", to: "18:00" },
        Saturday: { open: false, from: "00:00", to: "00:00" },
        Sunday: { open: false, from: "00:00", to: "00:00" },
      },
    }, */
  ];

  const daysOfWeek: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 2xl:px-0 mt-8">
        <h1 className="text-2xl md:text-3xl font-extrabold">Warehouse</h1>

        <Link href="/settings/warehouse/createwarehouse">
          <Button className="rounded-xs inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white">
            <span>+ Create warehouse</span>
          </Button>
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white border shadow-xs m-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-white">
            <tr className="text-left">
              <th className="py-2 px-3 border border-gray-950/10 font-semibold">Name</th>
              <th className="py-2 px-3 border border-gray-950/10 font-semibold">Address</th>
              <th className="py-2 px-3 border border-gray-950/10 font-semibold">Opening Hours</th>
              <th className="py-2 px-3 border border-gray-950/10 font-semibold">Responsible</th>
              <th className="py-2 px-3 border border-gray-950/10 font-semibold">Comment</th>
              <th className="py-2 px-3 border border-gray-950/10 font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="bg-gray-200">
            {warehouses.map((warehouse) => (
              <tr key={warehouse.id}>
                <td className="py-2 px-3 border border-gray-950/10">{warehouse.name}</td>
                <td className="py-2 px-3 border border-gray-950/10">{warehouse.address}</td>

                <td className="py-2 px-3 border border-gray-950/10">
                  <div className="space-y-1">
                    {daysOfWeek.map((day) => {
                      const dayData = warehouse.openingHours[day];
                      return (
                        <div key={day} className="flex items-center gap-2 text-sm">
                          <span
                            className={`w-5 h-5 flex items-center justify-center text-white text-xs rounded-xs ${
                              dayData.open ? "bg-blue-500" : "bg-gray-400"
                            }`}
                          >
                            {dayData.open ? "✓" : ""}
                          </span>
                          <span className="w-20">{day}</span>
                          <span>{dayData.open ? `${dayData.from} - ${dayData.to}` : "Closed"}</span>
                        </div>
                      );
                    })}
                  </div>
                </td>

                <td className="py-2 px-3 border border-gray-950/10">{warehouse.responsible}</td>
                <td className="py-2 px-3 border border-gray-950/10">{warehouse.comment || "-"}</td>

                <td className="py-2 px-3 border border-gray-950/10">
                  <Link
                    href={`/settings/warehouse/editwarehouse`}
                    className="flex items-center gap-1 bg-gray-600 rounded-xs text-white p-1 hover:text-gray-300 text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
