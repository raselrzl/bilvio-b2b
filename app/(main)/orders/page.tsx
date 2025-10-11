"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import OrderFilterForm from "./OrderFilterForm";

type Order = {
  id: number;
  type: "new" | "used";
  makeModel: string;
  orderNumber: string;
  vin: string;
  status: "new" | "accepted" | "rejected" | "cancelled" | "completed";
};

// Mock data, replace with your API data
const mockOrders: Order[] = [
  { id: 1, type: "new", makeModel: "Audi A4", orderNumber: "ORD001", vin: "VIN001", status: "new" },
  { id: 2, type: "used", makeModel: "BMW X5", orderNumber: "ORD002", vin: "VIN002", status: "accepted" },
  { id: 3, type: "new", makeModel: "Volvo XC90", orderNumber: "ORD003", vin: "VIN003", status: "completed" },
  { id: 4, type: "used", makeModel: "EVO X", orderNumber: "ORD004", vin: "VIN004", status: "rejected" },
  { id: 5, type: "new", makeModel: "Volvo S60", orderNumber: "ORD005", vin: "VIN005", status: "cancelled" },
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"new" | "accepted" | "rejected" | "cancelled" | "completed">("new");
  const [filters, setFilters] = useState<{
    type?: "new" | "used";
    makeModel?: string;
    orderNumber?: string;
    vin?: string;
  }>({});

  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    const result = mockOrders.filter((order) => {
      const matchesTab = order.status === activeTab;
      const matchesFilter =
        (!filters.type || order.type === filters.type) &&
        (!filters.makeModel || order.makeModel.toLowerCase().includes(filters.makeModel.toLowerCase())) &&
        (!filters.orderNumber || order.orderNumber.includes(filters.orderNumber)) &&
        (!filters.vin || order.vin.includes(filters.vin));
      return matchesTab && matchesFilter;
    });
    setFilteredOrders(result);
  }, [activeTab, filters]);

  const tabs: ("new" | "accepted" | "rejected" | "cancelled" | "completed")[] = [
    "new",
    "accepted",
    "rejected",
    "cancelled",
    "completed",
  ];

  return (
    <div className="max-w-7xl mx-auto w-full mt-4">
      {/* Header */}
      <div className="flex items-center justify-between px-2 sm:px-4 md:px-6 mt-4">
        <h1 className="text-2xl md:text-3xl font-extrabold ">Orders</h1>
      </div>

      {/* Filter Form */}
      <div className="px-2 sm:px-4 md:px-6 mt-4 bg-gray-600 mx-2">
        <div className="p-4">
          <OrderFilterForm onFilterChange={(f) => setFilters(f)} />
        </div>
      </div>

      {/* Tabs */}
      <div className="pt-6 mx-2">
        <div className="flex flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium border-t-1 ${
                activeTab === tab ? "border-[#619aab] border-t-2 text-[#619aab] bg-white rounded-t-xs" : "bg-gray-400 border-gray-300 border-t-1 border-l-1 text-black hover:text-gray-700 rounded-t-xs cursor-pointer"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-2 sm:px-4 md:px-6 pt-4 bg-white p-2 mx-2">
        {filteredOrders.length === 0 ? (
          <div className="bg-amber-100 border border-amber-300 shadow-sm p-4 text-amber-600 flex items-center">
            <p>Unfortunately we did not find any orders that meet your criteria.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {filteredOrders.map((order) => (
              <li key={order.id} className="p-4 bg-white border shadow-sm rounded">
                <p><strong>Make/Model:</strong> {order.makeModel}</p>
                <p><strong>Order Number:</strong> {order.orderNumber}</p>
                <p><strong>VIN:</strong> {order.vin}</p>
                <p><strong>Type:</strong> {order.type}</p>
                <p><strong>Status:</strong> {order.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
