"use client";
import React from "react";
import { useListListContext } from "../context/ListContext";
import { redirect } from "next/navigation";
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
  const { setCurrentList } = useListListContext();
  /*const [isMenuOpen, setIsMenuOpen] = useState(false);
  <div
        className={`flex-col  justify-between items-center p-5 absolute -right-10 -bottom-10 w-30 h-30 bg-black ${
          isMenuOpen ? "flex" : "hidden"
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteList();
          }}
          className="cursor-pointer px-3 text-red-600 "
        >
          delete list
        </button>
        <button onClick={(e) => e.stopPropagation()}>Edit title</button>
      </div>*/
  const date = new Date(list.createdAt);
  const listLink = () => {
    setCurrentList(list);
    setTimeout(() => {
      redirect(`/list/${list._id}-${list.title.replaceAll(" ", "-")}`);
    }, 100);
  };

  /*const deleteList = () => {
    axios
      .post("/api/list/delete", {
        id: list._id,
      })
      .then()
      .catch((error) => {
        console.log(error);
      });
  };*/
  return (
    <div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex items-start justify-between w-full px-3 absolute top-5 left-[50%] -translate-x-[50%]"
      >
        <div className="flextext-sm text-gray-300 px-1 w-25 h-8 overflow-y-hidden overflow-x-hidden">
          {list.title}
        </div>

        <div
          onClick={() =>
            selectedList._id === list._id
              ? setSelectedList({
                  _id: "",
                  title: "",
                  items: [],
                  createdAt: new Date(),
                })
              : setSelectedList(list)
          }
          className={`flex shrink-0 justify-center mt-1 items-center h-5 mx-1 w-5 rounded-[50%] ${
            selectedList._id === list._id
              ? "bg-green-600 "
              : "bg-task-lightGray "
          }`}
        >
          {selectedList._id === list._id && <HiCheck />}
        </div>
      </div>

      <div className=" p-1 px-3 text-[12px] text-gray-300">
        {date.toLocaleDateString()}
      </div>
      <div className="pl-3 text-[11px] text-gray-400">
        Items: {list.items.length}
      </div>
    </div>
  );
};

export default ListComponent;
