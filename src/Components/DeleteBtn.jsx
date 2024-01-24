import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import deleteIcon from "../assets/delete-icon.svg";
export default function DeleteBtn({ noteId }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(
        `https://64b6b8aadf0839c97e16081a.mockapi.io/tasks/${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });

  function handleDeleteNote() {
    console.log(noteId + " to delete");
    mutation.mutate(noteId);
  }
  return (
    <button
      onClick={handleDeleteNote}
      className="border border-1 border-grey p-1 rounded-md hover:bg-transparent-grey"
    >
      <img src={deleteIcon} />
    </button>
  );
}
