import { prisma } from "@/app/utils/db";
import OrdersClient from "./OrdersClient";
import { cookies } from "next/headers";
export type OrderType = "new" | "used";

export type Product = {
  id: string;
  name: string;
  productCondition: OrderType;
  gearbox?: string;
  fuel?: string;
  price?: number;
  discount?: number;
  stock?: string;
  colour?: string;
  quantity?: number;
  mileage?: number;
  firstRegistration?: string | Date;
  trim?: string;
  engineSpec?: string;
  vat?: number;
  transportCost?: number;
  availability?: string;
  reactions?: { reaction: "LIKE" | "UP" | "DOWN" | "SAVE" }[];
};

export type Order = {
  id: string;
  orderNumber: string;
  type: OrderType;
  status: "NEW" | "ACCEPTED" | "REJECTED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
  products: Product[];
};


async function getOrders(): Promise<Order[]> {

    const cookieStore =await cookies();
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


  const orders = await prisma.order.findMany({
  where: userId ? { userId } : undefined,
  include: {
    items: {
      include: {
        product: {
          include: {
            reactions: true, // <-- include reactions here
          },
        },
      },
    },
  },
  orderBy: { createdAt: "desc" },
});


  return orders.map((o) => ({
    id: o.id,
    orderNumber: o.orderNumber,
    type: (o.items[0]?.product.productCondition.toLowerCase() === "new"
      ? "new"
      : "used") as OrderType,
    status: o.status,
    createdAt: o.createdAt.toISOString(),
    products: o.items.map((item) => ({
      id: item.product.id,
      name: item.product.name,
      productCondition: (item.product.productCondition.toLowerCase() === "new"
        ? "new"
        : "used") as OrderType,
      gearbox: item.product.gearbox,
      fuel: item.product.fuel,
      price: item.product.price ?? 0,
      discount: item.product.discount ?? 0,
      stock: item.product.stock,
      colour: item.product.colour,
      quantity: item.product.quantity,
      mileage: item.product.mileage,
      firstRegistration: item.product.firstRegistration,
      trim: item.product.trim,
      engineSpec: item.product.engineSpec,
      vat: item.product.vat,
      transportCost: item.product.transportCost,
      availability: item.product.availability,
      reactions: item.product.reactions,
    })),
  }));
}

export default async function OrdersPage() {
  const orders = await getOrders();
  return <OrdersClient orders={orders} />;
}
