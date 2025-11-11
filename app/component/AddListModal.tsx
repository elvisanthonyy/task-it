"use client";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";
import LoadingComponent from "./LoadingComponent";

interface ChildProps {
  setIsListModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getList: () => void;
}

const AddListModal = ({ setIsListModalOpen, getList }: ChildProps) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const id = localStorage.getItem("userId");
  const data: object = {
    id: id,
    title: title,
  };
  const addList = () => {
    setLoading(true);
    api
      .post("/api/list/addlist", data)
      .then((response) => {
        setLoading(false);
        if (response.data.status === "okay") {
          toast.success(response.data.message);
          setIsListModalOpen(false);
          getList();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <div
      onClick={() => setIsListModalOpen(false)}
      className="z-80 flex shrink-0 justify-center items-end fixed top-0 left-0 w-full h-screen bg-black/60"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex py-15 flex-col relative -mb-7 justify-between items-center w-full h-[70%] backdrop-blur-md rounded-2xl bg-white/15"
      >
        <div className="">Add List</div>
        <form className=" py-10 w-full h-full flex flex-col justify-start items-center">
          <div className="flex flex-col items-start w-[90%]">
            <label>Title</label>
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter list title"
              className="border-1 outline-0 text-sm px-2 py-2 mt-4 border-white rounded-md h-10 shrink-0 w-full"
            />
          </div>
          <div
            onClick={addList}
            className="cursor-pointer text-sm flex justify-center items-center mt-auto w-[90%] h-10 bg-white rounded-xl text-black"
          >
            {loading ? <LoadingComponent /> : "Add"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListModal;
