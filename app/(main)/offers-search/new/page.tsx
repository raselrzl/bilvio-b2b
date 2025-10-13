import OffersFilterForm from "./OffersSearchNewCar";
import OffersSearchNewCar from "./OffersSearchNewCar";

export const metadata = { title: "OffersSearchNewCar • Bilvio" };

// Dummy product generator
// utils/generateDummyOffers.ts

export function generateDummyOffers(count: number) {
  const carNames = [
    "Toyota Corolla",
    "Honda Civic",
    "BMW 3 Series",
    "Audi A4",
    "Mercedes C-Class",
    "Mazda 3",
    "Volkswagen Golf",
    "Hyundai Elantra",
    "Kia Ceed",
  ];

  const fuels = ["Petrol", "Diesel", "Hybrid", "Electric"];
  const types = ["Interesting", "Not Interesting", "Later", "Super"];
  const stockStatus = ["In Stock", "Out of Stock"];
  const colours = ["Red", "Blue", "Black", "White", "Silver", "Gray", "Green"];
  const availability = ["Immediately", "Later"];
  const gearboxOptions = ["Automatic", "Manual"];
  const trimLevels = ["Essential", "Comfort", "Premium", "Luxury", "Sport"];
  const engineSizes = ["1.0", "1.2", "1.4", "1.5", "1.6", "2.0"];
  const horsepowerRange = [70, 90, 110, 130, 150, 180, 200];

  const now = Date.now();

  return Array.from({ length: count }).map((_, i) => {
    const random = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
    const randomNumber = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const engineSize = random(engineSizes);
    const hp = random(horsepowerRange);
    const fuel = random(fuels);

    return {
      id: i + 1,
      name: random(carNames),
      gearbox: random(gearboxOptions),
      fuel,
      price: randomNumber(8000, 75000),
      offerNumber: `OFF-${1000 + i}`,
      createdAt: new Date(
        now - randomNumber(1000000000, 10000000000)
      ).toISOString(),
      discount: randomNumber(5, 25),
      type: random(types),
      stock: random(stockStatus),
      colour: random(colours),
      quantity: randomNumber(1, 20),
      mileage: randomNumber(5000, 200000),
      firstRegistration: new Date(
        now - randomNumber(31536000000, 31536000000 * 10)
      ).toISOString(),
      availability: random(availability),
      trim: random(trimLevels),
      engineSpec: `${engineSize} ${fuel} ${hp} HP`,
      vat: randomNumber(0, 25), // VAT percentage
      transportCost: randomNumber(4000, 12000), // SEK NET
    };
  });
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
