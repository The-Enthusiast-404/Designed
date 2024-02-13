import React from "react";
import { FiLock, FiUnlock } from "react-icons/fi";

const TopBar = ({
  canvas,
  handleBrushColorChange,
  setBrushWidth,
  handleCanvasColorChange,
  toggleLock,
  isLocked,
}: {
  canvas: fabric.Canvas; // specify the type of canvas here
  handleBrushColorChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setBrushWidth?: (width: number) => void;
  handleCanvasColorChange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  toggleLock?: () => void;
  isLocked?: boolean;
}) => {
  // ...
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 border-b border-gray-300 w-full">
      <div>
        <input
          type="color"
          id="brushColor"
          name="brushColor"
          onChange={handleBrushColorChange}
        />
        <label htmlFor="brushColor" className="block text-sm text-black-700">
          Choose brush color
        </label>
      </div>
      <div>
        <select
          className="px-4 py-2 border rounded bg-white text-black h-10"
          onChange={(event) => setBrushWidth(parseInt(event.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
        <label htmlFor="brushWidth" className="block text-sm text-black-700">
          Choose brush size
        </label>
      </div>
      <div>
        <input
          type="color"
          id="canvasColor"
          name="canvasColor"
          onChange={handleCanvasColorChange}
        />
        <label htmlFor="canvasColor" className="block text-sm text-black-700">
          Choose canvas color
        </label>
      </div>
      <button
        onClick={toggleLock}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        {isLocked ? <FiLock /> : <FiUnlock />} Toggle Lock
      </button>
    </div>
  );
};

export default TopBar;
