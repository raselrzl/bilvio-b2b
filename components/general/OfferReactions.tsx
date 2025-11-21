"use client";

import { useState } from "react";
import { Heart, ThumbsUp, ThumbsDown, ClockPlus } from "lucide-react";
import { reactToProduct } from "@/app/actions"; // ✅ server action imported

interface OfferReactionsProps {
  productId: string;
  initialReaction?: "LIKE" | "UP" | "DOWN" | "SAVE";
}

export default function OfferReactions({
  productId,
  initialReaction,
}: OfferReactionsProps) {
  const [userReaction, setUserReaction] = useState(initialReaction);

  async function handleReact(reaction: "LIKE" | "UP" | "DOWN" | "SAVE") {
    try {
      await reactToProduct(productId, reaction); // ✅ call server action
      setUserReaction(reaction);
    } catch (err) {
      console.error("Failed to react:", err);
    }
  }

  return (
    <div className="flex gap-2">
      <Heart
        className={`h-5 w-5 cursor-pointer ${
          userReaction === "SAVE" ? "text-red-500" : ""
        }`}
        onClick={() => handleReact("SAVE")}
      />
      <ThumbsUp
        className={`h-5 w-5 cursor-pointer ${
          userReaction === "UP" ? "text-green-500" : ""
        }`}
        onClick={() => handleReact("UP")}
      />
      <ThumbsDown
        className={`h-5 w-5 cursor-pointer ${
          userReaction === "DOWN" ? "text-red-500" : ""
        }`}
        onClick={() => handleReact("DOWN")}
      />
      <ClockPlus
        className={`h-5 w-5 cursor-pointer ${
          userReaction === "LIKE" ? "text-yellow-500" : ""
        }`}
        onClick={() => handleReact("LIKE")}
      />
    </div>
  );
}
