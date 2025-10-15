"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OrderFilterForm from "./OrderFilterForm";
import {
  Heart,
  ThumbsUp,
  ThumbsDown,
  ClockPlus,
  Calendar,
  Eye,
  SquarePen,
  BellDot,
} from "lucide-react";
import Link from "next/link";
import { Order } from "./page";

export default function OrdersClient({ orders }: { orders: Order[] }) {
  const [activeTab, setActiveTab] = useState<Order["status"] | "new">("NEW");
  const [filters, setFilters] = useState<{
    type?: string;
    productName?: string;
    orderNumber?: string;
  }>({});
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);

  useEffect(() => {
    const result = orders.filter((order) => {
      const matchesTab =
        activeTab === "new"
          ? order.status === "NEW"
          : order.status === activeTab;
      const matchesFilter =
        (!filters.type || order.type === filters.type) &&
        (!filters.productName ||
          order.products.some((p) =>
            p.name.toLowerCase().includes(filters.productName!.toLowerCase())
          )) &&
        (!filters.orderNumber ||
          order.orderNumber.includes(filters.orderNumber));
      return matchesTab && matchesFilter;
    });
    setFilteredOrders(result);
  }, [activeTab, filters, orders]);

  const formatNumber = (num?: number) =>
    num ? num.toLocaleString("sv-SE") : "-"; // "sv-SE" uses space as thousand separator

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "text-green-600";
      case "ACCEPTED":
        return "text-blue-600";
      case "REJECTED":
        return "text-red-600";
      case "CANCELLED":
        return "text-amber-500";
      case "COMPLETED":
        return "text-green-600";
      default:
        return "text-gray-700";
    }
  };

  const tabs: (Order["status"] | "new")[] = [
    "new",
    "ACCEPTED",
    "REJECTED",
    "CANCELLED",
    "COMPLETED",
  ];

  const formatDate = (date?: string | Date) =>
    date
      ? new Date(date).toLocaleDateString("sv-SE") // or "en-GB" for consistent format
      : "-";

  return (
    <div className="max-w-7xl mx-auto w-full mt-4">
      {/* Header */}
      <div className="flex items-center justify-between px-2 2xl:px-0 mt-4">
        <h1 className="text-2xl md:text-3xl font-extrabold">Orders</h1>
      </div>

      {/* Filter Form */}
      <div className="mt-4 px-2 sm:px-4 md:px-6 bg-gray-500 max-w-[100%] lg:max-w-[1500px] mx-auto 2xl:mx-2">
        <div className="p-4">
          <OrderFilterForm
            onFilterChange={(f) =>
              setFilters({
                type: f.type,
                productName: f.productName,
                orderNumber: f.orderNumber,
              })
            }
          />
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
              {tab === "new"
                ? "New"
                : tab.charAt(0).toUpperCase() + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

     <div className="bg-white mx-10 2xl:mx-2">
         {/* Cards */}
      <div className="grid grid-cols-1 gap-4 p-8 2xl:px-2">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) =>
            order.products.map((p) => (
              <div
                key={p.id}
                className="relative border rounded-xs p-4 2xl:m-2 bg-white shadow hover:shadow-md transition"
              >
                {/* --- ORDER INFO HEADER --- */}
                <div className="flex justify-between items-center mb-3 border-b pb-2">
                  <div className="flex flex-col">
                    <p className="text-sm text-gray-500">Order Number</p>
                    <p className="text-lg font-bold">{order.orderNumber}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm text-gray-500">Order Status</p>
                    <p className={`font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm text-gray-500">Created At</p>
                    <p className="font-semibold">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                {/* --- PRODUCT CARD CONTENT --- */}
                <div className="flex flex-wrap items-center justify-between">
                  <h1 className="text-xl font-bold">{p.name}</h1>
                  <div className="flex gap-2">
                    <Heart className="h-5 w-5" />
                    <ThumbsUp className="h-5 w-5" />
                    <ThumbsDown className="h-5 w-5" />
                    <ClockPlus className="h-5 w-5" />
                  </div>
                  <div className="bg-amber-400 px-2 text-sm rounded-xs font-bold">
                    <p>{p.discount ?? 0}%</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-lg font-bold">{formatNumber(p.price)}</p>
                    <p className="ml-2 text-sm mt-1 font-bold text-gray-600">
                      SEK NET
                    </p>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-700 mt-2">
                  <div className="flex gap-4 items-center justify-center">
                    <div className="flex text-md items-center justify-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      <p>{formatDate(p.firstRegistration)}</p>
                    </div>
                    <div className="flex text-md items-center justify-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <p>{formatDate(order.createdAt)}</p>
                    </div>
                  </div>
                  <div className="items-end justify-end">
                    <p>{p.vat ?? 0}% VAT</p>
                  </div>
                </div>

                <div className="items-end justify-end text-end text-gray-600 text-sm capitalize">
                  <p>
                    Estimated transport cost {formatNumber(p.transportCost)} SEK
                    NET
                  </p>
                </div>

                <div className="flex flex-wrap text-sm text-gray-700 p-2 rounded-sm gap-2 capitalize">
                  {p.engineSpec && (
                    <div className="bg-gray-100 py-1 px-2 text-black font-semibold">
                      {p.engineSpec}
                    </div>
                  )}
                  {p.gearbox && (
                    <div className="bg-gray-100 py-1 px-2 text-black font-semibold">
                      {p.gearbox}
                    </div>
                  )}
                  {p.trim && (
                    <div className="bg-gray-100 py-1 px-2 text-black font-semibold">
                      {p.trim}
                    </div>
                  )}
                  {p.stock && (
                    <div className="flex gap-2 bg-gray-100 py-1 px-2">
                      Type: <p className="font-semibold">{p.stock}</p>
                    </div>
                  )}
                  {p.colour && (
                    <div className="flex gap-2 bg-gray-100 py-1 px-2">
                      Colour: <p className="font-semibold">{p.colour}</p>
                    </div>
                  )}
                  {p.quantity && (
                    <div className="flex gap-2 bg-gray-100 py-1 px-2">
                      Quantity: <p className="font-semibold">{p.quantity}</p>
                    </div>
                  )}
                  {p.mileage && (
                    <div className="flex gap-2 bg-gray-100 py-1 px-2">
                      Mileage:{" "}
                      <p className="font-semibold">
                        {formatNumber(p.mileage)} km
                      </p>
                    </div>
                  )}
                  {p.fuel && (
                    <div className="flex gap-2 bg-gray-100 py-1 px-2">
                      Fuel: <p className="font-semibold">{p.fuel}</p>
                    </div>
                  )}
                  {p.availability && (
                    <div className="flex gap-2 bg-gray-100 py-1 px-2">
                      Availability:{" "}
                      <p className="font-semibold">{p.availability}</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-gray-200 mt-4 pt-4 flex items-center justify-between gap-4">
                  <div className="relative flex-1 max-w-sm">
                    <Input
                      type="text"
                      placeholder="Write a note..."
                      className="pl-10 pr-3 h-9 text-sm border-gray-300 rounded-xs w-full"
                    />
                    <SquarePen className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
                    <p className="ml-4 text-xs text-gray-500">0/2000</p>
                  </div>
                  <div className="flex">
                    <Link
                      href="#"
                      className="text-sm font-semibold hover:underline"
                    >
                      Send message
                    </Link>
                    <BellDot />
                  </div>
                  <div>
                    <Button
                      asChild
                      className="bg-[#619aab] text-white hover:bg-[#528a99] rounded-2xl px-4 py-2 text-sm font-semibold"
                    >
                      <a href={`/offers-search/used/${p.id}`}>
                        View offer {" >>"}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )
        ) : (
          <div className="border p-4 text-center text-amber-600 bg-amber-100 rounded">
            No orders found
          </div>
        )}
      </div>
     </div>
    </div>
  );
}
