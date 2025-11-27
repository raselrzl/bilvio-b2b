"use client";

import { useState, useTransition } from "react";
import { Product } from "./page";
import { toast } from "react-hot-toast";
import { deleteProductAction, toggleProductStockAction } from "@/app/actions";
import ProductActionDialog from "./ProductActionDialog";

export default function ProductsTableClient({ products }: { products: Product[] }) {
  const [productList, setProductList] = useState(products);

  const handleStockToggle = async (productId: string) => {
    try {
      const updated = await toggleProductStockAction(productId);
      toast.success(
        `Product "${updated.name}" is now ${
          updated.stock === "IN_STOCK" ? "in stock" : "out of stock"
        }!`
      );
      setProductList((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, stock: updated.stock } : p
        )
      );
    } catch (err: any) {
      toast.error(err.message || "Failed to update stock");
    }
  };

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
              <th className="p-3 border text-left">Availability</th>
              <th className="p-3 border text-left">Owner</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50">
                <td className="p-3 border">{p.id}</td>
                <td className="p-3 border">{p.name}</td>
                <td className="p-3 border">{p.offerNumber}</td>
                <td className="p-3 border">${p.price}</td>
                <td className="p-3 border">{p.fuel}</td>
                <td className="p-3 border">{p.gearbox}</td>
                <td className="p-3 border">{p.productCondition}</td>
                <td className="p-3 border">{p.stock}</td>
                <td className="p-3 border text-center">
                  <StockSwitch
                    stock={p.stock}
                    onToggle={() => handleStockToggle(p.id)}
                  />
                </td>
                <td className="p-3 border">
                  {p.user
                    ? `${p.user.firstName} ${p.user.lastName} (${p.user.email})`
                    : "-"}
                </td>
                <td className="p-3 border text-center">
                  <div className="flex gap-2 justify-center">
                    <ProductActionDialog productId={p.id} label="Delete" color="red" />
                    <ProductActionDialog
                      productId={p.id}
                      label="Check Availability"
                      color="blue"
                      checkAvailability={true}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Switch Component
function StockSwitch({
  stock,
  onToggle,
}: {
  stock: string;
  onToggle: () => void;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(onToggle)}
      disabled={isPending}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none ${
        stock === "IN_STOCK" ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
          stock === "IN_STOCK" ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}
