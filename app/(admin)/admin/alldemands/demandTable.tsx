"use client";

import { useState } from "react";
import { Demand } from "./page";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";

export default function DemandsTableClient({ demands }: { demands: Demand[] }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Demands</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border">ID</th>
              <th className="p-3 text-left border">Make</th>
              <th className="p-3 text-left border">Year</th>
              <th className="p-3 text-left border">Price Range</th>
              <th className="p-3 text-left border">Demand</th>
              <th className="p-3 text-left border">Status</th>
              <th className="p-3 text-left border">Created By</th>
              <th className="p-3 text-left border">Notes</th>
              <th className="p-3 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {demands.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50">
                <td className="p-3 border">{d.id}</td>
                <td className="p-3 border">{d.make ?? "-"}</td>
                <td className="p-3 border">{d.modelYear ?? "-"}</td>
                <td className="p-3 border">{d.priceFrom ?? "-"} - {d.priceTo ?? "-"}</td>
                <td className="p-3 border">{d.demand ?? "-"}</td>
                <td className="p-3 border">{d.status}</td>
                <td className="p-3 border">
                  {d.createdBy.firstName ?? ""} {d.createdBy.lastName ?? ""} ({d.createdBy.email})
                </td>
                <td className="p-3 border">
                  {d.notes.map((n) => (
                    <div key={n.id} className="text-sm border-b border-gray-100 pb-1 mb-1">
                      {n.user.firstName ?? ""} {n.user.lastName ?? ""}: {n.note}
                    </div>
                  ))}
                </td>
                <td className="p-3 border text-center">
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
function ActionsDropdown({ demand }: { demand: Demand }) {
  const handleDelete = () => console.log("Delete", demand.id);
  const handleUpdate = () => console.log("Update", demand.id);
  const handleStatusUpdate = (status: "DRAFT" | "SAVED") => console.log("Update status", demand.id, status);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="More Options">
              <MoreHorizontalIcon />
            </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem onClick={handleUpdate}>Update</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          Delete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusUpdate("DRAFT")}>
          Mark as Draft
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusUpdate("SAVED")}>
          Mark as Saved
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
