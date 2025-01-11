import { auth } from "@/server/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  cncFileUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
    "application/octet-stream": { maxFileSize: "16MB" },
  })
    .middleware(async () => {
      const session = await auth();
      if (!session || !session.user) throw new Error("Unauthorized");
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
