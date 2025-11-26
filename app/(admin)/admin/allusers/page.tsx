import { prisma } from "@/app/utils/db";
import UsersTableClient from "./UsersTableServer";

// Server action to fetch all users
export async function getAllUsers() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return users.map((u) => ({
    ...u,
    firstName: u.firstName ?? undefined,
    lastName: u.lastName ?? undefined,
    companyName: u.companyName ?? undefined,
    email: u.email,
  }));
}

// Server Component
export default async function UsersTableServer() {
  const users = await getAllUsers();
  return <UsersTableClient users={users} />;
}

// Types
export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  companyName?: string;
  userType: "USER" | "ADMIN" | "SUPERADMIN";
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED" | "ACTIVE" | "INACTIVE";
}
