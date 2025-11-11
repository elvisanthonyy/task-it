import React, { useState, useEffect } from "react";
import { Item } from "./ListMain";
import { FaTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { HiCheck } from "react-icons/hi";
import api from "../utils/api";
import { toast } from "react-toastify";

interface ChildProps {
  item: Item;
  index: number;
}

const ItemComponent = ({ item, index }: ChildProps) => {
  const [inputState, setInputState] = useState<boolean>(true);
  const [name, setName] = useState<string>(item.name);
  let varStatus;
  const [status, setStatus] = useState("not done");

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
      })
      .then((response) => {
        if (response.data.message === "item deleted") {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
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
    name: name,
  };
  const editItem = () => {
    api
      .put("/api/item/edit", itemData)
      .then((response) => {
        if (response.data.message === "Item updated") {
          setInputState(true);
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setStatus(item.status);
  }, [item.status]);
  return (
    <div
      key={item._id}
      className="flex shrink-0 rounded-2xl text-[12px] nx:mx-auto items-center justify-between w-full nx:w-[90%] h-14 pr-4  bg-task-lightGray/30 my-3 mb-4"
    >
      <div className="flex h-full items-center w-[60%]">
        <div className="pl-4 text-[16px] text-green-400">{index + 1}.</div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`h-[70%] text-[16px] rounded-md mx-1 pl-2 w-[90%] ${
            inputState ? "outline-0" : "outline-1"
          } `}
          disabled={inputState}
        />
      </div>

      <div className="flex items-center justify-between w-[35%] ">
        <div
          className="cursor-pointer ml-2"
          onClick={() => setInputState(false)}
        >
          {inputState ? (
            <FiEdit className="text-[19px] shrink-0 text-task-darkWhite" />
          ) : (
            <HiCheck
              className="text-[18px] shrink-0 text-task-darkWhite"
              onClick={editItem}
            />
          )}
        </div>

        <div
          onClick={setDoneApi}
          className={`cursor-pointer shrink-0 flex justify-center ml-2 items-center w-[19px] h-[19px] rounded-[50%] ${
            status === "done"
              ? "bg-green-600"
              : "border-1 border-task-darkWhite"
          }`}
        >
          {status === "done" && <HiCheck />}
        </div>

        <FaTrashAlt
          onClick={deleteItem}
          className="cursor-pointer ml-2 text-[16px] text-task-darkWhite shrink-0"
        />
      </div>
    </div>
  );
};

export default ItemComponent;
