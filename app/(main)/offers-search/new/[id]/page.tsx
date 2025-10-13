import { prisma } from "@/app/utils/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BellDot,
  Calendar,
  CircleQuestionMark,
  ClockPlus,
  Eye,
  Heart,
  SquarePen,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";

// Helpers
const formatNumber = (num: number) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString();

// Fetch offer from DB by ID
async function getOfferById(id: string) {
  const offer = await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      gearbox: true,
      fuel: true,
      price: true,
      offerNumber: true,
      createdAt: true,
      discount: true,
      type: true,
      stock: true,
      colour: true,
      quantity: true,
      mileage: true,
      firstRegistration: true,
      availability: true,
      trim: true,
      engineSpec: true,
      vat: true,
      transportCost: true,
      productionYear: true,
    },
  });

  if (!offer) notFound();

  return {
    ...offer,
    firstRegistration: offer.firstRegistration.toISOString(),
    createdAt: offer.createdAt.toISOString(),
  };
}

export default async function NewCarOfferDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const offer = await getOfferById(params.id);

  const baseNet = offer.price;
  const optionsNet = offer.transportCost;
  const totalCatalogueNet = baseNet + optionsNet;
  const discountValue = (totalCatalogueNet * offer.discount) / 100;
  const discountedNet = totalCatalogueNet - discountValue;

  const baseGross = baseNet * (1 + offer.vat / 100);
  const optionsGross = optionsNet * (1 + offer.vat / 100);
  const totalCatalogueGross = totalCatalogueNet * (1 + offer.vat / 100);
  const discountedGross = totalCatalogueGross - discountValue * (1 + offer.vat / 100);

  const formatCurrency = (num: number) =>
    num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <section className="max-w-7xl mx-auto px-6 my-6">
      <h1 className="text-2xl md:text-3xl font-extrabold mb-6">New cars</h1>
      {/* Header */}
      <div className="border-t border-l border-r p-4 bg-white">
        <div className="flex flex-wrap items-center justify-between mb-2">
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
            <p className="text-lg font-bold">{formatNumber(offer.price)}</p>
            <p className="ml-2 text-sm mt-1 font-bold text-gray-600">SEK NET</p>
          </div>
        </div>
        <div className="flex justify-between text-sm text-gray-700">
          <div className="flex gap-4 items-center justify-center">
            <p>{offer.offerNumber}</p>
            <div className="flex text-md items-center justify-center">
              <Calendar className="h-4 w-4 mr-1" />
              <p className="text-center">{formatDate(offer.firstRegistration)}</p>
            </div>
            <div className="flex text-md items-center justify-center">
              <Eye className="h-4 w-4 mr-1" />
              <p className="text-center">{formatDate(offer.createdAt)}</p>
            </div>
          </div>
          <div className="items-end justify-end">
            <p>{offer.vat}% VAT</p>
          </div>
        </div>
        <div className="items-end justify-end text-end text-gray-600 text-sm">
          <p>Estimated transport cost {formatNumber(offer.transportCost)} SEK NET</p>
        </div>
      </div>

      {/* Offer info */}
      <div className="flex flex-col md:flex-row">
        {/* Left side: details table */}
        <div className="flex-1">
          <div className="grid grid-cols-2 text-sm text-gray-700 border overflow-hidden">
            <div className="col-span-2 bg-white text-xl font-bold p-3">Car Details</div>
            {[
              ["Engine Spec", offer.engineSpec],
              ["Gearbox", offer.gearbox],
              ["Trim", offer.trim],
              ["Type", offer.type],
              ["Stock", offer.stock],
              ["Colour", offer.colour],
              ["Quantity", offer.quantity],
              ["Mileage", `${formatNumber(offer.mileage)} km`],
              ["Fuel", offer.fuel],
              ["First Registration", formatDate(offer.firstRegistration)],
              ["Availability", offer.availability],
            ].map(([label, value], index) => (
              <React.Fragment key={label}>
                <div className={`font-semibold p-2 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                  {label}:
                </div>
                <div className={`p-2 ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                  {value}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Right side: price analysis */}
        <div className="flex-1 mt-4 md:mt-0">
          <div className="grid grid-cols-3 text-sm text-gray-700 border overflow-hidden">
            <div className="flex col-span-3 bg-white text-xl font-bold p-3 items-center">
              Price Analysis <CircleQuestionMark className="h-5 w-5 ml-2" />
            </div>

            <div className="bg-gray-200 font-semibold p-2"></div>
            <div className="bg-gray-200 font-semibold p-2 text-center">Net</div>
            <div className="bg-gray-200 font-semibold p-2 text-center">Gross</div>

            {/* Catalogue */}
            <div className="font-semibold p-2 bg-gray-100">Catalogue Base Price:</div>
            <div className="p-2 text-center bg-gray-100">{formatCurrency(baseNet)} SEK</div>
            <div className="p-2 text-center bg-gray-100">{formatCurrency(baseGross)} SEK</div>

            <div className="font-semibold p-2 bg-white">Options:</div>
            <div className="p-2 text-center bg-white">{formatCurrency(optionsNet)} SEK</div>
            <div className="p-2 text-center bg-white">{formatCurrency(optionsGross)} SEK</div>

            <div className="font-semibold p-2 bg-gray-100">Total Catalogue:</div>
            <div className="p-2 text-center bg-gray-100">{formatCurrency(totalCatalogueNet)} SEK</div>
            <div className="p-2 text-center bg-gray-100">{formatCurrency(totalCatalogueGross)} SEK</div>

            <div className="font-semibold p-2 bg-white flex">
              <p className="bg-amber-400 px-2 text-sm rounded-xs font-bold">{offer.discount}%</p> Discount:
            </div>
            <div className="p-2 text-center bg-white text-red-600">-{formatCurrency(discountValue)} SEK</div>
            <div className="p-2 text-center bg-white text-red-600">-{formatCurrency(discountValue * (1 + offer.vat / 100))} SEK</div>

            <div className="col-span-3 flex items-center bg-black text-white text-lg font-bold py-2 px-6 text-start">
              Price: {formatCurrency(discountedNet)} <p className="text-sm mt-1 ml-3 text-gray-400">SEK NET</p> / {formatCurrency(discountedGross)} <p className="text-sm mt-1 ml-3 text-gray-400">SEK GROSS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="bg-white py-6 px-2 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm w-full">
          <Input type="text" placeholder="Write a note..." className="pl-10 pr-3 h-9 text-sm border-gray-300 rounded w-full" />
          <SquarePen className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
          <p className="ml-4 text-xs text-gray-500">0/2000</p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="#" className="text-sm font-semibold hover:underline">Send message</Link>
          <BellDot className="h-5 w-5 text-gray-600" />
        </div>

        <Button asChild className="bg-[#619aab] text-white hover:bg-[#528a99] rounded-2xl px-4 py-2 text-sm font-semibold">
          <a href="/buyer/offers/create">Add Demand {" >>"}</a>
        </Button>
      </div>
    </section>
  );
}
