import { prisma } from "@/app/utils/db";
import TasksPageClient from "./TaskPageClient";


export type TaskStatus =
  | "TODO"
  | "REJECTED"
  | "WAITING"
  | "DONE"
  | "SCHEDULED"
  | "CANCELLED";

export type CarType = "NEW" | "USED";

export type Task = {
  id: string;
  status: TaskStatus;
  taskType: string;
  type: CarType;
  makeModel: string;
  orderNumber: string;
  orderPackageNumber?: string | null;
  transportNumber?: string | null;
  deadline: string;
  expired?: boolean;
};


export async function getTasks(): Promise<Task[]> {
  const tasks = await prisma.task.findMany({
    select: {
      id: true,
      status: true,
      taskType: true,
      type: true,
      makeModel: true,
      orderNumber: true,
      orderPackageNumber: true,
      transportNumber: true,
      deadline: true,
      expired: true,
    },
  });

  // Convert dates to string
  return tasks.map((t) => ({
    ...t,
    deadline: t.deadline.toISOString().split("T")[0],
  }));
}


export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <div className="">
      <TasksPageClient initialTasks={tasks} />
    </div>
  );
}
