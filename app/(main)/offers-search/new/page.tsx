import { prisma } from "@/app/utils/db";
import OffersFilterForm from "./OffersSearchNewCar";

export const metadata = { title: "OffersSearchNewCar • Bilvio" };

export default async function OffersSearchNewCarServer() {
  // Fetch products from the database
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
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
      <div className="flex items-center justify-between px-2 2xl:px-2 mt-6">
        <h1 className="text-2xl md:text-3xl font-extrabold">Offers Search</h1>
      </div>

      <div className="mt-6">
        <OffersFilterForm initialOffers={formattedProducts} />
      </div>
    </div>
  );
}
