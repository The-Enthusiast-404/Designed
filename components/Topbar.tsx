import React from "react";
import { FiLock, FiUnlock } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

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
    event: React.ChangeEvent<HTMLInputElement>,
    canvas: fabric.Canvas
  ) => void;
  toggleLock?: () => void;
  isLocked?: boolean;
}) => {
  const downloadAsPNG = () => {
    if (canvas) {
      const dataURL = canvas.toDataURL({
        format: "png",
        quality: 1,
      });
      const link = document.createElement("a");
      link.download = "canvas.png";
      link.href = dataURL;
      link.click();
    }
  };

  const downloadAsSVG = () => {
    if (canvas) {
      const svg = canvas.toSVG();
      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "canvas.svg";
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="flex justify-between items-center bg-gray-100 p-4 border-b border-gray-300 w-full">
      <div>
        <input
          type="color"
          id="canvasColor"
          name="canvasColor"
          onChange={(event) =>
            handleCanvasColorChange && handleCanvasColorChange(event, canvas)
          }
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

      <button onClick={downloadAsPNG}>Download as PNG</button>
      <button onClick={downloadAsSVG}>Download as SVG</button>
    </div>
  );
};

export default TopBar;
