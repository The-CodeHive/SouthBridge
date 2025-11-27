"use client";

import React, { useEffect, useState } from "react";

type Props = {
  code: string;
  language: "tsx" | "js" | "jsx" | "css" | "json";
};

export default function CodeBlock({ code, language }: Props) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      const res = await fetch("/api/highlight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });
      const data = await res.json();
      if (mounted) setHtml(data.html || "");
    })();
    return () => {
      mounted = false;
    };
  }, [code, language]);

return (
    <div
      className="shiki-container w-full h-full overflow-auto bg-[#0b1020]"
      style={{ height: "100%", width: "100%" }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
