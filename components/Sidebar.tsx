import React from "react";
import { GrTemplate } from "react-icons/gr";
import { MdOutlineDraw } from "react-icons/md";
import { CiText } from "react-icons/ci";
import { IoImageSharp } from "react-icons/io5";
import { fabric } from "fabric";
import { LuShapes } from "react-icons/lu";
import TechIcon1 from "@/public/images/tech-icons/tech_icon_1.svg";
import TechIcon2 from "@/public/images/tech-icons/tech_icon_2.svg";
import TechIcon3 from "@/public/images/tech-icons/tech_icon_3.svg";
import TechIcon4 from "@/public/images/tech-icons/tech_icon_4.svg";
import TechIcon5 from "@/public/images/tech-icons/tech_icon_5.svg";
import TechIcon6 from "@/public/images/tech-icons/tech_icon_6.svg";
import TechIcon7 from "@/public/images/tech-icons/tech_icon_7.svg";
import TechIcon8 from "@/public/images/tech-icons/tech_icon_8.svg";
import TechIcon9 from "@/public/images/tech-icons/tech_icon_9.svg";
import TechIcon10 from "@/public/images/tech-icons/tech_icon_10.svg";
import TechIcon11 from "@/public/images/tech-icons/tech_icon_11.svg";
import TechIcon12 from "@/public/images/tech-icons/tech_icon_12.svg";
import TechIcon13 from "@/public/images/tech-icons/tech_icon_13.svg";
import TechIcon14 from "@/public/images/tech-icons/tech_icon_14.svg";
import TechIcon15 from "@/public/images/tech-icons/tech_icon_15.svg";
import TechIcon16 from "@/public/images/tech-icons/tech_icon_16.svg";
import TechIcon17 from "@/public/images/tech-icons/tech_icon_17.svg";
import TechIcon18 from "@/public/images/tech-icons/tech_icon_18.svg";
import TechIcon19 from "@/public/images/tech-icons/tech_icon_19.svg";
import TechIcon20 from "@/public/images/tech-icons/tech_icon_20.svg";
import TechIcon21 from "@/public/images/tech-icons/tech_icon_21.svg";
import TechIcon22 from "@/public/images/tech-icons/tech_icon_22.svg";
import TechIcon23 from "@/public/images/tech-icons/tech_icon_23.svg";
import TechIcon24 from "@/public/images/tech-icons/tech_icon_24.svg";
import TechIcon25 from "@/public/images/tech-icons/tech_icon_25.svg";
import TechIcon26 from "@/public/images/tech-icons/tech_icon_26.svg";
import TechIcon27 from "@/public/images/tech-icons/tech_icon_27.svg";
import TechIcon28 from "@/public/images/tech-icons/tech_icon_28.svg";

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
  const images = [
    TechIcon1,
    TechIcon2,
    TechIcon3,
    TechIcon4,
    TechIcon5,
    TechIcon6,
    TechIcon7,
    TechIcon8,
    TechIcon9,
    TechIcon10,
    TechIcon11,
    TechIcon12,
    TechIcon13,
    TechIcon14,
    TechIcon15,
    TechIcon16,
    TechIcon17,
    TechIcon18,
    TechIcon19,
    TechIcon20,
    TechIcon21,
    TechIcon22,
    TechIcon23,
    TechIcon24,
    TechIcon25,
    TechIcon26,
    TechIcon27,
    TechIcon28,
  ];

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

  const addSVGToCanvas = (imageSrc: string, canvas: fabric.Canvas) => {
    if (isLocked) {
      alert("The canvas is locked. Unlock it to add new shapes.");
      return;
    }
    if (!canvas) return;

    fabric.loadSVGFromURL(imageSrc, function (objects, options) {
      var img = fabric.util.groupSVGElements(objects, options);
      canvas.add(img).renderAll();
    });
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
            <DrawerTitle>Select an icon</DrawerTitle>
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
                onClick={() => addSVGToCanvas(image.src, canvas)} // Make sure the click event handler is set up correctly
                style={{
                  width: "5%", // Set the width of the images to fill 1/3 of the container, minus a small margin
                  margin: "5px", // Add a small margin around the images
                  cursor: "pointer", // Change the cursor to a pointer when hovering over the images
                }}
              />
            ))}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Sidebar;
