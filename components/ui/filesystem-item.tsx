"use client"

import { useState } from "react"
import { ChevronRight, Folder, File } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

type Node = {
  name: string
  nodes?: Node[]
}

interface FilesystemItemProps {
  node: Node
  animated?: boolean
}

export function FilesystemItem({
  node,
  animated = false,
}: FilesystemItemProps) {
  let [isOpen, setIsOpen] = useState(false)

  const ChevronIcon = () =>
    animated ? (
      <motion.span
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        className="flex"
      >
        <ChevronRight className="size-4 text-gray-500" />
      </motion.span>
    ) : (
      <ChevronRight
        className={`size-4 text-gray-500 ${isOpen ? "rotate-90" : ""}`}
      />
    )

  const ChildrenList = () => {
    const children = node.nodes?.map((node) => (
      <FilesystemItem node={node} key={node.name} animated={animated} />
    ))

    if (animated) {
      return (
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="pl-4 overflow-hidden flex flex-col justify-end"
            >
              {children}
            </motion.ul>
          )}
        </AnimatePresence>
      )
    }

    return isOpen && <ul className="pl-6">{children}</ul>
  }

  return (
    <li key={node.name} >
      <span
        className="flex items-center gap-1.5 py-1 cursor-pointer select-none hover:bg-[#1f2330] rounded-md px-2"
        role={node.nodes && node.nodes.length > 0 ? "button" : undefined}
        tabIndex={node.nodes && node.nodes.length > 0 ? 0 : undefined}
        onClick={() => {
          if (node.nodes && node.nodes.length > 0) setIsOpen(!isOpen)
        }}
        onKeyDown={(e) => {
          if (
            node.nodes &&
            node.nodes.length > 0 &&
            (e.key === "Enter" || e.key === " ")
          ) {
            e.preventDefault()
            setIsOpen(!isOpen)
          }
        }}
      >
        {node.nodes && node.nodes.length > 0 && (
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(!isOpen)
            }}
            className="p-1 -m-1"
            aria-label={isOpen ? "Collapse folder" : "Expand folder"}
          >
            <ChevronIcon />
          </button>
        )}

        {node.nodes ? (
          <Folder
            className={`size-6 text-sky-500 fill-sky-500 ${
              node.nodes.length === 0 ? "ml-3" : ""
            }`}
          />
        ) : (
          <File
            color="rgba(96, 162, 255, 0.68)"
            className="ml-3 size-6 text-gray-900"
          />
        )}
        {node.name}
      </span>

      <ChildrenList />
    </li>
  )
}
