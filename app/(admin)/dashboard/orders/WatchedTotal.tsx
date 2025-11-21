"use client";

import { useEffect, useState } from "react";

interface Props {
  total: number;
  id?: string; // optional unique key for localStorage
}

export default function PersistentNewOrdersCounter({
  total,
  id = "orders",
}: Props) {
  const storageKey = `lastSeenTotal_${id}`;
  const [lastSeen, setLastSeen] = useState<number>(0);
  const [newOrders, setNewOrders] = useState<number>(0);

  // load last seen total from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    const parsed = saved ? parseInt(saved, 10) : total;
    setLastSeen(parsed);
  }, [total, storageKey]);

  // detect new orders
  useEffect(() => {
    if (total > lastSeen) {
      setNewOrders(total - lastSeen);
    } else {
      setNewOrders(0);
    }
  }, [total, lastSeen]);

  const handleClick = () => {
    setLastSeen(total);
    localStorage.setItem(storageKey, total.toString());
    setNewOrders(0);
  };

  return (
    <div
      className="relative text-sm bg-primary text-gray-200 px-3 py-1 rounded-md cursor-pointer select-none"
      onClick={handleClick}
      title="Click to mark orders as seen"
    >
      Total: {total}
      {/* Badge */}
      <span
        className={`absolute -top-2 -right-2 w-5 h-5 text-xs font-bold flex items-center justify-center rounded-full text-white ${
          newOrders > 0 ? "bg-red-500" : "bg-gray-400"
        }`}
      >
        {newOrders}
      </span>
    </div>
  );
}
