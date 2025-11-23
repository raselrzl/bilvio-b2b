import { prisma } from "@/app/utils/db";
import OffersFilterForm from "./OffersSearchNewCar";
import { cookies } from "next/headers";

export default async function OffersSearchNewCarServer() {
  const cookieStore = await cookies();
  const session = cookieStore.get("bilvio_session")?.value;

  let currentUserId: string | null = null;
  let currentUserEmail: string | null = null;

  if (session) {
    const user = await prisma.user.findUnique({
      where: { email: session },
      select: { id: true, email: true },
    });
    currentUserId = user?.id ?? null;
    currentUserEmail = user?.email ?? null;
  }

  const products = await prisma.product.findMany({
    where: { productCondition: "NEW" },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: {
      id: true,
      name: true,
      gearbox: true,
      fuel: true,
      price: true,
      offerNumber: true,
      createdAt: true,
      discount: true,
      type: true,
      stock: true,
      colour: true,
      quantity: true,
      mileage: true,
      firstRegistration: true,
      availability: true,
      trim: true,
      engineSpec: true,
      vat: true,
      transportCost: true,
      productionYear: true,
      reactions: {
        where: currentUserId ? { userId: currentUserId } : undefined,
        select: { id: true, reaction: true, userId: true, productId: true },
      },
      productNotes: {
        where: currentUserId ? { userId: currentUserId } : undefined,
        select: { id: true, note: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const formattedProducts = products.map((p) => ({
    ...p,
    firstRegistration: p.firstRegistration.toISOString(),
    createdAt: p.createdAt.toISOString(),
    notesList: p.productNotes ?? [],
  }));

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between px-6 2xl:px-0 mt-6">
        <h1 className="text-2xl md:text-3xl font-extrabold">Offers Search</h1>
      </div>

      <div className="mt-6">
        <OffersFilterForm
          initialOffers={formattedProducts}
          currentUser={
            currentUserId && currentUserEmail
              ? { id: currentUserId, email: currentUserEmail }
              : null
          }
        />
      </div>
    </div>
  );
}
