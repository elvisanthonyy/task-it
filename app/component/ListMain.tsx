"use client";
import React, { useState, useEffect, useCallback } from "react";
import ItemComponent from "./ItemComponent";
import api from "../utils/api";
import { MdClose } from "react-icons/md";
import ItemsCompLoading from "./ItemsCompLoading";
import LoadingComponent from "./LoadingComponent";
import Alert from "./Alert";
import { useRouter } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";
import Image from "next/image";

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

  const fetchItems = useCallback(async () => {
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
  }, [list._id]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return (
    <div className="overflow-hidden left-0 relative flex flex-col items-center w-full h-[80%]">
      <Alert
        isAlertVisble={alertComp.state}
        alertType={alertComp.type}
        message={alertComp.message}
      />

      <div className="flex shrink-0 md:px-[128px] bg-background items-center text-md text-shadow-task-darkWhite justify-between z-5 px-4 h-16 mb-4 md:mb-6 w-full left-0">
        <div className="flex h-full items-center">
          <div onClick={() => router.back()} className="mr-4 cursor-pointer">
            <div className="w-6 aspect-square">
              <Image
                src={"/icons/back-icon.svg"}
                height={50}
                width={50}
                alt="back btn"
                className="w-full"
              />
            </div>
          </div>
          <div className="text-[16px] ">{list?.title}</div>
        </div>
        <div className="flex w-fit items-center gap-2">
          <div>Items</div>
          <div className="bg-[#404040] h-7 text-[12px] aspect-square rounded-full flex items-center justify-center">
            {itemsLen}
          </div>
        </div>
      </div>
      {/*load when fetching data*/}
      {loading.main ? (
        <ItemsCompLoading />
      ) : (
        <>
          <div className="flex flex-col nx:grid sm:px-4 gap-3 md:gap-5 px-4  nx:grid-cols-2 md:grid-col-2 xl:grid-cols-3 min-w-full nx:items-start mt-0 h-[90dvh] pb-[100px] w-full md:px-[128px] place-content-start">
            {items?.length === 0 ? (
              <div className="absolute text-[14px] text-text-gray top-[50%] left-[50%] -translate-[50%]">
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
              className={`fixed overflow-hidden px-4 md:px-0 md:block md:justify-between flex-col w-full text-2xl justify-center md:w-[25%] bottom-[100px] md:bottom-[136px] -translate-x-[50%] left-[50%] mt-4 flex`}
            >
              <div className="w-full text-sm text-red-500 my-2 ml-1 px-2">
                {nameMessage}
              </div>
              <div className="flex  shrink-0 mx-auto md:my-0 w-[100%] items-center justify-between ">
                <div
                  className={` flex shrink-0 h-full w-[80%] relative trasition-all items-center ease-in duration-300 ${
                    isAdditemOpen ? "flex" : "hidden"
                  }`}
                >
                  <div
                    className={` absolute top-0 
                     flex shrink-0 text-xl right-3 mr-3 h-13 w-5 md:rounded-3xl bottom-25 md:bottom-10 text-task-darkerWhite cursor-pointer justify-center items-center rounded-xl`}
                    onClick={closeAddItem}
                  >
                    <MdClose className="text-icon-gray" />
                  </div>
                  <input
                    placeholder="Item name"
                    value={name}
                    onChange={(e) => {
                      setNameMessage("");
                      setName(e.target.value);
                    }}
                    className={`p-2 mr-2 px-4 text-[14px] h-13 w-full 
                     rounded-[32px] text-icon-gray border border-[#525252] bg-task-gray focus:outline-none`}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => (isAdditemOpen ? addItem() : openAddItem())}
                  className="flex justify-center items-center text-2xl rounded-[32px] cursor-pointer transition-all duration-700 ease-in-out nx:hover:w-40 h-13 w-25 px-3 bg-white text-black"
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
