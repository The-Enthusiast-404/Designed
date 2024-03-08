// components/Navbar.tsx
import React from "react";

interface NavbarProps {
  projectName: string;
  githubUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ projectName, githubUrl }) => {
  return (
    <nav className="flex items-center justify-between p-6 bg-blue-500 text-white">
      <div>{projectName}</div>
      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
        GitHub
      </a>
    </nav>
  );
};

export default Navbar;
