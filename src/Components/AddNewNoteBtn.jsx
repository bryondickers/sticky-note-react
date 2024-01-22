import addIcon from "../assets/add.svg";
export default function AddNewNoteBtn({handleShowNoteInput }) {
  return (
    <button
      onClick={()=> handleShowNoteInput("add new note")}
      className="flex flex-row items-center p-3 justify-center
     rounded-3xl text-base bg-primaryBlue text-white w-full font-normal
     md:w-[25%] md:h-[100%] hover:bg-blueHover
     "
    >
      <img src={addIcon} />
      Add a new note
    </button>
  );
}
