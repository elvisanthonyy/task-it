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
      className="z-80 flex shrink-0 justify-center items-end fixed top-0 left-0 w-full h-[100dvh] bg-black/80"
    >
      <Alert
        isAlertVisble={alertComp.state}
        alertType={alertComp.type}
        message={alertComp.message}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col relative py-4 px-4 justify-start rounded-tl-[48px] rounded-tr-[48px] nx:absolute nx:w-100 nx:h-90 nx:top-[50%] nx:left-[50%] nx:-translate-[50%] items-center w-full h-fit backdrop-blur-md nx:rounded-2xl bg-icon-gray"
      >
        <form className="w-full gap-4 h-full flex flex-col justify-start items-center">
          <div className="flex flex-col w-full h-fit">
            <textarea
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter list title"
              className="bg-[#D0D0D0] outline-0 nx:h-[80%] text-[14px] px-3 pt-4 text-background h-[144px] md:h-[80%] rounded-[32px] shrink-0 w-full"
            />
          </div>
          <div
            onClick={addList}
            className="cursor-pointer mb-8 text-[14px] flex shrink-0 justify-center mt-auto items-center md:mb-10  w-full h-[50px] bg-background rounded-[32px] text-text-gray"
          >
            {loading ? <LoadingComponent /> : "Add"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListModal;
