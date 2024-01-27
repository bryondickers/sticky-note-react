import ReactDOM from "react-dom";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import exitIcon from "../assets/exit-icon.svg";
import successIcon from "../assets/success-icon.svg";
export default function AddNoteInput({
  exitNoteInput,
  handleExitInput,
  name,
  value,
  noteId,
  handleOnChange,
}) {
  // get selected text value
  const [showSuccess, setShowSuccess] = useState(false);
  const queryClient = useQueryClient();
  const date = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const currentDate = `${
    months[date.getMonth()]
  } ${date.getDay()}, ${date.getFullYear()}`;

  const mutation = useMutation({
    mutationFn: (todo) => {
      if (name === "Add a new note") {
        return axios.post(
          "https://64b6b8aadf0839c97e16081a.mockapi.io/tasks",
          todo
        );
      } else {
        return axios.put(
          `https://64b6b8aadf0839c97e16081a.mockapi.io/tasks/${noteId}`,
          todo
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
      setShowSuccess(true);
    },
  });

  function handleSubmitNote(e) {
    e.preventDefault();
    mutation.mutate({ content: value, date: currentDate });
  }

  function handleExitSuccess() {
    handleExitInput();
    setShowSuccess(false);
  }
  if (exitNoteInput) {
    return (
      <div
        onClick={showSuccess && handleExitSuccess}
        className="w-[100vw] h-[100%] min-h-[100vh] absolute top-0 left-0 bg-transparent-grey flex flex-col items-center"
      >
        <div className="fixed top-[30%] flex flex-col justify-center items-center max-w-[400px] w-[90%] bg-white rounded-2xl p-6">
          {showSuccess ? (
            <div className="mx-auto mb-5" id="success">
              <img className="mx-auto" src={successIcon} />
              <p className="text-center font-bold text-2xl">
                Note added successfully
              </p>
            </div>
          ) : (
            <div key="input" className="w-full">
              <div className="w-full flex flex-row justify-between my-5">
                <p className="text-2xl">{name}</p>
                <button onClick={handleExitInput}>
                  <img src={exitIcon} alt="close input form" />
                </button>
              </div>
              <form onSubmit={handleSubmitNote}>
                <textarea
                  className="w-full h-[148px] block border border-1 border-grey rounded-2xl p-3"
                  placeholder="Type a new note"
                  value={value}
                  onChange={(e) => handleOnChange(e)}
                />
                <button className="bg-primaryBlue mt-6 ml-[auto] block rounded-3xl text-white p-3 px-5">
                  {name === "Add a new note" ? "Add note" : "Update note"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  }
}
