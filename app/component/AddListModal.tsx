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
    if (title.length < 1) {
      setLoading(false);
      return;
    }
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
      className="z-80 flex shrink-0 justify-center items-end fixed top-0 left-0 w-full h-[100dvh] bg-black/25"
    >
      <Alert
        isAlertVisble={alertComp.state}
        alertType={alertComp.type}
        message={alertComp.message}
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col absolute md:rounded-[32px] py-4 px-4 justify-start md:justify-center rounded-tl-[32px] rounded-tr-[32px] nx:w-100 nx:top-[50%] nx:left-[50%] nx:-translate-[50%] items-center w-full h-fit backdrop-blur-md bg-icon-gray"
      >
        <form className="w-full gap-4 flex flex-col justify-start items-center">
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter list title"
            className="bg-[#D0D0D0] h-[144px] outline-0 text-[14px] px-3 pt-3 text-background rounded-[16px] shrink-0 w-full"
          />

          <div
            onClick={addList}
            className="cursor-pointer md:mb-0 mb-8 text-[14px] flex shrink-0 justify-center mt-auto items-center  w-full h-[50px] bg-background rounded-[32px] text-text-gray"
          >
            {loading ? <LoadingComponent /> : "Add"}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListModal;
