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




  