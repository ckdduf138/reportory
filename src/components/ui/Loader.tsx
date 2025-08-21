import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 pointer-events-auto">
      <div className="flex flex-row gap-2 pointer-events-none">
        <div className="w-4 h-4 rounded-full bg-teal-500 animate-bounce opacity-90" />
        <div className="w-4 h-4 rounded-full bg-teal-500 animate-bounce [animation-delay:-.3s] opacity-90" />
        <div className="w-4 h-4 rounded-full bg-teal-500 animate-bounce [animation-delay:-.5s] opacity-90" />
      </div>
    </div>
  );
};

export default Loader;
