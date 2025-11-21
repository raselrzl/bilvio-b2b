"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export function OrderFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("id") || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (filter) {
      params.set("id", filter);
    } else {
      params.delete("id");
    }
    params.set("page", "1"); // reset pagination on filter
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handleClear = () => {
    setFilter("");
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.delete("id");
    params.set("page", "1");
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <form className="flex flex-col md:flex-row items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Filter by last Order ID"
        className="border px-2 py-1 text-sm"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit(e);
        }}
      />
      <Button type="submit" size="sm" className="border h-8 rounded-none bg-slate-400">
        Click
      </Button>
      <Button type="button" size="sm" variant="secondary" onClick={handleClear} className="border h-8 rounded-none bg-slate-200">
        Clear Filter
      </Button>
    </form>
  );
}
