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
  const clearCanvas = () => {
    if (canvas) {
      canvas.clear();
    }
  };
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

  const bringToFront = () => {
    const selectedObject = canvas?.getActiveObject();
    if (selectedObject) {
      selectedObject.bringToFront();
      canvas?.requestRenderAll();
    }
  };

  const sendToBack = () => {
    const selectedObject = canvas?.getActiveObject();
    if (selectedObject) {
      selectedObject.sendToBack();
      canvas?.requestRenderAll();
    }
  };

  const bringForward = () => {
    const selectedObject = canvas?.getActiveObject();
    if (selectedObject) {
      selectedObject.bringForward();
      canvas?.requestRenderAll();
    }
  };

  const sendBackwards = () => {
    const selectedObject = canvas?.getActiveObject();
    if (selectedObject) {
      selectedObject.sendBackwards();
      canvas?.requestRenderAll();
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

  function handleDelete() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
    }
  }

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
      <button onClick={clearCanvas}>
        <MdDeleteOutline size={44} />
      </button>
      <button onClick={downloadAsPNG}>Download as PNG</button>
      <button onClick={downloadAsSVG}>Download as SVG</button>
      <button onClick={bringToFront}>Bring to Front</button>

      <button onClick={sendToBack}>Send to Back</button>

      <button onClick={bringForward}>Bring Forward</button>

      <button onClick={sendBackwards}>Send Backwards</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default TopBar;
