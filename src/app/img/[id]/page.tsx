import FullPageImageView from "~/components/full-image-page";

export default async function PhotoPage(props: {
  params: { id: string };
}) {
  const { id: photoId } = props.params;

  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("invalid photo id");


  return <FullPageImageView id={idAsNumber} />
  
}
