import React from "react";
import { GrTemplate } from "react-icons/gr";
import { MdOutlineDraw } from "react-icons/md";
import { CiText } from "react-icons/ci";
import { IoImageSharp } from "react-icons/io5";
import { fabric } from "fabric";
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
