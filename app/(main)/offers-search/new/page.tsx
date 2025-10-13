import OffersFilterForm from "./OffersSearchNewCar";
import OffersSearchNewCar from "./OffersSearchNewCar";

export const metadata = { title: "OffersSearchNewCar • Bilvio" };

// Dummy product generator
function generateDummyOffers(count: number) {
  const carNames = ["Toyota Corolla", "Honda Civic", "BMW 3 Series", "Audi A4"];
  const fuels = ["Petrol", "Diesel", "Hybrid", "Electric"];
  const types = ["Interesting", "Not Interesting", "Later", "Super"];
  const stockStatus = ["In Stock", "Out of Stock"];
  const colours = ["Red", "Blue", "Black", "White", "Silver", "Green"];
  const availability = ["Immediately", "Later"];

  return Array.from({ length: count }).map((_, i) => ({
    id: i + 1,
    name: carNames[Math.floor(Math.random() * carNames.length)],
    gearbox: Math.random() > 0.5 ? "Automatic" : "Manual",
    fuel: fuels[Math.floor(Math.random() * fuels.length)],
    price: Math.floor(Math.random() * 50000) + 5000,
    offerNumber: `OFF-${1000 + i}`,
    createdAt: new Date(
      Date.now() - Math.floor(Math.random() * 10000000000)
    ).toISOString(),
    discount: Math.floor(Math.random() * 30),
    type: types[Math.floor(Math.random() * types.length)],
    stock: stockStatus[Math.floor(Math.random() * stockStatus.length)],
    colour: colours[Math.floor(Math.random() * colours.length)],
    quantity: Math.floor(Math.random() * 20) + 1,
    mileage: Math.floor(Math.random() * 200000), // in km
    firstRegistration: new Date(
      Date.now() - Math.floor(Math.random() * 31536000000 * 10)
    ).toISOString(), // up to 10 years old
    availability: availability[Math.floor(Math.random() * availability.length)],
  }));
}


export default function OffersSearchNewCarServer() {
  const products = generateDummyOffers(20); // generate 20 random offers

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between px-2 2xl:px-2 mt-6">
        <h1 className="text-2xl md:text-3xl font-extrabold">Offers Search</h1>
      </div>

      <div className="mt-6">
        <OffersFilterForm initialOffers={products} />
      </div>
    </div>
  );
}
