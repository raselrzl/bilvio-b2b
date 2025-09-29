// app/page.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { logoutAction } from "../actions";

export default async function Home() {
  const jar = await cookies();
  const raw = jar.get("bilvio_session")?.value ?? "";
  const isAuthed = Boolean(raw && raw !== "undefined" && raw !== "null");

  return (
    <div className="text-center">
      <p className="text-xl uppercase font-bold">BILVIO Under development</p>

      <div className="mt-4 flex flex-col items-center">
        <span>Currently working on login page, click here to check{" "}</span>

        {!isAuthed ? (
          <>
            <Link
              href="/login"
              className="text-black hover:text-black/75 font-bold underline mt-4"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-black hover:text-black/75 font-bold underline mt-4"
            >
              Register
            </Link>
          </>
        ) : (
          <form action={logoutAction} className="mt-6">
            <button
              type="submit"
              className="w-[150px] rounded-3xl border border-black px-6 py-2 font-bold hover:bg-black hover:text-white transition"
            >
              Logout
            </button>
          </form>
        )}

        <Link
          href="/reset-password"
          className="text-black hover:text-black/75 font-bold underline mt-4"
        >
          Reset Password
        </Link>
        <Link
          href="/terms/seller"
          className="text-black hover:text-black/75 font-bold underline mt-4"
        >
          Terms
        </Link>
      </div>
    </div>
  );
}
