import Link from "next/link";

export default async function Home() {
  return (
    <div className="text-center">
      <p className="text-xl uppercase font-bold">BILVIO Under development</p>
      <div className="mt-4 flex flex-col">
        Currently working on login page, click here to check{" "}
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
