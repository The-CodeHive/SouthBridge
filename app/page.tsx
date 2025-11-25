"use client";

import React from "react";
import { useRef, useState, useEffect } from "react";
import AIChat from "@/components/Chat/aiChat";
import CodeDisplay from "@/components/codeDisplay/codeDisplay";
import FileSystem from "@/components/FileSystem/fileSystem";

//             [chat, code, file]
const MIN_PX: [number, number, number] = [400, 400, 250];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sizes, setSizes] = useState<[number, number, number]>([
    39.8, 39.8, 20,
  ]);

  const [drag, setDrag] = useState<null | {
    index: number; // 0 = chat/code, 1 = code/file
    startX: number;
    startSizes: [number, number, number];
  }>(null);

  useEffect(() => {
    if (!drag) return;

    const move = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const dx = e.clientX - drag.startX;
      const totalWidth = containerRef.current.getBoundingClientRect().width;
      if (totalWidth <= 0) return;

      const deltaPercent = (dx / totalWidth) * 100;

      const updated: [number, number, number] = [...drag.startSizes];

      const left = drag.index;
      const right = drag.index + 1;

      const minLeftPercent = (MIN_PX[left] / totalWidth) * 100;
      const minRightPercent = (MIN_PX[right] / totalWidth) * 100;

      let newLeft = updated[left] + deltaPercent;
      let newRight = updated[right] - deltaPercent;

      // stop dragging if side would go below its min
      if (newLeft < minLeftPercent || newRight < minRightPercent) return;

      updated[left] = newLeft;
      updated[right] = newRight;

      setSizes(updated);
    };

    const stop = () => setDrag(null);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };
  }, [drag]);

  const startDrag = (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag({
      index,
      startX: e.clientX,
      startSizes: sizes,
    });
  };

  return (
    <main
      ref={containerRef}
      className="w-screen h-screen flex text-white overflow-hidden  "
    >
      <div
        style={{ width: `${sizes[0]}%` }}
        className="h-full overflow-hidden rounded-md border border-[#1f2330]"
      >
        <AIChat />
      </div>

      <div
        onMouseDown={startDrag(0)}
        className="w-1 cursor-col-resize bg-neutral-900 hover:bg-neutral-700"
      ></div>

      <div
        style={{ width: `${sizes[1]}%` }}
        className="h-full overflow-hidden rounded-md border border-[#1f2330]"
      >
        <CodeDisplay />
      </div>

      <div
        onMouseDown={startDrag(1)}
        className="w-1 cursor-col-resize bg-neutral-900 hover:bg-neutral-700"
      ></div>

      <div
        style={{ width: `${sizes[2]}%` }}
        className="h-full overflow-hidden rounded-md border border-[#1f2330]"
      >
        <FileSystem />
      </div>
    </main>
  );
}
