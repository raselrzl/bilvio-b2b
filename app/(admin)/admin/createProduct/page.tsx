"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Label } from "@/components/ui/label";
import { createProductAction } from "@/app/actions";

export default function ProductForm({ userId }: { userId?: string }) {
  const router = useRouter();
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
  const [loading, setLoading] = useState(false);
  const [productCondition, setProductCondition] = useState<"NEW" | "USED">(
    "NEW"
  );

  const inputClass = (value: string | number | undefined) =>
    `h-9 w-full rounded-xs bg-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-0 ${
      value ? "bg-[#619aab] text-white placeholder-white" : ""
    }`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createProductAction({
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
        productCondition,
      });

      if (result.ok) {
        toast.success("Product created successfully!");
        router.refresh();
        router.push("/admin/createProduct");

        // Reset form
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
      } else {
        toast.error("Failed to create product.");
        console.log(result.errors);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-50 p-6 mt-8 rounded shadow space-y-6">
      <h1 className="text-2xl font-bold text-gray-700">Create New Product</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="flex flex-col gap-1">
          <Label>Product Condition</Label>
          <Select
            value={productCondition}
            onValueChange={(v) => setProductCondition(v as "NEW" | "USED")}
            required
          >
            <SelectTrigger className={inputClass(productCondition)}>
              <SelectValue placeholder="Select Condition" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEW">NEW</SelectItem>
              <SelectItem value="USED">USED</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <Label>Car Name</Label>
          <Input
            placeholder="Car Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass(name)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Offer Number</Label>
          <Input
            placeholder="Offer Number"
            value={offerNumber}
            onChange={(e) => setOfferNumber(e.target.value)}
            className={inputClass(offerNumber)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Gearbox</Label>
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
        </div>

        <div className="flex flex-col gap-1">
          <Label>Fuel Type</Label>
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
        </div>

        <div className="flex flex-col gap-1">
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

        <div className="flex flex-col gap-1">
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

        <div className="flex flex-col gap-1">
          <Label>Type</Label>
          <Select
            value={type}
            onValueChange={(v) =>
              setType(
                v as "SUPER" | "INTERESTING" | "NOT_INTERESTING" | "LATER"
              )
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
        </div>

        <div className="flex flex-col gap-1">
          <Label>Stock</Label>
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
        </div>

        <div className="flex flex-col gap-1">
          <Label>Colour</Label>
          <Input
            placeholder="Colour"
            value={colour}
            onChange={(e) => setColour(e.target.value)}
            className={inputClass(colour)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
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

        <div className="flex flex-col gap-1">
          <Label>Mileage (km)</Label>
          <Input
            type="number"
            placeholder="Mileage"
            value={mileage}
            onChange={(e) => setMileage(Number(e.target.value))}
            className={inputClass(mileage)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>First Registration</Label>
          <Input
            type="date"
            placeholder="First Registration"
            value={firstRegistration}
            onChange={(e) => setFirstRegistration(e.target.value)}
            className={inputClass(firstRegistration)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Availability</Label>
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
        </div>

        <div className="flex flex-col gap-1">
          <Label>Trim</Label>
          <Input
            placeholder="Trim"
            value={trim}
            onChange={(e) => setTrim(e.target.value)}
            className={inputClass(trim)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Engine Spec</Label>
          <Input
            placeholder="Engine Spec"
            value={engineSpec}
            onChange={(e) => setEngineSpec(e.target.value)}
            className={inputClass(engineSpec)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
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

        <div className="flex flex-col gap-1">
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

        <div className="flex flex-col gap-1">
          <Label>Production Year</Label>
          <Input
            type="number"
            placeholder="Production Year"
            value={productionYear}
            onChange={(e) => setProductionYear(Number(e.target.value))}
            className={inputClass(productionYear)}
            required
          />
        </div>

        <Button
          type="submit"
          className="col-span-full cursor-pointer bg-[#619aab] text-white hover:bg-[#528a99] rounded-xs h-10 mt-2 flex items-center justify-center"
          disabled={loading}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
          {loading ? "Creating..." : "Create Product"}
        </Button>
      </form>

      <Toaster position="top-right" />
    </div>
  );
}
