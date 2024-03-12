import React, { useState, useEffect } from "react";

interface TextOptionsProps {
  handleTextSizeChange: (size: number) => void;
  handleTextColorChange: (color: string) => void;
}

const TextOptions: React.FC<TextOptionsProps> = ({
  handleTextSizeChange,
  handleTextColorChange,
}) => {
  const [textSize, setTextSize] = useState(40);
  const [textColor, setTextColor] = useState("#000000");

  useEffect(() => {
    // Update text size and color when component mounts
    handleTextSizeChange(textSize);
    handleTextColorChange(textColor);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(event.target.value, 10);
    setTextSize(newSize);
    handleTextSizeChange(newSize);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setTextColor(newColor);
    handleTextColorChange(newColor);
  };

  return (
    <div className="text-options">
      <label>
        Text Size:
        <input
          type="number"
          value={textSize}
          onChange={handleSizeChange}
          min="1"
        />
      </label>
      <label>
        Text Color:
        <input type="color" value={textColor} onChange={handleColorChange} />
      </label>
    </div>
  );
};

export default TextOptions;
