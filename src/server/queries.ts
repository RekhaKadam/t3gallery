import "server-only";
import { db } from "@vercel/postgres";
import { auth } from "@clerk/nextjs/server";

export async function getMyImages() {
    const user=auth();
    if (!user || ! (await user).userId) {
        throw new Error("Unauthorized");}
    
        const { rows: images } = await db.query(
    "SELECT * FROM t3gallery_image WHERE \"user_id\" = $1 ORDER BY id DESC",
    [(await user).userId]
  );


  
  return images;}




  