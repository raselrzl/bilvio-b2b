import { prisma } from "@/app/utils/db";
import OffersFilterForm from "./OffersSearchNewCar";
import { cookies } from "next/headers"; // to read cookies

export default async function OffersSearchNewCarServer() {

   const cookieStore = await cookies();
    const userEmail = cookieStore.get("userEmail")?.value; // Assuming you saved email in cookie
  
    let currentUserId: string | null = null;
  
    if (userEmail) {
      const user = await prisma.user.findUnique({
        where: { email: userEmail },
        select: { id: true },
      });
      currentUserId = user?.id ?? null;
    }
  // Fetch products from the database
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    where: {
      productCondition: "NEW", // <-- only new products
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
        <OffersFilterForm initialOffers={formattedProducts} />
      </div>
    </div>
  );
}
