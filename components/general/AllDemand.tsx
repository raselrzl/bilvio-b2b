"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  X,
  Heart,
  ThumbsUp,
  ThumbsDown,
  ClockPlus,
  Eye,
  Calendar,
  TriangleAlert,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export interface Demand {
  id: string;
  make?: string | null;
  gearbox?: string | null;
  fuel?: string | null;
  priceFrom?: number | null;
  priceTo?: number | null;
  demand?: number | null;
  modelYear?: number | null;
  country?: string | null;
  warehouse?: string | null;
  wltpCo2?: number | null;
  note?: string | null;
  status?: "DRAFT" | "SAVED" | null;
  createdAt: string;
}

interface AllDemandsProps {
  initialDemands: Demand[];
}

export default function AllDemands({ initialDemands }: AllDemandsProps) {
  const [demands] = useState<Demand[]>(initialDemands);
  const [filteredDemands, setFilteredDemands] =
    useState<Demand[]>(initialDemands);

  const [makeFilter, setMakeFilter] = useState<string>();
  const [gearboxFilter, setGearboxFilter] = useState<string>();
  const [fuelFilter, setFuelFilter] = useState<string>();
  const [statusFilter, setStatusFilter] = useState<string>();
  const [priceFromFilter, setPriceFromFilter] = useState<number>();
  const [priceToFilter, setPriceToFilter] = useState<number>();
  const [demandFilter, setDemandFilter] = useState<number>();
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest"); // 🆕 Sort order

  useEffect(() => {
    let filtered = [...demands];

    if (makeFilter)
      filtered = filtered.filter((d) =>
        d.make?.toLowerCase().includes(makeFilter.toLowerCase())
      );
    if (gearboxFilter)
      filtered = filtered.filter((d) => d.gearbox === gearboxFilter);
    if (fuelFilter) filtered = filtered.filter((d) => d.fuel === fuelFilter);
    if (statusFilter)
      filtered = filtered.filter(
        (d) => d.status === statusFilter.toUpperCase()
      );
    if (priceFromFilter !== undefined)
      filtered = filtered.filter((d) => (d.priceFrom ?? 0) >= priceFromFilter);
    if (priceToFilter !== undefined)
      filtered = filtered.filter((d) => (d.priceTo ?? 0) <= priceToFilter);
    if (demandFilter !== undefined)
      filtered = filtered.filter((d) => (d.demand ?? 0) >= demandFilter);

    // 🆕 Sort newest/oldest
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredDemands(filtered);
  }, [
    makeFilter,
    gearboxFilter,
    fuelFilter,
    statusFilter,
    priceFromFilter,
    priceToFilter,
    demandFilter,
    sortOrder,
    demands,
  ]);

  const formatNumber = (num?: number) => (num ?? 0).toLocaleString();
  const formatDate = (dateStr: string) => dateStr.split("T")[0];

  const handleResetFilters = () => {
    setMakeFilter(undefined);
    setGearboxFilter(undefined);
    setFuelFilter(undefined);
    setStatusFilter(undefined);
    setPriceFromFilter(undefined);
    setPriceToFilter(undefined);
    setDemandFilter(undefined);
    setSortOrder("newest");
  };

  return (
    <div className="w-full max-w-7xl space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 items-end mt-4 p-6 bg-white shadow rounded-xs">
        <Input
          placeholder="Make"
          value={makeFilter ?? ""}
          onChange={(e) => setMakeFilter(e.target.value)}
          className="h-9 rounded-xs"
        />

        <Select value={gearboxFilter} onValueChange={setGearboxFilter}>
          <SelectTrigger className="h-9 rounded-xs w-full">
            <SelectValue placeholder="Gearbox" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="automatic">Automatic</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
          </SelectContent>
        </Select>

        <Select value={fuelFilter} onValueChange={setFuelFilter}>
          <SelectTrigger className="h-9 rounded-xs w-full">
            <SelectValue placeholder="Fuel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="diesel">Diesel</SelectItem>
            <SelectItem value="electric">Electric</SelectItem>
            <SelectItem value="LPG">LPG</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          min={0}
          placeholder="Price from"
          value={priceFromFilter ?? ""}
          onChange={(e) => setPriceFromFilter(Number(e.target.value))}
          className="h-9 rounded-xs"
        />

        <Input
          type="number"
          min={0}
          placeholder="Price to"
          value={priceToFilter ?? ""}
          onChange={(e) => setPriceToFilter(Number(e.target.value))}
          className="h-9 rounded-xs"
        />

        <Input
          type="number"
          min={0}
          placeholder="Demand number"
          value={demandFilter ?? ""}
          onChange={(e) => setDemandFilter(Number(e.target.value))}
          className="h-9 rounded-xs"
        />

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 rounded-xs w-full">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="saved">Saved</SelectItem>
          </SelectContent>
        </Select>

        {/* 🆕 Sort filter */}
        <Select
          value={sortOrder}
          onValueChange={(v: "newest" | "oldest") => setSortOrder(v)}
        >
          <SelectTrigger className="h-9 rounded-xs w-full">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>

        <div></div>
        <div></div>
        <div></div>

        {/* Reset button */}
        <div className="w-full flex justify-end">
          <button
            className="h-9 px-3 flex items-center gap-1 border rounded-xs text-gray-600 hover:bg-gray-200 cursor-pointer"
            onClick={handleResetFilters}
          >
            <X className="h-4 w-4" /> Reset
          </button>
        </div>
      </div>

      {/* Demand cards */}
      <div className="px-6 2xl:px-0">
        <div className="grid grid-cols-1 gap-4 mt-6">
          {filteredDemands.length > 0 ? (
            filteredDemands.map((demand) => (
              <div
                key={demand.id}
                className="relative border rounded-xs p-4 bg-white shadow hover:shadow-md transition"
              >
                <div className="flex flex-wrap items-center justify-between">
                  <h1 className="text-xl font-bold">
                    {demand.make ?? "Unknown"}
                  </h1>
                  <div className="flex gap-2">
                    <Heart className="h-5 w-5" />
                    <ThumbsUp className="h-5 w-5" />
                    <ThumbsDown className="h-5 w-5" />
                    <ClockPlus className="h-5 w-5" />
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-700 mt-2">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <p>{formatDate(demand.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <p>{demand.status?.toLowerCase() ?? "draft"}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p>Quantity: {formatNumber(demand.demand ?? 0)}</p>
                  </div>
                </div>

                <div className="flex flex-wrap text-sm text-gray-700 p-2 rounded-sm gap-2 mt-2 capitalize">
                  {demand.gearbox && (
                    <div className="bg-gray-100 py-1 px-2">
                      {demand.gearbox}
                    </div>
                  )}
                  {demand.fuel && (
                    <div className="bg-gray-100 py-1 px-2">{demand.fuel}</div>
                  )}
                  {demand.modelYear && (
                    <div className="bg-gray-100 py-1 px-2">
                      {demand.modelYear}
                    </div>
                  )}
                  {demand.country && (
                    <div className="bg-gray-100 py-1 px-2">
                      {demand.country}
                    </div>
                  )}
                  {demand.warehouse && (
                    <div className="bg-gray-100 py-1 px-2">
                      {demand.warehouse}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="bg-amber-100 border-1 border-amber-300 shadow-sm p-4">
              <div className="flex flex-col md:flex-row justify-center items-center text-amber-600">
                <TriangleAlert className="mr-4" />
                <p>
                  Unfortunately you did not create any demands that meet your
                  criteria.
                </p>
                <Link href="/buyer/offers/create">
                  <Button className="rounded-xs inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-black cursor-pointer ml-4">
                    <PlusCircle className="h-5 w-5" aria-hidden="true" />
                    <span>Add demand</span>
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-2 px-6 2xl:px-2 text-xs text-gray-700">
        Showing {filteredDemands.length} of {demands.length} entries
      </div>
    </div>
  );
}
