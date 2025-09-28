import { FC } from "react";
import { Home, Smile } from "lucide-react";
import Link from "next/link";

const NotFoundPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-16 bg-white text-black">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-red-600 animate-pulse">404</h1>

        <h2 className="text-xl text-gray-900 mt-6">
          Oops! This page could not be found.
        </h2>

        <p className="text-md text-gray-600 mt-2">
          It looks like you’ve navigated to the wrong address. The page you’re looking for isn’t here.
        </p>

        <Smile className="w-28 h-28 text-red-600 mx-auto mt-8 animate-bounce" />

        <Link
          href="/"
          className="mt-8 text-lg text-black hover:text-gray-700 underline flex items-center justify-center"
        >
          <Home className="mr-2 h-5 w-5" />
          Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
