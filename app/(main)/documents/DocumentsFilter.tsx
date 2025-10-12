"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { DockIcon, Eye, X } from "lucide-react";
import Link from "next/link";

interface Document {
  id: string;
  number: string;
  type: string;
  kind: "Incoming" | "Outgoing";
  status: "Existing" | "Expected/Deleted";
  createdAt: string;
  fileUrl: string;
}

export default function DocumentFilterForm({
  initialDocuments,
}: {
  initialDocuments: Document[];
}) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [filteredDocs, setFilteredDocs] =
    useState<Document[]>(initialDocuments);

  const [numberFilter, setNumberFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | undefined>();
  const [kindFilter, setKindFilter] = useState<string | undefined>();
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // 🔹 Filtering logic
  useEffect(() => {
    let filtered = [...documents];
    if (numberFilter)
      filtered = filtered.filter((d) =>
        d.number.toLowerCase().includes(numberFilter.toLowerCase())
      );
    if (typeFilter) filtered = filtered.filter((d) => d.type === typeFilter);
    if (kindFilter) filtered = filtered.filter((d) => d.kind === kindFilter);
    if (statusFilter)
      filtered = filtered.filter((d) => d.status === statusFilter);

    if (sortOrder)
      filtered.sort((a, b) =>
        sortOrder === "asc"
          ? a.createdAt.localeCompare(b.createdAt)
          : b.createdAt.localeCompare(a.createdAt)
      );

    setFilteredDocs(filtered);
  }, [
    numberFilter,
    typeFilter,
    kindFilter,
    statusFilter,
    sortOrder,
    documents,
  ]);

  const handleReset = () => {
    setNumberFilter("");
    setTypeFilter(undefined);
    setKindFilter(undefined);
    setStatusFilter(undefined);
    setSortOrder("desc");
  };

  const inputClass = (value: string | undefined) =>
    `h-9 w-full rounded-xs bg-white placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-0 ${
      value ? "bg-[#619aab] text-white placeholder-white" : ""
    }`;

  const selectClass = (value: string | undefined) =>
    `h-9 w-full rounded-xs bg-white focus:outline-none focus:ring-0 focus:border-0 ${
      value ? "bg-[#619aab] text-white" : ""
    }`;

  return (
    <div className="w-full max-w-7xl space-y-4">
      {/* Filters */}
      <form className="space-y-4 mt-6 px-0 2xl:px-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-2 items-end mt-4 py-4 px-2 sm:px-4 md:px-6 bg-gray-500">
          <Input
            placeholder="Document Number"
            value={numberFilter}
            onChange={(e) => setNumberFilter(e.target.value)}
            className={inputClass(numberFilter)}
          />

          <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v)}>
            <SelectTrigger className={selectClass(typeFilter)}>
              <SelectValue placeholder="Document Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Invoice">Invoice</SelectItem>
              <SelectItem value="Advance Payment Invoice">
                Advance Payment Invoice
              </SelectItem>
              <SelectItem value="Transport Cost Invoice">
                Transport Cost Invoice
              </SelectItem>
              <SelectItem value="Internal Invoice">Internal Invoice</SelectItem>
              <SelectItem value="Company Registration">
                Company Registration
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={kindFilter} onValueChange={(v) => setKindFilter(v)}>
            <SelectTrigger className={selectClass(kindFilter)}>
              <SelectValue placeholder="Document Kind" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Incoming">Incoming</SelectItem>
              <SelectItem value="Outgoing">Outgoing</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={statusFilter}
            onValueChange={(v) => setStatusFilter(v)}
          >
            <SelectTrigger className={selectClass(statusFilter)}>
              <SelectValue placeholder="Document Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Existing">Existing</SelectItem>
              <SelectItem value="Expected/Deleted">Expected/Deleted</SelectItem>
            </SelectContent>
          </Select>
          <div></div>

          <Button
            variant="outline"
            className="rounded-xs"
            onClick={handleReset}
          >
            <X className="h-4 w-4 mr-2" /> Clear
          </Button>
        </div>
        <div className="flex flex-row">
          <div className="w-[150px]">
            <Select
              value={sortOrder}
              onValueChange={(v) => setSortOrder(v as "asc" | "desc")}
            >
              <SelectTrigger className={selectClass(String(sortOrder))}>
                <SelectValue placeholder="Sort Order" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Oldest</SelectItem>
                <SelectItem value="desc">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-2 text-sm text-muted-foreground ml-8">
            Showing {filteredDocs.length} of {documents.length} entries
          </div>
        </div>
      </form>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 mt-6 px-2">
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="relative border rounded-xs p-4 bg-white shadow hover:shadow-md transition"
            >
              {/* PDF icon + Document number */}
              <div className="flex items-center gap-2 text-lg font-bold">
                <span>📄Document number:</span>
                <span>{doc.number}</span>
              </div>

              {/* Document details */}
              <div className="flex flex-wrap text-sm text-gray-700 p-2 rounded-sm gap-2">
                <div className="bg-gray-100 py-1 px-2 items-center justify-center">
                  Document Type: {doc.type}
                </div>
                <div className="bg-gray-100 py-1 px-2 items-center justify-center">
                  Document Kind: {doc.kind}
                </div>
                <div className="bg-gray-100 py-1 px-2 items-center justify-center">
                  Created at: {new Date(doc.createdAt).toLocaleDateString()}
                </div>
              </div>

              {/* Preview button */}
              <Link
                href={`/documents/${doc.id}`}
                className="absolute bottom-2 right-2 flex items-center gap-1 bg-gray-500 px-2 py-1 rounded hover:bg-gray-400 text-white text-sm"
              >
                <Eye className="w-4 h-4" />
                Preview
              </Link>
            </div>
          ))
        ) : (
          <div className="border p-4 text-center text-amber-600 bg-amber-100 rounded">
            No documents found
          </div>
        )}
      </div>

      {/* Pagination info */}
      <div className="mt-2 text-sm text-muted-foreground ml-3">
        Showing {filteredDocs.length} of {documents.length} entries
      </div>
    </div>
  );
}
