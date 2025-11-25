import { prisma } from "@/app/utils/db";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import EditWarehouseWrapper from "./EditWarehouseWrapper";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditWarehousePage({ params }: Props) {
  const { id } = await params;  
  const jar = await cookies();
  const userEmail = jar.get("bilvio_session")?.value;
  if (!userEmail) return notFound();

  const user = await prisma.user.findUnique({ where: { email: userEmail }, select: { id: true } });
  if (!user) return notFound();

  const warehouse = await prisma.warehouse.findUnique({
    where: { id},
    include: { openingHours: true },
  });
  if (!warehouse) return notFound();

  const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const formattedHours: Record<string, { open: boolean; from: string; to: string }> = {};
  daysOfWeek.forEach((day) => {
    const dayData = warehouse.openingHours.find(h => h.day === day);
    formattedHours[day] = dayData ?? { open: false, from: "10:00", to: "18:00" };
  });

  const defaultValues = {
    name: warehouse.name,
    address: warehouse.address,
    responsible: warehouse.responsible,
    comment: warehouse.comment ?? "",
    openingHours: formattedHours,
  };

  return <EditWarehouseWrapper warehouseId={warehouse.id} defaultValues={defaultValues} />;
}
