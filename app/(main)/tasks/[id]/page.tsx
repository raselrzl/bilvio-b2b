import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prisma } from "@/app/utils/db";

export default async function TaskDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // ✅ Get the logged-in user's email from the cookie
  const jar = await cookies();
  const userEmail = jar.get("bilvio_session")?.value;

  if (!userEmail) {
    // Not logged in
    return notFound();
  }

  // ✅ Find the logged-in user
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true, email: true, firstName: true },
  });

  if (!user) return notFound();

  // ✅ Fetch the task (only if it belongs to this user)
  const task = await prisma.task.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: { user: true },
  });

  if (!task) return notFound();

  // ✅ Status color map
  const statusColor = {
    TODO: "bg-amber-100 text-amber-700",
    REJECTED: "bg-red-100 text-red-700",
    WAITING: "bg-blue-100 text-blue-700",
    DONE: "bg-green-100 text-green-700",
    SCHEDULED: "bg-purple-100 text-purple-700",
    CANCELLED: "bg-gray-200 text-gray-700",
  }[task.status];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Task Details</h1>
        <Link href="/tasks">
          <Button variant="outline" className="cursor-pointer rounded-xs">← Back to Tasks</Button>
        </Link>
      </div>

      {/* Details Card */}
      <div className="border rounded-xs shadow p-6 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Task: {task.taskType}</h2>
            <p className="text-sm text-gray-500">
              Task ID: <span className="font-mono">{task.id}</span>
            </p>
          </div>
          <div
            className={`px-3 py-1 rounded-md text-xs font-semibold ${statusColor}`}
          >
            {task.status}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
          <div className="bg-gray-50 p-2 rounded">
            <strong>Car Type:</strong> {task.type}
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <strong>Car / Make / Model:</strong> {task.makeModel}
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <strong>Order Number:</strong> {task.orderNumber}
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <strong>Package Number:</strong> {task.orderPackageNumber || "—"}
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <strong>Transport Number:</strong> {task.transportNumber || "—"}
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <strong>Deadline:</strong>{" "}
            {new Date(task.deadline).toLocaleDateString()}
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <strong>Expired:</strong> {task.expired ? "Yes" : "No"}
          </div>
        </div>

        {/* Assigned user info */}
        {task.user && (
          <div className="pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">Assigned User</h3>
            <div className="bg-gray-50 p-3 rounded text-sm">
              <p>
                <strong>Name:</strong> {task.user.firstName || "—"}
              </p>
              <p>
                <strong>Email:</strong> {task.user.email || "—"}
              </p>
            </div>
          </div>
        )}

        {/* Footer buttons */}
        <div className="pt-4 border-t border-gray-200 flex gap-3">
          <Button
            variant="outline"
            className="text-sm rounded-2xl border-gray-300 hover:bg-gray-100 cursor-pointer"
          >
            Mark as Done
          </Button>
           <Button
            variant="outline"
            className="text-sm rounded-2xl border-gray-300 hover:bg-gray-100 cursor-pointer"
          >
            Edit Task
          </Button>
        </div>
      </div>
    </div>
  );
}
