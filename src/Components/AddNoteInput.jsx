import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import exitIcon from "../assets/exit-icon.svg";

export default function AddNoteInput({
  exitNoteInput,
  handleExitInput,
  name,
  noteId,
  value,
  handleOnChange,
}) {
  // get selected text value

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
      return axios.post(
        "https://64b6b8aadf0839c97e16081a.mockapi.io/tasks",
        todo
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  function handleSubmitNote(e) {
    e.preventDefault();
    mutation.mutate({ content: value, date: currentDate });
  }

  if (exitNoteInput) {
    return (
      <div className="w-[100vw] h-[100vh] absolute top-0 left-0 bg-transparent-grey flex flex-col justify-center items-center">
        <div className="max-w-[526px] w-[90%] bg-white rounded-2xl p-6">
          <div className="w-full flex flex-row justify-between my-5">
            <p className="text-2xl">{name}</p>
            <button onClick={handleExitInput}>
              <img src={exitIcon} />
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
              Add note
            </button>
          </form>
        </div>
      </div>
    );
  }
}
