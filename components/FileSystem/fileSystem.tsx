"use client";

import React from "react";
import FileList from "./FileList";

export default function FileSystem() {
  return (
    <div className="flex flex-col gap-2 items-start justify-start relative w-full h-full">
      <div className="satoshi-medium text-xs w-full text-gray-400 pt-2 border-b-1 border-[#2c2c2c] ">
        <p className="pl-4 pb-1 select-none">EXPLORER</p>
      </div>

      <div className="self-start w-full h-full pl-0.5">
        <FileList />
      </div>
    </div>
  );
}
