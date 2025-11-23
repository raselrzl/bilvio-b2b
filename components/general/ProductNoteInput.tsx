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
}

export default function ProductNoteInput({
  productId,
  currentUserId,
  onNotesUpdate,
}: ProductNoteInputProps) {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchNotes() {
      if (!productId) return;
      try {
        const fetchedNotes = await getProductNotes(productId);
        setNotes(fetchedNotes || []);
      } catch (err) {
        console.error("Failed to fetch notes:", err);
      }
    }
    fetchNotes();
  }, [productId]);

  const handleSave = async () => {
    if (!note.trim()) return;

    setIsSaving(true);
    try {
      const savedNote = await saveProductNote({
        userId: currentUserId,
        productId,
        note,
      });

      const updatedNotes = [savedNote, ...notes];
      setNotes(updatedNotes);
      setNote("");

      if (onNotesUpdate) onNotesUpdate(updatedNotes);
    } catch (err) {
      console.error("Failed to save note:", err);
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
        onChange={(e) => setNote(e.target.value)}
        disabled={isSaving}
        className="pl-10 pr-3 h-9 text-sm border-gray-300 rounded-xs w-full"
      />
      <SquarePen
        className={`absolute right-2 top-2.5 h-4 w-4 text-gray-500 cursor-pointer ${
          isSaving ? "animate-pulse" : ""
        }`}
        onClick={handleSave}
      />
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
