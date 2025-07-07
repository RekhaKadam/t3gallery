import { getImageById } from "~/server/queries";

export default async function FullPageImageView(props: {
  id:number;
}) {

  
  const image = await getImageById(props.id);

  return (
  <div className="flex h-full w-full min-w-0 ">
    <div className="flex-shrink flex justify-center items-center">
    <img src={image.url} className="w-96 object-contain" />
</div>
    <div className="flex w-48 flex-col border-l"></div>
    <div className="text-x1 font-bold">{image.name}</div>
  </div>
  );
  
}
