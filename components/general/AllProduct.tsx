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
import {
  BellDot,
  Calendar,
  Clock,
  ClockPlus,
  Eye,
  Heart,
  SquarePen,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import Link from "next/link";

interface Offer {
  id: string;
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
  trim: string;
  engineSpec: string;
  vat: number;
  transportCost: number;
  productionYear: number; // ✅ Added
}

// Helper functions to format numbers/dates deterministically
const formatNumber = (num: number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
const formatDate = (dateStr: string) => dateStr.split("T")[0]; // YYYY-MM-DD

export default function AllProducts({
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
  const [mileageFrom, setMileageFrom] = useState<number | undefined>(); // ✅
  const [mileageTo, setMileageTo] = useState<number | undefined>(); // ✅
  const [yearFrom, setYearFrom] = useState<number | undefined>(); // ✅
  const [yearTo, setYearTo] = useState<number | undefined>(); // ✅

  // Automatic filtering
  useEffect(() => {
    let filtered = [...offers];

    if (nameFilter)
      filtered = filtered.filter((o) =>
        o.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    if (gearboxFilter)
      filtered = filtered.filter((o) => o.gearbox === gearboxFilter);
    if (fuelFilter) filtered = filtered.filter((o) => o.fuel === fuelFilter);
    if (priceFrom) filtered = filtered.filter((o) => o.price >= priceFrom);
    if (priceTo) filtered = filtered.filter((o) => o.price <= priceTo);
    if (mileageFrom)
      filtered = filtered.filter((o) => o.mileage >= mileageFrom);
    if (mileageTo) filtered = filtered.filter((o) => o.mileage <= mileageTo);
    if (yearFrom)
      filtered = filtered.filter((o) => o.productionYear >= yearFrom);
    if (yearTo) filtered = filtered.filter((o) => o.productionYear <= yearTo);
    if (offerNumberFilter)
      filtered = filtered.filter((o) =>
        o.offerNumber.includes(offerNumberFilter)
      );
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
    mileageFrom,
    mileageTo,
    yearFrom,
    yearTo, // ✅ added missing dependencies
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
      <form className="mt-6 px-0 2xl:px-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 items-end mt-4 py-4 px-2 sm:px-4 md:px-6 bg-gray-500">
          <Input
            placeholder="Car Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            className={inputClass(nameFilter)}
          />
          <Select
            value={gearboxFilter}
            onValueChange={(v) => setGearboxFilter(v)}
          >
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

          {/* ✅ New filters start here */}
          <Input
            type="number"
            placeholder="Mileage From"
            value={mileageFrom ?? ""}
            onChange={(e) => setMileageFrom(Number(e.target.value))}
            className={inputClass(String(mileageFrom))}
          />
          <Input
            type="number"
            placeholder="Mileage To"
            value={mileageTo ?? ""}
            onChange={(e) => setMileageTo(Number(e.target.value))}
            className={inputClass(String(mileageTo))}
          />
          <Input
            type="number"
            placeholder="Production Year From"
            value={yearFrom ?? ""}
            onChange={(e) => setYearFrom(Number(e.target.value))}
            className={inputClass(String(yearFrom))}
          />
          <Input
            type="number"
            placeholder="Production Year To"
            value={yearTo ?? ""}
            onChange={(e) => setYearTo(Number(e.target.value))}
            className={inputClass(String(yearTo))}
          />
          {/* ✅ New filters end */}
          <Select value={sortOption} onValueChange={(v) => setSortOption(v)}>
            <SelectTrigger className={selectClass(sortOption)}>
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="best-discount">Best Discount</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="cheapest">Low to High</SelectItem>
              <SelectItem value="most-expensive">High to low</SelectItem>
              <SelectItem value="best-ai-margin">Best AI Margin %</SelectItem>
            </SelectContent>
          </Select>
          <div></div>
          <div></div>
        </div>
        <div className="bg-gray-500 flex justify-end pr-6 pb-4">
          {" "}
          <Button
            variant="outline"
            className="rounded-xs cursor-pointer"
            onClick={handleReset}
          >
            <X className="h-4 w-4 mr-2" /> Reset
          </Button>
        </div>

        <div className="grid grid-cols-2 items-end mt-2 px-6 2xl:px-0">
          <div>
            <h1 className="text-xl text-gray-600 md:text-3xl font-bold uppercase">
              All cars
            </h1>
          </div>
          <div className="mt-2 px-2 text-xs text-gray-700 text-right">
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
              <div>
                {" "}
                <div className="flex flex-wrap items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold">{offer.name}</h1>
                  </div>
                  <div className="flex gap-2">
                    <Heart className="h-5 w-5" />
                    <ThumbsUp className="h-5 w-5" />
                    <ThumbsDown className="h-5 w-5" />
                    <ClockPlus className="h-5 w-5" />
                  </div>
                  <div className="bg-amber-400 px-2 text-sm rounded-xs font-bold">
                    <p>{offer.discount}%</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-lg font-bold">
                      {formatNumber(offer.price)}{" "}
                    </p>
                    <p className="ml-2 text-sm mt-1 font-bold text-gray-600">
                      SEK NET
                    </p>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <div className="flex gap-4 items-center justify-center">
                    <p>{offer.offerNumber}</p>
                    <div className="flex text-md items-center justify-center ">
                      <Calendar className="h-4 w-4 mr-1" />
                      <p className="text-center">
                        {formatDate(offer.firstRegistration)}
                      </p>
                    </div>
                    <div className="flex text-md items-center justify-center ">
                      <p>
                        <Eye className="h-4 w-4 mr-1" />
                      </p>
                      <p className="text-center">
                        {formatDate(offer.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="items-end justify-end ">
                    <p>{offer.vat}% VAT</p>
                  </div>
                </div>
                <div className="items-end justify-end text-end text-gray-600 text-sm capitalize">
                  <p>
                    estimated transport cost {formatNumber(offer.transportCost)}{" "}
                    SEK NET
                  </p>
                </div>
                <div className="flex flex-wrap text-sm text-gray-700 p-2 rounded-sm gap-2 capitalize">
                  <div className="flex gap-2">
                    {" "}
                    <div className="bg-gray-100 py-1 px-2 text-black font-semibold">
                      {offer.engineSpec}
                    </div>
                    <div className="bg-gray-100 py-1 px-2 text-black font-semibold">
                      {offer.gearbox} 5
                    </div>
                    <div className="bg-gray-100 py-1 px-2 text-black font-semibold">
                      {offer.trim}
                    </div>
                  </div>

                  <div className="flex gap-2 bg-gray-100 py-1 px-2">
                    Type: <p className="font-semibold">{offer.stock}</p>
                  </div>

                  <div className="flex gap-2 bg-gray-100 py-1 px-2">
                    Colour: <p className="font-semibold">{offer.colour}</p>
                  </div>

                  <div className="flex gap-2 bg-gray-100 py-1 px-2">
                    Quantity: <p className="font-semibold">{offer.quantity}</p>
                  </div>

                  <div className="flex gap-2 bg-gray-100 py-1 px-2">
                    Mileage:{" "}
                    <p className="font-semibold">
                      {formatNumber(offer.mileage)} km
                    </p>
                  </div>
                  <div className="flex gap-2 bg-gray-100 py-1 px-2">
                    Fuel: <p className="font-semibold">{offer.fuel}</p>
                  </div>

                  <div className="flex gap-2 bg-gray-100 py-1 px-2">
                    First registration:{" "}
                    <p className="font-semibold">
                      {" "}
                      around an availability date at seller warehouse
                    </p>
                  </div>

                  <div className="flex gap-2 bg-gray-100 py-1 px-2">
                    Availability:{" "}
                    <p className="font-semibold">{offer.availability}</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 mt-4 pt-4 flex items-center justify-between gap-4">
                {/* 1️⃣ Input with icon */}
                <div className="relative flex-1 max-w-sm">
                  <Input
                    type="text"
                    placeholder="Write a note..."
                    className="pl-10 pr-3 h-9 text-sm border-gray-300 rounded-xs w-full"
                  />
                  <SquarePen className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
                  <p className="ml-4 text-xs text-gray-500">0/2000</p>
                </div>

                {/* 2️⃣ Send message link */}
                <div className="flex">
                  <Link
                    href="#"
                    className="text-sm font-semibold hover:underline"
                  >
                    Send message
                  </Link>
                  <BellDot />
                </div>

                {/* 3️⃣ View offer button */}
                <div>
                  <Button
                    asChild
                    className="bg-[#619aab] text-white hover:bg-[#528a99] rounded-2xl px-4 py-2 text-sm font-semibold"
                  >
                    <a href={`/offers-search/used/${offer.id}`}>View offer {" >>"}</a>
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="border p-4 text-center text-amber-600 bg-amber-100 rounded">
            No offers found
          </div>
        )}
      </div>
      <div className="mt-2 px-6 2xl:px-2 text-xs text-gray-700">
        Showing {filteredOffers.length} of {offers.length} entries
      </div>
    </div>
  );
}
