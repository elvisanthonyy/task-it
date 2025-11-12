"use client";
import React from "react";
import { useState } from "react";
import Alert from "./Alert";
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
  const [alertComp, setAlertComp] = useState({
    state: false,
    type: "",
    message: "",
  });
  const addList = () => {
    setLoading(true);
    api
      .post("/api/list/addlist", data)
      .then((response) => {
        setLoading(false);
        if (response.data.status === "okay") {
          openAlert(response.data.status, response.data.message);

          setTimeout(() => {
            setIsListModalOpen(false);
          }, 4000);
          getList();
        } else {
          openAlert(response.data.status, response.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
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
  return (
    <div
      onClick={() => setIsListModalOpen(false)}
      className="z-80 flex shrink-0 justify-center items-end fixed top-0 left-0 w-full h-screen bg-black/80"
    >
      <Alert
        isAlertVisble={alertComp.state}
        alertType={alertComp.type}
        message={alertComp.message}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col relative py-5 justify-between nx:absolute nx:w-100 nx:h-90 nx:top-[50%] nx:left-[50%] nx:-translate-[50%] items-center w-full h-[60%] backdrop-blur-md rounded-2xl bg-white/15"
      >
        <div className="mt-5 md:mb-0">Add List</div>
        <form className="w-full min-h-[90%] h-auto flex flex-col justify-start items-center">
          <div className="flex flex-col  h-[60%] md:h-[90%] items-start w-[90%]">
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter list title"
              className="bg-task-gray outline-0 nx:h-[80%] text-md px-3 pt-4 text-shadow-task-darkerWhite mt-4 h-30 md:h-[80%] rounded-md shrink-0 w-full"
            />
          </div>
          <div
            onClick={addList}
            className="cursor-pointer text-sm flex shrink-0 justify-center mt-auto items-center md:mb-10  w-[90%] h-13 bg-white rounded-xl text-black"
          >
            {loading ? <LoadingComponent /> : "Add"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListModal;
