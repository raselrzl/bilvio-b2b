// app/page.tsx
import Link from "next/link";
import { cookies } from "next/headers";
import { logoutAction } from "../actions";
import Image from "next/image";

export default async function Home() {
  const jar = await cookies();
  const raw = jar.get("bilvio_session")?.value ?? "";
  const isAuthed = Boolean(raw && raw !== "undefined" && raw !== "null");

  return (
    <div className="flex items-center justify-center text-center">

       <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
          <Image
            src="/log1.png"
            alt="Logo"
            width={200}
            height={100}
            priority
            className="h-18 w-auto"
          />
        </Link>
        
      <p className="text-xl uppercase font-bold">Under development</p>

    {/*   <div className="mt-4 flex flex-col items-center">
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
      </div> */}
    </div>
  );
}
