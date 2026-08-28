import React, { useState, useEffect } from "react";
import { Item } from "./ListMain";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { HiCheck } from "react-icons/hi";
import api from "../utils/api";
import Alert from "./Alert";
import Image from "next/image";

interface ChildProps {
  item: Item;
  index: number;
  listId?: string;
  getItems?: () => void;
  itemsLen: number;
  setItemsLen?: React.Dispatch<React.SetStateAction<number>>;
}

const ItemComponent = ({
  item,
  index,
  listId,
  getItems,
  setItemsLen,
  itemsLen,
}: ChildProps) => {
  //to handle true and false state for delete menu
  const [isDeleteMenuOpen, setIsDeleteMenuOpen] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [itemTitle, setItemTitle] = useState<string>("");
  const [inputState, setInputState] = useState<boolean>(true);
  const [name, setName] = useState<string>(item.name);
  let varStatus;
  const [status, setStatus] = useState("not done");
  const [alertComp, setAlertComp] = useState({
    state: false,
    type: "",
    message: "",
  });

  const setDoneApi = () => {
    if (status === "not done") {
      varStatus = "done";
    } else varStatus = "not done";
    setStatus(varStatus);
    api
      .post("/api/item/setstatus", {
        id: item._id,
        status: varStatus,
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteItem = () => {
    api
      .post("/api/list/delete/item", {
        id: item._id,
        listId: listId,
      })
      .then((response) => {
        if (response.data.status === "okay") {
          setItemsLen?.(itemsLen - 1);
          getItems?.();
          openAlert(response.data.status, response.data.message);
        } else {
          openAlert(response.data.status, response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /*const enableInput = () => {
    alert("hello");
    const nameInput = document.getElementsByClassName("name-input");
    nameInput.disabled = "false";
  }*/
  const itemData = {
    id: item._id,
    name: itemTitle,
  };
  const editItem = () => {
    api
      .put("/api/item/edit", itemData)
      .then((response) => {
        if (response.data.message === "Item updated") {
          openAlert(response.data.status, response.data.message);
          setTimeout(() => {
            setIsEditMenuOpen(false);
          }, 1000);
          getItems?.();
        } else {
          openAlert(response.data.status, response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openAlert = (type: string, message: string) => {
    setAlertComp((prev) => ({ ...prev, type: type }));
    setAlertComp((prev) => ({ ...prev, message: message }));
    setAlertComp((prev) => ({ ...prev, state: true }));
    setTimeout(() => {
      setAlertComp((prev) => ({ ...prev, state: false }));
    }, 4000);
  };

  useEffect(() => {
    setStatus(item.status);
  }, [item.status]);
  return (
    <div
      key={item._id}
      className="flex rounded-2xl nx:my-0 text-[12px] items-center justify-between w-full nx:w-full h-[57px] pr-4  bg-[#2a2a2a] border border-[#5B5A5A]"
    >
      <Alert
        isAlertVisble={alertComp.state}
        alertType={alertComp.type}
        message={alertComp.message}
      />
      <div
        onClick={() => setIsEditMenuOpen(false)}
        className={`z-90 flex justify-center items-end top-0 left-0 ${
          isEditMenuOpen ? "fixed" : "hidden"
        } w-full h-[100dvh] bg-black/50`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-96 p-4 w-full bg-icon-gray rounded-tr-[32px] rounded-tl-[32px]"
        >
          <form className="flex flex-col h-full justify-center">
            <textarea
              value={itemTitle}
              onChange={(e) => setItemTitle(e.target.value)}
              className="flex outline-0 py-3 justify-start border-0 text-background h-35 px-3 rounded-[16px] bg-[#d0d0d0] mb-5"
            />
            <button
              type="button"
              onClick={editItem}
              className="mb-5 shrink-0 text-text-gray nx:mt-auto bg-background w-full text-[14px] mt-auto h-12 rounded-4xl"
            >
              Update
            </button>
          </form>
        </div>
      </div>
      <div
        onClick={() => setIsDeleteMenuOpen(false)}
        className={`w-full items-center justify-center ${isDeleteMenuOpen ? "flex" : "hidden"} fixed top-0 left-0 z-100 bg-black/50 h-screen`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex px-[32px] flex-col gap-5 h-fit items-center justify-center w-[80%] py-[32px] md:w-90 md:h-60 rounded-xl bg-[#eeee]"
        >
          <div className="w-[68px] aspect-square">
            <Image
              src={"/icons/delete-icon.svg"}
              height={200}
              width={200}
              className="w-full"
              alt="delete icon"
            />
          </div>
          <div className="text-center flex flex-col gap-1">
            <div className="text-[18px] font-semibold tracking-tight text-[#1f1f1f]">
              Delete List!!
            </div>
            <div className="text-deeper-text text-[14px]">
              Are tou sure you want to delete?
            </div>
          </div>
          <div className="w-full flex gap-3  h-[41px]">
            <button
              onClick={deleteItem}
              className="bg-background h-full flex items-center justify-center w-[50%] cursor-pointer text-[14px] rounded-[32px] text-white "
            >
              Delete
            </button>
            <button
              onClick={() => setIsDeleteMenuOpen(false)}
              className="border border-background h-full flex items-center justify-center w-[50%] cursor-pointer text-[14px] rounded-[32px] text-background "
            >
              Cancel{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="flex h-full items-center w-[60%]">
        {/* <div className="pl-4 text-[15px] text-green-400">{index + 1}.</div>*/}
        <p
          className={`h-[70%] text-icon-gray flex items-center text-[14px] rounded-md mx-1 pl-4 w-[90%]`}
        >
          {item.name}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div
          className="cursor-pointer"
          onClick={() => {
            setItemTitle(item.name);
            setIsEditMenuOpen(true);
          }}
        >
          <div className="h-[20px] aspect-square cursor-pointer">
            <Image
              src={"/icons/edit-icon-item.svg"}
              height={50}
              width={50}
              alt={"delete"}
              className="w-full"
            />
          </div>
        </div>

        <div
          onClick={() => setIsDeleteMenuOpen(true)}
          className="h-[24px] aspect-square cursor-pointer"
        >
          <Image
            src={"/icons/trash-icon.svg"}
            height={50}
            width={50}
            alt={"delete"}
            className="w-full"
          />
        </div>

        <div
          onClick={setDoneApi}
          className={`cursor-pointer shrink-0 flex justify-center items-center aspect-square h-[24px] rounded-[50%] ${
            status === "done" ? "bg-[#34C759]" : "bg-background"
          }`}
        >
          {status === "done" && <HiCheck className="text-[16px]" />}
        </div>
      </div>
    </div>
  );
};

export default ItemComponent;
