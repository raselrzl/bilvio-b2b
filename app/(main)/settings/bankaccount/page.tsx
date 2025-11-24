import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, Pencil } from "lucide-react";

export default function BankAccountSettingsPage() {
  // temporary mock data
  const mockData = [
    {
      id: 1,
      iban: "SE45 5000 0000 0583 9825 7466",
      swift: "SWEDSESS",
      main: "Yes",
    },
  ];

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

          {/* BODY WITH GRAY BACKGROUND */}
          <tbody className="bg-gray-200">
            {mockData.map((item) => (
              <tr key={item.id}>
                <td className="py-2 px-3 border border-gray-950/10">
                  {item.iban}
                </td>
                <td className="py-2 px-3 border border-gray-950/10">
                  {item.swift}
                </td>
                <td className="py-2 px-3 border border-gray-950/10">
                  {item.main}
                </td>
                <td className="py-2 px-3 border border-gray-950/10">
                  <Link href="/settings/bankaccount/editbankaccount" className="flex items-center gap-1 bg-gray-600 rounded-xs text-white p-1 hover:text-gray-500 text-sm">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
