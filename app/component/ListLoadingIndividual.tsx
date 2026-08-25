import React from "react";

const ListLoadingIndividual = () => {
  return (
    <div className="aspect-square flex flex-col justify-between p-3 sm:aspect-[5/4] md:aspect-square lg:aspect-[5/4] xl:aspect-video opacity-50 w-full bg-[#181818] rounded-[8px]">
      <div className="w-30 rounded-[12px] h-5 bg-[#222222]"></div>
      <div className="w-full items-center flex justify-between">
        <div className="w-15 rounded-[12px] h-5 bg-[#222222]"></div>
        <div className="w-7 aspect-square rounded-full bg-[#222222]"></div>
      </div>
    </div>
  );
};

export default ListLoadingIndividual;
