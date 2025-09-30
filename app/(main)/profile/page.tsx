import { prisma } from "@/app/utils/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata = { title: "Profile • Bilvio" };

export default async function Profile() {
  const jar = await cookies();
  const email = jar.get("bilvio_session")?.value ?? "";
  if (!email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      email: true,
      phone: true,
      companyName: true,
      taxNumber: true,
      street: true,
      zipCode: true,
      city: true,
      country: true,
      // firstName: true,
      // lastName: true,
      // companySiteUrl: true,
    },
  });

  if (!user) redirect("/login?error=notfound");

  const dash = (v?: string | null) => (v && v.trim() ? v : "—");

  const countryKey = (user.country ?? "").trim().toLowerCase();
  // 1) Add this derived currency (right after `const dash = ...`)
  const currency = (() => {
    const map: Record<string, string> = {
      // Sweden
      sweden: "SEK",
      sverige: "SEK",

      // Norway
      norway: "NOK",
      norge: "NOK",
      norwegen: "NOK",

      // Finland
      finland: "EUR",
      suomi: "EUR",

      // Germany
      germany: "EUR",
      deutschland: "EUR",
    };
    return map[countryKey] ?? "—";
  })();

  const userRows: Array<{ label: string; value: string }> = [
    { label: "First name", value: "—" /* dash(user.firstName) */ },
    { label: "Last name", value: "—" /* dash(user.lastName) */ },
    { label: "Email", value: dash(user.email) },
    { label: "Phone number", value: dash(user.phone) },
  ];

  const companyRows: Array<{ label: string; value: string }> = [
    { label: "Company name", value: dash(user.companyName) },
    { label: "Tax number", value: dash(user.taxNumber) },
    { label: "Street", value: dash(user.street) },
    { label: "Post code", value: dash(user.zipCode) },
    { label: "City", value: dash(user.city) },
    { label: "Country", value: dash(user.country) },
    { label: "Currency", value: currency }, // ← here
    { label: "Company site URL", value: "—" /* dash(user.companySiteUrl) */ },
  ];

  return (
    <section className="max-w-7xl mx-auto w-full">
      {/* Title outside tables */}
      <h1 className="text-2xl md:text-3xl font-extrabold m-4">Profile</h1>

      {/* Responsive gutter so borders remain visible beside collapsed drawer */}
      <div className="mx-2 sm:mx-4 md:mx-6">
        <div className="bg-white border border-gray-200 shadow-sm isolate">
          {/* USER DATA */}
          <h2 className="bg-white px-4 py-3 text-xl font-bold">User Data</h2>

          <div className="overflow-x-auto p-4 text-sm">
            <table className="w-full table-fixed">
              <tbody>
                {userRows.map((row, idx) => (
                  <tr
                    key={row.label}
                    className={
                      idx % 2
                        ? "bg-white"
                        : "bg-gray-100 border-y border-gray-200 "
                    }
                  >
                    <td className="w-1/2 px-4 py-0 h-9 align-middle whitespace-nowrap">
                      {row.label}
                    </td>
                    <td className="w-1/2 px-4 py-0 h-9 align-middle truncate">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* COMPANY DATA */}
          <h2 className="bg-white px-4 py-3 text-xl font-bold">Company Data</h2>

          <div className="overflow-x-auto p-4 text-sm">
            <table className="w-full table-fixed">
              <tbody>
                {companyRows.map((row, idx) => (
                  <tr
                    key={row.label}
                    className={
                      idx % 2
                        ? "bg-white"
                        : "bg-gray-100 border-y border-gray-200 "
                    }
                  >
                    <td className="w-1/2 px-4 py-0 h-9 align-middle whitespace-nowrap">
                      {row.label}
                    </td>
                    <td className="w-1/2 px-4 py-0 h-9 align-middle truncate">
                      {row.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="m-4 flex gap-3">
            <button
              type="button"
              className="bg-green-600 text-white px-3 py-1 rounded-xs cursor-pointer hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500  text-sm sm:text-base text-center"
              aria-label="Edit profile"
            >
              Edit Profile
            </button>

            <button
              type="button"
              className="bg-green-600 text-white px-3 py-1 rounded-xs cursor-pointer hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500  text-sm sm:text-base text-center"
              aria-label="Change password"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
