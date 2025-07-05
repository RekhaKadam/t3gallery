"use client";
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { use } from "react";
import { UploadButton } from "~/utils/uploadthing";

export function Topnav() {
  const router=useRouter();
  return (
    <nav className="flex items-center justify-between p-4 bg-blue-800 text-white">
      <div>Gallery</div>
      <div>
        <SignedOut>
            <SignInButton/>
        </SignedOut>
        <SignedIn>
          <UploadButton endpoint="imageUploader" onClientUploadComplete={()=>{router.refresh();}}/>
            <UserButton/>
        </SignedIn>
      </div>
      </nav>
  );
}