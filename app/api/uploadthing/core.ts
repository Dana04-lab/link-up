import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  docsUploader: f({
    blob: {
      maxFileSize: "8MB",
      maxFileCount: 5,
    },
  }).onUploadComplete(async ({ file }) => {
    console.log("Upload complete:", file.name, file.url);
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
