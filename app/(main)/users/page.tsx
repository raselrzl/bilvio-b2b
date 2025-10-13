import Link from "next/link";
import { prisma } from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import UserFilterForm from "./UserFilterForm";



async function getUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return users.map((u) => ({
    ...u,
    createdAt: u.createdAt.toISOString(),
  }));
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between px-2 2xl:px-2 mt-6">
        <h1 className="text-2xl md:text-3xl font-extrabold">Users</h1>
        <Link href="/admin/users/create">
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
