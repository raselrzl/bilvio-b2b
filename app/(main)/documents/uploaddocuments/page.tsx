"use client";
import { useTransition } from "react";
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
import { XIcon, UploadCloud } from "lucide-react";
import { UploadDropzone } from "./UploadThingReexported";
import Image from "next/image";
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

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Document (PDF)</FormLabel>
                <FormControl>
                  {field.value ? (
                    <div className="relative w-fit mx-auto">
                      <Image
                        src="/pdf.png"
                        alt="PDF Document"
                        width={120}
                        height={120}
                        className="rounded-lg shadow"
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
                    <div className="rounded-lg p-6 text-center cursor-pointer hover:border-amber-500 transition">
                      <UploadDropzone
                        endpoint="documentUploader"
                       className="
                        ut-button:bg-amber-600
                        ut-button:text-white!
                        ut-button:hover:bg-amber-500
                        ut-button:rounded-md
                        ut-button:px-4
                        ut-button:py-2
                        ut-button:text-sm
                      "  onClientUploadComplete={async (res) => {
                          const uploadedFile = res[0] as any;
                          const url =
                            uploadedFile.fileUrl || uploadedFile.ufsUrl;
                          if (!url) {
                            alert("Upload failed: no file URL returned");
                            return;
                          }

                          field.onChange(url); // update form state
                          alert("PDF uploaded successfully!");
                          form.reset();
                          router.push("/documents"); // redirect after upload
                        }}
                      />
                     
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
