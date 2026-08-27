import React from "react";

const loading = () => {
  return (
    <div className="fixed flex justify-center items-center h-screen w-full">
      <div className="h-10 w-10 border-2 border-[#363636] border-t-[#00aa00] rounded-full animate-spin"></div>
    </div>
  );
};

export default loading;
