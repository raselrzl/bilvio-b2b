import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { prisma } from "@/app/utils/db"; // adjust path
import AllDemands from "./AllDemand";

export default async function DemandPage() {
  // Get logged-in user's email from cookie
  const cookieStore = await cookies();
  const email = cookieStore.get("bilvio_session")?.value;

  // Get userId based on email
  let userId: string | undefined;
  if (email) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });
    userId = user?.id;
  }

  // Fetch demands filtered by userId
  let demands = await prisma.demand.findMany({
    where: userId ? { userId } : undefined,
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
  status: true,
  createdAt: true,
  updatedAt: true,   // ← add this
  userId: true,
  notes: {
    take: 1,
    orderBy: { createdAt: "desc" },
    select: { note: true },
  },
    },
  });

  // Format dates for frontend
  const formattedDemands = demands.map((d) => ({
    ...d,
    createdAt: d.createdAt.toISOString(),
    lastNote: d.notes.length > 0 ? d.notes[0].note : "", 
  }));

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between px-6 2xl:px-0 mt-4">
        <h1 className="text-2xl md:text-3xl font-extrabold">Demands</h1>

        <Link href="/buyer/offers/create">
          <Button className="rounded-xs inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white cursor-pointer">
            <PlusCircle className="h-5 w-5" aria-hidden="true" />
            <span>Add demand</span>
          </Button>
        </Link>
      </div>

      <div className="mt-4">
        <div className="mt-4">
          {userId && (
            <AllDemands
              initialDemands={formattedDemands}
              currentUser={{ id: userId, email: email ?? "" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
