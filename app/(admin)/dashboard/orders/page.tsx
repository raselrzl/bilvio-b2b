import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PenBoxIcon, XCircle } from "lucide-react";
import { OrderFilter } from "./OrderFilter";
import WatchedTotal from "./WatchedTotal";
import { PaginationComponent } from "@/components/general/PaginationComponent";
import { prisma } from "@/app/utils/db";

type SearchParamsProps = {
  searchParams: Promise<{ page?: string; id?: string }>;
};

// 🚀 Fetch paginated orders
async function getPaginatedOrders(
  page: number = 1,
  pageSize: number = 10,
  idFilter?: string
) {
  const skip = (page - 1) * pageSize;

  const where = idFilter ? { id: { endsWith: idFilter } } : {};

  const [orders, totalCount] = await Promise.all([
    prisma.order.findMany({
      take: pageSize,
      skip,
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            companyName: true,
            phone: true,
            taxNumber: true,
          },
        },
        items: {
          include: {
            product: true, // reactions removed to avoid error
          },
        },
      },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    orders,
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

export default async function OrdersPage({ searchParams }: SearchParamsProps) {
  noStore();

  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const idFilter = params.id || "";

  const { orders, totalCount, totalPages } = await getPaginatedOrders(
    currentPage,
    10,
    idFilter
  );

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-8 bg-gray-100 p-3">
        <h1 className="text-xl font-bold">Manage All Orders</h1>

        <div className="flex items-center gap-2">
          <OrderFilter />
          <div className="text-sm bg-primary text-gray-400 px-3 py-1">
            <WatchedTotal total={totalCount} />
          </div>
        </div>
      </div>

      {/* Table */}
      {orders.length > 0 ? (
        <div className="flex flex-col gap-6">
          <Card className="shadow rounded-none py-0">
            <CardContent className="overflow-x-auto p-0">
              <Table className="min-w-full border-collapse">
                <TableHeader className="bg-muted sticky top-0 z-10">
                  <TableRow>
                    <TableHead className="whitespace-nowrap">
                      Order ID
                    </TableHead>
                    <TableHead>Order Number</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Tax Number</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.orderNumber}</TableCell>
                      <TableCell>{order.user?.firstName ?? "-"}</TableCell>
                      <TableCell>{order.user?.email ?? "-"}</TableCell>
                      <TableCell>{order.user?.companyName ?? "-"}</TableCell>
                      <TableCell>{order.user?.phone ?? "-"}</TableCell>
                      <TableCell>{order.user?.taxNumber ?? "-"}</TableCell>

                      <TableCell>
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {order.status}
                        </span>
                      </TableCell>

                      <TableCell>
                        {new Date(order.createdAt).toLocaleString()}
                      </TableCell>

                      <TableCell>
                        {new Date(order.updatedAt).toLocaleString()}
                      </TableCell>

                      {/* Product Preview */}
                      <TableCell className="min-w-[230px]">
                        <div className="flex flex-col gap-2">
                          {order.items.map((item) => {
                            const p = item.product;

                            return (
                              <div
                                key={item.id}
                                className="border rounded-md p-2 bg-muted/40"
                              >
                                <p className="font-semibold text-sm">
                                  {p.name}
                                </p>
                                <p className="text-xs">
                                  Condition: {p.productCondition}
                                </p>
                                <p className="text-xs">Price: {p.price}</p>

                                <Link
                                  href={`/dashboard/products/${p.id}`}
                                  className="text-primary underline text-xs"
                                >
                                  View details →
                                </Link>
                              </div>
                            );
                          })}
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/orders/${order.id}/details`}
                              >
                                <PenBoxIcon className="w-4 h-4 mr-2" />
                                View Details
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/orders/${order.id}/updateInvoiceStatus`}
                              >
                                <PenBoxIcon className="w-4 h-4 mr-2" />
                                Update Invoice Status
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/orders/${order.id}/updateorderStatus`}
                              >
                                <PenBoxIcon className="w-4 h-4 mr-2" />
                                Update Order Status
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/orders/${order.id}/updatedeliverystatus`}
                              >
                                <PenBoxIcon className="w-4 h-4 mr-2" />
                                Update Delivery Status
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuItem asChild>
                              <Link
                                href={`/dashboard/orders/${order.id}/delete`}
                              >
                                <XCircle className="w-4 h-4 mr-2 text-red-600" />
                                Delete
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      ) : (
        <div className="p-6 text-center text-muted-foreground">
          No orders found.
        </div>
      )}
    </div>
  );
}
