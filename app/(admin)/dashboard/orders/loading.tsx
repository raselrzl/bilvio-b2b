import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingOrders() {
  return (
    <>
      {/* ✅ Same header layout */}
      <div className="flex items-center justify-between mb-8 bg-accent-foreground/5 p-2">
        <h1 className="text-xl font-bold">Manage All Orders</h1>
        <div className="text-sm bg-primary text-gray-800 px-3 py-1 rounded-md">
          <div className="animate-pulse bg-gray-400 rounded-md h-5 w-12" />
        </div>
      </div>

      {/* ✅ Same card and table structure */}
      <div className="flex flex-col gap-6">
        <Card className="rounded-none shadow-none border-none">
          <CardContent className="overflow-x-auto border-none">
            <Table>
              <TableHeader>
                <TableRow className="border-none">
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              {/* ✅ Placeholder rows */}
              <TableBody>
                {Array.from({ length: 8 }).map((_, i) => (
                  <TableRow key={i} className="border-none">
                    <TableCell>
                      <div className="flex flex-col animate-pulse">
                        <div className="h-4 w-24 mb-1 bg-gray-400 rounded" />
                        <div className="h-3 w-32 bg-gray-400 rounded" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-12 bg-gray-400 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-16 bg-gray-400 rounded animate-pulse" />
                    </TableCell>
                    <TableCell>
                      <div className="h-4 w-20 bg-gray-400 rounded animate-pulse" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="h-4 w-10 ml-auto bg-gray-400 rounded animate-pulse" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="h-6 w-6 ml-auto bg-gray-400 rounded-full animate-pulse" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* ✅ Pagination placeholder */}
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-8 rounded-md bg-gray-400 animate-pulse"
            />
          ))}
        </div>
      </div>
    </>
  );
}
