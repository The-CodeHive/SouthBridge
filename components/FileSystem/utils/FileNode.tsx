"use client";
//AI Used
import React from "react";
import { FilesystemItem } from "@/components/ui/filesystem-item";
import type { Node } from "./filesystem-data";
import { useSelectedFile } from "./selectedFileContext";

type Props = {
  node: Node;
  level?: number;
  selectedPath?: string | null;
};

export default function FileNode({ node, level = 0, selectedPath }: Props) {
  const { setSelected } = useSelectedFile();
  const isFolder = Array.isArray(node.nodes) && node.nodes.length > 0;
  const key = node.id ?? `${node.name}-${level}`;
  const path = (node as any).path ?? node.name ?? key;
  const name = node.name ?? key;
  const isActive = selectedPath === path;

  function onClick(e: React.MouseEvent) {
    e.stopPropagation();
    if (isFolder) return;
    const content = `// Dummy content for ${name}\n\n// Path: ${path}\n\nfunction ${name
      .replace(/\W/g, "_")
      .toLowerCase()}() {\n  console.log("${name} selected");\n}\n`;
    setSelected({ path, name, content });
  }

  return (
    <div
      key={key}
      onClick={onClick}
      className={`flex flex-col ${isFolder ? "" : "cursor-pointer"} ${
        isActive ? "bg-slate-700/40 rounded" : "hover:bg-slate-700/20 rounded"
      }`}
      style={{ paddingLeft: level > 0 ? 6 : 0 }}
    >
      <FilesystemItem node={node} />

      {isFolder && (
        <ul className="pl-4 space-y-1 mt-1">
          {node.nodes!.map((child) => (
            <FileNode
              key={(child as any).id ?? (child as any).name}
              node={child}
              level={level + 1}
              selectedPath={selectedPath}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
