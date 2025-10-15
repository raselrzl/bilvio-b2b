import CreateDemandForm from "./CreateDemandForm";

export const metadata = { title: "Create • Bilvio" };

export default function CreateDemand() {
  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Header row: same horizontal padding as content below */}
      <div className="flex items-center justify-between px-2 sm:px-4 md:px-6 mt-4">
        <h1 className="text-2xl md:text-3xl font-extrabold ">Create Demands</h1>

      </div>

      {/* Content wrapper: matches the header’s px so right edge aligns with the button */}
      <div className="px-2 sm:px-4 md:px-6 mt-4">
        <div className="bg-white border shadow-sm p-4">
          <CreateDemandForm />
        </div>
      </div>
    </div>
  ); 
}
