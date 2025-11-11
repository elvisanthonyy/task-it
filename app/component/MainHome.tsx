"use client";
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AddListModal from "./AddListModal";
import { useSession } from "next-auth/react";
import ListComponent from "./ListComponent";
import NavigationButtons from "./NavigationButtons";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import api from "@/app/utils/api";
import { redirect } from "next/navigation";
import MainCompLoading from "./MainCompLoading";

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
          toast.success(response.data.message);
          setIsDeleteModalOpen(false);
          setSelectedList({
            _id: "",
            title: "",
            items: [],
            createdAt: new Date(),
          });
        } else {
          toast.error(response.data.message);
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
        if (response.data.message === "List title updated") {
          alert(response.data.message);
          setIsEditModalOpen(false);
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

  const listLink = (listPar: List) => {
    //setCurrentList(list);
    setTimeout(() => {
      redirect(`/list/${listPar._id}-${listPar.title.replaceAll(" ", "-")}`);
    }, 100);
  };
  useEffect(() => {
    if (status === "authenticated") {
      getLists();
    }
  }, [session?.user?.email, status, session?.user?.id]);

  return (
    <main className="flex min-h-[90vh] flex-col items-center justify-start mt-25 w-full">
      <div
        className={`z-20 px-6 transition-all duration-500 ease-in-out ${
          selectedList._id.length > 0
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-60 pointer-events-auto"
        }  ${
          selectedList._id.length > 0 ? "flex" : "hidden"
        } justify-between items-center w-[90%] bg-task-lightGray/20 rounded-2xl h-8 border-1 border-task-lightGray mb-5`}
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
        <div
          onClick={() => setIsDeleteModalOpen(false)}
          className={`z-15 flex justify-center items-center top-0 left-0 ${
            isDeleteModalOpen ? "fixed" : "hidden"
          } w-full h-screen bg-black/50`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[50%] h-[20%] rounded-xl bg-white"
          >
            <button onClick={deleteList} className="text-black m-10">
              yes
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="text-black m-10"
            >
              No
            </button>
          </div>
        </div>
        <div
          onClick={() => setIsEditModalOpen(false)}
          className={`z-15 flex justify-center items-center top-0 left-0 ${
            isEditModalOpen ? "fixed" : "hidden"
          } w-full h-screen bg-black/50`}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[50%] h-[20%] rounded-xl bg-white"
          >
            <form>
              <input
                value={listTitle}
                onChange={(e) => setListTitle(e.target.value)}
                type="text"
                className="border-2 border-black text-black"
              />
              <button
                type="button"
                onClick={editListTitle}
                className="text-black m-10"
              >
                Done
              </button>
            </form>
          </div>
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
          <div className="relative grid grid-cols-2 h-[75dvh] place-items-center sm:grid-cols-3 md:grid-cols-4 w-[95%] gap-y-5 gap-0 place-content-start items-start ">
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
                    onClick={() => listLink(list)}
                    key={list._id}
                    className="relative aspect-square shrink-0 py-3 px-1 cursor-pointer flex flex-col justify-end  items-start rounded-2xl w-[90%]   bg-task-gray hover:opacity-75"
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
          <div
            onClick={openModal}
            className="cursor-pointer text-2xl fixed right-[7%] text-black bottom-0 mx-auto hover:opacity-50 flex justify-center items-center rounded-full w-15 h-15 mb-30 shrink-0 bg-white"
          >
            +
          </div>
        </>
      )}

      <NavigationButtons />
    </main>
  );
};

export default MainHome;
