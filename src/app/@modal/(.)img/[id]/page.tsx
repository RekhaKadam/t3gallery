import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";

export default  function PhotoModal(props: {
  params: { id: string };
}) {
  const { id: photoId } = props.params;

  const idAsNumber = Number(photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("invalid photo id");


  return (
    <Modal>
      <FullPageImageView id={idAsNumber} />
    </Modal>
  );
}
