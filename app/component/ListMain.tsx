"use client";
import React, { useState, useEffect } from "react";
import ItemComponent from "./ItemComponent";
import api from "../utils/api";
import { MdClose } from "react-icons/md";
import ItemsCompLoading from "./ItemsCompLoading";
import LoadingComponent from "./LoadingComponent";

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
  const [itemsLen, setItemsLen] = useState(list?.items?.length);
  const [nameMessage, setNameMessage] = useState("");
  const [loading, setLoading] = useState({
    main: true,
    addItem: false,
  });
  const [name, setName] = useState("");
  const data = {
    id: list?._id,
    name: name,
  };
  const addItem = () => {
    setLoading((prev) => ({ ...prev, addItem: true }));
    if (name.length > 0) {
      api
        .post("/api/additem", data)
        .then((response) => {
          setLoading((prev) => ({ ...prev, addItem: false }));
          if (response.data.status === "okay") {
            fetchItems();
            setItemsLen(itemsLen + 1);
            setIsAddItemOpen(false);
            setName("");
          }

          //fetchItems();
        })
        .catch((error) => {
          setLoading((prev) => ({ ...prev, addItem: false }));
          console.log(error);
        });
    } else {
      setNameMessage("Item name can not be blank");
      setLoading((prev) => ({ ...prev, addItem: false }));
    }
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
      .post<ResponseItem>("/api/list/getitems", { listId: list._id })
      .then((response) => {
        setLoading((prev) => ({ ...prev, main: false }));
        setNameMessage("");
        setItems(response.data.items);
      })
      .catch((error) => {
        setNameMessage("");
        setLoading((prev) => ({ ...prev, main: false }));
        console.log(error);
      });
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="overflow-hidden relative flex flex-col items-center w-full h-[80%]">
      <div className="flex shrink-0 items-center border-b-1 text-md text-shadow-task-darkWhite justify-between z-5 px-[5%] h-16 mb-2 w-[100%]  border-task-darkerWhite left-0">
        <div>{list?.title}</div>
        <div>{`Items: ${itemsLen}`}</div>
      </div>
      {loading.main ? (
        <ItemsCompLoading />
      ) : (
        <>
          <div className="block nx:grid px-5 nx:px-0 nx:grid-cols-2 md:grid-cols-3 min-w-full nx:items-start mt-0 h-[80dvh] scrollbar-hide overflow-y-scroll items-center w-[100%]">
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
              className={`flex-col w-full mt-4 ${
                isAdditemOpen ? "flex" : "hidden"
              }`}
            >
              <div className="w-full text-sm text-red-500  px-2">
                {nameMessage}
              </div>
              <div className="flex my-2 w-full  items-center justify-between ">
                <input
                  value={name}
                  onChange={(e) => {
                    setNameMessage("");
                    setName(e.target.value);
                  }}
                  className="p-2 px-3 text-[15px] w-[80%] h-13 rounded-2xl border-0 bg-task-gray focus:outline-none"
                />

                <button
                  type="button"
                  onClick={addItem}
                  className="flex justify-center items-center text-2xl rounded-2xl cursor-pointer hover:opacity-70 h-13 w-[20%]  p-2 bg-white text-black ml-2"
                >
                  {loading.addItem ? <LoadingComponent /> : "+"}
                </button>
              </div>
            </form>
            <div
              className="fixed text-2xl left-[6%] bottom-25 my-3 bg-white cursor-pointer text-black h-15 w-15 flex justify-center items-center rounded-[50%]"
              onClick={openCloseAddItem}
            >
              {!isAdditemOpen ? "+" : <MdClose />}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListMain;
