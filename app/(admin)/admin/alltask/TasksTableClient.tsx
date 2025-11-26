"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import { Task } from "./page";

export default function TasksTableClient({ tasks }: { tasks: Task[] }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Tasks</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left">ID</th>
              <th className="p-3 border text-left">Task Type</th>
              <th className="p-3 border text-left">Car Type</th>
              <th className="p-3 border text-left">Make/Model</th>
              <th className="p-3 border text-left">Order Number</th>
              <th className="p-3 border text-left">Assigned User</th>
              <th className="p-3 border text-left">Deadline</th>
              <th className="p-3 border text-left">Status</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t) => (
              <tr key={t.id} className="hover:bg-gray-50">
                <td className="p-3 border">{t.id}</td>
                <td className="p-3 border">{t.taskType}</td>
                <td className="p-3 border">{t.type}</td>
                <td className="p-3 border">{t.makeModel}</td>
                <td className="p-3 border">{t.orderNumber}</td>
                <td className="p-3 border">
                  {t.assignedUser
                    ? `${t.assignedUser.firstName} ${t.assignedUser.lastName} (${t.assignedUser.email})`
                    : "-"}
                </td>
                <td className="p-3 border">{new Date(t.deadline).toLocaleDateString()}</td>
                <td className="p-3 border">{t.status}</td>
                <td className="p-3 border text-center">
                  <ActionsDropdown task={t} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Actions Dropdown
function ActionsDropdown({ task }: { task: Task }) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => console.log("Delete task", task.id);
  const handleUpdate = () => console.log("Update task", task.id);
  const handleStatusUpdate = (status: Task["status"]) =>
    console.log("Update status", task.id, status);

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
        <DropdownMenuItem onClick={() => handleStatusUpdate("TODO")}>Mark TODO</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusUpdate("DONE")}>Mark DONE</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusUpdate("REJECTED")}>Mark REJECTED</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusUpdate("WAITING")}>Mark WAITING</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusUpdate("SCHEDULED")}>Mark SCHEDULED</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleStatusUpdate("CANCELLED")}>Mark CANCELLED</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
