import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { prisma } from "@/app/utils/db";

const f = createUploadthing();

export const ourFileRouter = {
  documentUploader: f({
    "application/pdf": { maxFileSize: "8MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const cookieHeader = req.headers.get("cookie") ?? "";
      const match = cookieHeader.match(/bilvio_session=([^;]+)/);
      const userEmail = match?.[1];

      if (!userEmail) throw new UploadThingError("Unauthorized — no cookie");

      const user = await prisma.user.findUnique({
        where: { email: decodeURIComponent(userEmail) },
        select: { id: true },
      });

      if (!user) throw new UploadThingError("User not found");

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      if (!file.ufsUrl) throw new UploadThingError("File URL missing");

      await prisma.user.update({
        where: { id: metadata.userId },
        data: { uploadedDocuments: file.ufsUrl },
      });

      return { uploadedBy: metadata.userId, fileUrl: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
