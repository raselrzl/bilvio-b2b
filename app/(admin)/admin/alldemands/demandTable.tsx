"use client";

import { useState } from "react";
import { Demand } from "./page";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { deleteDemandAction, updateDemandStatusAction } from "@/app/actions";
import { toast } from "sonner";
import DemandActionDialog from "./DemandActionDialog";

export default function DemandsTableClient({ demands }: { demands: Demand[] }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Demands</h1>

      <div className="rounded-md border shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-3 text-left font-medium">ID</th>
              <th className="p-3 text-left font-medium">Make</th>
              <th className="p-3 text-left font-medium">Year</th>
              <th className="p-3 text-left font-medium">Price Range</th>
              <th className="p-3 text-left font-medium">Demand</th>
              <th className="p-3 text-left font-medium">Status</th>
              <th className="p-3 text-left font-medium">Created By</th>
              <th className="p-3 text-left font-medium">Notes</th>
              <th className="p-3 text-center font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {demands.map((d, index) => (
              <tr
                key={d.id}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } border-b hover:bg-gray-100 transition`}
              >
                <td className="p-3">{d.id}</td>
                <td className="p-3">{d.make ?? "-"}</td>
                <td className="p-3">{d.modelYear ?? "-"}</td>
                <td className="p-3">
                  {d.priceFrom ?? "-"} – {d.priceTo ?? "-"}
                </td>
                <td className="p-3">{d.demand ?? "-"}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      d.status === "SAVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {d.status}
                  </span>
                </td>

                <td className="p-3">
                  {d.createdBy.firstName} {d.createdBy.lastName} <br />
                  <span className="text-xs text-gray-500">
                    {d.createdBy.email}
                  </span>
                </td>

                <td className="p-3">
                  {d.notes.length === 0 && (
                    <span className="text-gray-400 text-sm">No notes</span>
                  )}

                  {d.notes.map((n) => (
                    <div
                      key={n.id}
                      className="text-sm border-b border-gray-200 pb-1 mb-1"
                    >
                      <strong>
                        {n.user.firstName} {n.user.lastName}:
                      </strong>{" "}
                      {n.note}
                    </div>
                  ))}
                </td>

                <td className="p-3 text-center">
                  <ActionsDropdown demand={d} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Dropdown Component using Schadcn UI
export function ActionsDropdown({ demand }: { demand: Demand }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 rounded-xs hover:bg-gray-200 border"
        >
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">

        <DropdownMenuItem
          onClick={() => console.log("Update form coming")}
          className="cursor-pointer"
        >
          Update
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer text-red-600">
          <DemandActionDialog
            demandId={demand.id}
            action="DELETE"
            label="Delete"
            color="red"
          />
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <DemandActionDialog
            demandId={demand.id}
            action="DRAFT"
            label="Mark as Draft"
            color="blue"
          />
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="cursor-pointer">
          <DemandActionDialog
            demandId={demand.id}
            action="SAVED"
            label="Mark as Saved"
            color="green"
          />
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}

