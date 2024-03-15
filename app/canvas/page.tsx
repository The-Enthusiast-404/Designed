"use client"; // next.js app router

import React, { useState, useEffect, useRef } from "react";
import { fabric } from "fabric";
import CanvasComponent from "@/components/CanvasComponent";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import BrushOptions from "@/components/BrushOptions";
import { useSearchParams } from "next/navigation";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import TextOptions from "@/components/TextOptions";

const Canvas = () => {
  const params = useSearchParams();
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
  const [brushOpacity, setBrushOpacity] = useState(1);
  const [brushSize, setBrushSize] = useState(1);
  const canvasRef = useRef(null);
  const [textOptionsVisible, setTextOptionsVisible] = useState(false); // State to toggle visibility of text options
  const [selectedTextObject, setSelectedTextObject] =
    useState<fabric.Textbox | null>(null); // State to store selected text object
  // Add state to hold the uploaded image file
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

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
    const canvas = new fabric.Canvas("canvas", {
      height: Number(params.get("pageHeight")) * Number(params.get("scale")),
      width: Number(params.get("pageWidth")) * Number(params.get("scale")),

      backgroundColor: canvasColor,
    });

    // settings for all canvas in the app
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#2BEBC8";
    fabric.Object.prototype.cornerStyle = "rect";
    fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
    fabric.Object.prototype.cornerSize = 6;

    setCanvas(canvas);

    const guidelines = [];

    canvas.on("object:moving", function (e) {
      let activeObject = e.target;

      // Remove existing guidelines
      removeGuidelines();

      // Check against all objects on the canvas
      canvas.getObjects().forEach(function (object) {
        if (object === activeObject || object.type === "line") return;

        // Calculate object positions
        let activeObjectPos = activeObject.getCenterPoint();
        let objectPos = object.getCenterPoint();

        // Calculate distances to the edges and center of the other object
        let distanceToLeftEdge = Math.abs(activeObjectPos.x - object.left);
        let distanceToRightEdge = Math.abs(
          activeObjectPos.x - (object.left + object.width)
        );
        let distanceToTopEdge = Math.abs(activeObjectPos.y - object.top);
        let distanceToBottomEdge = Math.abs(
          activeObjectPos.y - (object.top + object.height)
        );
        let distanceToCenterX = Math.abs(activeObjectPos.x - objectPos.x);
        let distanceToCenterY = Math.abs(activeObjectPos.y - objectPos.y);

        // Snap to the edges and center of the other object
        if (distanceToLeftEdge < 10) {
          activeObject
            .set({ left: object.left - activeObject.width / 2 })
            .setCoords();
          addGuideline(object.left * canvas.getZoom(), null);
        }
        if (distanceToRightEdge < 10) {
          activeObject
            .set({ left: object.left + object.width - activeObject.width / 2 })
            .setCoords();
          addGuideline((object.left + object.width) * canvas.getZoom(), null);
        }
        if (distanceToTopEdge < 10) {
          activeObject
            .set({ top: object.top - activeObject.height / 2 })
            .setCoords();
          addGuideline(null, object.top * canvas.getZoom());
        }
        if (distanceToBottomEdge < 10) {
          activeObject
            .set({ top: object.top + object.height - activeObject.height / 2 })
            .setCoords();
          addGuideline(null, (object.top + object.height) * canvas.getZoom());
        }
        if (distanceToCenterX < 10) {
          activeObject
            .set({ left: objectPos.x - activeObject.width / 2 })
            .setCoords();
          addGuideline(objectPos.x * canvas.getZoom(), null);
        }
        if (distanceToCenterY < 10) {
          activeObject
            .set({ top: objectPos.y - activeObject.height / 2 })
            .setCoords();
          addGuideline(null, objectPos.y * canvas.getZoom());
        }
      });

      // Check if the moving object is close to the edges of the canvas
      if (Math.abs(activeObject.left) < 10) {
        activeObject.set({ left: 0 }).setCoords();
        addGuideline(0, null);
      }
      if (Math.abs(activeObject.top) < 10) {
        activeObject.set({ top: 0 }).setCoords();
        addGuideline(null, 0);
      }
      if (
        Math.abs(
          activeObject.left + activeObject.getScaledWidth() - canvas.width
        ) < 10
      ) {
        activeObject
          .set({ left: canvas.width - activeObject.getScaledWidth() })
          .setCoords();
        addGuideline(canvas.width, null);
      }
      if (
        Math.abs(
          activeObject.top + activeObject.getScaledHeight() - canvas.height
        ) < 10
      ) {
        activeObject
          .set({ top: canvas.height - activeObject.getScaledHeight() })
          .setCoords();
        addGuideline(null, canvas.height);
      }
    });

    // Listen to deselection or clicking outside of objects
    canvas.on("selection:cleared", function () {
      removeGuidelines();
    });

    function addGuideline(x, y) {
      if (x !== null) {
        let line = new fabric.Line([x, 0, x, canvas.height], {
          stroke: "#00f",
          selectable: false,
          evented: false,
        });
        guidelines.push(line);
        canvas.add(line);
      }

      if (y !== null) {
        let line = new fabric.Line([0, y, canvas.width, y], {
          stroke: "#00f",
          selectable: false,
          evented: false,
        });
        guidelines.push(line);
        canvas.add(line);
      }
    }

    function removeGuidelines() {
      guidelines.forEach((guideline) => canvas.remove(guideline));
      guidelines.length = 0;
    }

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    // Add event listener for selection
    canvas?.on("selection:created", handleSelection);
    canvas?.on("selection:updated", handleSelection);
    canvas?.on("selection:cleared", handleSelectionCleared);
    return () => {
      // Remove event listener on cleanup
      canvas?.off("selection:created", handleSelection);
      canvas?.off("selection:updated", handleSelection);
      canvas?.off("selection:cleared", handleSelectionCleared);
    };
  }, [canvas]);

  // Function to handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedImage(file);
    }
  };

  // Use the uploadedImage state to add the image to the canvas
  useEffect(() => {
    if (uploadedImage && canvas) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        fabric.Image.fromURL(imageUrl as string, (img) => {
          img.set({ scaleX: 0.5, scaleY: 0.5 }); // Adjust scale as needed
          canvas.add(img);
          canvas.renderAll();
        });
      };
      reader.readAsDataURL(uploadedImage);
    }
  }, [uploadedImage, canvas]);

  const handleSelection = () => {
    // Check if the selected object is a text box
    const activeObject = canvas?.getActiveObject();
    if (activeObject && activeObject.type === "textbox") {
      setSelectedTextObject(activeObject as fabric.Textbox);
      setTextOptionsVisible(true);
    }
  };

  const handleSelectionCleared = () => {
    // Reset text options when selection is cleared
    setTextOptionsVisible(false);
    setSelectedTextObject(null);
  };

  const handleTextSizeChange = (size: number) => {
    if (selectedTextObject) {
      selectedTextObject.set("fontSize", size);
      canvas?.requestRenderAll();
    }
  };

  const handleTextColorChange = (color: string) => {
    const selectedObject = canvas?.getActiveObject();
    if (selectedObject && selectedObject.type === "textbox") {
      selectedObject.set("stroke", color);
      selectedObject.set("fill", color);
      canvas?.requestRenderAll();
    }
  };

  const handleFontStyleChange = (style: string) => {
    if (selectedTextObject) {
      switch (style) {
        case "bold":
          selectedTextObject.set(
            "fontWeight",
            selectedTextObject.fontWeight === "bold" ? "normal" : "bold"
          );
          break;
        case "italic":
          selectedTextObject.set(
            "fontStyle",
            selectedTextObject.fontStyle === "italic" ? "normal" : "italic"
          );
          break;
        case "underline":
          selectedTextObject.set("underline", !selectedTextObject.underline);
          break;
        case "strikethrough":
          selectedTextObject.set(
            "linethrough",
            !selectedTextObject.linethrough
          );
          break;
        default:
          break;
      }
      canvas?.requestRenderAll();
    }
  };

  const handleTextTransformChange = (transform: string) => {
    if (selectedTextObject) {
      let textTransform: string = "";
      if (transform === "uppercase") {
        textTransform = selectedTextObject.text.toUpperCase();
      } else if (transform === "lowercase") {
        textTransform = selectedTextObject.text.toLowerCase();
      }
      selectedTextObject.set("text", textTransform);
      canvas?.requestRenderAll();
    }
  };

  const handleFontFamilyChange = (fontFamily: string) => {
    if (selectedTextObject) {
      selectedTextObject.set("fontFamily", fontFamily);
      canvas?.requestRenderAll();
    }
  };

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

  // const handleBrushColorChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   if (isLocked) {
  //     alert("The canvas is locked. Unlock it to add new shapes.");
  //     return;
  //   }
  //   const selectedObject = canvas?.getActiveObject();
  //   if (selectedObject) {
  //     selectedObject.set({ stroke: event.target.value });
  //     canvas?.requestRenderAll();
  //     setBrushColor(event.target.value); // Update the color state
  //   }
  //   setBrushColor(event.target.value); // Update the brush color state
  //   if (canvas?.isDrawingMode) {
  //     canvas.freeDrawingBrush.color = event.target.value; // Update the color of the brush directly
  //   }
  // };

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
      fontSize: 12,
      height: 280,
      stroke: "#000",
      fill: "#000",
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

  function addQuoteTemplate() {
    // Add a background image
    fabric.Image.fromURL(
      "https://picsum.photos/800/600", // generates a random 800x600 image
      (img) => {
        img.set({
          left: 0,
          top: 0,
          scaleX: canvas.width / img.width,
          scaleY: canvas.height / img.height,
        });
        canvas.setBackgroundImage(
          img,
          () => {
            // Add a text element
            const text = new fabric.IText("Your quote here", {
              left: canvas.width / 2,
              top: canvas.height / 2,
              fontSize: 20,
              textAlign: "center",
              originX: "center",
              originY: "center",
            });
            canvas.add(text);

            canvas.renderAll();
          },
          {
            backgroundImageOpacity: 0.5,
            backgroundImageStretch: true,
          }
        );
      },
      { crossOrigin: "anonymous" } // needed to avoid CORS issues
    );
  }

  const handleBrushChange = (brushType: string) => {
    if (!canvas) return;
    switch (brushType) {
      case "highlighter":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = 30; // wider brush width
        canvas.freeDrawingBrush.color = "#ffff00"; // yellow color
        break;
      case "pen":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = 5; // narrower brush width
        canvas.freeDrawingBrush.color = "#000000"; // black color
        break;
      case "pencil":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = 2; // very narrow brush width
        canvas.freeDrawingBrush.color = "#000000"; // black color
        break;
      case "brush":
        canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
        canvas.freeDrawingBrush.width = 10; // medium brush width
        canvas.freeDrawingBrush.color = "#000000"; // black color
        break;
      case "marker":
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = 10; // medium brush width
        canvas.freeDrawingBrush.color = "#ff0000"; // red color
        break;
      default:
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.width = 5; // default brush width
        canvas.freeDrawingBrush.color = "#000000"; // default brush color
        break;
    }
    if (canvas.freeDrawingBrush) {
      const color = new fabric.Color(canvas.freeDrawingBrush.color);
      setBrushOpacity(color.getAlpha());
    }
    if (canvas.freeDrawingBrush) {
      setBrushSize(canvas.freeDrawingBrush.width);
    }
  };

  const handleOpacityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !canvas.freeDrawingBrush) return;
    const opacity = parseFloat(event.target.value);
    const color = new fabric.Color(canvas.freeDrawingBrush.color);
    color.setAlpha(opacity);
    canvas.freeDrawingBrush.color = color.toRgba();
    setBrushOpacity(opacity);
  };

  const handleBrushColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!canvas || !canvas.freeDrawingBrush) return;
    canvas.freeDrawingBrush.color = event.target.value;
  };

  const handleBrushSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!canvas || !canvas.freeDrawingBrush) return;
    const size = parseInt(event.target.value, 10);
    canvas.freeDrawingBrush.width = size;
    setBrushSize(size);
  };

  function handleDelete() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      canvas.renderAll();
    }
  }

  function handleClone() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.clone((cloned) => {
        canvas.add(cloned);
        cloned
          .set({ left: cloned.left + 10, top: cloned.top + 10 })
          .setCoords();
        canvas.renderAll();
      });
    }
  }

  let copiedObject = null;

  function handleCopy() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      copiedObject = fabric.util.object.clone(activeObject);
    }
  }

  function handlePaste() {
    if (copiedObject) {
      copiedObject.clone((cloned) => {
        canvas.add(cloned);
        cloned
          .set({ left: cloned.left + 10, top: cloned.top + 10 })
          .setCoords();
        canvas.renderAll();
      });
    }
  }

  const clearCanvas = () => {
    if (canvas) {
      canvas.clear();
    }
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
          addQuoteTemplate={addQuoteTemplate}
          uploadImage={handleImageUpload}
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
        <ContextMenu>
          <ContextMenuTrigger>
            <CanvasComponent />
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onSelect={sendBackwards}>
              Send Backward
            </ContextMenuItem>
            <ContextMenuItem onSelect={bringForward}>
              Bring Forward
            </ContextMenuItem>
            <ContextMenuItem onSelect={sendToBack}>
              Send to Back
            </ContextMenuItem>
            <ContextMenuItem onSelect={bringToFront}>
              Send to Front
            </ContextMenuItem>
            <ContextMenuItem onSelect={handleDelete}>Delete</ContextMenuItem>
            <ContextMenuItem onSelect={handleClone}>Clone</ContextMenuItem>
            <ContextMenuItem onSelect={handleCopy}>Copy</ContextMenuItem>
            <ContextMenuItem onSelect={handlePaste}>Paste</ContextMenuItem>
            <ContextMenuItem onSelect={clearCanvas}>Delete All</ContextMenuItem>
            <ContextMenuItem onSelect={() => groupObjects(canvas)}>
              Group
            </ContextMenuItem>
            <ContextMenuItem onSelect={() => ungroupObjects(canvas)}>
              Ungroup
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        {isDrawingEnabled && (
          <BrushOptions
            handleBrushChange={handleBrushChange}
            handleOpacityChange={handleOpacityChange}
            handleBrushColorChange={handleBrushColorChange}
            handleBrushSizeChange={handleBrushSizeChange}
            brushOpacity={brushOpacity}
            brushSize={brushSize}
          />
        )}

        {textOptionsVisible && (
          <TextOptions
            handleFontStyleChange={handleFontStyleChange}
            handleTextTransformChange={handleTextTransformChange}
            handleFontFamilyChange={handleFontFamilyChange}
            handleTextSizeChange={handleTextSizeChange}
            handleTextColorChange={handleTextColorChange}
          />
        )}
      </div>
    </div>
  );
};

export default Canvas;
