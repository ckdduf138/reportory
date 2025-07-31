import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Palette } from "lucide-react";

import { Category } from "../types/Common";
import { useIsMobile } from "../hooks/useBreakpoint";

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

interface ColorPickerProps {
  category: Category;
  updateCategory: (category: Category) => Promise<void>;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  category,
  updateCategory,
}) => {
  const [showPalette, setShowPalette] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (showPalette && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // 색상 팔레트 크기 추정 (모바일: 280px, 데스크톱: 240px)
      const paletteWidth = isMobile ? 280 : 240;
      const paletteHeight = isMobile ? 160 : 120;

      let top = rect.bottom + window.scrollY + 8;
      let left = rect.left + window.scrollX;

      // 오른쪽 경계 체크
      if (left + paletteWidth > viewportWidth) {
        left = rect.right + window.scrollX - paletteWidth;
      }

      // 하단 경계 체크
      if (rect.bottom + paletteHeight > viewportHeight) {
        top = rect.top + window.scrollY - paletteHeight - 8;
      }

      setButtonPosition({ top, left });
    }
  }, [showPalette, isMobile]);

  const handleSetColor = async (newColor: string) => {
    setShowPalette(false);

    const newCategory: Category = { ...category, color: newColor };

    updateCategory(newCategory);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div
            className={`${
              isMobile ? "w-4 h-4" : "w-5 h-5"
            } rounded-full border-2 border-gray-200 flex-shrink-0`}
            style={{ backgroundColor: category.color }}
          />
          <span className={`text-gray-600 ${isMobile ? "text-xs" : "text-sm"}`}>
            현재 색상
          </span>
        </div>

        <button
          ref={buttonRef}
          className={`flex items-center gap-1 ${
            isMobile ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-sm"
          }
            text-teal-600 bg-teal-50 hover:bg-teal-100 rounded-lg 
            transition-all duration-200 border border-teal-200 hover:border-teal-300`}
          onClick={() => setShowPalette(!showPalette)}
          title="색상 변경"
        >
          <Palette className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
          {!isMobile && "변경"}
        </button>
      </div>

      {showPalette &&
        createPortal(
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setShowPalette(false)}
            />
            <div
              className={`fixed bg-white shadow-2xl rounded-xl border border-gray-200 z-[9999]
              ${isMobile ? "p-4 w-[280px]" : "p-3 w-[240px]"}`}
              style={{
                top: buttonPosition.top,
                left: buttonPosition.left,
              }}
            >
              <div className="mb-3">
                <h4
                  className={`font-medium text-gray-700 ${
                    isMobile ? "text-sm" : "text-xs"
                  }`}
                >
                  색상 선택
                </h4>
              </div>

              <div
                className={`grid grid-cols-5 ${isMobile ? "gap-3" : "gap-2"}`}
              >
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`${
                      isMobile ? "w-8 h-8" : "w-7 h-7"
                    } rounded-full border-2 
                    ${
                      category.color === color
                        ? "border-gray-400 ring-2 ring-teal-200"
                        : "border-gray-200"
                    } 
                    cursor-pointer hover:border-gray-400 transition-all duration-200 hover:scale-110 
                    focus:outline-none focus:ring-2 focus:ring-teal-500`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleSetColor(color)}
                    title={`색상 변경: ${color}`}
                  />
                ))}
              </div>
            </div>
          </>,
          document.body
        )}
    </div>
  );
};

export default ColorPicker;
