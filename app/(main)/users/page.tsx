import Link from "next/link";
import { prisma } from "@/app/utils/db";
import { cookies } from "next/headers"; // to read cookies
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import UserFilterForm from "./UserFilterForm";

async function getLoggedInUser() {
  const cookieStore =await cookies();
  const email = cookieStore.get("bilvio_session")?.value; // get email from cookie

  if (!email) return null;

  const user = await prisma.user.findUnique({
  where: { email },
  select: {
    id: true,
    UserID: true,
    email: true,
    firstName: true,
    lastName: true,
    approvalStatus: true,
    createdAt: true,
  },
});



  if (!user) return null;

  return {
    ...user,
    createdAt: user.createdAt.toISOString(),
  };
}

export default async function UsersPage() {
  const user = await getLoggedInUser();
  const users = user ? [user] : []; // only the logged-in user

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between px-2 2xl:px-2 mt-6">
        <h1 className="text-2xl md:text-3xl font-extrabold">Users</h1>
        <Link href="/users/create">
          <Button className="rounded-xs inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white cursor-pointer">
            <PlusCircle className="h-5 w-5" aria-hidden="true" />
            <span>Create user</span>
          </Button>
        </Link>
      </div>

      <div className="">
        <UserFilterForm initialUsers={users} />
      </div>
    </div>
  );
}
