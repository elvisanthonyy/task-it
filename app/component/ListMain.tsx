"use client";
import React, { useState, useEffect } from "react";
import ItemComponent from "./ItemComponent";
import api from "../utils/api";
import { MdClose } from "react-icons/md";

interface ChildProps {
  list: List;
}
interface List {
  _id: string;
  title: string;
  items: string[];
  createdAt: Date;
}

interface ResponseItem {
  items: Item[];
}

export interface Item {
  _id: string;
  name: string;
  status: string;
  listId: string;
}

const ListMain = ({ list }: ChildProps) => {
  const [isAdditemOpen, setIsAddItemOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [itemsLen] = useState(list?.items?.length);
  const [name, setName] = useState("");
  const data = {
    id: list?._id,
    name: name,
  };
  const addList = () => {
    api
      .post("/api/additem", data)
      .then(() => {
        console.log("done");
        setIsAddItemOpen(false);
        setName("");
        fetchItems();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openCloseAddItem = () => {
    if (isAdditemOpen) {
      setIsAddItemOpen(false);
      //window.history.pushState({}, "New page", "/list/7746ldhdk974993");
    } else {
      setIsAddItemOpen(true);
      /*window.history.pushState(
        {},
        "New page",
        "/list/7746ldhdk974993/add/item"
      );*/
    }
  };

  const fetchItems = () => {
    api
      .post<ResponseItem>("/api/list/getitems", list._id)
      .then((response) => {
        setItems(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchItems();
  }, [addList]);

  return (
    <div className="overflow-hidden relative flex flex-col items-center mt-20 w-full h-[80%]">
      <div className="flex items-center text-sm text-shadow-task-darkWhite justify-between z-5 px-[8%] h-16 mb-2 w-[100%]  border-white left-0">
        <div>{list?.title}</div>
        <div>{`Items: ${itemsLen}`}</div>
      </div>
      <div className="block nx:grid px-5 nx:px-0 nx:grid-cols-2 md:grid-cols-3 min-w-full nx:items-start mt-0 h-[90%] scrollbar-hide overflow-y-scroll items-center w-[100%]">
        {items === undefined ? (
          <div className="absolute top-[50%] left-[50%] -translate-[50%]">
            {" "}
            no items{" "}
          </div>
        ) : (
          items?.map((item, index) => (
            <div key={item._id}>
              <ItemComponent item={item} index={index} />
            </div>
          ))
        )}

        <form
          className={` my-2 w-full mt-6 items-center justify-between  ${
            isAdditemOpen ? "flex" : "hidden"
          }`}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-2 text-[13px] w-[80%] h-9 rounded-md border-1 border-task-lightGray"
          />
          <button
            type="button"
            onClick={addList}
            className="text-[13px] rounded-md cursor-pointer hover:opacity-70 h-9 w-[20%] p-1 bg-white text-black ml-2"
          >
            +
          </button>
        </form>
        <div
          className="absolute left-10 bottom-10 my-3 bg-white cursor-pointer text-black h-11 w-11 flex justify-center items-center rounded-[50%]"
          onClick={openCloseAddItem}
        >
          {!isAdditemOpen ? "+" : <MdClose />}
        </div>
      </div>
    </div>
  );
};

export default ListMain;
