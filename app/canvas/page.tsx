"use client"; // next.js app router

import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import CanvasComponent from "@/components/CanvasComponent";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

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
  const images = [
    /*, the rest of your images... */
  ];
  // console.log(images);

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

  const gridSize = 20;

  useEffect(() => {
    if (canvas) {
      canvas.on("object:moving", function (options) {
        // Snap to grid
        options.target.set({
          left: Math.round(options.target.left / gridSize) * gridSize,
          top: Math.round(options.target.top / gridSize) * gridSize,
        });

        // Remove existing guide lines
        canvas.getObjects("line").forEach(function (line) {
          canvas.remove(line);
        });

        // Calculate object positions
        const movingObjPos = options.target.getCenterPoint();

        // Calculate distances from the center of the canvas
        const distanceX = Math.abs(movingObjPos.x - canvas.width / 2);
        const distanceY = Math.abs(movingObjPos.y - canvas.height / 2);

        // Check if the moving object is close to the center of the canvas
        if (distanceX <= gridSize && distanceY <= gridSize) {
          // Add vertical guide line
          let line = new fabric.Line(
            [canvas.width / 2, 0, canvas.width / 2, canvas.height],
            {
              stroke: "#000",
              selectable: false,
              type: "line",
            }
          );
          canvas.add(line);

          // Add horizontal guide line
          line = new fabric.Line(
            [0, canvas.height / 2, canvas.width, canvas.height / 2],
            {
              stroke: "#000",
              selectable: false,
              type: "line",
            }
          );
          canvas.add(line);
        }
      });
    }
  }, [canvas]);

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

  const toggleLock = () => {
    setIsLocked(!isLocked);
    if (canvas) {
      canvas.forEachObject((obj) => {
        obj.selectable = isLocked;
        obj.evented = isLocked;
      });
      canvas.renderAll();
    }
    if (isDrawingEnabled) {
      toggleDrawing(canvas);
    }
  };

  const groupObjects = (canvas?: fabric.Canvas) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to group objects.");
      return;
    }
    if (!canvas) return;
    if (!canvas.getActiveObject()) {
      alert("Please select some objects to group.");
      return;
    }
    if (canvas.getActiveObject().type !== "activeSelection") {
      alert("Please select more than one object to group.");
      return;
    }
    let activeSelection = canvas.getActiveObject() as fabric.ActiveSelection;
    let group = activeSelection.toGroup();
    canvas.requestRenderAll();
  };

  const ungroupObjects = (canvas?: fabric.Canvas) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to ungroup objects.");
      return;
    }
    if (!canvas) return;
    if (!canvas.getActiveObject()) {
      alert("Please select a group to ungroup.");
      return;
    }
    if (canvas.getActiveObject().type !== "group") {
      alert("Please select a group to ungroup.");
      return;
    }
    let group = canvas.getActiveObject() as fabric.Group;
    group.toActiveSelection();
    canvas.requestRenderAll();
  };

  return (
    <div className="flex h-screen text-black">
      {/* Sidebar */}
      {canvas && (
        <Sidebar
          canvas={canvas}
          toggleDrawing={toggleDrawing}
          addImage={addImage}
          addText={addText}
          isLocked={isLocked}
        />
      )}

      {/* Canvas */}
      <div className="flex flex-col gap-20 flex-grow justify-start items-center">
        {
          <Topbar
            canvas={canvas}
            handleBrushColorChange={handleBrushColorChange}
            handleCanvasColorChange={handleCanvasColorChange}
            toggleLock={toggleLock}
            setBrushWidth={setBrushWidth}
            isLocked={isLocked}
          />
        }
        <CanvasComponent />
      </div>
      <Button onClick={() => groupObjects(canvas)}>Group</Button>
      <Button onClick={() => ungroupObjects(canvas)}>Ungroup</Button>
    </div>
  );
};

export default Canvas;
