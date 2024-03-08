"use client";
import Link from "next/link";
import React from "react";

const canvasSizes = [
  { width: 800, height: 600, label: "4:3" },
  { width: 1280, height: 720, label: "16:9" },
  { width: 1080, height: 1080, label: "1:1" },
];

const LandingPage = () => {
  const handleCanvasSizeClick = (width: number, height: number) => {
    console.log("handleCanvasSizeClick", width, height);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-3 gap-4">
        {canvasSizes.map((size, index) => (
          <Link
            key={index}
            href={{
              pathname: "/canvas",
              query: { pageWidth: size.width, pageHeight: size.height },
            }}
          >
            <div className="border-2 border-gray-300 p-4 rounded-md cursor-pointer hover:border-blue-500">
              <h2 className="text-center mb-4">{size.label}</h2>
              <p className="text-center">{`${size.width} x ${size.height}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
