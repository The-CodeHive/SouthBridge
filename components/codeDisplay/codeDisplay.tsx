"use client";

import React from "react";
import CodeBlock from "./codeBlock";
import { useSelectedFile } from "@/components/FileSystem/selectedFileContext";


export default function CodeDisplay() {
  const { selected, setSelected } = useSelectedFile();
  const code = selected?.content ?? "";
  const filename = selected?.name ?? "";

  return (
    <div className="h-full w-full flex flex-col ">

      <div className="satoshi-medium text-xs w-full border-b border-[#2c2c2c] px-4">
        <div className="flex items-center justify-between w-full h-7"> 
          <div className="flex items-center gap-3 h-full">
            <span className="select-none text-gray-400 opacity-80">CODE</span>
            {selected && (
              <div className="h-6 w-px bg-[#2c2c2c]" />
            )}
            {selected && (
              <span className="select-none text-[0.8rem] px-3 inline-flex items-center h-full rounded bg-[#11182e] text-gray-200">
                {filename}
              </span>
            )}
          </div>
            {selected && (
            <button
              aria-label="Close file"
              className="inline-flex items-center justify-center h-full px-3 rounded bg-[#11182e] hover:bg-red-950 text-gray-300 text-sm"
              onClick={() => setSelected(null)}
            >
              ×
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 w-full overflow-hidden relative">
        <div className="absolute inset-0">
          {!selected && (
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src="/code.png" 
                alt="CodeSpace" 
                className="opacity-5 w-70 select-none invert"
              />
            </div>
          )}

          {selected &&(
            <CodeBlock code={selected ? code : ""} language="tsx" />
          )}
          
        </div>
      </div>
    </div>
  );
}
