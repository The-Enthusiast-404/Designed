import React from "react";

interface TextOptionsProps {
  handleFontStyleChange: (style: string) => void;
  handleFontFamilyChange: (family: string) => void;
  handleTextSizeChange: (size: number) => void;
  handleTextColorChange: (color: string) => void;
}

const TextOptions: React.FC<TextOptionsProps> = ({
  handleFontStyleChange,
  handleFontFamilyChange,
  handleTextSizeChange,
  handleTextColorChange,
}) => {
  return (
    <div className="text-options flex flex-wrap gap-4 p-4 border border-gray-300 rounded-md shadow-md">
      <button className="btn" onClick={() => handleFontStyleChange("bold")}>
        Bold
      </button>
      <button className="btn" onClick={() => handleFontStyleChange("italic")}>
        Italic
      </button>
      <button
        className="btn"
        onClick={() => handleFontStyleChange("underline")}
      >
        Underline
      </button>
      <button
        className="btn"
        onClick={() => handleFontStyleChange("strikethrough")}
      >
        Strikethrough
      </button>
      <label htmlFor="font-family" className="flex items-center">
        Font Family:
        <select
          id="font-family"
          className="input ml-2"
          onChange={(e) => handleFontFamilyChange(e.target.value)}
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
          {/* Add more font families as needed */}
        </select>
      </label>
      <label htmlFor="font-size" className="flex items-center">
        Font Size:
        <select
          id="font-size"
          className="input ml-2"
          onChange={(e) => handleTextSizeChange(Number(e.target.value))}
        >
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
          {/* Add more font sizes as needed */}
        </select>
      </label>
      <label htmlFor="text-color" className="flex items-center">
        Font Color:
        <input
          type="color"
          id="text-color"
          className="input ml-2"
          onChange={(e) => handleTextColorChange(e.target.value)}
        />
      </label>
    </div>
  );
};

export default TextOptions;
