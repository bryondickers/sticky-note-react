import deleteIcon from "../assets/delete-icon.svg";
export default function DeleteBtn() {
  return (
    <button className="border border-1 border-grey p-1 rounded-md hover:bg-transparent-grey">
      <img src={deleteIcon} />
    </button>
  );
}

