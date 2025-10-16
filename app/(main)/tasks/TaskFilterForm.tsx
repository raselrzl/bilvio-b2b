"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

export default function TaskFilterForm({
  onFilterChange,
  resetText = "Reset",
}: {
  onFilterChange?: (filters: any) => void;
  resetText?: string;
}) {
  const [status, setStatus] = useState<string | undefined>();
  const [taskType, setTaskType] = useState<string | undefined>();
  const [type, setType] = useState<"NEW" | "USED" | undefined>();
  const [makeModel, setMakeModel] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderPackageNumber, setOrderPackageNumber] = useState("");
  const [transportNumber, setTransportNumber] = useState("");
  const [deadline, setDeadline] = useState("");
  const [expired, setExpired] = useState(false);

  // Debounced filter updates
  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterChange?.({
        status,
        taskType,
        type,
        makeModel,
        orderNumber,
        orderPackageNumber,
        transportNumber,
        deadline,
        expired,
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [
    status,
    taskType,
    type,
    makeModel,
    orderNumber,
    orderPackageNumber,
    transportNumber,
    deadline,
    expired,
    onFilterChange,
  ]);

  const handleReset = () => {
    setStatus(undefined);
    setTaskType(undefined);
    setType(undefined);
    setMakeModel("");
    setOrderNumber("");
    setOrderPackageNumber("");
    setTransportNumber("");
    setDeadline("");
    setExpired(false);
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
    <form className="w-full max-w-7xl space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 items-end">
        {/* Status */}
        <div>
          <Select value={status} onValueChange={(v) => setStatus(v)}>
            <SelectTrigger className={selectClass(status)}>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODO">Todo</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="WAITING">Waiting</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
              <SelectItem value="SCHEDULED">Scheduled</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Task Type */}
        <div>
          <Input
            placeholder="Task Type"
            value={taskType || ""}
            onChange={(e) => setTaskType(e.target.value)}
            className={inputClass(taskType)}
          />
        </div>

        {/* Car Type */}
        <div>
          <Select value={type} onValueChange={(v) => setType(v as any)}>
            <SelectTrigger className={selectClass(type)}>
              <SelectValue placeholder="Car Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="USED">Used</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Make/Model */}
        <div>
          <Input
            type="text"
            placeholder="Make, Model"
            value={makeModel}
            onChange={(e) => setMakeModel(e.target.value)}
            className={inputClass(makeModel)}
          />
        </div>

        {/* Order Number */}
        <div>
          <Input
            type="text"
            placeholder="Order Number"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className={inputClass(orderNumber)}
          />
        </div>

        {/* Package Number */}
        <div>
          <Input
            type="text"
            placeholder="Order Package Number"
            value={orderPackageNumber}
            onChange={(e) => setOrderPackageNumber(e.target.value)}
            className={inputClass(orderPackageNumber)}
          />
        </div>

        {/* Transport Number */}
        <div>
          <Input
            type="text"
            placeholder="Transport Number"
            value={transportNumber}
            onChange={(e) => setTransportNumber(e.target.value)}
            className={inputClass(transportNumber)}
          />
        </div>

        {/* Deadline */}
        <div>
          <Input
            type="date"
            placeholder="Deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={inputClass(deadline)}
          />
        </div>

        {/* Expired Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="expired"
            checked={expired}
            onCheckedChange={(checked) => setExpired(!!checked)}
            className={`data-[state=checked]:bg-[#619aab] data-[state=checked]:border-[#619aab] border-gray-300 rounded-none cursor-pointer`}
          />
          <label htmlFor="expired" className="text-sm text-white">
            Only expired tasks
          </label>
        </div>

        {/* Reset Button */}
        <div className="w-full flex justify-end">
          <Button
            type="button"
            variant="outline"
            className="shrink-0 rounded-xs max-w-[100px] cursor-pointer"
            onClick={handleReset}
          >
            <X className="h-4 w-4 mr-2" /> {resetText}
          </Button>
        </div>
      </div>
    </form>
  );
}
