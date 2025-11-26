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
        <DropdownMenuItem onClick={() => handleUpdateStatus("APPROVED")}>Approve</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleUpdateStatus("REJECTED")}>Reject</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleUpdateStatus("ACTIVE")}>Activate</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleUpdateStatus("INACTIVE")}>Deactivate</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} className="text-red-600">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// View Details Modal
function ViewDetailsButton({ user }: { user: User }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">View Details</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90%] max-w-4xl -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg overflow-auto max-h-[80vh]">
          <Dialog.Title className="text-xl font-bold mb-4">User Details</Dialog.Title>
          <div className="space-y-4 text-sm">
            <div><strong>Name:</strong> {user.firstName ?? ""} {user.lastName ?? ""}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Company:</strong> {user.companyName ?? "-"}</div>
            <div><strong>Phone:</strong> {user.phone ?? "-"}</div>
            <div><strong>Address:</strong> {user.street}, {user.city}, {user.country}, {user.zipCode}</div>
            <div><strong>User Type:</strong> {user.userType}</div>
            <div><strong>Approval Status:</strong> {user.approvalStatus}</div>
            <div><strong>Intent:</strong> {user.intent ?? "None"}</div>
            <div><strong>Uploaded Documents:</strong> {user.uploadedDocuments ?? "None"}</div>

            {/* Orders */}
            <div>
              <strong>Orders:</strong>
              {user.orders.length > 0 ? (
                <ul className="ml-4 list-disc">
                  {user.orders.map(o => (
                    <li key={o.id}>{o.orderNumber} - Status: {o.status}</li>
                  ))}
                </ul>
              ) : " None"}
            </div>

            {/* Tasks */}
            <div>
              <strong>Tasks:</strong>
              {user.tasks.length > 0 ? (
                <ul className="ml-4 list-disc">
                  {user.tasks.map(t => (
                    <li key={t.id}>{t.taskType} - {t.status}</li>
                  ))}
                </ul>
              ) : " None"}
            </div>

            {/* Bank Accounts */}
            <div>
              <strong>Bank Accounts:</strong>
              {user.bankAccounts.length > 0 ? (
                <ul className="ml-4 list-disc">
                  {user.bankAccounts.map(b => (
                    <li key={b.id}>{b.bankName} - {b.iban} {b.isMain && "(Main)"}</li>
                  ))}
                </ul>
              ) : " None"}
            </div>

            {/* Warehouses */}
            <div>
              <strong>Warehouses:</strong>
              {user.warehouses.length > 0 ? (
                <ul className="ml-4 list-disc">
                  {user.warehouses.map(w => (
                    <li key={w.id}>
                      {w.name} - {w.address}
                      {w.openingHours && w.openingHours.length > 0 && (
                        <ul className="ml-4 list-decimal">
                          {w.openingHours.map(h => (
                            <li key={h.day}>{h.day}: {h.open ? `${h.from} - ${h.to}` : "Closed"}</li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              ) : " None"}
            </div>

            {/* Demands */}
            <div>
              <strong>Demands:</strong>
              {user.demands.length > 0 ? (
                <ul className="ml-4 list-disc">
                  {user.demands.map(d => (
                    <li key={d.id}>{d.make ?? "-"} {d.gearbox ?? "-"} {d.fuel ?? "-"} - Status: {d.status ?? "-"}</li>
                  ))}
                </ul>
              ) : " None"}
            </div>

            {/* Products */}
            <div>
              <strong>Products:</strong>
              {user.products.length > 0 ? (
                <ul className="ml-4 list-disc">
                  {user.products.map(p => (
                    <li key={p.id}>{p.name} - {p.offerNumber}</li>
                  ))}
                </ul>
              ) : " None"}
            </div>

            {/* Product Notes */}
            <div>
              <strong>Product Notes:</strong>
              {user.productNotes.length > 0 ? (
                <ul className="ml-4 list-disc">
                  {user.productNotes.map(n => (
                    <li key={n.id}>ProductID: {n.productId} - {n.note}</li>
                  ))}
                </ul>
              ) : " None"}
            </div>

            {/* Reactions */}
            <div>
              <strong>Reactions:</strong>
              {user.reactions.length > 0 ? (
                <ul className="ml-4 list-disc">
                  {user.reactions.map(r => (
                    <li key={r.id}>ProductID: {r.productId} - {r.reaction}</li>
                  ))}
                </ul>
              ) : " None"}
            </div>

            {/* Messages */}
            <div>
              <strong>Messages:</strong>
              {user.messages.length > 0 ? (
                <ul className="ml-4 list-disc">
                  {user.messages.map(m => (
                    <li key={m.id}>{m.message}</li>
                  ))}
                </ul>
              ) : " None"}
            </div>

            {/* Company Settings */}
            <div>
              <strong>Company Settings:</strong>
              {user.companySettings ? (
                <ul className="ml-4 list-disc">
                  <li>Only Cars With PDI: {user.companySettings.onlyCarsWithPDI ?? "-"}</li>
                  <li>Accept Registration: {user.companySettings.iAcceptRegistration ?? "-"}</li>
                  <li>Accept Warranty: {user.companySettings.iAcceptWarranty ?? "-"}</li>
                  <li>COC New Cars: {user.companySettings.cocNewCars ?? "-"}</li>
                  <li>COC Used Cars: {user.companySettings.cocUsedCars ?? "-"}</li>
                  <li>Document Address: {user.companySettings.documentAddress ?? "-"}</li>
                </ul>
              ) : " None"}
            </div>
          </div>

          <Dialog.Close asChild>
            <Button className="mt-4 w-full">Close</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
