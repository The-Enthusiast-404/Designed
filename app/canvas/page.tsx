"use client"; // next.js app router

import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import MySvg from "../public/assets/browse-svgrepo-com.svg";
import { FiLock, FiUnlock } from "react-icons/fi";
import { CiText } from "react-icons/ci";
import { MdOutlineDraw } from "react-icons/md";

const Canvas = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [color, setColor] = useState("#2BEBC8");
  const [imageUrl, setImageUrl] = useState("");
  const [brushWidth, setBrushWidth] = useState(5);
  const [brushColor, setBrushColor] = useState("#000000");
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(1);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [canvasColor, setCanvasColor] = useState("#ffffff");

  useEffect(() => {
    if (canvas?.isDrawingMode) {
      enableDrawing(canvas);
    }
  }, [brushWidth]);

  useEffect(() => {
    if (canvas?.isDrawingMode) {
      enableDrawing(canvas);
    }
  }, [brushColor]);

  useEffect(() => {
    const c = new fabric.Canvas("canvas", {
      height: 400,
      width: 800,
      backgroundColor: canvasColor,
    });

    // settings for all canvas in the app
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#2BEBC8";
    fabric.Object.prototype.cornerStyle = "rect";
    fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
    fabric.Object.prototype.cornerSize = 6;

    setCanvas(c);

    return () => {
      c.dispose();
    };
  }, []);

  const addRect = (canvas?: fabric.Canvas) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      stroke: strokeColor,
    });
    canvas?.add(rect);
    canvas?.requestRenderAll();
  };

  const addCircle = (canvas?: fabric.Canvas) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    const circle = new fabric.Circle({
      radius: 100,
      stroke: strokeColor,
    });
    canvas?.add(circle);
    canvas?.requestRenderAll();
  };

  const addTriangle = (canvas?: fabric.Canvas) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    const triangle = new fabric.Triangle({
      width: 200,
      height: 280,
      stroke: strokeColor,
    });
    canvas?.add(triangle);
    canvas?.requestRenderAll();
  };
  const addEllipse = (canvas?: fabric.Canvas) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    const ellipse = new fabric.Ellipse({
      rx: 100,
      ry: 50,
      stroke: strokeColor,
    });
    canvas?.add(ellipse);
    canvas?.requestRenderAll();
  };
  const addLine = (canvas?: fabric.Canvas) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    const line = new fabric.Line([50, 100, 200, 200], {
      stroke: strokeColor,
    });
    canvas?.add(line);
    canvas?.requestRenderAll();
  };
  const addPolygon = (canvas?: fabric.Canvas) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    const polygon = new fabric.Polygon(
      [
        { x: 100, y: 0 },
        { x: 200, y: 50 },
        { x: 170, y: 200 },
        { x: 30, y: 200 },
        { x: 0, y: 50 },
      ],
      {
        stroke: strokeColor,
      }
    );
    canvas?.add(polygon);
    canvas?.requestRenderAll();
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    const selectedObject = canvas?.getActiveObject();
    if (selectedObject) {
      selectedObject.set({ fill: event.target.value });
      canvas?.requestRenderAll();
      setColor(event.target.value); // Update the color state
    }
  };

  const handleStrokeColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    const selectedObject = canvas?.getActiveObject();
    if (selectedObject) {
      selectedObject.set({ stroke: event.target.value });
      canvas?.requestRenderAll();
    }
    setStrokeColor(event.target.value);
  };

  const handleBrushColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    const selectedObject = canvas?.getActiveObject();
    if (selectedObject) {
      selectedObject.set({ stroke: event.target.value });
      canvas?.requestRenderAll();
      setBrushColor(event.target.value); // Update the color state
    }
    setBrushColor(event.target.value); // Update the brush color state
    if (canvas?.isDrawingMode) {
      canvas.freeDrawingBrush.color = event.target.value; // Update the color of the brush directly
    }
  };

  const handleStrokeWidthChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    const selectedObject = canvas?.getActiveObject();
    if (selectedObject) {
      selectedObject.set({ strokeWidth: parseInt(event.target.value) });
      canvas?.requestRenderAll();
    }
    setStrokeWidth(parseInt(event.target.value));
  };

  const bringToFront = () => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    const selectedObject = canvas?.getActiveObject();
    if (selectedObject) {
      selectedObject.bringToFront();
      canvas?.requestRenderAll();
    }
  };

  const sendToBack = () => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    const selectedObject = canvas?.getActiveObject();
    if (selectedObject) {
      selectedObject.sendToBack();
      canvas?.requestRenderAll();
    }
  };

  const bringForward = () => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    const selectedObject = canvas?.getActiveObject();
    if (selectedObject) {
      selectedObject.bringForward();
      canvas?.requestRenderAll();
    }
  };

  const sendBackwards = () => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    const selectedObject = canvas?.getActiveObject();
    if (selectedObject) {
      selectedObject.sendBackwards();
      canvas?.requestRenderAll();
    }
  };

  const addImage = (canvas?: fabric.Canvas, url?: string) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    if (!url) return;
    fabric.Image.fromURL(url, function (img) {
      img.scaleToWidth(100);
      img.scaleToHeight(100);
      canvas?.add(img);
      canvas?.requestRenderAll();
    });
  };

  const addText = (canvas?: fabric.Canvas) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    const text = new fabric.Textbox("Enter text here", {
      width: 200,
      height: 280,
      stroke: "#2BEBC8",
    });
    canvas?.add(text);
    canvas?.requestRenderAll();
  };

  const enableDrawing = (canvas?: fabric.Canvas) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    if (canvas) {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.width = brushWidth; // Set the width of the brush
      canvas.freeDrawingBrush.color = brushColor; // Set the color of the brush
    }
  };

  const disableDrawing = (canvas?: fabric.Canvas) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    if (canvas) {
      canvas.isDrawingMode = false;
    }
  };

  const toggleDrawing = (canvas?: fabric.Canvas) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    if (canvas) {
      canvas.isDrawingMode = !canvas.isDrawingMode;
      setIsDrawingEnabled(canvas.isDrawingMode);
      if (canvas.isDrawingMode) {
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = brushWidth; // Set the width of the brush
        canvas.freeDrawingBrush.color = brushColor; // Set the color of the brush
      }
    }
  };

  const handleCanvasColorChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    canvas?: fabric.Canvas
  ) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to modify the canvas color.");
      return;
    }
    if (canvas) {
      setCanvasColor(event.target.value);
      canvas.backgroundColor = event.target.value;
      canvas.renderAll();
    }
  };

  const addSVG = (canvas?: fabric.Canvas, url?: string) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    if (!url) return;
    fabric.loadSVGFromURL(url, (objects, options) => {
      const obj = fabric.util.groupSVGElements(objects, options);
      obj.scaleToWidth(100);
      obj.scaleToHeight(100);
      canvas?.add(obj).renderAll();
    });
  };

  const toggleLock = () => {
    setIsLocked(!isLocked);
    if (canvas) {
      canvas.forEachObject((obj) => {
        obj.selectable = isLocked;
        obj.evented = isLocked;
      });
      canvas.renderAll();
    }
  };

  return (
    <div className="flex h-screen text-black">
      {/* Sidebar */}
      <div className="flex flex-col justify-start gap-10 bg-gray-800 p-4 border-r border-gray-800 text-white">
        <button className="mb-4 font-bold text-lg">Templates</button>
        {/* Add your template options here */}
        <button onClick={() => toggleDrawing(canvas)}>
          {isDrawingEnabled ? (
            <MdOutlineDraw size={64} />
          ) : (
            <MdOutlineDraw size={64} />
          )}
        </button>
        <button onClick={() => addText(canvas)}>
          <CiText size={64} />
        </button>
        <button className="mb-4 mt-8 font-bold text-lg">Upload Media</button>
        <button onClick={() => addImage(canvas, imageUrl)}>Add Image</button>
      </div>

      {/* Canvas */}
      <div className="flex flex-col gap-20 flex-grow justify-start items-center">
        <div className="flex justify-between items-center bg-gray-100 p-4 border-b border-gray-300 w-full">
          <div>
            <input
              type="color"
              id="brushColor"
              name="brushColor"
              value={brushColor}
              onChange={handleBrushColorChange}
            />
            <label
              htmlFor="brushColor"
              className="block text-sm text-black-700"
            >
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
            <label
              htmlFor="brushWidth"
              className="block text-sm text-black-700"
            >
              Choose brush size
            </label>
          </div>
          <div>
            <input
              type="color"
              id="canvasColor"
              name="canvasColor"
              value={canvasColor}
              onChange={(event) => handleCanvasColorChange(event, canvas)}
            />
            <label
              htmlFor="canvasColor"
              className="block text-sm text-black-700"
            >
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
        <canvas id="canvas" className="border border-gray-300"></canvas>
      </div>
    </div>
  );
};

export default Canvas;
