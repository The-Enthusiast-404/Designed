"use client"; // next.js app router

import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

const App = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [color, setColor] = useState("#2BEBC8");

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
      stroke: "#2BEBC8",
    });
    canvas?.add(rect);
    canvas?.requestRenderAll();
  };

  const addCircle = (canvas?: fabric.Canvas) => {
    const circle = new fabric.Circle({
      radius: 100,
      stroke: "#2BEBC8",
    });
    canvas?.add(circle);
    canvas?.requestRenderAll();
  };

  const addTriangle = (canvas?: fabric.Canvas) => {
    const triangle = new fabric.Triangle({
      width: 200,
      height: 280,
      stroke: "#2BEBC8",
    });
    canvas?.add(triangle);
    canvas?.requestRenderAll();
  };
  const addEllipse = (canvas?: fabric.Canvas) => {
    const ellipse = new fabric.Ellipse({
      rx: 100,
      ry: 50,
      stroke: "#2BEBC8",
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
        stroke: "#2BEBC8",
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

  return (
    <div>
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
