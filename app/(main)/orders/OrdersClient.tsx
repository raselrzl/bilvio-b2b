"use client";

import { useState, useEffect } from "react";
import OrderFilterForm from "./OrderFilterForm";

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

export default function OrdersClient({ orders }: { orders: Order[] }) {
  const [activeTab, setActiveTab] = useState<Order["status"] | "new">("NEW");
  const [filters, setFilters] = useState<Partial<Order>>({});
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);

  useEffect(() => {
    const result = orders.filter((order) => {
      const matchesTab =
        activeTab === "new" ? order.status === "NEW" : order.status === activeTab;
      const matchesFilter =
        (!filters.type || order.type === filters.type) &&
        (!filters.makeModel ||
          order.makeModel.toLowerCase().includes(filters.makeModel.toLowerCase())) &&
        (!filters.orderNumber || order.orderNumber.includes(filters.orderNumber)) &&
        (!filters.vin || order.vin.includes(filters.vin));
      return matchesTab && matchesFilter;
    });
    setFilteredOrders(result);
  }, [activeTab, filters, orders]);

  const tabs: (Order["status"] | "new")[] = [
    "new",
    "ACCEPTED",
    "REJECTED",
    "CANCELLED",
    "COMPLETED",
  ];

  return (
    <div className="max-w-7xl mx-auto w-full mt-4">
      {/* Header */}
      <div className="flex items-center justify-between px-2 sm:px-4 md:px-6 mt-4">
        <h1 className="text-2xl md:text-3xl font-extrabold ">Orders</h1>
      </div>

      {/* Filter Form */}
      <div className="mt-4 px-2 sm:px-4 md:px-6 bg-gray-500 max-w-[100%] lg:max-w-[1500px] mx-auto 2xl:mx-2">
        <div className="p-4">
          <OrderFilterForm onFilterChange={(f) => setFilters(f)} />
        </div>
      </div>

      {/* Tabs */}
      <div className="pt-6 mx-10 2xl:mx-2">
        <div className="flex flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium text-sm border-t-1 ${
                activeTab === tab
                  ? "border-[#619aab] border-t-2 text-[#619aab] bg-white rounded-t-xs"
                  : "bg-gray-300 border-gray-200 border-t-1 border-l-1 text-black hover:text-gray-700 rounded-t-xs cursor-pointer"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "new" ? "New" : tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="px-2 sm:px-4 md:px-6 pt-4 bg-white p-2 mx-10 2xl:mx-2">
        {filteredOrders.length === 0 ? (
          <div className="bg-amber-100 border border-amber-300 shadow-sm p-4 text-amber-600 flex items-center">
            <p>Unfortunately we did not find any orders that meet your criteria.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {filteredOrders.map((order) => (
              <li key={order.id} className="p-4 bg-white border shadow-sm rounded">
                <p>
                  <strong>Make/Model:</strong> {order.makeModel}
                </p>
                <p>
                  <strong>Order Number:</strong> {order.orderNumber}
                </p>
                <p>
                  <strong>VIN:</strong> {order.vin}
                </p>
                <p>
                  <strong>Type:</strong> {order.type}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
