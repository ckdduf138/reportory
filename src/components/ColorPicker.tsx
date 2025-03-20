import { useState, useRef } from "react";

import { Category } from "../types/Common";

const colors = [
  '#7986CB', // 보라색
  '#33B679', // 녹색
  '#8E24AA', // 진한 보라색
  '#E67C73', // 빨간색
  '#F6BF26', // 노란색
  '#F4511E', // 주황색
  '#039BE5', // 파란색
  '#616161', // 회색
  '#FF4081', // 핑크색
  '#00C853'  // 밝은 녹색
];

interface ColorPickerProps {
  category: Category;
  updateCategory: (category: Category) => Promise<void>;
}

const ColorPicker: React.FC<ColorPickerProps> = ({category, updateCategory}) => {
  const [showPalette, setShowPalette] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  const handleSetColor = async (newColor: string) => {
    setShowPalette(false);

    const newCategory: Category = {...category, color: newColor};

    updateCategory(newCategory);
  };

  return (
    <div className="relative flex flex-col items-center">
      <div
        className="w-5 h-5 rounded-full border border-gray-300 shadow-lg"
        style={{ backgroundColor: category.color }}
        onClick={() => setShowPalette(!showPalette)}
      />

      {showPalette && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowPalette(false)}
        ></div>
      )}

      {showPalette && (
        <div
          ref={paletteRef}
          className="absolute right-0 top-7 bg-white shadow-xl rounded-lg p-3 grid grid-cols-5 grid-rows-2 gap-5 border border-gray-200 z-10 w-max min-w-[160px]">
          {colors.map((color) => (
            <div
              key={color}
              className="w-5 h-5 rounded-full border-2 border-transparent"
              style={{ backgroundColor: color }}
              onClick={() => handleSetColor(color)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
