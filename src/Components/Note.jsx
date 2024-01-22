import DeleteBtn from "./DeleteBtn";
import EditBtn from "./EditBtn";
import { useState } from "react";
export default function Note({ content, date, handleEditClick }) {
  const colors = [
    "bg-greenShade",
    "bg-peachShade",
    "bg-yellowShade",
    "bg-pinkShade",
  ];

  const index = Math.floor(Math.random() * colors.length);
  const bgColor = colors[index];

  return (
    <article
      className={`${bgColor} flex flex-col justify-around p-3 mt-4 rounded-lg md:rounded-2xl w-full h-[142px] max-w-[358px] md:w-[235px] md:h-[235px] lg:h-[316px] lg:w-[316px] lg:px-5`}
    >
      <p className="text-sm font-normal md:leading-6">{content}</p>
      <div className="w-full flex flex-row items-center justify-between mt-6">
        <p className="text-xs text-grey">{date}</p>
        <div className="flex flex-row items-center">
          <EditBtn handleEditClick={handleEditClick} />
          <DeleteBtn />
        </div>
      </div>
    </article>
  );
}
