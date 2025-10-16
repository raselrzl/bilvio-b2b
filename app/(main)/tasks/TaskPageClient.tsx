"use client";

import { useState, useEffect } from "react";
import TaskFilterForm from "./TaskFilterForm";
import { Task } from "./page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";

export default function TasksPageClient({
  initialTasks,
}: {
  initialTasks: Task[];
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filters, setFilters] = useState({});
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    const result = tasks.filter((task) => {
      const f: any = filters;

      const matchesStatus = !f.status || task.status === f.status;
      const matchesType = !f.type || task.type === f.type;
      const matchesTaskType =
        !f.taskType ||
        task.taskType.toLowerCase().includes(f.taskType.toLowerCase());
      const matchesMakeModel =
        !f.makeModel ||
        task.makeModel.toLowerCase().includes(f.makeModel.toLowerCase());
      const matchesOrderNumber =
        !f.orderNumber || task.orderNumber.includes(f.orderNumber);
      const matchesOrderPackageNumber =
        !f.orderPackageNumber ||
        (task.orderPackageNumber || "").includes(f.orderPackageNumber);
      const matchesTransportNumber =
        !f.transportNumber ||
        (task.transportNumber || "").includes(f.transportNumber);
      const matchesExpired =
        f.expired === undefined || task.expired === f.expired;
      const matchesDeadline = !f.deadline || task.deadline === f.deadline;

      return (
        matchesStatus &&
        matchesType &&
        matchesTaskType &&
        matchesMakeModel &&
        matchesOrderNumber &&
        matchesOrderPackageNumber &&
        matchesTransportNumber &&
        matchesExpired &&
        matchesDeadline
      );
    });
    setFilteredTasks(result);
  }, [filters, tasks]);

  return (
    <div className="max-w-7xl mx-auto w-full mt-4">
      {/* Header */}
      <div className="flex items-center justify-between px-2 sm:px-4 md:px-6 mt-4">
        <h1 className="text-2xl md:text-3xl font-extrabold">Tasks</h1>
      </div>

      {/* Filter Form */}
      <div className="mt-4 px-2 sm:px-4 md:px-6 bg-gray-500 max-w-[100%] lg:max-w-[1500px] mx-auto 2xl:mx-2">
        <div className="p-4">
          <TaskFilterForm onFilterChange={(f) => setFilters(f)} />
        </div>
      </div>

      {/* Task List */}
      <div className="px-2 sm:px-4 md:px-6 pt-4 bg-white mx-2">
        {filteredTasks.length === 0 ? (
          <div className="bg-amber-100 border border-amber-300 shadow-sm p-4 text-amber-600 flex items-center justify-center rounded">
            <p>Currently you don’t have any task to perform.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 mt-4">
            {filteredTasks.map((task) => {
              const status =
                typeof task.status === "string"
                  ? task.status.toLowerCase()
                  : "";

              const statusColor =
                status === "completed"
                  ? "bg-green-100 text-green-700"
                  : status === "in-progress"
                  ? "bg-blue-100 text-blue-700"
                  : status === "pending"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-gray-100 text-gray-700";

              return (
                <div
                  key={task.id}
                  className="relative border rounded-xs p-4 bg-white shadow hover:shadow-md transition"
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between">
                    <div>
                      <h1 className="text-lg font-bold capitalize">Task: {" "}
                        {task.taskType || "Task"}
                      </h1>
                      <p className="text-sm text-gray-600">
                        Task ID:{" "}
                        <span className="font-semibold">{task.id}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div
                        className={`px-3 py-1 rounded-xs text-xs font-semibold ${statusColor}`}
                      >
                        <strong>Status: </strong>{task.status}
                      </div>
                      <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded-xs text-xs font-semibold">
                        {task.type }{" "} <strong>Product</strong>
                      </div>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-700">
                    <div className="bg-gray-50 py-1 px-2 rounded-xs">
                      <strong>Make/Model:</strong> {task.makeModel || "-"}
                    </div>
                    <div className="bg-gray-50 py-1 px-2 rounded-xs">
                      <strong>Order No:</strong> {task.orderNumber}
                    </div>
                    <div className="bg-gray-50 py-1 px-2 rounded-xs">
                      <strong>Order Package:</strong>{" "}
                      {task.orderPackageNumber || "-"}
                    </div>
                    <div className="bg-gray-50 py-1 px-2 rounded-xs">
                      <strong>Transport No:</strong>{" "}
                      {task.transportNumber || "-"}
                    </div>
                    <div className="bg-gray-50 py-1 px-2 rounded-xs">
                      <strong>Deadline:</strong>{" "}
                      <span className="text-red-600 font-semibold">
                        {task.deadline}
                      </span>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="border-t border-gray-200 mt-4 pt-3 flex flex-wrap items-center justify-between gap-3">
                    {/* Left - Input */}
                 {/*    <div className="relative flex-1 max-w-sm">
                      <Input
                        type="text"
                        placeholder="Add a note..."
                        className="pl-10 pr-3 h-9 text-sm border-gray-300 rounded-xs w-full"
                      />
                      <SquarePen className="absolute right-2 top-2.5 h-4 w-4 text-gray-500" />
                      <p className="ml-4 text-xs text-gray-500">0/2000</p>
                    </div> */}

                    {/* Middle - Action buttons */}
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        className="text-sm rounded-2xl border-gray-300 hover:bg-gray-100"
                      >
                        Mark as Done
                      </Button>
                    {/*   <Button
                        variant="outline"
                        className="text-sm rounded-2xl border-gray-300 hover:bg-gray-100"
                      >
                        Assign
                      </Button> */}
                    </div>

                    {/* Right - View button */}
                    <div>
                      <Button
                        asChild
                        className="bg-[#619aab] text-white hover:bg-[#528a99] rounded-2xl px-4 py-2 text-sm font-semibold"
                      >
                        <a href={`/tasks/${task.id}`}>View Details {" >>"}</a>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
