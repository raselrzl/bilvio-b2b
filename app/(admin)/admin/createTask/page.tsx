"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "react-hot-toast";
import { createTaskAction, TaskPayload } from "@/app/actions";

export default function CreateTaskForm() {
  const router = useRouter();
  const [form, setForm] = useState<TaskPayload>({
    status: "TODO",
    taskType: "",
    type: "NEW",
    makeModel: "",
    orderNumber: "",
    orderPackageNumber: null,
    transportNumber: null,
    deadline: "",
    expired: false,
    userId: null,
  });
  const [loading, setLoading] = useState(false);

  const inputClass = (value?: string | number | boolean | null) =>
    `h-9 w-full rounded-xs bg-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-0 ${
      value ? "bg-[#619aab] text-white placeholder-white" : ""
    }`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      await createTaskAction(formData);
      toast.success("✅ Task created successfully!");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "⚠️ Error creating task.");
    }

    setLoading(false);
  }

  return (
    <div className="w-full max-w-5xl mx-auto bg-gray-50 p-6 mt-8 rounded shadow space-y-6">
      <h1 className="text-2xl font-bold text-gray-700">Create New Task</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div className="flex flex-col gap-1">
          <Label>Task Type</Label>
          <Input
            name="taskType"
            placeholder="Enter task type"
            value={form.taskType ?? ""}
            onChange={(e) => setForm({ ...form, taskType: e.target.value })}
            className={inputClass(form.taskType)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Car Type</Label>
          <Select
            name="type"
            value={form.type}
            onValueChange={(v) => setForm({ ...form, type: v as "NEW" | "USED" })}
          >
            <SelectTrigger className={inputClass(form.type)}>
              <SelectValue placeholder="Select car type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NEW">New</SelectItem>
              <SelectItem value="USED">Used</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <Label>Make/Model</Label>
          <Input
            name="makeModel"
            placeholder="e.g. Toyota Corolla"
            value={form.makeModel ?? ""}
            onChange={(e) => setForm({ ...form, makeModel: e.target.value })}
            className={inputClass(form.makeModel)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Order Number</Label>
          <Input
            name="orderNumber"
            placeholder="Order Number"
            value={form.orderNumber ?? ""}
            onChange={(e) => setForm({ ...form, orderNumber: e.target.value })}
            className={inputClass(form.orderNumber)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Order Package Number</Label>
          <Input
            name="orderPackageNumber"
            placeholder="Order Package Number"
            value={form.orderPackageNumber ?? ""}
            onChange={(e) =>
              setForm({ ...form, orderPackageNumber: e.target.value || null })
            }
            className={inputClass(form.orderPackageNumber)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Transport Number</Label>
          <Input
            name="transportNumber"
            placeholder="Transport Number"
            value={form.transportNumber ?? ""}
            onChange={(e) =>
              setForm({ ...form, transportNumber: e.target.value || null })
            }
            className={inputClass(form.transportNumber)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Deadline</Label>
          <Input
            type="date"
            name="deadline"
            value={form.deadline ?? ""}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className={inputClass(form.deadline)}
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Status</Label>
          <Select
            name="status"
            value={form.status}
            onValueChange={(v) =>
              setForm({ ...form, status: v as TaskPayload["status"] })
            }
          >
            <SelectTrigger className={inputClass(form.status)}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="TODO">To Do</SelectItem>
              <SelectItem value="WAITING">Waiting</SelectItem>
              <SelectItem value="SCHEDULED">Scheduled</SelectItem>
              <SelectItem value="DONE">Done</SelectItem>
              <SelectItem value="REJECTED">Rejected</SelectItem>
              <SelectItem value="CANCELLED">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          className="col-span-full bg-[#619aab] text-white hover:bg-[#528a99] rounded-xs h-10 mt-2 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Task"}
        </Button>
      </form>

      <Toaster position="top-right" />
    </div>
  );
}
