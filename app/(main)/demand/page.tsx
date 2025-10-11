import Link from "next/link";
import CreateDemandForm from "./DemandFilterForm";
import { Button } from "@/components/ui/button";
import { PlusCircle, TriangleAlert } from "lucide-react";

export const metadata = { title: "Demand • Bilvio" };

export default function DemandPage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Header row: same horizontal padding as content below */}
      <div className="flex items-center justify-between px-2 sm:px-4 md:px-6 mt-4">
        <h1 className="text-2xl md:text-3xl font-extrabold ">Demands</h1>

        <Link href="/buyer/offers/create">
          <Button className="rounded-2xl border shadow inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-black cursor-pointer">
            <PlusCircle className="h-5 w-5" aria-hidden="true" />
            <span>Add demand</span>
          </Button>
        </Link>
      </div>

      {/* Content wrapper: matches the header’s px so right edge aligns with the button */}
      <div className="px-2 sm:px-4 md:px-6 mt-4">
        <div className="bg-white border shadow-sm p-4">
          <CreateDemandForm />
        </div>
      </div>
      <h1 className="text-xl font-bold px-8 sm:px-4 md:px-6 my-4">
        All Demands
      </h1>

      <div className="px-2 sm:px-4 md:px-6 mt-4">
        <div className="bg-amber-100 border-1 border-amber-300 shadow-sm p-4">
          <div className="flex flex-col md:flex-row justify-center items-center text-amber-600">
            <TriangleAlert className="mr-4" />
            <p>
              Unfortunatetly you did not create any demands that meet your
              criteria{" "}
            </p>
            <Link href="/buyer/offers/create">
              <Button className="rounded-2xl border shadow inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-black cursor-pointer ml-4">
                <PlusCircle className="h-5 w-5" aria-hidden="true" />
                <span>Add demand</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
