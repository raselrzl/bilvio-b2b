"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { User } from "./page";

export default function UsersTableClient({ users }: { users: User[] }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left border">ID</th>
              <th className="p-3 text-left border">Name</th>
              <th className="p-3 text-left border">Email</th>
              <th className="p-3 text-left border">Company</th>
              <th className="p-3 text-left border">User Type</th>
              <th className="p-3 text-left border">Approval Status</th>
              <th className="p-3 text-left border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="p-3 border">{u.id}</td>
                <td className="p-3 border">{u.firstName ?? ""} {u.lastName ?? ""}</td>
                <td className="p-3 border">{u.email}</td>
                <td className="p-3 border">{u.companyName ?? "-"}</td>
                <td className="p-3 border">{u.userType}</td>
                <td className="p-3 border">{u.approvalStatus}</td>
                <td className="p-3 border text-center">
                  <ActionsDropdown user={u} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Dropdown using Schadcn UI
function ActionsDropdown({ user }: { user: User }) {
  const handleDelete = () => console.log("Delete user:", user.id);
  const handleUpdateStatus = (status: User["approvalStatus"]) =>
    console.log("Update status:", user.id, status);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="More Options">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuItem onClick={() => handleUpdateStatus("APPROVED")}>
          Approve
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleUpdateStatus("REJECTED")}>
          Reject
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleUpdateStatus("ACTIVE")}>
          Activate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleUpdateStatus("INACTIVE")}>
          Deactivate
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
