import React from "react";
import Image from "next/image";
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
  addQuoteTemplate,
}: {
  canvas: fabric.Canvas; // specify the type of canvas here
  toggleDrawing?: (canvas: fabric.Canvas) => void;
  addText?: (canvas: fabric.Canvas) => void; // specify the type of canvas here
  addImage?: () => void;
  isLocked?: boolean;
  addQuoteTemplate?: () => void;
}) => {
  // ...
  // const images = [
  //   TechIcon1,
  //   TechIcon2,
  //   TechIcon3,
  //   TechIcon4,
  //   TechIcon5,
  //   TechIcon6,
  //   TechIcon7,
  //   TechIcon8,
  //   TechIcon9,
  //   TechIcon10,
  //   TechIcon11,
  //   TechIcon12,
  //   TechIcon13,
  //   TechIcon14,
  //   TechIcon15,
  //   TechIcon16,
  //   TechIcon17,
  //   TechIcon18,
  //   TechIcon19,
  //   TechIcon20,
  //   TechIcon21,
  //   TechIcon22,
  //   TechIcon23,
  //   TechIcon24,
  //   TechIcon25,
  //   TechIcon26,
  //   TechIcon27,
  //   TechIcon28,
  // ];

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
      <button onClick={addQuoteTemplate} className="mb-4 font-bold text-lg">
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
              flexDirection: "column", // Stack the items vertically
              gap: "20px", // Add space between the items
              overflowY: "scroll", // Make the content scrollable
              padding: "10px", // Add some padding
            }}
          >
            <h1>Tech Icons</h1>
            <div
              style={{
                display: "flex", // Use Flexbox
                flexWrap: "wrap", // Allow the items to wrap to the next line
                gap: "10px", // Add space between the items
              }}
            >
              {Array.from({ length: 28 }).map((_, index) => (
                <Image
                  src={`/images/tech-icons/tech_icon_${index + 1}.svg`}
                  width="64"
                  height="64"
                  alt={`Image ${index}`}
                  onClick={() =>
                    addSVGToCanvas(
                      `/images/tech-icons/tech_icon_${index + 1}.svg`,
                      canvas
                    )
                  }
                />
              ))}
            </div>

            <h1>Engineering Icons</h1>
            <div
              style={{
                display: "flex", // Use Flexbox
                flexWrap: "wrap", // Allow the items to wrap to the next line
                gap: "10px", // Add space between the items
              }}
            >
              {Array.from({ length: 62 }).map((_, index) => (
                <Image
                  src={`/images/engineering-icons/engineering_icon_${
                    index + 1
                  }.svg`}
                  width="64"
                  height="64"
                  alt={`Image ${index}`}
                  onClick={() =>
                    addSVGToCanvas(
                      `/images/engineering-icons/engineering_icon_${
                        index + 1
                      }.svg`,
                      canvas
                    )
                  }
                />
              ))}
            </div>

            <h1>Military Icons</h1>
            <div
              style={{
                display: "flex", // Use Flexbox
                flexWrap: "wrap", // Allow the items to wrap to the next line
                gap: "10px", // Add space between the items
              }}
            >
              {Array.from({ length: 50 }).map((_, index) => (
                <Image
                  src={`/images/military-icons/military_icon_${index + 1}.svg`}
                  width="64"
                  height="64"
                  alt={`Image ${index}`}
                  onClick={() =>
                    addSVGToCanvas(
                      `/images/military-icons/military_icon_${index + 1}.svg`,
                      canvas
                    )
                  }
                />
              ))}
            </div>
            <h1>Science Icons</h1>
            <div
              style={{
                display: "flex", // Use Flexbox
                flexWrap: "wrap", // Allow the items to wrap to the next line
                gap: "10px", // Add space between the items
              }}
            >
              {Array.from({ length: 50 }).map((_, index) => (
                <Image
                  src={`/images/science-icons/science_icon_${index + 1}.svg`}
                  width="64"
                  height="64"
                  alt={`Image ${index}`}
                  onClick={() =>
                    addSVGToCanvas(
                      `/images/science-icons/science_icon_${index + 1}.svg`,
                      canvas
                    )
                  }
                />
              ))}
            </div>
            <h1>Arrow Icons</h1>
            <div
              style={{
                display: "flex", // Use Flexbox
                flexWrap: "wrap", // Allow the items to wrap to the next line
                gap: "10px", // Add space between the items
              }}
            >
              {Array.from({ length: 200 }).map((_, index) => (
                <Image
                  src={`/images/arrow-icons/arrow_icon_${index + 1}.svg`}
                  width="64"
                  height="64"
                  alt={`Image ${index}`}
                  onClick={() =>
                    addSVGToCanvas(
                      `/images/arrow-icons/arrow_icon_${index + 1}.svg`,
                      canvas
                    )
                  }
                />
              ))}
            </div>
            <h1>Sports Equipment Icons</h1>
            <div
              style={{
                display: "flex", // Use Flexbox
                flexWrap: "wrap", // Allow the items to wrap to the next line
                gap: "10px", // Add space between the items
              }}
            >
              {Array.from({ length: 98 }).map((_, index) => (
                <Image
                  src={`/images/sports-equipment-icons/sports_equipment_icon_${
                    index + 1
                  }.svg`}
                  width="64"
                  height="64"
                  alt={`Image ${index}`}
                  onClick={() =>
                    addSVGToCanvas(
                      `/images/sports-equipment-icons/sports_equipment_icon_${
                        index + 1
                      }.svg`,
                      canvas
                    )
                  }
                />
              ))}
            </div>
            <h1>Travel Icons</h1>
            <div
              style={{
                display: "flex", // Use Flexbox
                flexWrap: "wrap", // Allow the items to wrap to the next line
                gap: "10px", // Add space between the items
              }}
            >
              {Array.from({ length: 98 }).map((_, index) => (
                <Image
                  src={`/images/travel-flat-icons/travel_flat_icon_${
                    index + 1
                  }.svg`}
                  width="64"
                  height="64"
                  alt={`Image ${index}`}
                  onClick={() =>
                    addSVGToCanvas(
                      `/images/travel-flat-icons/travel_flat_icon_${
                        index + 1
                      }.svg`,
                      canvas
                    )
                  }
                />
              ))}
            </div>

            <h1>Business People Icons</h1>
            <div
              style={{
                display: "flex", // Use Flexbox
                flexWrap: "wrap", // Allow the items to wrap to the next line
                gap: "10px", // Add space between the items
              }}
            >
              {Array.from({ length: 62 }).map((_, index) => (
                <Image
                  src={`/images/business-people-icons/business_people_icon_${
                    index + 1
                  }.svg`}
                  width="64"
                  height="64"
                  alt={`Image ${index}`}
                  onClick={() =>
                    addSVGToCanvas(
                      `/images/business-people-icons/business_people_icon_${
                        index + 1
                      }.svg`,
                      canvas
                    )
                  }
                />
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Sidebar;
