import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AllDemands from "@/components/general/AllDemand";
import { prisma } from "@/app/utils/db";

export const metadata = { title: "Demand • Bilvio" };

export default async function DemandPage() {
  // fetch demands from DB
  const demands = await prisma.demand.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      make: true,
      gearbox: true,
      fuel: true,
      priceFrom: true,
      priceTo: true,
      demand: true,
      modelYear: true,
      country: true,
      quantity: true,
      warehouse: true,
      wltpCo2: true,
      note: true,
      status: true,
      createdAt: true,
    },
  });

  // format dates
  const formattedDemands = demands.map((d) => ({
    ...d,
    createdAt: d.createdAt.toISOString(),
  }));

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between px-2 2xl:px-0 mt-4">
        <h1 className="text-2xl md:text-3xl font-extrabold ">Demands</h1>

        <Link href="/buyer/offers/create">
          <Button className="rounded-xs inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white cursor-pointer">
            <PlusCircle className="h-5 w-5" aria-hidden="true" />
            <span>Add demand</span>
          </Button>
        </Link>
      </div>

      <div className="mt-4">
          <AllDemands initialDemands={formattedDemands} />
      </div>
      
    </div>
  );
}
