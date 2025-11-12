"use client";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import AddListModal from "./AddListModal";
import { useSession } from "next-auth/react";
import ListComponent from "./ListComponent";
import Link from "next/link";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import api from "@/app/utils/api";
import { useRouter } from "next/navigation";
import MainCompLoading from "./MainCompLoading";
import Alert from "./Alert";

interface List {
  _id: string;
  title: string;
  items: string[];
  createdAt: Date;
}

interface ListRes {
  lists: List[];
}
const MainHome = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedList, setSelectedList] = useState<List>({
    _id: "",
    title: "",
    items: [],
    createdAt: new Date(),
  });
  const [isListModalOpen, setIsListModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [alertComp, setAlertComp] = useState({
    state: false,
    type: "",
    message: "",
  });
  /*const [loading, setLoading] = useState({
    getList: false,
    deleteList: false,
    editList: false,
  })*/
  const [lists, setLists] = useState<List[]>([]);
  const [listTitle, setListTitle] = useState<string>("");
  /*const data = {
    id: session?.user?.id,
  };*/

  const openModal = useCallback(() => setIsListModalOpen(true), []);
  const deleteList = () => {
    api
      .post("/api/list/delete", {
        id: selectedList._id,
      })
      .then((response) => {
        if (response.data.status === "okay") {
          getLists();
          openAlert(response.data.status, response.data.message);
          setIsDeleteModalOpen(false);
          setSelectedList({
            _id: "",
            title: "",
            items: [],
            createdAt: new Date(),
          });
        } else {
          openAlert(response.data.status, "could not delete list");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //dat for editing list title
  const editListData = {
    id: selectedList._id,
    title: listTitle,
  };

  //function containing api to edit list title
  const editListTitle = () => {
    api
      .put("/api/list/edit", editListData)
      .then((response) => {
        setSelectedList({
          _id: "",
          title: "",
          items: [],
          createdAt: new Date(),
        });
        if (response.data.message === "List title updated") {
          openAlert(response.data.status, response.data.message);
          setIsEditModalOpen(false);
          getLists();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const openEditmodal = () => {
    setIsEditModalOpen(true);
    setListTitle(selectedList.title);
  };

  const getLists = () => {
    localStorage.setItem("userId", session?.user?.id ?? "");
    api
      .get<ListRes>("/api/user/getlists")
      .then((res) => {
        setLoading(false);
        setLists(res.data.lists);
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

  useEffect(() => {
    if (status === "authenticated") {
      getLists();
    }
  }, [session?.user?.email, status, session?.user?.id]);

  return (
    <main className="flex min-h-[90vh] flex-col md:flex-row md:w-[90%] mx-auto items-center justify-start md:mt-18 mt-20 w-full">
      <Alert
        isAlertVisble={alertComp.state}
        alertType={alertComp.type}
        message={alertComp.message}
      />
      <div
        onClick={() => setIsDeleteModalOpen(false)}
        className={`z-80 flex justify-center items-center top-0 left-0 ${
          isDeleteModalOpen ? "fixed" : "hidden"
        } w-full h-[100dvh] bg-black/50`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center w-70 h-40 md:w-90 md:h-60 rounded-xl bg-task-lightGray"
        >
          <button
            onClick={deleteList}
            className="bg-red-500 px-6 py-2 cursor-pointer text-sm rounded-md text-white  mx-3"
          >
            yes
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="bg-white px-6 py-2 rounded-md cursor-pointer text-sm text-black mx-3"
          >
            No
          </button>
        </div>
      </div>
      <div
        onClick={() => setIsEditModalOpen(false)}
        className={`z-90 flex justify-center items-center top-0 left-0 ${
          isEditModalOpen ? "fixed" : "hidden"
        } w-full h-[100dvh] bg-black/90`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="z-96 w-80 p-3 h- nx:w-100 nx:h-60 rounded-xl bg-task-lightGray"
        >
          <form className="flex flex-col h-full justify-center">
            <textarea
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              className="flex py-3 justify-start border-0 bg-task-gray h-35 px-3 rounded-xl mb-5"
            />
            <button
              type="button"
              onClick={editListTitle}
              className="text-black mb-5 shrink-0 nx:mt-auto bg-white w-full mt-auto h-12 rounded-xl"
            >
              Done
            </button>
          </form>
        </div>
      </div>
      <div className="flex items-center w-full px-[5%] md:pt-30 md:absolute top-0 min-h-[90vh] pt-2 h-auto left-0 flex-col md:w-[75%] justify-start">
        <div
          className={`z-20 px-6 transition-all duration-500 ease-in-out ${
            selectedList._id.length > 0
              ? "opacity-100 scale-100 pointer-events-auto"
              : "opacity-0 scale-60 pointer-events-auto"
          }  ${
            selectedList._id.length > 0 ? "flex" : "hidden"
          } justify-between items-center  md:w-full md:mx-0 w-full md:mt-5 bg-task-lightGray/20 rounded-lg h-10 border-1 border-task-lightGray mb-5`}
        >
          <div
            className="cursor-pointer"
            onClick={() =>
              setSelectedList({
                _id: "",
                title: "",
                items: [],
                createdAt: new Date(),
              })
            }
          >
            x{" "}
          </div>

          <FaTrashAlt
            onClick={() => setIsDeleteModalOpen(true)}
            className="cursor-pointer"
          />
          <FaEdit onClick={openEditmodal} className="cursor-pointer" />
        </div>
        {loading ? (
          <MainCompLoading />
        ) : (
          <>
            {" "}
            <div className="relative grid grid-cols-2 min-h-[75dvh] place-items-center h-auto sm:grid-cols-2 md:grid-cols-2 w-full gap-2 md:gap-3 place-content-start items-start ">
              {isListModalOpen ? (
                <AddListModal
                  getList={getLists}
                  setIsListModalOpen={setIsListModalOpen}
                />
              ) : (
                ""
              )}
              {lists?.length === 0 ? (
                <div className="absolute top-[50%] left-[50%] -translate-[50%]">
                  No list
                </div>
              ) : (
                <>
                  {lists?.map((list) => (
                    <div
                      key={list._id}
                      onClick={() =>
                        router.push(
                          `/list/${list._id}-${list.title.replaceAll(" ", "-")}`
                        )
                      }
                      className="relative aspect-square sm:aspect-[5/4] md:aspect-square lg:aspect-[5/4] xl:aspect-video shrink-0 py-3 px-1 cursor-pointer flex flex-col justify-end  items-start rounded-2xl w-full bg-task-gray hover:opacity-75"
                    >
                      <ListComponent
                        list={list}
                        selectedList={selectedList}
                        setSelectedList={setSelectedList}
                      />
                    </div>
                  ))}
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div
        onClick={openModal}
        className={`cursor-pointer md:w-40 md:rounded-2xl text-2xl fixed right-[7%] md:right-auto md:left-[5%] shadow-3xl md text-black bottom-0 transition-all duration-700 ease-in-out mx-auto nx:hover:w-50 ${
          loading ? "hidden" : "flex"
        }  justify-center items-center rounded-full w-15 h-15 md:mb-0 md:bottom-10 mb-30 shrink-0 bg-white`}
      >
        +
      </div>
    </main>
  );
};

export default MainHome;
