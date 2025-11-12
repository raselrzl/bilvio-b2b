"use client";
/* this file uploading file */
import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { UploadDropzone } from "./UploadThingReexported";
import Image from "next/image";
import { uploadDocumentsAction } from "@/app/actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  document: z.string().min(1, "Please upload a PDF document"),
});

export default function UploadDocumentsForm() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { document: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(() => {
      alert("PDF uploaded successfully!");
      form.reset();
    });
  }

  return (
    <div className="max-w-sm mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Document (PDF)</FormLabel>
                <FormControl>
                  {field.value ? (
                    <div className="relative w-fit">
                      <Image
                        src="/pdf.png"
                        alt="PDF Document"
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2"
                        onClick={() => field.onChange("")}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint="documentUploader"
                      onClientUploadComplete={async (res) => {
                        const uploadedFile = res[0] as any;
                        const url = uploadedFile.fileUrl || uploadedFile.ufsUrl; // fallback if missing

                        if (!url) {
                          alert("Upload failed: no file URL returned");
                          return;
                        }

                        field.onChange(url); // update form state
                        alert("PDF uploaded successfully!"); // show success
                        form.reset(); // reset form if needed
                        router.push("/documents");
                      }}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
      {/*     <Button
            type="submit"
            className="w-full text-sm"
            disabled={pending || !form.watch("document")}
          >
            {pending ? "Submitting..." : "Upload PDF Document"}
          </Button> */}
        </form>
      </Form>
    </div>
  );
}
