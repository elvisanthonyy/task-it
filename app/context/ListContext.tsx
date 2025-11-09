"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface List {
  _id: string;
  title: string;
  items: string[];
  createdAt: Date;
}

type ListContextType = {
  currentList: List;
  setCurrentList: (newCurrentList: List) => void;
};

const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListProvider = ({ children }: { children: ReactNode }) => {
  const [currentList, setCurrentList] = useState<List>({
    _id: "",
    title: "",
    items: [],
    createdAt: new Date(),
  });
  return (
    <ListContext.Provider value={{ currentList, setCurrentList }}>
      {children}
    </ListContext.Provider>
  );
};

export const useListListContext = () => {
  const ctx = useContext(ListContext);
  if (!ctx) throw new Error("useListContext must be used inside ListProvider");
  return ctx;
};
