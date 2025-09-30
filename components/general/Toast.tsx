"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function Toast({
  successText = "Done.",
  successParam = "ok",
  successWhen = "1",
  errorParam = "error",
  messageParam = "msg",
  clearAfterShow = true,
}: {
  successText?: string;
  successParam?: string;
  successWhen?: string;
  errorParam?: string;
  messageParam?: string;
  clearAfterShow?: boolean;
}) {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;

    const err = sp.get(errorParam);
    const ok = sp.get(successParam);
    const msg = sp.get(messageParam);

    if (!err && !ok && !msg) return;

    if (err) toast.error(decodeURIComponent(err));
    else if (msg) toast.success(msg);
    else if (ok === successWhen) toast.success(successText);
    else if (ok) toast.success(ok);

    fired.current = true;

    if (clearAfterShow) {
      const next = new URLSearchParams(sp.toString());
      next.delete(errorParam);
      next.delete(successParam);
      next.delete(messageParam);
      router.replace(next.size ? `${pathname}?${next.toString()}` : pathname, { scroll: false });
    }
  }, [sp, errorParam, successParam, successWhen, messageParam, clearAfterShow, router, pathname, successText]);

  return null;
}
