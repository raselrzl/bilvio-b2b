"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";

interface DemandNoteInputProps {
  initialNote?: string;
  maxLength?: number;
  onSave?: (note: string) => void; // callback to save note
}

export default function DemandNoteInput({
  initialNote = "",
  maxLength = 2000,
  onSave,
}: DemandNoteInputProps) {
  const [note, setNote] = useState(initialNote);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) {
      setNote(e.target.value);
    }
  };

  const handleSave = () => {
    if (onSave) onSave(note);
  };

  return (
    <div className="relative flex-1 max-w-sm">
      <Input
        type="text"
        placeholder="Write a note..."
        value={note}
        onChange={handleChange}
        className="pl-10 pr-3 h-9 text-sm border-gray-300 rounded-xs w-full"
      />
      <SquarePen
        className="absolute right-2 top-2.5 h-4 w-4 text-gray-500 cursor-pointer"
        onClick={handleSave}
      />
      <p className="ml-4 text-xs text-gray-500">
        {note.length}/{maxLength}
      </p>
    </div>
  );
}
