import Link from "next/link";
import React from "react";

const canvasSizes = [
  { width: 800, height: 600, label: "4:3", scale: 1 },
  { width: 1280, height: 720, label: "16:9", scale: 1 },
  { width: 1080, height: 1080, label: "1:1", scale: 1 },
  { width: 2560, height: 1440, label: "YouTube Cover Page", scale: 0.5 }, // 2560x1440 is 16:9 aspect ratio
  { width: 1128, height: 191, label: "LinkedIn Cover Page", scale: 1 }, // Custom scaling needed based on platform's requirements
  { width: 1500, height: 500, label: "Twitter Cover Page", scale: 1.5 }, // Twitter header is 1500x500, scaling to avoid cropping
  { width: 820, height: 312, label: "Facebook Cover Page", scale: 2.5 }, // Facebook cover photo is 820x312, scaling to avoid cropping
  { width: 1080, height: 1080, label: "Instagram Post", scale: 1 },
  { width: 1080, height: 1920, label: "WhatsApp Story", scale: 1 },
  { width: 1080, height: 1920, label: "Instagram Story", scale: 1 },
  // Add more sizes as needed
];

const LandingPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-white text-5xl font-bold mb-8">
        Welcome to Designed
      </h1>
      <p className="text-gray-300 text-lg mb-12">
        Select a canvas size to get started:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {canvasSizes.map((size, index) => (
          <Link
            key={index}
            href={{
              pathname: "/canvas",
              query: {
                pageWidth: size.width,
                pageHeight: size.height,
                scale: size.scale || 1,
              },
            }}
          >
            <div className="cursor-pointer">
              <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md transition duration-300 transform hover:scale-105">
                <div className="p-6">
                  <h2 className="text-white text-xl mb-4">{size.label}</h2>
                  <p className="text-gray-300 text-lg">{`${size.width} x ${size.height}`}</p>
                  {size.scale && (
                    <p className="text-gray-300 text-sm mt-2">
                      Scale: {size.scale * 100}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <footer className="mt-auto py-8 text-gray-300 text-center">
        <p className="text-lg mb-4">Designed © 2024</p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://github.com/dotslashbit"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-200"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/introvertedbot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-200"
          >
            Twitter
          </a>
          <a
            href="https://linkedin.com/in/sahil-mahapatra"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-200"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
