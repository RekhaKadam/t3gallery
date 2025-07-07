import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "@vercel/postgres";
import { get } from "http";
import { headers } from "next/headers";
import Link from "next/link";
import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { getMyImages } from "~/server/queries";
export const dynamic = "force-dynamic"; // This is to ensure the page is not cached and always fetches fresh data
import Image from 'next/image'


// const mockUrls=[
//   "https://p2h6kl34fe.ufs.sh/f/fS7jvLPqAanvl2Vpck7LxfP8DJeMRgKWmIGUzQE0Xpsnthkc",
//  " https://p2h6kl34fe.ufs.sh/f/fS7jvLPqAanv7YMq2ZkkaHB8LJU1TzqMrICZlnGf3Y2dOQiV",
//  "https://p2h6kl34fe.ufs.sh/f/fS7jvLPqAanvqoRuW40NwZJ7ImTAQSrWL5jU2syXcGHp3YPa"
// ];

// const mockImages = mockUrls.map((url, index) => ({
//   id: index + 1, url,}));
async function Images(){
const images=await getMyImages();
  return(
    <div className="flex flex-wrap justify-center gap-4 p-4">
       
        {[...images,...images,...images].map((image) => (
  <div key={image.id} className="flex h-48 w-48 flex-col">
    <Link href={`/img/${image.id}`}>
            <Image 
            src={image.url} 
              unoptimized 
            style={{objectFit: "contain"}} 
            width={192}
            height={192}
            alt={image.name}
          /></Link>
            <div>{image.name}</div>
          </div>
        ))}
      </div>
  );
}

export default async function HomePage() {
  



  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full flex items-center justify-center">Please sign in</div>
      </SignedOut>
      <SignedIn>
        <Images/>
      </SignedIn>
      
    </main>
  );
}