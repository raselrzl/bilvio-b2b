"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface Offer {
  id: number;
  name: string;
  gearbox: string;
  fuel: string;
  price: number;
  offerNumber: string;
  createdAt: string;
  discount: number;
  type: string;
  stock: string;
  colour: string;
  quantity: number;
  mileage: number;
  firstRegistration: string;
  availability: string;
}

// Helper functions to format numbers/dates deterministically
const formatNumber = (num: number) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const formatDate = (dateStr: string) => dateStr.split("T")[0]; // YYYY-MM-DD

export default function OffersFilterForm({
  initialOffers,
}: {
  initialOffers: Offer[];
}) {
  const [offers, setOffers] = useState(initialOffers);
  const [filteredOffers, setFilteredOffers] = useState(initialOffers);

  const [nameFilter, setNameFilter] = useState("");
  const [gearboxFilter, setGearboxFilter] = useState<string | undefined>();
  const [fuelFilter, setFuelFilter] = useState<string | undefined>();
  const [priceFrom, setPriceFrom] = useState<number | undefined>();
  const [priceTo, setPriceTo] = useState<number | undefined>();
  const [offerNumberFilter, setOfferNumberFilter] = useState("");
  const [createdAfter, setCreatedAfter] = useState<string | undefined>();
  const [createdBefore, setCreatedBefore] = useState<string | undefined>();
  const [sortOption, setSortOption] = useState<string | undefined>();

  // Automatic filtering
  useEffect(() => {
    let filtered = [...offers];

    if (nameFilter)
      filtered = filtered.filter((o) =>
        o.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    if (gearboxFilter) filtered = filtered.filter((o) => o.gearbox === gearboxFilter);
    if (fuelFilter) filtered = filtered.filter((o) => o.fuel === fuelFilter);
    if (priceFrom) filtered = filtered.filter((o) => o.price >= priceFrom);
    if (priceTo) filtered = filtered.filter((o) => o.price <= priceTo);
    if (offerNumberFilter)
      filtered = filtered.filter((o) => o.offerNumber.includes(offerNumberFilter));
    if (createdAfter)
      filtered = filtered.filter((o) => o.createdAt >= createdAfter);
    if (createdBefore)
      filtered = filtered.filter((o) => o.createdAt <= createdBefore);

    if (sortOption) {
      switch (sortOption) {
        case "best-discount":
          filtered.sort((a, b) => b.discount - a.discount);
          break;
        case "newest":
          filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
          break;
        case "oldest":
          filtered.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
          break;
        case "cheapest":
          filtered.sort((a, b) => a.price - b.price);
          break;
        case "most-expensive":
          filtered.sort((a, b) => b.price - a.price);
          break;
        case "best-ai-margin":
          filtered.sort((a, b) => b.discount - a.discount);
          break;
      }
    }

    setFilteredOffers(filtered);
  }, [
    nameFilter,
    gearboxFilter,
    fuelFilter,
    priceFrom,
    priceTo,
    offerNumberFilter,
    createdAfter,
    createdBefore,
    sortOption,
    offers,
  ]);

  const handleReset = () => {
    setNameFilter("");
    setGearboxFilter(undefined);
    setFuelFilter(undefined);
    setPriceFrom(undefined);
    setPriceTo(undefined);
    setOfferNumberFilter("");
    setCreatedAfter(undefined);
    setCreatedBefore(undefined);
    setSortOption(undefined);
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
      <form className="space-y-4 mt-6 px-0 2xl:px-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-2 items-end mt-4 py-4 px-2 sm:px-4 md:px-6 bg-gray-500">
          <Input
            placeholder="Car Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className={inputClass(nameFilter)}
          />
          <Select value={gearboxFilter} onValueChange={(v) => setGearboxFilter(v)}>
            <SelectTrigger className={selectClass(gearboxFilter)}>
              <SelectValue placeholder="Gearbox" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Automatic">Automatic</SelectItem>
              <SelectItem value="Manual">Manual</SelectItem>
            </SelectContent>
          </Select>
          <Select value={fuelFilter} onValueChange={(v) => setFuelFilter(v)}>
            <SelectTrigger className={selectClass(fuelFilter)}>
              <SelectValue placeholder="Fuel Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Petrol">Petrol</SelectItem>
              <SelectItem value="Diesel">Diesel</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Electric">Electric</SelectItem>
            </SelectContent>
          </Select>
          <Input
            type="number"
            placeholder="Price From"
            value={priceFrom ?? ""}
            onChange={(e) => setPriceFrom(Number(e.target.value))}
            className={inputClass(String(priceFrom))}
          />
          <Input
            type="number"
            placeholder="Price To"
            value={priceTo ?? ""}
            onChange={(e) => setPriceTo(Number(e.target.value))}
            className={inputClass(String(priceTo))}
          />
          <Input
            placeholder="Offer Number"
            value={offerNumberFilter}
            onChange={(e) => setOfferNumberFilter(e.target.value)}
            className={inputClass(offerNumberFilter)}
          />
          <Input
            type="date"
            placeholder="Created After"
            value={createdAfter ?? ""}
            onChange={(e) => setCreatedAfter(e.target.value)}
            className={inputClass(createdAfter)}
          />
          <Input
            type="date"
            placeholder="Created Before"
            value={createdBefore ?? ""}
            onChange={(e) => setCreatedBefore(e.target.value)}
            className={inputClass(createdBefore)}
          />
          <Select value={sortOption} onValueChange={(v) => setSortOption(v)}>
            <SelectTrigger className={selectClass(sortOption)}>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="best-discount">Best Discount</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="cheapest">Cheapest</SelectItem>
              <SelectItem value="most-expensive">Most Expensive</SelectItem>
              <SelectItem value="best-ai-margin">Best AI Margin %</SelectItem>
            </SelectContent>
          </Select>
          <div></div>
          <div></div>
          <Button variant="outline" className="rounded-xs" onClick={handleReset}>
            <X className="h-4 w-4 mr-2" /> Clear
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-2 items-end mt-2 px-2">
          <div>
            <h1 className="text-2xl text-gray-600 md:text-3xl font-extrabold">
              New cars
            </h1>
          </div>
          <div className="mt-2 px-2 text-xs text-gray-700">
            Showing {filteredOffers.length} of {offers.length} entries
          </div>
        </div>
      </form>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 mt-6 px-6 2xl:px-2">
        {filteredOffers.length > 0 ? (
          filteredOffers.map((offer) => (
            <div
              key={offer.id}
              className="relative border rounded-xs p-4 bg-white shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-2 text-lg font-bold">
                <span>🚗 Car Name:</span>
                <span>{offer.name}</span>
              </div>

              <div className="flex flex-wrap text-sm text-gray-700 p-2 rounded-sm gap-2">
                <div className="bg-gray-100 py-1 px-2">Gearbox: {offer.gearbox}</div>
                <div className="bg-gray-100 py-1 px-2">Fuel: {offer.fuel}</div>
                <div className="bg-gray-100 py-1 px-2">
                  Price: ${formatNumber(offer.price)}
                </div>
                <div className="bg-gray-100 py-1 px-2">Offer #: {offer.offerNumber}</div>
                <div className="bg-gray-100 py-1 px-2">Discount: {offer.discount}%</div>
                <div className="bg-gray-100 py-1 px-2">Type: {offer.type}</div>
                <div className="bg-gray-100 py-1 px-2">Stock: {offer.stock}</div>
                <div className="bg-gray-100 py-1 px-2">Colour: {offer.colour}</div>
                <div className="bg-gray-100 py-1 px-2">Quantity: {offer.quantity}</div>
                <div className="bg-gray-100 py-1 px-2">
                  Mileage: {formatNumber(offer.mileage)} km
                </div>
                <div className="bg-gray-100 py-1 px-2">
                  First Registration: {formatDate(offer.firstRegistration)}
                </div>
                <div className="bg-gray-100 py-1 px-2">Availability: {offer.availability}</div>
                <div className="bg-gray-100 py-1 px-2">Created: {formatDate(offer.createdAt)}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="border p-4 text-center text-amber-600 bg-amber-100 rounded">
            No offers found
          </div>
        )}
      </div>
      <div className="mt-2 px-2 text-xs text-gray-700">
        Showing {filteredOffers.length} of {offers.length} entries
      </div>
    </div>
  );
}
