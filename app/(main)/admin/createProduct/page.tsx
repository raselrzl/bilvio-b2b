"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "react-hot-toast";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { createProductAction } from "@/app/actions";
import { Label } from "@/components/ui/label";

export default function ProductForm({ userId }: { userId?: string }) {
  const [name, setName] = useState("");
  const [offerNumber, setOfferNumber] = useState("");
  const [gearbox, setGearbox] = useState<"AUTOMATIC" | "MANUAL">("AUTOMATIC");
  const [fuel, setFuel] = useState<"PETROL" | "DIESEL" | "HYBRID" | "ELECTRIC">(
    "PETROL"
  );
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [type, setType] = useState<
    "SUPER" | "INTERESTING" | "NOT_INTERESTING" | "LATER"
  >("SUPER");
  const [stock, setStock] = useState<"IN_STOCK" | "OUT_OF_STOCK">("IN_STOCK");
  const [colour, setColour] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [mileage, setMileage] = useState(0);
  const [firstRegistration, setFirstRegistration] = useState("");
  const [availability, setAvailability] = useState<"IMMEDIATELY" | "LATER">(
    "IMMEDIATELY"
  );
  const [trim, setTrim] = useState("");
  const [engineSpec, setEngineSpec] = useState("");
  const [vat, setVat] = useState(0);
  const [transportCost, setTransportCost] = useState(0);
  const [productionYear, setProductionYear] = useState(
    new Date().getFullYear()
  );

 

// inside ProductForm
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  await createProductAction({
    name,
    offerNumber,
    gearbox,
    fuel,
    price,
    discount,
    type,
    stock,
    colour,
    quantity,
    mileage,
    firstRegistration,
    availability,
    trim,
    engineSpec,
    vat,
    transportCost,
    productionYear,
    userId,
  });

  // ✅ show toast
  toast.success("Product created successfully!");

  // ✅ reset form fields
  setName("");
  setOfferNumber("");
  setGearbox("AUTOMATIC");
  setFuel("PETROL");
  setPrice(0);
  setDiscount(0);
  setType("SUPER");
  setStock("IN_STOCK");
  setColour("");
  setQuantity(0);
  setMileage(0);
  setFirstRegistration("");
  setAvailability("IMMEDIATELY");
  setTrim("");
  setEngineSpec("");
  setVat(0);
  setTransportCost(0);
  setProductionYear(new Date().getFullYear());
};


  const inputClass = (value: string | number | undefined) =>
    `h-9 w-full rounded-xs bg-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-0 ${
      value ? "bg-[#619aab] text-white placeholder-white" : ""
    }`;

  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-50 p-6 mt-8 rounded shadow space-y-6">
      <h1 className="text-2xl font-bold text-gray-700">Create New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <Input
          placeholder="Car Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass(name)}
          required
        />
        <Input
          placeholder="Offer Number"
          value={offerNumber}
          onChange={(e) => setOfferNumber(e.target.value)}
          className={inputClass(offerNumber)}
          required
        />
        <Select
          value={gearbox}
          onValueChange={(v) => setGearbox(v as "AUTOMATIC" | "MANUAL")}
          required
        >
          <SelectTrigger className={inputClass(gearbox)}>
            <SelectValue placeholder="Gearbox" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AUTOMATIC">Automatic</SelectItem>
            <SelectItem value="MANUAL">Manual</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={fuel}
          onValueChange={(v) =>
            setFuel(v as "PETROL" | "DIESEL" | "HYBRID" | "ELECTRIC")
          }
          required
        >
          <SelectTrigger className={inputClass(fuel)}>
            <SelectValue placeholder="Fuel Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PETROL">Petrol</SelectItem>
            <SelectItem value="DIESEL">Diesel</SelectItem>
            <SelectItem value="HYBRID">Hybrid</SelectItem>
            <SelectItem value="ELECTRIC">Electric</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex flex-col gap-2">
          <Label>Price</Label>
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className={inputClass(price)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Discount %</Label>
          <Input
            type="number"
            placeholder="Discount %"
            value={discount}
            onChange={(e) => setDiscount(Number(e.target.value))}
            className={inputClass(discount)}
            required
          />
        </div>
        <Select
          value={type}
          onValueChange={(v) =>
            setType(v as "SUPER" | "INTERESTING" | "NOT_INTERESTING" | "LATER")
          }
          required
        >
          <SelectTrigger className={inputClass(type)}>
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SUPER">Super</SelectItem>
            <SelectItem value="INTERESTING">Interesting</SelectItem>
            <SelectItem value="NOT_INTERESTING">Not Interesting</SelectItem>
            <SelectItem value="LATER">Later</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={stock}
          onValueChange={(v) => setStock(v as "IN_STOCK" | "OUT_OF_STOCK")}
          required
        >
          <SelectTrigger className={inputClass(stock)}>
            <SelectValue placeholder="Stock" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="IN_STOCK">In Stock</SelectItem>
            <SelectItem value="OUT_OF_STOCK">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Colour"
          value={colour}
          onChange={(e) => setColour(e.target.value)}
          className={inputClass(colour)}
          required
        />

        <div className="flex flex-col gap-2">
          <Label>Quantity</Label>
          <Input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className={inputClass(quantity)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label>Mileage(km)</Label>
          <Input
            type="number"
            placeholder="Mileage"
            value={mileage}
            onChange={(e) => setMileage(Number(e.target.value))}
            className={inputClass(mileage)}
            required
          />
        </div>
        <Input
          type="date"
          placeholder="First Registration"
          value={firstRegistration}
          onChange={(e) => setFirstRegistration(e.target.value)}
          className={inputClass(firstRegistration)}
          required
        />
        <Select
          value={availability}
          onValueChange={(v) => setAvailability(v as "IMMEDIATELY" | "LATER")}
          required
        >
          <SelectTrigger className={inputClass(availability)}>
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="IMMEDIATELY">Immediately</SelectItem>
            <SelectItem value="LATER">Later</SelectItem>
          </SelectContent>
        </Select>
        <Input
          placeholder="Trim"
          value={trim}
          onChange={(e) => setTrim(e.target.value)}
          className={inputClass(trim)}
          required
        />
        <Input
          placeholder="Engine Spec"
          value={engineSpec}
          onChange={(e) => setEngineSpec(e.target.value)}
          className={inputClass(engineSpec)}
          required
        />

        <div className="flex flex-col gap-2">
          <Label>VAT %</Label>
          <Input
            type="number"
            placeholder="VAT %"
            value={vat}
            onChange={(e) => setVat(Number(e.target.value))}
            className={inputClass(vat)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Transport Cost</Label>
          <Input
            type="number"
            placeholder="Transport Cost"
            value={transportCost}
            onChange={(e) => setTransportCost(Number(e.target.value))}
            className={inputClass(transportCost)}
            required
          />
        </div>

        <Input
          type="number"
          placeholder="Production Year"
          value={productionYear}
          onChange={(e) => setProductionYear(Number(e.target.value))}
          className={inputClass(productionYear)}
          required
        />

        <Button
          type="submit"
          className="col-span-full bg-[#619aab] text-white hover:bg-[#528a99] rounded-xl h-10 mt-2"
        >
          Create Product
        </Button>
      </form>

      <Toaster position="top-right" />
    </div>
  );
}
