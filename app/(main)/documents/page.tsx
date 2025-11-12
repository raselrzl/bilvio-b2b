import Link from "next/link";
import { prisma } from "@/app/utils/db";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import DocumentFilterForm from "./DocumentsFilter";

export const metadata = { title: "Documents • Bilvio" };

// ✅ Match expected Document type
type Document = {
  id: string;
  number: string;
  type: string;
  kind: "Incoming" | "Outgoing";
  status: "Existing" | "Expected/Deleted";
  createdAt: string;
  fileUrl: string;
};

async function getUserDocuments(): Promise<Document[]> {
  const jar = await cookies();
  const userEmail = jar.get("bilvio_session")?.value ?? "";

  if (!userEmail) return [];

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: {
      id: true,
      uploadedDocuments: true,
      createdAt: true,
    },
  });

  if (!user || !user.uploadedDocuments) return [];

  return [
    {
      id: user.id,
      number: "DOC-" + user.id.slice(0, 6).toUpperCase(),
      type: "Uploaded PDF",
      kind: "Outgoing", // ✅ must be one of the union values
      status: "Existing", // ✅ must be one of the union values
      createdAt: user.createdAt.toISOString(),
      fileUrl: user.uploadedDocuments,
    },
  ];
}

export default async function DocumentsPage() {
  const documents = await getUserDocuments();

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between px-6 2xl:px-0 mt-4">
        <h1 className="text-2xl md:text-3xl font-extrabold">Documents</h1>

        <Link href="/documents/uploaddocuments">
          <Button className="rounded-xs inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white cursor-pointer">
            <PlusCircle className="h-5 w-5" aria-hidden="true" />
            <span>Upload A Document</span>
          </Button>
        </Link>
      </div>

      <div className="mt-6">
        {documents.length > 0 ? (
          <DocumentFilterForm initialDocuments={documents} />
        ) : (
          <p className="text-gray-500 mt-6 text-center">
            No documents uploaded yet.{" "}
            <Link
              href="/documents/uploaddocuments"
              className="text-amber-600 hover:underline"
            >
              Upload now
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  );
}
