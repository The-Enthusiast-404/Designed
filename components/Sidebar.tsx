import React from "react";
import { GrTemplate } from "react-icons/gr";
import { MdOutlineDraw } from "react-icons/md";
import { CiText } from "react-icons/ci";
import { IoImageSharp } from "react-icons/io5";

const Sidebar = ({
  toggleDrawing,
  addText,
  addImage,
}: {
  toggleDrawing?: () => void;
  addText?: () => void;
  addImage?: () => void;
}) => {
  // ...
  return (
    <div className="flex flex-col justify-start items-center gap-10 bg-gray-800 p-4 border-r border-gray-800 text-white">
      <button className="mb-4 font-bold text-lg">
        <GrTemplate size={50} />
      </button>
      <button onClick={toggleDrawing}>
        <MdOutlineDraw size={64} />
      </button>
      <button onClick={addText}>
        <CiText size={64} />
      </button>
      <button className="mb-4 mt-8 font-bold text-lg">
        <IoImageSharp size={64} />
      </button>
    </div>
  );
};

export default Sidebar;
