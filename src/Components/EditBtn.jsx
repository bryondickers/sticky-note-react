import editIcon from "../assets/edit-icon.svg";
export default function EditBtn({ handleEditClick }) {
  // function handleEditClick(e) {
  //   console.log(noteId);
  // }

  return (
    <button
      onClick={handleEditClick}
      className="mr-2 border border-1 border-grey p-1 rounded-md hover:bg-transparent-grey"
    >
      <img src={editIcon} />
    </button>
  );
}
