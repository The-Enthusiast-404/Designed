import React, { useState } from "react";
import {
  FaPaintBrush,
  FaPen,
  FaPencilAlt,
  FaSprayCan,
  FaMarker,
} from "react-icons/fa";

interface BrushOptionsProps {
  handleBrushChange: (brushType: string) => void;
  handleOpacityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBrushColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BrushOptions: React.FC<BrushOptionsProps> = ({
  handleBrushChange,
  handleOpacityChange,
  handleBrushColorChange,
}) => {
  const [selectedBrush, setSelectedBrush] = useState<string>("pen");

  const handleClick = (brushType: string) => {
    setSelectedBrush(brushType);
    handleBrushChange(brushType);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white p-4 flex justify-around items-center">
      {/* Brush options */}
      <div className="flex space-x-4">
        <div
          className={`flex flex-col items-center cursor-pointer ${
            selectedBrush === "highlighter" ? "text-yellow-500" : ""
          }`}
          onClick={() => handleClick("highlighter")}
        >
          <FaPaintBrush size={30} />
          <span>Highlighter</span>
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer ${
            selectedBrush === "pen" ? "text-blue-500" : ""
          }`}
          onClick={() => handleClick("pen")}
        >
          <FaPen size={30} />
          <span>Pen</span>
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer ${
            selectedBrush === "pencil" ? "text-green-500" : ""
          }`}
          onClick={() => handleClick("pencil")}
        >
          <FaPencilAlt size={30} />
          <span>Pencil</span>
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer ${
            selectedBrush === "brush" ? "text-red-500" : ""
          }`}
          onClick={() => handleClick("brush")}
        >
          <FaSprayCan size={30} />
          <span>Spray</span>
        </div>
        <div
          className={`flex flex-col items-center cursor-pointer ${
            selectedBrush === "marker" ? "text-purple-500" : ""
          }`}
          onClick={() => handleClick("marker")}
        >
          <FaMarker size={30} />
          <span>Marker</span>
        </div>
      </div>
      {/* Brush opacity */}
      <div className="flex flex-col items-center">
        <label htmlFor="brushOpacity">Opacity:</label>
        <input
          type="range"
          id="brushOpacity"
          min="0"
          max="1"
          step="0.1"
          onChange={handleOpacityChange}
        />
      </div>
      {/* Brush color */}

      <div className="flex flex-col items-center">
        <label htmlFor="brushColor">Color:</label>
        <input type="color" id="brushColor" onChange={handleBrushColorChange} />
      </div>
    </div>
  );
};

export default BrushOptions;
