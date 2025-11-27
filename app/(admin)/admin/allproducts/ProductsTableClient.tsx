"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { Product } from "./page";
import { toast } from "react-hot-toast";
import { deleteProductAction } from "@/app/actions";

export default function ProductsTableClient({ products }: { products: Product[] }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Products</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">ID</th>
              <th className="p-3 border text-left">Name</th>
              <th className="p-3 border text-left">Offer Number</th>
              <th className="p-3 border text-left">Price</th>
              <th className="p-3 border text-left">Fuel</th>
              <th className="p-3 border text-left">Gearbox</th>
              <th className="p-3 border text-left">Condition</th>
              <th className="p-3 border text-left">Stock</th>
              <th className="p-3 border text-left">Owner</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-3 border">{p.id}</td>
                <td className="p-3 border">{p.name}</td>
                <td className="p-3 border">{p.offerNumber}</td>
                <td className="p-3 border">${p.price}</td>
                <td className="p-3 border">{p.fuel}</td>
                <td className="p-3 border">{p.gearbox}</td>
                <td className="p-3 border">{p.productCondition}</td>
                <td className="p-3 border">{p.stock}</td>
                <td className="p-3 border">
                  {p.user ? `${p.user.firstName} ${p.user.lastName} (${p.user.email})` : "-"}
                </td>
                <td className="p-3 border text-center">
                  <ActionsDropdown productId={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Actions Dropdown
function ActionsDropdown({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);
    const result = await deleteProductAction(productId);

    if (result.ok) {
      toast.success("Product deleted successfully!");
      window.location.reload();
    } else {
      toast.error(result.error || "Failed to delete product");
    }
    setLoading(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="More Options" disabled={loading}>
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
