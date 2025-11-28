"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";


export type Role = "user" | "assistant" | "reasoning";
export type Message = { id: number; role: Role; content: string; streaming?: boolean; };

export default function MsgDisplay({ messages }: { messages: Message[] }) {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const threshold = 24;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (isAtBottom) {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, 
  [messages, isAtBottom]);

  useEffect(() => {

    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
      setIsAtBottom(atBottom);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    el.scrollTo({ top: el.scrollHeight });

    return () => el.removeEventListener("scroll", onScroll);

  }, []);

  const scrollToBottom = () => {

    const el = containerRef.current;
    if (!el) return;
    
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    setIsAtBottom(true);
  };

return (
  <div className="relative h-full w-full bg-transparent">
    <div
      ref={containerRef}
      className="h-full overflow-y-auto px-4 py-3"
    >
    <div className="flex flex-col justify-end min-h-full gap-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user" ? "flex justify-end" : "flex justify-start"
            }
          >
            <div
              className={`max-w-[78%] px-3 py-2 rounded-lg text-sm
                ${
                  m.role === "user"
                    ? "bg-[#faf5dc] text-black"
                    : m.role === "reasoning"
                    ? "bg-white/5 text-white/80 italic"
                    : "bg-white/[0.06] text-white/90"
                }
                ${m.streaming ? "opacity-90" : ""}
              `}
            >
              <div className="whitespace-pre-wrap break-words">
                {m.content}
              </div>
              {m.streaming && (
                <div className="text-xs text-white/40 mt-1">Generating....</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>

    {!isAtBottom && (
      <button
        onClick={scrollToBottom}
        className="absolute left-1/2 transform -translate-x-1/2 bottom-7 bg-white/10 text-white px-3 py-3 rounded-full text-xs shadow-lg backdrop-blur-xs"
      >
         <ArrowDown className="w-4 h-4" />
      </button>
    )}
  </div>
);
}
