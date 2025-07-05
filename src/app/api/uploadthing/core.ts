import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db"; // Make sure this exports your Drizzle ORM instance
import { AwsDataApiTransaction } from "drizzle-orm/aws-data-api/pg";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { images } from "~/server/db/schema"; // Make sure t3gallery_image is exported from this file
// If it's not exported, open '~/server/db/schema' and export it like this:
// export const t3gallery_image = ...;

const f = createUploadthing();



// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 40,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await auth();

      // If you throw, the user will not be able to upload
      if (! (await user).userId) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: (await user).userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {

    await db.insert(images).values({
      name: file.name,
      url: file.ufsUrl,
      userId:metadata.userId as string,
    });

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
