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
          <option value="Verdana">Verdana</option>
          <option value="Georgia">Georgia</option>
          <option value="Palatino">Palatino</option>
          <option value="Garamond">Garamond</option>
          <option value="Bookman">Bookman</option>
          <option value="Comic Sans MS">Comic Sans MS</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
          <option value="Arial Black">Arial Black</option>
          <option value="Impact">Impact</option>
          <option value="Lucida Sans Unicode">Lucida Sans Unicode</option>
          <option value="Tahoma">Tahoma</option>
          <option value="Geneva">Geneva</option>
          <option value="Lucida Console">Lucida Console</option>
          <option value="Courier">Courier</option>
          <option value="Lucida Grande">Lucida Grande</option>
          <option value="Monaco">Monaco</option>
        </select>
      </label>
      <label htmlFor="font-size" className="flex items-center">
        Font Size:
        <select
          id="font-size"
          className="input ml-2"
          onChange={(e) => handleTextSizeChange(Number(e.target.value))}
        >
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
          <option value="18">18</option>
          <option value="20">20</option>
          <option value="22">22</option>
          <option value="24">24</option>
          <option value="26">26</option>
          <option value="28">28</option>
          <option value="30">30</option>
          <option value="32">32</option>
          <option value="34">34</option>
          <option value="36">36</option>
          <option value="38">38</option>
          <option value="40">40</option>
          <option value="42">42</option>
          <option value="44">44</option>
          <option value="46">46</option>
          <option value="48">48</option>
          {/* Add more font sizes as needed */}
          <option value="50">50</option>
          <option value="52">52</option>
          <option value="54">54</option>
          <option value="56">56</option>
          <option value="58">58</option>
          <option value="60">60</option>
          <option value="62">62</option>
          <option value="64">64</option>
          <option value="66">66</option>
          <option value="68">68</option>
          <option value="70">70</option>
          <option value="72">72</option>
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
