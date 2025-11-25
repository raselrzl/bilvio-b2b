import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { prisma } from "@/app/utils/db";
import { cookies } from "next/headers";

export default async function BankAccountSettingsPage() {
  // Get logged-in user email from cookie
  const jar = await cookies();
  const userEmail = jar.get("bilvio_session")?.value;

  if (!userEmail) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-600 font-bold">You must be logged in to see your bank accounts.</p>
        <Link href="/login">
          <Button className="mt-4">Login</Button>
        </Link>
      </div>
    );
  }

  // Fetch user
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  if (!user) {
    return (
      <div className="text-center mt-20">
        <p className="text-red-600 font-bold">User not found.</p>
      </div>
    );
  }

  // Fetch only this user's bank accounts
  const bankAccounts = await prisma.bankAccount.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Heading + Button */}
      <div className="flex items-center justify-between px-6 2xl:px-0 mt-8">
        <h1 className="text-2xl md:text-3xl font-extrabold">Bank Account</h1>

        <Link href="/settings/bankaccount/createbankaccount">
          <Button className="rounded-xs inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white cursor-pointer">
            <span>+ Create bank account</span>
          </Button>
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-white border shadow-xs m-6">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-white">
            <tr className="text-left">
              <th className="py-2 px-3 border border-gray-950/10">
                Bank Account Number (IBAN)
              </th>
              <th className="py-2 px-3 border border-gray-950/10">
                Swift/BIC Code
              </th>
              <th className="py-2 px-3 border border-gray-950/10">
                Main Account
              </th>
              <th className="py-2 px-3 border border-gray-950/10">Action</th>
            </tr>
          </thead>

          <tbody className="bg-gray-200">
            {bankAccounts.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-3 border border-gray-950/10">{item.iban}</td>
                <td className="py-2 px-3 border border-gray-950/10">{item.swift}</td>
                <td className="py-2 px-3 border border-gray-950/10">
                  {item.isMain ? "Yes" : "No"}
                </td>
                <td className="py-2 px-3 border border-gray-950/10">
                  <Link
                    href={`/settings/bankaccount/${item.id}`}
                    className="flex items-center gap-1 bg-gray-600 rounded-xs text-white p-1 hover:text-gray-500 text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
            {bankAccounts.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-4 text-gray-600 border border-gray-950/10"
                >
                  No bank accounts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
