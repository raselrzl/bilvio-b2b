"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const daysOfWeek = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

// Generate 30-min increments
const times = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? "00" : "30";
  return `${hour.toString().padStart(2,"0")}:${minute}`;
});

interface OpeningHour {
  open: boolean;
  from: string;
  to: string;
}

interface WarehouseFormValues {
  name: string;
  address: string;
  responsible: string;
  comment: string;
  openingHours: Record<string, OpeningHour>;
}

export default function WarehouseFormComponentEditForm({
  defaultValues,
  warehouseId,
  onSubmit,
}: {
  defaultValues: WarehouseFormValues;
  warehouseId?: string;
  onSubmit: (data: WarehouseFormValues) => Promise<void>; // Make onSubmit async
}) {
  const [name, setName] = useState(defaultValues.name);
  const [address, setAddress] = useState(defaultValues.address);
  const [responsible, setResponsible] = useState(defaultValues.responsible);
  const [comment, setComment] = useState(defaultValues.comment ?? "");

  const [openingHours, setOpeningHours] = useState<Record<string, OpeningHour>>(
    () => {
      const init: Record<string, OpeningHour> = {};
      daysOfWeek.forEach((day) => {
        init[day] = defaultValues.openingHours[day] ?? { open: false, from: "10:00", to: "18:00" };
      });
      return init;
    }
  );

  const [isSaving, setIsSaving] = useState(false); // Loading state

  function toggleDay(day: string) {
    setOpeningHours(prev => ({
      ...prev,
      [day]: { ...prev[day], open: !prev[day].open },
    }));
  }

  function handleTimeChange(day: string, type: "from" | "to", value: string) {
    setOpeningHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [type]: value },
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true); // start loading
    try {
      await onSubmit({ name, address, responsible, comment, openingHours });
    } finally {
      setIsSaving(false); // stop loading after submit
    }
  }

  return (
    <div className="max-w-7xl mx-auto w-full p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto mt-10 space-y-6 bg-white border shadow-xs p-6 rounded-xs"
      >
        <h1 className="text-xl font-bold mb-4">Edit Warehouse</h1>

        {/* Name */}
        <div>
          <Label htmlFor="name" className="mb-1 block text-sm font-semibold">Warehouse Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-8 rounded-xs text-sm"
            placeholder="Enter warehouse name"
          />
        </div>

        {/* Address */}
        <div>
          <Label htmlFor="address" className="mb-1 block text-sm font-semibold">Address</Label>
          <Input
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="h-8 rounded-xs text-sm"
            placeholder="Enter warehouse address"
          />
        </div>

        {/* Responsible */}
        <div>
          <Label htmlFor="responsible" className="mb-1 block text-sm font-semibold">Responsible Person</Label>
          <Input
            id="responsible"
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
            className="h-8 rounded-xs text-sm"
            placeholder="Enter name"
          />
        </div>

        {/* Comment */}
        <div>
          <Label htmlFor="comment" className="mb-1 block text-sm font-semibold">Comment</Label>
          <Input
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="h-8 rounded-xs text-sm"
            placeholder="Enter any comment"
          />
        </div>

        {/* Opening Hours */}
        <div>
          <Label className="mb-2 block text-sm font-semibold">Opening Hours</Label>
          <div className="space-y-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex items-center gap-2">
                {/* Day toggle */}
                <button
                  type="button"
                  onClick={() => toggleDay(day)}
                  className="flex items-center gap-1 px-0 py-0 bg-transparent w-32"
                >
                  <span className={`w-5 h-5 flex items-center justify-center text-white text-xs rounded-xs ${
                    openingHours[day].open ? "bg-blue-500" : "bg-gray-200"
                  }`}>{openingHours[day].open ? "✓" : ""}</span>
                  <span className="text-sm ml-1">{day}</span>
                </button>

                {/* From / To */}
                {openingHours[day].open ? (
                  <>
                    <select
                      value={openingHours[day].from}
                      onChange={(e) => handleTimeChange(day, "from", e.target.value)}
                      className="h-8 w-20 border rounded-xs text-sm"
                    >
                      {times.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <span className="mx-1 text-sm">-</span>
                    <select
                      value={openingHours[day].to}
                      onChange={(e) => handleTimeChange(day, "to", e.target.value)}
                      className="h-8 w-20 border rounded-xs text-sm"
                    >
                      {times.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </>
                ) : (
                  <span className="text-gray-500 italic text-sm">Closed</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <Button
            type="submit"
            className="rounded-xs bg-green-600 hover:bg-green-500 text-white px-5 h-8 flex items-center justify-center gap-2"
            disabled={isSaving}
          >
            {isSaving ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
          <Link
            href="/settings/warehouse"
            className="rounded-xs border bg-gray-100 hover:bg-gray-200 px-4 py-1 text-sm"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
