import React from "react";

const loading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="h-10 w-10 border-2 border-gray-200 border-t-green-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default loading;
