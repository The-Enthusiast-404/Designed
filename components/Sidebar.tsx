import React from "react";
import { GrTemplate } from "react-icons/gr";
import { MdOutlineDraw } from "react-icons/md";
import { CiText } from "react-icons/ci";
import { IoImageSharp } from "react-icons/io5";
import { fabric } from "fabric";
import { LuShapes } from "react-icons/lu";
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
import image1 from "@/images/carbon(6).png";
import image2 from "@/images/carbon(7).png";
import image3 from "@/images/carbon(8).png";

import {
  FaRegSquare,
  FaRegCircle,
  FaRegHeart,
  FaRegArrowAltCircleRight,
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaRegDotCircle,
  FaRegTimesCircle,
  FaRegCheckCircle,
  FaPlusCircle,
  FaMinusCircle,
} from "react-icons/fa";

import { IoTriangle } from "react-icons/io5";

const Sidebar = ({
  canvas,
  toggleDrawing,
  addText,
  addImage,
  isLocked,
}: {
  canvas: fabric.Canvas; // specify the type of canvas here
  toggleDrawing?: (canvas: fabric.Canvas) => void;
  addText?: (canvas: fabric.Canvas) => void; // specify the type of canvas here
  addImage?: () => void;
  isLocked?: boolean;
}) => {
  // ...
  const images = [image1, image2 /*, the rest of your images... */];

  const shapes = [
    { type: "rectangle", icon: FaRegSquare },
    { type: "circle", icon: FaRegCircle },
    { type: "triangle", icon: IoTriangle },
    { type: "ellipse", icon: FaRegHeart },
    { type: "arrowRight", icon: FaRegArrowAltCircleRight },
    { type: "arrowLeft", icon: FaRegArrowAltCircleLeft },
    { type: "arrowUp", icon: FaRegArrowAltCircleUp },
    { type: "arrowDown", icon: FaRegArrowAltCircleDown },
    { type: "dot", icon: FaRegDotCircle },
    { type: "cross", icon: FaRegTimesCircle },
    { type: "check", icon: FaRegCheckCircle },
    { type: "plus", icon: FaPlusCircle },
    { type: "minus", icon: FaMinusCircle },

    // Add objects for other shapes...
  ];
  // Add objects for other shapes...

  const addShapeToCanvas = (shape: string) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    if (!canvas) return;

    let shapeInstance;
    switch (shape) {
      case "rectangle":
        shapeInstance = new fabric.Rect({
          width: 60,
          height: 70,
          fill: "#D81B60",
          left: 10,
          top: 10,
        });
        break;
      case "circle":
        shapeInstance = new fabric.Circle({
          radius: 30,
          fill: "#1E88E5",
          left: 10,
          top: 10,
        });
        break;
      case "triangle":
        shapeInstance = new fabric.Triangle({
          width: 60,
          height: 70,
          fill: "#43A047",
          left: 10,
          top: 10,
        });
        break;
      case "ellipse":
        shapeInstance = new fabric.Ellipse({
          rx: 45,
          ry: 25,
          fill: "#FDD835",
          left: 10,
          top: 10,
        });
        break;
      case "arrowRight":
        shapeInstance = new fabric.Path("M 0 0 L 50 50 L 0 100 z", {
          fill: "#3949AB",
          left: 10,
          top: 10,
        });
        break;
      case "arrowLeft":
        shapeInstance = new fabric.Path("M 50 0 L 0 50 L 50 100 z", {
          fill: "#3949AB",
          left: 10,
          top: 10,
        });
        break;
      case "arrowUp":
        shapeInstance = new fabric.Path("M 0 50 L 50 0 L 100 50 z", {
          fill: "#3949AB",
          left: 10,
          top: 10,
        });
        break;
      case "arrowDown":
        shapeInstance = new fabric.Path("M 0 0 L 50 50 L 100 0 z", {
          fill: "#3949AB",
          left: 10,
          top: 10,
        });
        break;
      case "dot":
        shapeInstance = new fabric.Circle({
          radius: 5,
          fill: "#6D4C41",
          left: 10,
          top: 10,
        });
        break;
      case "cross":
        shapeInstance = new fabric.Path("M 0 0 L 100 100 M 100 0 L 0 100", {
          stroke: "#F4511E",
          strokeWidth: 5,
          fill: "",
          left: 10,
          top: 10,
        });
        break;
      case "check":
        shapeInstance = new fabric.Path("M 0 50 L 50 100 L 100 0", {
          stroke: "#F4511E",
          strokeWidth: 5,
          fill: "",
          left: 10,
          top: 10,
        });
        break;
      case "plus":
        shapeInstance = new fabric.Path("M 50 0 L 50 100 M 0 50 L 100 50", {
          stroke: "#F4511E",
          strokeWidth: 5,
          fill: "",
          left: 10,
          top: 10,
        });
        break;
      case "minus":
        shapeInstance = new fabric.Path("M 0 50 L 100 50", {
          stroke: "#F4511E",
          strokeWidth: 5,
          fill: "",
          left: 10,
          top: 10,
        });
        break;
      // Add cases for other shapes...
    }

    if (shapeInstance) {
      canvas.add(shapeInstance);
    }
  };

  const addToCanvas = (imageSrc, canvas: fabric.Canvas) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    if (!canvas) return;

    let imgElement = new Image();
    imgElement.src = imageSrc;
    imgElement.onload = function () {
      let imgInstance = new fabric.Image(imgElement, {
        scaleX: 0.5,
        scaleY: 0.5,
      });
      canvas.add(imgInstance);
    };
  };

  return (
    <div className="flex flex-col justify-start items-center gap-10 bg-gray-800 p-4 border-r border-gray-800 text-white">
      <button className="mb-4 font-bold text-lg">
        <GrTemplate size={50} />
      </button>
      <button onClick={() => toggleDrawing && toggleDrawing(canvas)}>
        <MdOutlineDraw size={64} />
      </button>
      <button onClick={() => addText && addText(canvas)}>
        <CiText size={64} />
      </button>
      <Drawer>
        <DrawerTrigger>
          <LuShapes size={64} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Select a Shape</DrawerTitle>
            <DrawerDescription>
              choose shape to add it to the canvas
            </DrawerDescription>
          </DrawerHeader>

          <div
            style={{
              display: "flex", // Use Flexbox
              flexWrap: "wrap", // Allow the items to wrap to the next line
              justifyContent: "start", // Distribute items evenly
            }}
          >
            {shapes.map((shape, index) => {
              const Icon = shape.icon;
              return (
                <div
                  key={index}
                  onClick={() => addShapeToCanvas(shape.type)}
                  style={{
                    margin: "5px", // Add a small margin around the items
                    display: "flex", // Use Flexbox
                    justifyContent: "start", // Center the items
                  }}
                >
                  <Icon size={100} /> {/* Increase the size of the icons */}
                </div>
              );
            })}
          </div>
        </DrawerContent>
      </Drawer>
      <Drawer>
        <DrawerTrigger>
          <IoImageSharp size={64} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>

          {/* Scrollable list of images */}
          <div
            style={{
              display: "flex", // Use Flexbox
              flexWrap: "wrap", // Allow the items to wrap to the next line
              overflowY: "scroll", // Make the content scrollable
              maxHeight: "200px", // Set a max height
            }}
          >
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={`Image ${index}`}
                onClick={() => addToCanvas(image.src, canvas)} // Make sure the click event handler is set up correctly
                style={{
                  width: "calc(33.33% - 10px)", // Set the width of the images to fill 1/3 of the container, minus a small margin
                  margin: "5px", // Add a small margin around the images
                  cursor: "pointer", // Change the cursor to a pointer when hovering over the images
                }}
              />
            ))}
          </div>

          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Sidebar;
