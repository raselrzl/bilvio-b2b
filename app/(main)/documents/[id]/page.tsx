import { prisma } from "@/app/utils/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";

interface Document {
  id: string;
  number: string;
  type: string;
  kind: "Incoming" | "Outgoing";
  status: "Existing" | "Expected/Deleted";
  createdAt: string;
  fileUrl: string;
}

// ✅ Fetch document from database for logged-in user
async function getDocument(id: string): Promise<Document | null> {
  const jar = await cookies();
  const userEmail = jar.get("bilvio_session")?.value ?? "";

  if (!userEmail) return null;

  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: {
      id: true,
      uploadedDocuments: true,
      createdAt: true,
    },
  });

  if (!user || !user.uploadedDocuments) return null;

  // ✅ Mock consistent document details from DB-stored file
  return {
    id: user.id,
    number: "DOC-" + user.id.slice(0, 6).toUpperCase(),
    type: "Uploaded PDF",
    kind: "Outgoing",
    status: "Existing",
    createdAt: user.createdAt.toISOString(),
    fileUrl: user.uploadedDocuments,
  };
}

export default async function DocumentPreviewPage({
  params,
}: {
  params: { id: string };
}) {
  const doc = await getDocument(params.id);

  if (!doc) return notFound();

  return (
    <div className="max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <div className="flex items-center justify-between px-4 mt-6">
        <h1 className="text-2xl md:text-3xl font-extrabold">
          Documents / Document Details
        </h1>
        <Link href="/documents">
          <Button
            variant="outline"
            className="cursor-pointer rounded-xs border-amber-600 text-amber-700 hover:bg-amber-50"
          >
            ← Back to Documents
          </Button>
        </Link>
      </div>

      {/* Document Metadata */}
      <div className="p-4 space-y-6">
        <div className="border bg-white p-4 rounded shadow grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Document Number</p>
            <p className="font-medium">{doc.number}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Document Type</p>
            <p className="font-medium">{doc.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Document Kind</p>
            <p className="font-medium">{doc.kind}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Document Status</p>
            <p className="font-medium">{doc.status}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="font-medium">
              {new Date(doc.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* PDF Preview */}
        <div className="border rounded shadow overflow-hidden">
          <iframe
            src={doc.fileUrl}
            className="w-full h-[600px]"
            title={doc.number}
          />
        </div>
      </div>
    </div>
  );
}
