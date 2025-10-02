import CreateDemandForm from "./DemandForm";

export const metadata = { title: "Demand • Bilvio" };

export default function DemandPage() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      <h1 className="text-2xl md:text-3xl font-extrabold mt-4">Demands</h1>
      <div className="mx-2 sm:mx-4 md:mx-6">
      <div className="bg-white border shadow-sm p-4 mt-4 sm:mx-6 md:mx-8 lg:mx-auto">
        <CreateDemandForm />
      </div>
      </div>
   </div>
  );
}
