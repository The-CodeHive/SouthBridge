"use client"

import React, { useMemo } from "react"
import { FilesystemItem } from "@/components/ui/filesystem-item"
import { nodes, type Node } from "@/components/filesystem/filesystem-data"

const renderNodeAnimated = (node: Node) => (
  <FilesystemItem node={node} key={node.id} animated />
)

const FilesystemAnimatedComponent: React.FC = () => {
  const list = useMemo(() => nodes.map(renderNodeAnimated), [])

  return (
    <div className="h-full w-full overflow-y-auto ">
      <style>{`
        .fs-panel { font-size: 0.9rem; }
        .fs-panel ul li svg { width: 14px !important; height: 14px !important; }
        .fs-panel ul li { line-height: 1.25; }
      `}</style>

      <div className="fs-panel h-full w-full">
        <ul className="space-y-1 satoshi-medium pb-15">
          {list}
        </ul>
      </div>
    </div>
  )
}

const Filesystem = React.memo(FilesystemAnimatedComponent)

const FileSystemComponent: React.FC = () => {
  return (
    <div className="flex flex-col gap-2  items-start justify-start relative w-full h-full">
      <div className="satoshi-medium text-xs w-full text-gray-400 pt-2 border-b-1  border-[#2c2c2c] "> 
        <p className="pl-4 pb-1  select-none">EXPLORER</p>
      </div>
      <div className="self-start w-full h-full pl-0.5 ">
        <Filesystem />
      </div>
    </div>
  )
}

const FileSystem = React.memo(FileSystemComponent)

export default FileSystem
