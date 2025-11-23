"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";
import { getProductNotes, saveProductNote } from "@/app/actions";

interface Note {
  id: string;
  note: string;
}

interface ProductNoteInputProps {
  productId: string;
  currentUserId: string;
  onNotesUpdate?: (notes: Note[]) => void; // optional callback to update parent
  maxLength?: number;
}

export default function ProductNoteInput({
  productId,
  currentUserId,
  onNotesUpdate,
  maxLength = 2000,
}: ProductNoteInputProps) {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch current user's note and show below input
  useEffect(() => {
    async function fetchNotes() {
      const fetchedNotes = await getProductNotes(productId, currentUserId);
      setNotes(fetchedNotes ?? []); // show note(s) below input
      /* setNote(fetchedNotes?.[0]?.note ?? ""); // pre-fill input if you want */
    }
    fetchNotes();
  }, [productId, currentUserId]);

  const handleSave = async () => {
    if (!note.trim()) return;

    setIsSaving(true);
    try {
      const savedNote = await saveProductNote({
        userId: currentUserId,
        productId,
        note,
      });

      const updatedNotes = [savedNote]; // only show current user's note
      setNotes(updatedNotes);
      setNote(""); // clear input after saving
      setSuccessMessage("Your note has been saved!");
      setTimeout(() => setSuccessMessage(""), 3000);

      if (onNotesUpdate) onNotesUpdate(updatedNotes);
    } catch (err) {
      console.error("Failed to save note:", err);
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
        onChange={(e) => {
          if (e.target.value.length <= maxLength) setNote(e.target.value);
        }}
        disabled={isSaving}
        className="pl-10 pr-3 h-9 text-sm border-gray-300 rounded-xs w-full"
      />
      <SquarePen
        className={`absolute right-2 top-2.5 h-4 w-4 text-gray-500 cursor-pointer ${
          isSaving ? "animate-pulse" : ""
        }`}
        onClick={handleSave}
      />

      <p className="ml-4 text-xs text-gray-500">
        {note.length}/{maxLength}
      </p>

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
