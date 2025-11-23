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
  Car,
  Calendar,
  TriangleAlert,
  PlusCircle,
  EyeIcon,
  NotebookPen,
  MessageCircle,
  Save,
  SquarePen,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import DemandNoteInput from "./DemandNoteInput";
import { saveDemandNote } from "@/app/actions";

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
  status?: "DRAFT" | "SAVED" | null;
  createdAt: string;
  lastNote?: string;
}

interface AllDemandsProps {
  initialDemands: Demand[];
  currentUser: { id: string; email: string };
}

export default function AllDemands({
  initialDemands,
  currentUser,
}: AllDemandsProps) {
  const [demands, setDemands] = useState<Demand[]>(initialDemands);
  const [filteredDemands, setFilteredDemands] =
    useState<Demand[]>(initialDemands);

  const [makeFilter, setMakeFilter] = useState<string>();
  const [gearboxFilter, setGearboxFilter] = useState<string>();
  const [fuelFilter, setFuelFilter] = useState<string>();
  const [statusFilter, setStatusFilter] = useState<string>();
  const [priceFromFilter, setPriceFromFilter] = useState<number>();
  const [priceToFilter, setPriceToFilter] = useState<number>();
  const [demandFilter, setDemandFilter] = useState<number>();
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

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

  const inputClass = (value: string | undefined) =>
    `h-9 w-full rounded-xs bg-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-0 ${
      value ? "bg-[#619aab] text-white placeholder-white" : ""
    }`;

  const selectClass = (value: string | undefined) =>
    `h-9 w-full rounded-xs bg-white focus:outline-none focus:ring-0 focus:border-0 ${
      value ? "bg-[#619aab] text-white" : ""
    }`;

  return (
    <div className="w-full max-w-7xl space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 items-end mt-4 p-6 bg-gray-500 shadow rounded-xs">
        <Input
          placeholder="Car Name"
          value={makeFilter ?? ""}
          onChange={(e) => setMakeFilter(e.target.value)}
          className={inputClass(makeFilter)}
        />

        <Select value={gearboxFilter} onValueChange={setGearboxFilter}>
          <SelectTrigger className={selectClass(gearboxFilter)}>
            <SelectValue placeholder="Gearbox" />
          </SelectTrigger>
          <SelectContent className="rounded-xs">
            <SelectItem value="automatic" className="rounded-xs">
              Automatic
            </SelectItem>
            <SelectItem value="manual" className="rounded-xs">
              Manual
            </SelectItem>
          </SelectContent>
        </Select>

        <Select value={fuelFilter} onValueChange={setFuelFilter}>
          <SelectTrigger className={selectClass(fuelFilter)}>
            <SelectValue placeholder="Fuel" />
          </SelectTrigger>
          <SelectContent className="rounded-xs">
            <SelectItem value="diesel" className="rounded-xs">
              Diesel
            </SelectItem>
            <SelectItem value="electric" className="rounded-xs">
              Electric
            </SelectItem>
            <SelectItem value="LPG" className="rounded-xs">
              LPG
            </SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="number"
          min={0}
          placeholder="Price from"
          value={priceFromFilter ?? ""}
          onChange={(e) => setPriceFromFilter(Number(e.target.value))}
          className={inputClass(String(priceFromFilter))}
        />

        <Input
          type="number"
          min={0}
          placeholder="Price to"
          value={priceToFilter ?? ""}
          onChange={(e) => setPriceToFilter(Number(e.target.value))}
          className={inputClass(String(priceToFilter))}
        />

        <Input
          type="number"
          min={0}
          placeholder="Demand number"
          value={demandFilter ?? ""}
          onChange={(e) => setDemandFilter(Number(e.target.value))}
          className={inputClass(String(demandFilter))}
        />

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className={selectClass(statusFilter)}>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="rounded-xs">
            <SelectItem value="draft" className="rounded-xs">
              Draft
            </SelectItem>
            <SelectItem value="saved" className="rounded-xs">
              Saved
            </SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortOrder}
          onValueChange={(v: "newest" | "oldest") => setSortOrder(v)}
        >
          <SelectTrigger className={selectClass(sortOrder)}>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="rounded-xs">
            <SelectItem value="newest" className="rounded-xs">
              Newest
            </SelectItem>
            <SelectItem value="oldest" className="rounded-xs">
              Oldest
            </SelectItem>
          </SelectContent>
        </Select>

        <div></div>
        <div></div>
        <div></div>

        <div className="w-full flex justify-end">
          <button
            className="h-9 px-3 flex items-center gap-1 border rounded-xs text-gray-600 hover:bg-gray-200 cursor-pointer"
            onClick={handleResetFilters}
          >
            <X className="h-4 w-4" /> Reset
          </button>
        </div>
      </div>

      <div className="mt-2 px-6 2xl:px-2 text-xs text-gray-700">
        Showing {filteredDemands.length} of {demands.length} entries
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
                </div>

                <div className="flex justify-between text-sm text-gray-700 mt-2">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <Car className="h-4 w-4" />
                      Demand
                    </div>

                    <div className="flex items-center gap-1">
                      <p># {demand.demand}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <p>{formatDate(demand.createdAt)}</p>
                    </div>
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
                  {demand.demand && (
                    <div className="bg-gray-100 py-1 px-2">
                      Quantity: {formatNumber(demand.demand ?? 0)}
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4 flex items-center justify-between gap-4">
                  <DemandNoteInput
                    initialNotes={
                      demand.lastNote
                        ? [{ id: demand.id, note: demand.lastNote }]
                        : []
                    }
                    onSave={async (note) => {
                      await saveDemandNote({
                        userId: currentUser.id,
                        demandId: demand.id,
                        note,
                      });

                      // Update UI immediately
                      setDemands((prev) =>
                        prev.map((d) =>
                          d.id === demand.id ? { ...d, lastNote: note } : d
                        )
                      );
                    }}
                  />

                  <div className="flex gap-2">
                    <EyeIcon className="bg-gray-100 p-1 h-8 w-8 cursor-pointer rounded-xs text-gray-700 hover:bg-gray-200 " />
                    <NotebookPen className="bg-gray-100 p-1 h-8 w-8 cursor-pointer rounded-xs text-gray-700 hover:bg-gray-200" />
                    <MessageCircle className="bg-gray-100 p-1 h-8 w-8 cursor-pointer rounded-xs text-gray-700 hover:bg-gray-200" />
                    <Save className="bg-gray-100 p-1 h-8 w-8 cursor-pointer rounded-xs text-gray-600 hover:bg-gray-200" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-amber-100 border border-amber-300 shadow-sm p-4">
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
