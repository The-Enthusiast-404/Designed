"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <nav className="bg-white p-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center px-2 lg:px-0 xl:w-1/4 xl:px-2">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://source.unsplash.com/random"
                  alt="Logo"
                />
              </div>
              <div className="hidden lg:block lg:w-80">
                <div className="flex items-baseline">
                  <a
                    href="/"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 bg-gray-200 hover:bg-gray-300"
                  >
                    Home
                  </a>
                  <a
                    href="/canvas"
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 bg-gray-200 hover:bg-gray-300"
                  >
                    Canvas
                  </a>
                  {/* Add more navigation links */}
                </div>
              </div>
            </div>
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
            {isOpen && (
              <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right lg:hidden">
                <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://source.unsplash.com/random"
                        alt="Logo"
                      />
                    </div>
                    <div className="-mr-2">
                      <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      >
                        <span className="sr-only">Close main menu</span>
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    <a
                      href="#"
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    >
                      Home
                    </a>
                    {/* Add more navigation links */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="flex-grow">
        <div className="max-w-md mx-auto w-full space-y-8">
          <div>
            <motion.h2
              className="mt-6 text-center text-3xl font-extrabold text-gray-900"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Welcome to our Canvas App
            </motion.h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Create your own designs with our easy-to-use online platform.
            </p>
            <img
              className="w-full h-64 object-cover mt-6"
              src="https://source.unsplash.com/random"
              alt="Random Unsplash"
            />
          </div>
          <div className="mt-8 space-y-6">
            <motion.button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </main>
      <footer className="bg-white p-4">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; 2024 Canva Open Source Alternative. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
