import React from "react";

interface ChildProps {
  compColor?: string;
}

const LoadingComponent = ({ compColor }: ChildProps) => {
  return (
    <div className="flex">
      <div className="h-5 w-5 border-2 border-gray-200 border-t-black border-l-black-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingComponent;
