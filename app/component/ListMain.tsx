"use client";
import React, { useState, useEffect } from "react";
import ItemComponent from "./ItemComponent";
import api from "../utils/api";
import { MdClose } from "react-icons/md";
import ItemsCompLoading from "./ItemsCompLoading";
import LoadingComponent from "./LoadingComponent";
import Alert from "./Alert";
import { useRouter } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";

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
  const router = useRouter();
  const [isAdditemOpen, setIsAddItemOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([]);
  const [itemsLen, setItemsLen] = useState(list?.items?.length);
  const [nameMessage, setNameMessage] = useState("");
  const [alertComp, setAlertComp] = useState({
    state: false,
    type: "",
    message: "",
  });
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
            openAlert(response.data.status, response.data.message);
            setName("");
          } else {
            openAlert(response.data.status, "Something went wrong");
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

  const openAlert = (type: string, message: string) => {
    setAlertComp((prev) => ({ ...prev, type: type }));
    setAlertComp((prev) => ({ ...prev, message: message }));
    setAlertComp((prev) => ({ ...prev, state: true }));
    setTimeout(() => {
      setAlertComp((prev) => ({ ...prev, state: false }));
    }, 4000);
  };

  const openAddItem = () => {
    setIsAddItemOpen(true);
  };

  const closeAddItem = () => {
    setIsAddItemOpen(false);
    setNameMessage("");
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
    <div className="overflow-hidden md:w-[75%] left-0 relative flex flex-col items-center w-full h-[80%]">
      <Alert
        isAlertVisble={alertComp.state}
        alertType={alertComp.type}
        message={alertComp.message}
      />

      <div className="flex shrink-0 items-center border-b-1 text-md text-shadow-task-darkWhite justify-between z-5 px-[5%] h-16 mb-2 w-[100%]  border-task-darkerWhite left-0">
        <div className="flex h-full items-center">
          <div onClick={() => router.back()} className="mr-4 cursor-pointer">
            <GoArrowLeft className="text-xl" />
          </div>
          <div>{list?.title}</div>
        </div>

        <div>{`Items: ${itemsLen}`}</div>
      </div>
      {loading.main ? (
        <ItemsCompLoading />
      ) : (
        <>
          <div className="block nx:px-[4%] nx:grid sm:px-[4%] gap-3 md:gap-5 px-[5%] place-items-center  nx:grid-cols-2 md:grid-col-2 xl:grid-cols-3 min-w-full nx:items-start mt-0 h-[80dvh] scrollbar-hide overflow-y-scroll py-10 items-center w-full md:px-[5%] place-content-start">
            {items?.length === 0 ? (
              <div className="absolute top-[50%] left-[50%] -translate-[50%]">
                {" "}
                no items{" "}
              </div>
            ) : (
              items?.map((item, index) => (
                <div className=" w-full" key={item._id}>
                  <ItemComponent
                    setItemsLen={setItemsLen}
                    itemsLen={itemsLen}
                    getItems={fetchItems}
                    listId={list._id}
                    item={item}
                    index={index}
                  />
                </div>
              ))
            )}

            <form
              className={`fixed overflow-hidden px-[6%] md:px-0 md:block lg:w-[40%] md:justify-between md:items-start flex-col w-full text-2xl justify-center md:w-[65%] md:left-[4%] md:translate-x-0 -translate-x-[50%] left-[50%] bottom-25 mt-4 flex`}
            >
              <div className="w-full text-sm text-red-500 my-2 ml-1 px-2">
                {nameMessage}
              </div>
              <div className="flex shrink-0 my-2 mx-auto md:my-0 w-[100%] items-center justify-between ">
                <div
                  className={` flex shrink-0 h-full w-[80%] relative trasition-all items-center ease-in duration-300 ${
                    isAdditemOpen ? "flex" : "hidden"
                  }`}
                >
                  <div
                    className={` absolute top-0 
                     flex shrink-0 text-xl right-2 h-13 w-5 md:rounded-3xl bottom-25 md:bottom-10 text-task-darkerWhite cursor-pointer mr-2   justify-center items-center rounded-xl`}
                    onClick={closeAddItem}
                  >
                    <MdClose />
                  </div>
                  <input
                    placeholder="Item name"
                    value={name}
                    onChange={(e) => {
                      setNameMessage("");
                      setName(e.target.value);
                    }}
                    className={`p-2 px-4 text-[15px] h-13 w-full 
                     rounded-2xl border-0 bg-task-gray focus:outline-none`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    isAdditemOpen ? addItem() : openAddItem();
                  }}
                  className="flex justify-center items-center text-2xl rounded-2xl cursor-pointer transition-all duration-700 ease-in-out nx:hover:w-40 h-13 w-[20%]  p-2 bg-white text-black ml-2"
                >
                  {loading.addItem ? <LoadingComponent /> : "+"}
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ListMain;
