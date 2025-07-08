import { deleteImage, getImageById } from "~/server/queries";
import {clerkClient} from "@clerk/nextjs/server";
import { Button } from "./ui/button";


export default async function FullPageImageView(props: {
  id:Number;
}) {

  
   const idAsNumber = Number(props.id);

  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");

  const image = await getImageById(idAsNumber);
  const client=await clerkClient(); 
//   const uploaderInfo = await client.users.getUser(image.userId);
  

  return (
  <div className="flex h-full w-screen min-w-0 items-center justify-center text-white">
      <div className="flex-shrink flex-grow">
        <img src={image.url} className="p-8 object-contain" alt={image.name} />
      </div>
      <div className="flex h-full w-56 flex-shrink-0 flex-col border-l">
        <div className="border-b p-5 text-center text-xl">{image.name}</div>

        {/* <div className="p-2">
          <div>Uploaded By:</div>
          <div>{uploaderInfo.fullName}</div>
        </div> */}

        <div className="flex flex-col px-2"><span>Created On:</span> <span>{new Date(image.createdAt).toLocaleDateString()}</span></div>
        </div>
        <div className="p-10">
            <form action={async()=> {
                "use server";
                // Call the server action to delete the image
                await deleteImage(idAsNumber);
                // Server action to delete the image
              }}>
              <Button type="submit" variant="destructive">Delete</Button>
              </form>
        </div>
  </div>
  );
  
}
