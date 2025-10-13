import OffersFilterForm from "./OffersSearchNewCar";

export const metadata = { title: "OffersSearchNewCar • Bilvio" };

// Dummy product generator

/* export function generateDummyOffers(count: number) {
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
} */
export const offers = [
  {
    id: 1111111111,
    name: "Toyota Corolla",
    gearbox: "Automatic",
    fuel: "Petrol",
    price: 22000,
    offerNumber: "OFF-1001",
    createdAt: "2023-07-15T10:12:00.000Z",
    discount: 10,
    type: "Interesting",
    stock: "In Stock",
    colour: "Silver",
    quantity: 5,
    mileage: 45000,
    firstRegistration: "2020-03-20T00:00:00.000Z",
    availability: "Immediately",
    trim: "Comfort",
    engineSpec: "1.5 Petrol 130 HP",
    vat: 15,
    transportCost: 6000,
    productionYear: 2020,
  },
  {
    id: 222222222222,
    name: "Honda Civic",
    gearbox: "Manual",
    fuel: "Diesel",
    price: 19500,
    offerNumber: "OFF-1002",
    createdAt: "2023-03-11T15:40:00.000Z",
    discount: 8,
    type: "Later",
    stock: "In Stock",
    colour: "Blue",
    quantity: 3,
    mileage: 58000,
    firstRegistration: "2019-09-18T00:00:00.000Z",
    availability: "Later",
    trim: "Essential",
    engineSpec: "1.6 Diesel 120 HP",
    vat: 20,
    transportCost: 5500,
    productionYear: 2019,
  },
  {
    id: 33333333333333,
    name: "BMW 3 Series",
    gearbox: "Automatic",
    fuel: "Hybrid",
    price: 38500,
    offerNumber: "OFF-1003",
    createdAt: "2023-09-01T08:22:00.000Z",
    discount: 12,
    type: "Super",
    stock: "In Stock",
    colour: "Black",
    quantity: 2,
    mileage: 30000,
    firstRegistration: "2021-02-10T00:00:00.000Z",
    availability: "Immediately",
    trim: "Luxury",
    engineSpec: "2.0 Hybrid 180 HP",
    vat: 25,
    transportCost: 9000,
    productionYear: 2021,
  },
];

export default function OffersSearchNewCarServer() {
  const products = offers; // generate 20 random offers

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
