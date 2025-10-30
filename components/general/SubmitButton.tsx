"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
};

export default function SubmitButton({
  text
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-green-600 cursor-pointer text-white px-4 py-1 rounded-xs hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 inline-flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      disabled={pending}
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
      <span>{text}</span>
    </button>
  );
}
