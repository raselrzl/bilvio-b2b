"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface User {
  id: string;
  email: string;
  UserID: string | null;
  firstName: string | null;
  lastName: string | null;
  approvalStatus: string;
  createdAt: string;
}

export default function UserFilterForm({
  initialUsers,
  onFilterChange,
  resetText = "Clear Filters",
}: {
  initialUsers: User[];
  onFilterChange?: (filters: any) => void;
  resetText?: string;
}) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | undefined>();
  const [showing, setShowing] = useState<number>(10);

  // 🔹 Filtering logic
  useEffect(() => {
    let filtered = [...initialUsers];

    if (email)
      filtered = filtered.filter((u) =>
        u.email.toLowerCase().includes(email.toLowerCase())
      );

    if (status)
      filtered = filtered.filter(
        (u) => u.approvalStatus.toLowerCase() === status.toLowerCase()
      );

    if (sortOrder)
      filtered.sort((a, b) =>
        sortOrder === "asc"
          ? a.createdAt.localeCompare(b.createdAt)
          : b.createdAt.localeCompare(a.createdAt)
      );

    setUsers(filtered.slice(0, showing));
  }, [email, status, sortOrder, showing, initialUsers]);

  const handleReset = () => {
    setEmail("");
    setStatus(undefined);
    setSortOrder(undefined);
    setShowing(10);
    setUsers(initialUsers);
  };

  const inputClass = (value: string | undefined) =>
    `h-9 w-full rounded-xs bg-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-0 ${
      value ? "bg-[#619aab] text-white placeholder-white" : ""
    }`;

  const selectClass = (value: string | undefined) =>
    `h-9 w-full rounded-xs bg-white focus:outline-none focus:ring-0 focus:border-0 ${
      value ? "bg-[#619aab] text-white" : ""
    }`;

  return (
    <div className="w-full max-w-7xl space-y-4">
      {/* 🔹 Filter Section */}
      <form className="space-y-4 mt-6 px-0 2xl:px-2">
        {/* Row 1: Email + Status + Clear */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2 items-end mt-4 py-4 px-2 sm:px-4 md:px-6 bg-gray-500 max-w-[100%] lg:max-w-[1500px]">
          <div>
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass(email)}
            />
          </div>

          <div>
            <Select value={status} onValueChange={(v) => setStatus(v)}>
              <SelectTrigger className={selectClass(status)}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="APPROVED">Approved</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="hidden lg:block" />
          <div className="hidden lg:block" />
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              className="rounded-xs max-w-[120px] cursor-pointer"
              onClick={handleReset}
            >
              <X className="h-4 w-4 mr-2" /> {resetText}
            </Button>
          </div>
        </div>

        {/* Row 2: Sort & Show */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2 items-end mx-2 lg:mx-0">
          <div className="mx-2 2xl:mx-0">
            <Select
              value={sortOrder}
              onValueChange={(v) => setSortOrder(v as "asc" | "desc")}
            >
              <SelectTrigger className={selectClass(sortOrder)}>
                <SelectValue placeholder="Sort order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Select
              value={String(showing)}
              onValueChange={(v) => setShowing(Number(v))}
            >
              <SelectTrigger className={selectClass(String(showing))}>
                <SelectValue placeholder="Show entries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Show 10</SelectItem>
                <SelectItem value="25">Show 25</SelectItem>
                <SelectItem value="50">Show 50</SelectItem>
                <SelectItem value="100">Show 100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-2 px-2 text-sm text-gray-700">
            Showing {users.length} of {initialUsers.length} users
          </div>
        </div>
      </form>

      {/* 🔹 User Table */}
      <div className="overflow-x-auto mt-6 border bg-gray-50 rounded-sm mx-2">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-white text-black uppercase border-b">
            <tr>
              <th className="px-4 py-2 text-left font-semibold border">ID</th>
              <th className="px-4 py-2 text-left font-semibold border">
                Status
              </th>
              <th className="px-4 py-2 text-left font-semibold border">
                Email
              </th>
              <th className="px-4 py-2 text-left font-semibold border">Name</th>
              <th className="px-4 py-2 text-left font-semibold border">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="border px-4 py-1 uppercase font-bold">
                    {user.UserID}
                  </td>
                  <td className="border px-4 py-1">{user.approvalStatus}</td>
                  <td className="border px-4 py-1">{user.email}</td>
                  <td className="border px-4 py-1">
                    {user.firstName} {user.lastName}
                  </td>
                  <td className="border px-4 py-1 cursor-pointer">
                    <Button variant="ghost" className="cursor-pointer">
                      ...
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="bg-amber-100 border text-center border-amber-300 shadow-sm p-4 text-amber-600"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-2 px-2 text-sm text-gray-700">
        Showing {users.length} of {initialUsers.length} users
      </div>
    </div>
  );
}
