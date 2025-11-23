"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";

interface DemandNoteInputProps {
  initialNotes?: { id: string; note: string }[]; // notes fetched from DB
  maxLength?: number;
  onSave?: (note: string) => Promise<void> | void;
}

export default function DemandNoteInput({
  initialNotes = [],
  maxLength = 2000,
  onSave,
}: DemandNoteInputProps) {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState(initialNotes); // notes array
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= maxLength) setNote(e.target.value);
  };

  const handleSave = async () => {
    if (!onSave || !note.trim()) return;

    setIsSaving(true);
    try {
      await onSave(note); // save to DB
      setNotes([{ id: crypto.randomUUID(), note }, ...notes]); // append new note
      setNote(""); // clear input
      setSuccessMessage("Your note has been saved!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setSuccessMessage("Failed to save note.");
      setTimeout(() => setSuccessMessage(""), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative flex-1 max-w-sm">
      <Input
        type="text"
        placeholder="Write a note..."
        value={note}
        onChange={handleChange}
        disabled={isSaving}
        className="pl-10 pr-3 h-9 text-sm border-gray-300 rounded-xs w-full"
      />
      <SquarePen
        className={`absolute right-2 top-2.5 h-4 w-4 text-gray-500 cursor-pointer ${
          isSaving ? "animate-pulse" : ""
        }`}
        onClick={handleSave}
      />
      <p className="ml-4 text-xs text-gray-500">{note.length}/{maxLength}</p>

      {successMessage && (
        <p className="mt-1 ml-4 text-xs text-green-600">{successMessage}</p>
      )}

      {notes.length > 0 && (
        <div className="mt-2 ml-4 text-xs text-gray-700 space-y-1">
          {notes.map((n) => (
            <p key={n.id} className="bg-gray-100 py-1 px-2 rounded-xs">
              {n.note}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
