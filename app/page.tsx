"use client"; // next.js app router

import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

const App = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [color, setColor] = useState("#2BEBC8");
  const [imageUrl, setImageUrl] = useState("");
  const [brushWidth, setBrushWidth] = useState(5);
  const [brushColor, setBrushColor] = useState("#000000");
  const [strokeColor, setStrokeColor] = useState("#000000");

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
      backgroundColor: "white",
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
    const rect = new fabric.Rect({
      height: 280,
      width: 200,
      stroke: strokeColor,
    });
    canvas?.add(rect);
    canvas?.requestRenderAll();
  };

  const addCircle = (canvas?: fabric.Canvas) => {
    const circle = new fabric.Circle({
      radius: 100,
      stroke: strokeColor,
    });
    canvas?.add(circle);
    canvas?.requestRenderAll();
  };

  const addTriangle = (canvas?: fabric.Canvas) => {
    const triangle = new fabric.Triangle({
      width: 200,
      height: 280,
      stroke: strokeColor,
    });
    canvas?.add(triangle);
    canvas?.requestRenderAll();
  };
  const addEllipse = (canvas?: fabric.Canvas) => {
    const ellipse = new fabric.Ellipse({
      rx: 100,
      ry: 50,
      stroke: strokeColor,
    });
    canvas?.add(ellipse);
    canvas?.requestRenderAll();
  };
  const addLine = (canvas?: fabric.Canvas) => {
    const line = new fabric.Line([50, 100, 200, 200], {
      stroke: "#2BEBC8",
    });
    canvas?.add(line);
    canvas?.requestRenderAll();
  };
  const addPolygon = (canvas?: fabric.Canvas) => {
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

  const addImage = (canvas?: fabric.Canvas, url?: string) => {
    if (!url) return;
    fabric.Image.fromURL(url, function (img) {
      img.scaleToWidth(100);
      img.scaleToHeight(100);
      canvas?.add(img);
      canvas?.requestRenderAll();
    });
  };

  const addText = (canvas?: fabric.Canvas) => {
    const text = new fabric.Textbox("Enter text here", {
      width: 200,
      height: 280,
      stroke: "#2BEBC8",
    });
    canvas?.add(text);
    canvas?.requestRenderAll();
  };

  const enableDrawing = (canvas?: fabric.Canvas) => {
    if (canvas) {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.width = brushWidth; // Set the width of the brush
      canvas.freeDrawingBrush.color = brushColor; // Set the color of the brush
    }
  };

  const disableDrawing = (canvas?: fabric.Canvas) => {
    if (canvas) {
      canvas.isDrawingMode = false;
    }
  };

  return (
    <div>
      <input
        type="color"
        id="strokeColor"
        name="strokeColor"
        value={strokeColor}
        onChange={handleStrokeColorChange}
      />
      <select onChange={(event) => setBrushWidth(parseInt(event.target.value))}>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
        <option value="20">20</option>
      </select>
      <input
        type="color"
        id="brushColor"
        name="brushColor"
        value={brushColor}
        onChange={handleBrushColorChange}
      />
      <input
        type="text"
        placeholder="Paste image URL here"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={() => addText(canvas)}>Add Text</button>
      <button onClick={() => addImage(canvas, imageUrl)}>Add Image</button>
      <button onClick={bringToFront}>Bring to Front</button>
      <button onClick={sendToBack}>Send to Back</button>
      <button onClick={bringForward}>Bring Forward</button>
      <button onClick={sendBackwards}>Send Backwards</button>
      <button onClick={() => enableDrawing(canvas)}>Enable Drawing</button>
      <button onClick={() => disableDrawing(canvas)}>Disable Drawing</button>
      <select
        className="bg-black text-white p-2 rounded"
        onChange={(event) => {
          switch (event.target.value) {
            case "Rectangle":
              addRect(canvas);
              break;
            case "Circle":
              addCircle(canvas);
              break;
            case "Triangle":
              addTriangle(canvas);
              break;
            case "Ellipse":
              addEllipse(canvas);
              break;
            case "Line":
              addLine(canvas);
              break;
            case "Polygon":
              addPolygon(canvas);
              break;
            default:
              break;
          }
        }}
      >
        <option value="">Select shape</option>
        <option value="Rectangle">Rectangle</option>
        <option value="Circle">Circle</option>
        <option value="Triangle">Triangle</option>
        <option value="Ellipse">Ellipse</option>
        <option value="Line">Line</option>
        <option value="Polygon">Polygon</option>
      </select>
      <input
        type="color"
        id="colorPicker"
        name="colorPicker"
        value={color}
        onChange={handleColorChange}
      />
      <canvas id="canvas" />
    </div>
  );
};

export default App;
