import "server-only";
import { db } from "@vercel/postgres";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm/sql";
import { images } from "./db/schema";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";

export async function getMyImages() {
    const user=auth();
    if (!user || ! (await user).userId) {
        throw new Error("Unauthorized");}
    
        const { rows: images } = await db.query(
    "SELECT * FROM t3gallery_image WHERE \"user_id\" = $1 ORDER BY id DESC",
    [(await user).userId]
  );


  
  return images;}

  export async function getImageById(id: number) {
  const user = auth();
  if(!(await user).userId) throw new Error("Unauthorized");
  const { rows } = await db.query(
    'SELECT * FROM t3gallery_image WHERE id = $1 LIMIT 1',
    [id]
  );

  const image = rows[0];
  if (!image) throw new Error('Image not found');

  if (image.userId !== (await user).userId) {
    console.log('Unauthorized to access this image');
  }


  return image;
}

export async function deleteImage(id: number) {
  const user = await auth();

  if (!user?.userId) {
    throw new Error("Unauthorized");
  }

  try {
    await db.query(
      'DELETE FROM t3gallery_image WHERE id = $1 AND "user_id" = $2',
      [id, user.userId]
    );
    analyticsServerClient.capture({
      distinctId: user.userId,
      event: "delete_image",
      properties: {
        imageId: id,
      }
    })
  } catch (error) {
    console.error("Failed to delete image:", error);
    throw new Error("Deletion failed");
  }

  revalidatePath("/"); // Revalidate homepage
  redirect("/"); // Navigate to homepage
}


  