// components/Navbar.tsx
import React from "react";
import Link from "next/link";

interface NavbarProps {
  projectName: string;
  githubUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ projectName, githubUrl }) => {
  return (
    <nav className="flex items-center justify-between p-6 bg-blue-500 text-white">
      <Link href="/">
        <p>{projectName}</p>
      </Link>
      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
        <img
          src="./images/github-mark.png"
          alt="GitHub"
          className="w-10 h-10"
        />
      </a>
    </nav>
  );
};

export default Navbar;
