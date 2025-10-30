import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import DocumentFilterForm from "./DocumentsFilter";

export const metadata = { title: "Documents • Bilvio" };

// ✅ Demo documents with proper typing
async function getDocuments() {
  const documents = [
    {
      id: "1",
      number: "DOC001",
      type: "Invoice",
      kind: "Incoming" as "Incoming",
      status: "Existing" as "Existing",
      createdAt: new Date().toISOString(),
      fileUrl: "/demo.pdf",
    },
    {
      id: "2",
      number: "DOC002",
      type: "Transport Cost Invoice",
      kind: "Outgoing" as "Outgoing",
      status: "Expected/Deleted" as "Expected/Deleted",
      createdAt: new Date().toISOString(),
      fileUrl: "/demo.pdf",
    },
  ];
  return documents;
}

export default async function DocumentsPage() {
  const documents = await getDocuments();

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between px-2 2xl:px-2 mt-6">
        <h1 className="text-2xl md:text-3xl font-extrabold">Documents</h1>
      </div>

      <div className="mt-6">
        <DocumentFilterForm initialDocuments={documents} />
      </div>
    </div>
  );
}
