import { prisma } from "@/app/utils/db";
import TasksTableClient from "./TasksTableClient";

// Fetch all tasks from DB
export async function getAllTasks() {
  const tasks = await prisma.task.findMany({
    include: {
      user: true, // assigned user
    },
    orderBy: { createdAt: "desc" },
  });

  return tasks.map((t) => ({
    ...t,
    taskType: t.taskType ?? "-",
    makeModel: t.makeModel ?? "-",
    orderNumber: t.orderNumber ?? "-",
    type: t.type,
    expired: t.expired,
    status: t.status,
    deadline: t.deadline,
    assignedUser: t.user
      ? {
          id: t.user.id,
          firstName: t.user.firstName ?? "",
          lastName: t.user.lastName ?? "",
          email: t.user.email,
        }
      : null,
  }));
}

export default async function TasksPageServer() {
  const tasks = await getAllTasks();
  return <TasksTableClient tasks={tasks} />;
}

// Types
export interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
}

export interface Task {
  id: string;
  taskType: string;
  type: "NEW" | "USED";
  makeModel: string;
  orderNumber: string;
  deadline: Date;
  status: "TODO" | "REJECTED" | "WAITING" | "DONE" | "SCHEDULED" | "CANCELLED";
  expired: boolean;
  assignedUser: User | null;
}
