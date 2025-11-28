"use client";

import * as Dialog from "@radix-ui/react-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { deleteUserAction, updateApprovalStatusAction, updateUserTypeAction } from "@/app/actions";
import { useTransition } from "react";
import UserActionDialog from "./UserActionDialog";

export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  companyName?: string;
  phone?: string;
  street: string;
  city: string;
  country: string;
  zipCode: string;
  userType: "USER" | "ADMIN" | "SUPERADMIN";
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "INACTIVE";
  intent?: "SALES" | "PURCHASES";

  orders: { id: string; orderNumber: string; status: string }[];
  tasks: { id: string; taskType: string; status: string }[];
  bankAccounts: { id: string; bankName: string; iban: string; isMain: boolean }[];
  warehouses: { id: string; name: string; address: string; openingHours?: any[] }[];
  demands: { id: string; make?: string; gearbox?: string; fuel?: string; status?: string }[];
  products: { id: string; name: string; offerNumber: string }[];
  messages: { id: string; message: string }[];
  productNotes: { id: string; productId: string; note: string }[];
  reactions: { id: string; productId: string; reaction: string }[];
  companySettings?: {
    onlyCarsWithPDI?: string;
    iAcceptRegistration?: string;
    iAcceptWarranty?: string;
    cocNewCars?: string;
    cocUsedCars?: string;
    documentAddress?: string;
  };
  uploadedDocuments?: string;
}

export default function UsersTableClient({ users }: { users: User[] }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">ID</th>
              <th className="p-3 border text-left">Name</th>
              <th className="p-3 border text-left">Email</th>
              <th className="p-3 border text-left">Company</th>
              <th className="p-3 border text-left">User Type</th>
              <th className="p-3 border text-left">Approval Status</th>
              <th className="p-3 border text-left">Orders</th>
              <th className="p-3 border text-left">Tasks</th>
              <th className="p-3 border text-left">Bank Accounts</th>
              <th className="p-3 border text-center">Actions</th>
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
                <td className="p-3 border">{u.orders.length}</td>
                <td className="p-3 border">{u.tasks.length}</td>
                <td className="p-3 border">{u.bankAccounts.length}</td>
                <td className="p-3 border text-center flex flex-col items-center gap-2">
                  <ActionsDropdown user={u} />
                  <ViewDetailsButton user={u} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Dropdown Actions
export function ActionsDropdown({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 m-1 rounded-xs cursor-pointer">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48 rounded-xs" align="end">
        {/* USER TYPE */}
        <DropdownMenuItem asChild>
          <UserActionDialog userId={user.id} action="USER" label="Set as USER" color="blue"/>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <UserActionDialog userId={user.id} action="ADMIN" label="Set as ADMIN" color="blue" />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <UserActionDialog userId={user.id} action="SUPERADMIN" label="Set as SUPERADMIN" color="blue" />
        </DropdownMenuItem>

        <div className="border-t my-1" />

        {/* APPROVAL STATUS */}
        <DropdownMenuItem asChild>
          <UserActionDialog userId={user.id} action="APPROVED" label="Approve" color="green" />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <UserActionDialog userId={user.id} action="REJECTED" label="Reject" color="red" />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <UserActionDialog userId={user.id} action="ACTIVE" label="Activate" color="green" />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <UserActionDialog userId={user.id} action="INACTIVE" label="Deactivate" color="red" />
        </DropdownMenuItem>

        <div className="border-t my-1" />

        {/* DELETE USER */}
        <DropdownMenuItem asChild>
          <UserActionDialog userId={user.id} action="DELETE" label="Delete User" color="red" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// View Details Modal
function ViewDetailsButton({ user }: { user: User }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 px-3 py-1 text-sm bg-amber-600 text-white hover:bg-amber-700 rounded-none cursor-pointer"
        >
          View Details
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-4xl -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg overflow-auto max-h-[80vh] text-sm">
          <Dialog.Title className="text-lg font-semibold mb-4">User Details</Dialog.Title>

          <div className="grid grid-cols-1 gap-3">
            <DetailRow label="Name" value={`${user.firstName ?? ""} ${user.lastName ?? ""}`} />
            <DetailRow label="Email" value={user.email} />
            <DetailRow label="Company" value={user.companyName ?? "-"} />
            <DetailRow label="Phone" value={user.phone ?? "-"} />
            <DetailRow
              label="Address"
              value={`${user.street}, ${user.city}, ${user.country}, ${user.zipCode}`}
            />
            <DetailRow label="User Type" value={user.userType} />
            <DetailRow label="Approval Status" value={user.approvalStatus} />
            <DetailRow label="Intent" value={user.intent ?? "None"} />
            <DetailRow label="Uploaded Documents" value={user.uploadedDocuments ?? "None"} />

            {/* Orders */}
            <DetailList label="Orders" items={user.orders.map(o => `${o.orderNumber} - ${o.status}`)} />
            {/* Tasks */}
            <DetailList label="Tasks" items={user.tasks.map(t => `${t.taskType} - ${t.status}`)} />
            {/* Bank Accounts */}
            <DetailList
              label="Bank Accounts"
              items={user.bankAccounts.map(b => `${b.bankName} - ${b.iban} ${b.isMain ? "(Main)" : ""}`)}
            />
            {/* Warehouses */}
            <DetailList
              label="Warehouses"
              items={user.warehouses.map(
                w =>
                  `${w.name} - ${w.address}${
                    w.openingHours && w.openingHours.length > 0
                      ? " (" + w.openingHours.map(h => `${h.day}: ${h.open ? `${h.from} - ${h.to}` : "Closed"}`).join(", ") + ")"
                      : ""
                  }`
              )}
            />
            {/* Demands */}
            <DetailList
              label="Demands"
              items={user.demands.map(d => `${d.make ?? "-"} ${d.gearbox ?? "-"} ${d.fuel ?? "-"} - ${d.status ?? "-"}`)}
            />
            {/* Products */}
            <DetailList label="Products" items={user.products.map(p => `${p.name} - ${p.offerNumber}`)} />
            {/* Product Notes */}
            <DetailList label="Product Notes" items={user.productNotes.map(n => `ProductID: ${n.productId} - ${n.note}`)} />
            {/* Reactions */}
            <DetailList label="Reactions" items={user.reactions.map(r => `ProductID: ${r.productId} - ${r.reaction}`)} />
            {/* Messages */}
            <DetailList label="Messages" items={user.messages.map(m => m.message)} />
            {/* Company Settings */}
            {user.companySettings ? (
              <DetailList
                label="Company Settings"
                items={[
                  `Only Cars With PDI: ${user.companySettings.onlyCarsWithPDI ?? "-"}`,
                  `Accept Registration: ${user.companySettings.iAcceptRegistration ?? "-"}`,
                  `Accept Warranty: ${user.companySettings.iAcceptWarranty ?? "-"}`,
                  `COC New Cars: ${user.companySettings.cocNewCars ?? "-"}`,
                  `COC Used Cars: ${user.companySettings.cocUsedCars ?? "-"}`,
                  `Document Address: ${user.companySettings.documentAddress ?? "-"}`,
                ]}
              />
            ) : null}
          </div>

          <Dialog.Close asChild>
            <Button className="mt-4 w-full bg-amber-600 text-white hover:bg-amber-700 rounded-none text-sm">
              Close
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

// Small helper components for consistent table-like design
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b py-1">
      <span className="font-medium text-gray-600">{label}:</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}

function DetailList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="py-1">
      <span className="font-medium text-gray-600">{label}:</span>
      {items.length > 0 ? (
        <ul className="ml-4 list-disc text-gray-800">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ) : (
        <span className="ml-1 text-gray-800">None</span>
      )}
    </div>
  );
}

