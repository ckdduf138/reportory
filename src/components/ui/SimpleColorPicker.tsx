import React, { useState } from "react";
import { Check } from "lucide-react";

const colors = [
  "#7986CB", // 보라색
  "#33B679", // 녹색
  "#8E24AA", // 진한 보라색
  "#E67C73", // 빨간색
  "#F6BF26", // 노란색
  "#F4511E", // 주황색
  "#039BE5", // 파란색
  "#616161", // 회색
  "#FF4081", // 핑크색
  "#00C853", // 밝은 녹색
];

interface SimpleColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

const SimpleColorPicker: React.FC<SimpleColorPickerProps> = ({
  selectedColor,
  onColorChange,
}) => {
  // 색상의 밝기를 계산하여 체크 마크 색상을 결정하는 함수
  const getCheckColor = (hexColor: string) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#FFFFFF";
  };

  return (
    <div className="grid grid-cols-5 gap-2">
      {colors.map((color) => (
        <button
          key={color}
          type="button"
          onClick={() => onColorChange(color)}
          className={`
            w-8 h-8 rounded-full border-2 transition-all duration-200 relative
            ${
              selectedColor === color
                ? "border-gray-400 scale-110"
                : "border-gray-200 hover:border-gray-300"
            }
            flex items-center justify-center
          `}
          style={{ backgroundColor: color }}
        >
          {selectedColor === color && (
            <Check
              className="w-4 h-4 drop-shadow-md font-bold"
              style={{
                color: getCheckColor(color),
                filter: "drop-shadow(0 0 2px rgba(0,0,0,0.8))",
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default SimpleColorPicker;
