"use client";
import { useEffect } from "react";

export default function ClientPasswordRequired({ formId = "cpwd-form" }: { formId?: string }) {
  useEffect(() => {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) return;

    const configs = [
      { name: "current", msg: "You must enter the current password." },
      { name: "password", msg: "You must enter the new password." },
      { name: "confirm", msg: "You must repeat the new password." },
    ] as const;

    const cleanups: Array<() => void> = [];

    for (const { name, msg } of configs) {
      const input = form.querySelector<HTMLInputElement>(`input[name="${name}"]`);
      if (!input) continue;

      const onInvalid = (e: Event) => {
        const el = e.target as HTMLInputElement;
        if (el.validity.valueMissing) {
          el.setCustomValidity(msg);
        } // do not override other errors (pattern/tooShort) here
      };
      const onInput = () => input.setCustomValidity("");

      input.addEventListener("invalid", onInvalid);
      input.addEventListener("input", onInput);
      cleanups.push(() => {
        input.removeEventListener("invalid", onInvalid);
        input.removeEventListener("input", onInput);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [formId]);

  return null;
}
