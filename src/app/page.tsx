import { db } from "@vercel/postgres";
import Link from "next/link";
import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";



const mockUrls=[
  "https://p2h6kl34fe.ufs.sh/f/fS7jvLPqAanvl2Vpck7LxfP8DJeMRgKWmIGUzQE0Xpsnthkc",
 " https://p2h6kl34fe.ufs.sh/f/fS7jvLPqAanv7YMq2ZkkaHB8LJU1TzqMrICZlnGf3Y2dOQiV",
 "https://p2h6kl34fe.ufs.sh/f/fS7jvLPqAanvqoRuW40NwZJ7ImTAQSrWL5jU2syXcGHp3YPa"
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1, url,}));


export default async function HomePage() {
const allposts = await db.query("SELECT * FROM t3gallery_image;");
  console.log(allposts);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4 ">
        {allposts.rows.map((post: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; })=> (<div key={post.id}>{post.name}</div>))},{
       [...mockImages, ...mockImages, ...mockImages, ...mockImages].map((image,index)=>(
          <div key={image.id+"-"+index} className="w-48">
            
              <img src={image.url} alt="image" />
              </div>
          
        ))}
        
        </div>
    </main>
  );
}