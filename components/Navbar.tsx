import React from "react";
import Link from "next/link";

interface NavbarProps {
  projectName: string;
  githubUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ projectName, githubUrl }) => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-md">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <div className="text-xl font-bold hover:text-blue-400 transition duration-300 ease-in-out">
            {projectName}
          </div>
        </Link>
        <div className="hidden md:flex space-x-4">
          <Link href="/about">
            <div className="hover:text-blue-400 transition duration-300 ease-in-out">
              About
            </div>
          </Link>
          <Link href="/contact">
            <div className="hover:text-blue-400 transition duration-300 ease-in-out">
              Contact
            </div>
          </Link>
        </div>
      </div>
      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-2 hover:text-blue-400 transition duration-300 ease-in-out"
      >
        <span className="text-sm md:text-base">View on GitHub</span>
        <img
          src="./images/github-mark-white.png"
          alt="GitHub"
          className="w-8 h-8 md:w-10 md:h-10"
        />
      </a>
    </nav>
  );
};

export default Navbar;
