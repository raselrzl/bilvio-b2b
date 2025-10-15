
import { prisma } from "@/app/utils/db";
import OrdersClient from "./OrdersClient";

type OrderType = "new" | "used";

type Order = {
  id: string;
  orderNumber: string;
  type: OrderType;
  makeModel: string;
  vin: string;
  status: "NEW" | "ACCEPTED" | "REJECTED" | "CANCELLED" | "COMPLETED";
  createdAt: string;
};

async function getOrders(): Promise<Order[]> {
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return orders.map((o) => ({
    id: o.id,
    orderNumber: o.orderNumber,
    type: o.items[0]?.product.productCondition.toLowerCase() as OrderType,
    makeModel: o.items[0]?.product.name ?? "",
    vin: o.items[0]?.product.id ?? "",
    status: o.status,
    createdAt: o.createdAt.toISOString(),
  }));
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return <OrdersClient orders={orders} />;
}
