"use client";

import React, { ChangeEvent } from "react";
import { HiCheck } from "react-icons/hi";

interface ChildProps {
  list: List;
  selectedList: List;
  setSelectedList: React.Dispatch<React.SetStateAction<List>>;
}

interface List {
  _id: string;
  title: string;
  items: string[];
  createdAt: Date;
}
const ListComponent = ({ list, selectedList, setSelectedList }: ChildProps) => {
  const date = new Date(list.createdAt);
  const selectList = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    selectedList._id === list._id
      ? setSelectedList({
          _id: "",
          title: "",
          items: [],
          createdAt: new Date(),
        })
      : setSelectedList(list);
  };

  return (
    <div className="w-full">
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-start justify-between w-full px-3 absolute top-5 left-[50%] -translate-x-[50%]"
      >
        <div className="flex text-[14px] text-text-gray px-1 w-25 h-8 overflow-y-hidden overflow-x-hidden">
          {list.title}
        </div>
      </div>
      <div className="flex items-center  w-full justify-between">
        <div className=" p-1 px-3 text-[12px] text-deeper-text">
          {date.toLocaleDateString()}
        </div>
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            selectList(e);
          }}
          className={`flex shrink-0 justify-center mt-1 items-center h-7 mx-1 aspect-square rounded-[50%] ${
            selectedList._id === list._id ? "bg-green-600 " : "bg-background"
          }`}
        >
          {selectedList._id === list._id && <HiCheck />}
        </div>
        <div className="pl-3 hidden text-[11px] text-gray-400">
          Items: {list.items.length}
        </div>
      </div>
    </div>
  );
};

export default ListComponent;
