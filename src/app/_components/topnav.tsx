import { SignedIn, SignedOut, SignIn, SignInButton, UserButton } from "@clerk/nextjs";

export function Topnav() {
  return (
    <nav className="flex items-center justify-between p-4 bg-blue-800 text-white">
      <div>Gallery</div>
      <div>
        <SignedOut>
            <SignInButton/>
        </SignedOut>
        <SignedIn>
            <UserButton/>
        </SignedIn>
      </div>
      </nav>
  );
}