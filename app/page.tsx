import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-center">
      <p className="text-xl uppercase font-bold">BILVIO Under development</p>
      <div className="mt-20">
        Currently working on login page, click here to check{" "}
      <Link
        href="/login"
        className="text-black hover:text-black/75 font-bold underline mt-20"
      >
        Login
      </Link>
      </div>
      
    </div>
  );
}
