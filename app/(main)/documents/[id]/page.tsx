import { notFound } from "next/navigation";

interface Document {
  id: string;
  number: string;
  type: string;
  kind: "Incoming" | "Outgoing";
  status: "Existing" | "Expected/Deleted";
  createdAt: string;
  fileUrl: string;
}

async function getDocument(id: string): Promise<Document | null> {
  const docs: Document[] = [
    {
      id: "1",
      number: "DOC001",
      type: "Invoice",
      kind: "Incoming",
      status: "Existing",
      createdAt: new Date().toISOString(),
      fileUrl: "/demo.pdf",
    },
    {
      id: "2",
      number: "DOC002",
      type: "Transport Cost Invoice",
      kind: "Outgoing",
      status: "Expected/Deleted",
      createdAt: new Date().toISOString(),
      fileUrl: "/demo.pdf",
    },
  ];

  return docs.find((d) => d.id === id) ?? null;
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
      <div className="flex items-center justify-between px-2 2xl:px-2 mt-6">
        <h1 className="text-2xl md:text-3xl font-extrabold">
          Documents / Documents Details
        </h1>
      </div>
      <div className="p-4 space-y-6">
        <div className="border bg-white p-4 rounded shadow grid grid-cols-3 gap-2">
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
