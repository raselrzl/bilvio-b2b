import { prisma } from "@/app/utils/db";
import DemandsTableClient from "./demandTable";

// Server action to fetch all demands
export async function getAllDemands() {
  const demands = await prisma.demand.findMany({
    include: {
      user: true, // who created the demand
      notes: { include: { user: true } }, // notes with authors
    },
    orderBy: { createdAt: "desc" },
  });

  return demands.map((d) => ({
    ...d,
    make: d.make ?? undefined,
    modelYear: d.modelYear ?? undefined,
    priceFrom: d.priceFrom ?? undefined,
    priceTo: d.priceTo ?? undefined,
    demand: d.demand ?? undefined,
    createdBy: {
      ...d.user,
      firstName: d.user.firstName ?? undefined,
      lastName: d.user.lastName ?? undefined,
      companyName: d.user.companyName ?? undefined,
    },
    notes: d.notes.map((n) => ({
      ...n,
      note: n.note ?? undefined,
      user: {
        ...n.user,
        firstName: n.user.firstName ?? undefined,
        lastName: n.user.lastName ?? undefined,
        companyName: n.user.companyName ?? undefined,
      },
    })),
  }));
}

// Server Component
export default async function DemandsTableServer() {
  const demands = await getAllDemands();

  return <DemandsTableClient demands={demands} />;
}

// Types
export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  companyName?: string;
}

export interface DemandNote {
  id: string;
  note?: string;
  user: User;
}

export interface Demand {
  id: string;
  make?: string;
  modelYear?: number;
  priceFrom?: number;
  priceTo?: number;
  demand?: number;
  status: "DRAFT" | "SAVED";
  createdBy: User;
  notes: DemandNote[];
}
