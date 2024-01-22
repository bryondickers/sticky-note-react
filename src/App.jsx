import { useState } from "react";
import AddNewNoteBtn from "./Components/AddNewNoteBtn";
import Note from "./Components/Note";
import AddNoteInput from "./Components/AddNoteInput";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [displayNoteInput, setDisplayNoteInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputName, setInputName] = useState("Add a new note");
  const [selectedNoteId, setSelectedNoteId] = useState();
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => {
      return axios.get("https://64b6b8aadf0839c97e16081a.mockapi.io/tasks");
    },
  });

  const {
    data: getNoteToEdit,
    error: editNoteError,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["post", selectedNoteId],
    queryFn: () => {
      return axios
        .get(
          `https://64b6b8aadf0839c97e16081a.mockapi.io/tasks/${selectedNoteId}`
        )
        .then((data) => data);
    },
    onSuccess: (fetchedData) => {
      // Handle logic when data is successfully fetched
      console.log(fetchedData);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (error) {
    return <h2>The service is currently down. Check back after sometimes</h2>;
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  const notes = data.data;

  const getNotes = notes.map((note) => (
    <Note
      key={note.id}
      content={note.content}
      handleEditClick={() => {
        setSelectedNoteId(note.id);
        refetch();
        setInputName("Edit Note");
        setDisplayNoteInput((prevDisolayState) => !prevDisolayState);
      }}
      id={note.id}
      date={note.date}
    />
  ));

  return (
    <main className="p-3 md:p-8 max-w-[390px] mx-auto md:max-w-full">
      <header className="font-sans md:flex md:flex-row md:justify-between md:items-center">
        <h1 className="text-2xl my-5 font-bold text-primaryBlue">My Notes</h1>
        <AddNewNoteBtn
          handleShowNoteInput={() =>
            setDisplayNoteInput((prevDisplayNoteInput) => !prevDisplayNoteInput)
          }
        />
      </header>
      <div className="flex flex-row flex-wrap gap-4">{getNotes}</div>

      <AddNoteInput
        handleOnChange={(e) => {
          setInputValue(e.target.value);
        }}
        value={inputValue}
        noteId={selectedNoteId}
        name={inputName}
        exitNoteInput={displayNoteInput}
        handleExitInput={() =>
          setDisplayNoteInput((prevDisplayNoteInput) => !prevDisplayNoteInput)
        }
      />
    </main>
  );
}

export default App;
