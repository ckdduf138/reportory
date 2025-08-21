import React from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  className?: string;
  variant?: "default" | "white" | "dark";
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  size = "md",
  showText = true,
  className = "",
  variant = "default",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const getIconFilter = () => {
    switch (variant) {
      case "white":
        return "filter brightness-0 invert";
      case "dark":
        return "filter brightness-0";
      default:
        return "";
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "white":
        return "text-white";
      case "dark":
        return "text-gray-900";
      default:
        return "text-gray-900";
    }
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl p-2 shadow-lg">
        <img
          src="/images/favicon.svg"
          alt="Reportory Logo"
          className={`${sizeClasses[size]} ${getIconFilter()}`}
        />
      </div>
      {showText && (
        <div>
          <h3
            className={`${textSizeClasses[size]} font-bold ${getTextColor()}`}
          >
            Reportory
          </h3>
          {size === "lg" || size === "xl" ? (
            <p
              className={`text-xs text-teal-600 font-medium ${
                variant === "white" ? "text-white/80" : ""
              }`}
            >
              하루의 기록을 쉽고 간편하게
            </p>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
