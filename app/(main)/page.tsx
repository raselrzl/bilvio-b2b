import { prisma } from "@/app/utils/db";
import OffersUsedCarFilterForm from "./offers-search/used/OffersSearchUsedCar";
import AllProducts from "@/components/general/AllProduct";

export const metadata = { title: "OffersSearchNewCar • Bilvio" };


export default async function MainPage() {
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
      <div className="mt-6">
        <AllProducts initialOffers={formattedProducts}  />
      </div>
    </div>
  );
}
