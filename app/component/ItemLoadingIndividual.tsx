import React from "react";

const ItemLoadingIndividual = () => {
  return (
    <div className="w-full overflow-hidden relative justify-between px-3 border items-center border-[#313131] flex nx:my-0 h-14 rounded-2xl bg-[#181818]">
      <div className="w-30 rounded-[12px] h-[60%] bg-[#222222]"></div>
      <div className="w-20 rounded-[12px] h-[60%] bg-[#222222]"></div>
      <div className="h-[150%] loading-animation w-10 bg-[white]/10 blur-[24px] absolute top-[50%] translate-y-[-50%] -left-10"></div>
    </div>
  );
};

export default ItemLoadingIndividual;
