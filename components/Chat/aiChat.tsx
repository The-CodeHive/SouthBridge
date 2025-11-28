"use client";

import React, { useState } from "react";
import AnimatedChatInput from "../ui/animated-chat-input";
import MsgDisplay, { Message } from "./utils/msgDisplay";

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", content: "Hello Wassup 😎", streaming: false },
  ]);

  const handleSend = (text: string, command?: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      content: text.trim(),
      streaming: false,
    };
    setMessages((m) => [...m, userMsg]);

    const dummy = command === "/reason"
      ? "Okay — reasoning here but no one better rizzler than me 😩 "
      : "Got it — assistant style here .. this Ai is the best coz it has me 😏👌";

    const assistantId = Date.now() + 1;

    const assistantMsg: Message = 
      { id: assistantId, role: "assistant", content: "", streaming: true };

      setMessages((m) => [...m, assistantMsg]);

    const tokens = dummy.split(" ");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMessages((prev) =>
        prev.map((mm) => (mm.id === assistantId ? { ...mm, content: tokens.slice(0, i).join(" ") + (i < tokens.length ? " " : ""), streaming: i < tokens.length } : mm))
      );
      if (i >= tokens.length) {
        clearInterval(interval);
      }
    }, 60);
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="satoshi-medium text-xs w-full text-gray-400 pt-2 border-b border-[#2c2c2c]">
        <p className="pl-4 pb-1 select-none">CHAT</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <MsgDisplay messages={messages} />
      </div>

      <div className=" pb-2 px-3">
        <div className="text-gray-500">
          <AnimatedChatInput onSend={handleSend} />
        </div>
      </div>

    </div>
  );
}