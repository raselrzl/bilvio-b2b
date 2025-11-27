import { prisma } from "@/app/utils/db";
import ProductsTableClient from "./ProductsTableClient";

// Fetch all products from DB
export async function getAllProducts() {
  const products = await prisma.product.findMany({
    include: {
      user: true, // owner of the product
      options: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return products.map((p) => ({
    ...p,
    user: p.user
      ? {
          id: p.user.id,
          firstName: p.user.firstName ?? "",
          lastName: p.user.lastName ?? "",
          email: p.user.email,
        }
      : null, 
  }));
}

export default async function ProductsPageServer() {
  const products = await getAllProducts();
  return <ProductsTableClient products={products} />;
}

// Types
export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
}

export interface ProductOption {
  id: string;
  type: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  offerNumber: string;
  price: number;
  discount: number;
  fuel: string;
  gearbox: string;
  productCondition: string;
  stock: string;
  user: User | null;
  options: ProductOption[];
}
