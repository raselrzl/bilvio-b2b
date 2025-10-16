"use client";

import { useState, useEffect } from "react";
import TaskFilterForm from "./TaskFilterForm";
import { Task } from "./page";

export default function TasksPageClient({ initialTasks }: { initialTasks: Task[] }) {
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
      const matchesDeadline =
        !f.deadline || task.deadline === f.deadline;

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
      <div className="px-2 sm:px-4 md:px-6 pt-4 bg-white p-2 mx-2">
        {filteredTasks.length === 0 ? (
          <div className="bg-amber-100 border border-amber-300 shadow-sm p-4 text-amber-600 flex items-center">
            <p>Currently you don’t have any task to perform.</p>
          </div>
        ) : (
          <ul className="space-y-2">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="p-4 bg-white border shadow-sm rounded"
              >
                <p>
                  <strong>Task Type:</strong> {task.taskType}
                </p>
                <p>
                  <strong>Status:</strong> {task.status}
                </p>
                <p>
                  <strong>Type:</strong> {task.type}
                </p>
                <p>
                  <strong>Make/Model:</strong> {task.makeModel}
                </p>
                <p>
                  <strong>Order Number:</strong> {task.orderNumber}
                </p>
                <p>
                  <strong>Order Package Number:</strong>{" "}
                  {task.orderPackageNumber || "-"}
                </p>
                <p>
                  <strong>Transport Number:</strong>{" "}
                  {task.transportNumber || "-"}
                </p>
                <p>
                  <strong>Deadline:</strong>{" "}
                  <span className="text-red-500">{task.deadline}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
