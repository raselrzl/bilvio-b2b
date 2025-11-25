import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { prisma } from "@/app/utils/db";
import { cookies } from "next/headers";

type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

interface OpeningHour {
  open: boolean;
  from: string;
  to: string;
}

interface Warehouse {
  id: string;
  name: string;
  address: string;
  responsible: string;
  comment?: string;
  openingHours: Record<Day, OpeningHour>;
}

export default async function WarehouseSettingsPage() {
  // Get logged-in user email from cookie
  const jar = await cookies();
  const userEmail = jar.get("bilvio_session")?.value;

  if (!userEmail) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-600 font-bold">You must be logged in to see your warehouses.</p>
        <Link href="/login">
          <Button className="mt-4">Login</Button>
        </Link>
      </div>
    );
  }

  // Fetch user
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  if (!user) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-600 font-bold">User not found.</p>
      </div>
    );
  }

  // Fetch warehouses for this user
  const warehousesData = await prisma.warehouse.findMany({
    where: { userId: user.id },
    include: { openingHours: true },
  });

  // Convert to the structure expected by the component
  const daysOfWeek: Day[] = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const warehouses: Warehouse[] = warehousesData.map((w) => {
    const hours: Record<Day, OpeningHour> = {} as Record<Day, OpeningHour>;
    daysOfWeek.forEach((day) => {
      const dayData = w.openingHours.find((h) => h.day === day);
      hours[day] = dayData
        ? { open: dayData.open, from: dayData.from, to: dayData.to }
        : { open: false, from: "00:00", to: "00:00" };
    });

    return {
      id: w.id,
      name: w.name,
      address: w.address,
      responsible: w.responsible,
      comment: w.comment ?? undefined,
      openingHours: hours,
    };
  });

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
                    href={`/settings/warehouse/${warehouse.id}`}
                    className="flex items-center gap-1 bg-gray-600 rounded-xs text-white p-1 hover:text-gray-300 text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {warehouses.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-600 border border-gray-950/10">
                  No warehouses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
