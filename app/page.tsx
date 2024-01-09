"use client"; // next.js app router

import React, { useState, useEffect } from "react";
import { fabric } from "fabric";

const App = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas>();

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

  return (
    <div>
      <button onClick={() => addRect(canvas)}>Rectangle</button>
      <canvas id="canvas" />
    </div>
  );
};

export default App;
