"use client";
//AI Used
import React, { useMemo } from "react";
import { FilesystemItem } from "@/components/ui/filesystem-item";
import { nodes } from "./filesystem-data";
import { useSelectedFile } from "./selectedFileContext";
import type { Node as FsNode } from "./filesystem-data";

export default function FileList() {
  const { setSelected } = useSelectedFile();

  const list = useMemo(
    () =>
      nodes.map((n: FsNode) => (
        <FilesystemItem
          key={n.id ?? n.name}
          node={n as any}
          animated
          onFileClick={(node) => {
            const path = (node as any).path ?? node.name;
            const name = node.name;
            const content = (node as any).content ?? "";
            setSelected({ path, name, content });
          }}
        />
      )),
    [setSelected]
  );

  return (
    <div className="h-full w-full overflow-y-auto">
      <style>{`
        .fs-panel { font-size: 0.9rem; }
        .fs-panel ul li svg { width: 14px !important; height: 14px !important; }
        .fs-panel ul li { line-height: 1.25; }
      `}</style>

      <div className="fs-panel h-full w-full">
        <ul className="space-y-1 satoshi-medium pb-15">{list}</ul>
      </div>
    </div>
  );
}
