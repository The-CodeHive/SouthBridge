"use client";

import React, { createContext, useContext, useState } from "react";

export type FileEntry = {
  path: string;
  name: string;
  content: string;
};

type ContextShape = {
  selected: FileEntry | null;
  setSelected: (f: FileEntry | null) => void;
};

const SelectedFileContext = createContext<ContextShape | undefined>(undefined);
//AI used
export const SelectedFileProvider = ({ children }: { children: React.ReactNode }) => {
  const [selected, setSelected] = useState<FileEntry | null>(null);
  return (
    <SelectedFileContext.Provider value={{ selected, setSelected }}>
      {children}
    </SelectedFileContext.Provider>
  );
};

export const useSelectedFile = () => {
  const ctx = useContext(SelectedFileContext);
  if (!ctx) throw new Error("useSelectedFile must be used within SelectedFileProvider");
  return ctx;
};
