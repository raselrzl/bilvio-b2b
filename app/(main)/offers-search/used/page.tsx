import { prisma } from "@/app/utils/db";
import OffersUsedCarFilterForm from "./OffersSearchUsedCar";
import { cookies } from "next/headers"; // to read cookies


export default async function OffersSearchUsedCarServer() {

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
  // Fetch products from the database
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      productCondition: "USED", // <-- only new products
    },
    take: 20, // get latest 20 products
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
        select: {
          id: true,
          reaction: true,
          userId: true,
          productId: true,
        },
      },
      productNotes: {
      where: currentUserId ? { userId: currentUserId } : undefined, // ✅ only fetch current user notes
      select: { id: true, note: true },
      orderBy: { createdAt: "desc" },
    },
    },
  });

  // Transform Prisma Date objects to ISO strings
  const formattedProducts = products.map((p) => ({
    ...p,
    firstRegistration: p.firstRegistration.toISOString(),
    createdAt: p.createdAt.toISOString(),
  }));



  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between px-6 2xl:px-0 mt-6">
        <h1 className="text-2xl md:text-3xl font-extrabold">Offers Search</h1>
      </div>

      <div className="mt-6">
        <OffersUsedCarFilterForm initialOffers={formattedProducts}   currentUser={
            currentUserId && currentUserEmail
              ? { id: currentUserId, email: currentUserEmail }
              : null
          }/>
      </div>
    </div>
  );
}
