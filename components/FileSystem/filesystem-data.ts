export type Node = {
  name: string
  nodes?: Node[]
  id: string
}

// Generate stable unique IDs for each node
const generateIds = (nodes: Omit<Node, "id">[], prefix = ""): Node[] =>
  nodes.map((n, i) => ({
    ...n,
    id: `${prefix}${i}`,
    nodes: n.nodes ? generateIds(n.nodes, `${prefix}${i}-`) : undefined,
  }))

// Next.js Template Structure
const rawNodes: Omit<Node, "id">[] = [
  {
    name: "app",
    nodes: [
      {
        name: "(site)",
        nodes: [
          { name: "layout.tsx" },
          { name: "page.tsx" },
          { name: "loading.tsx" },
          { name: "error.tsx" },
        ],
      },
      {
        name: "api",
        nodes: [
          {
            name: "users",
            nodes: [{ name: "route.ts" }],
          },
          {
            name: "auth",
            nodes: [{ name: "route.ts" }],
          },
        ],
      },
      { name: "globals.css" },
      { name: "favicon.ico" },
    ],
  },

  {
    name: "components",
    nodes: [
      { name: "ui", nodes: [] },
      { name: "navbar.tsx" },
      { name: "footer.tsx" },
      { name: "button.tsx" },
    ],
  },

  {
    name: "lib",
    nodes: [
      { name: "utils.ts" },
      { name: "auth.ts" },
      { name: "db.ts" },
    ],
  },

  {
    name: "hooks",
    nodes: [
      { name: "useMediaQuery.ts" },
      { name: "useTheme.ts" },
    ],
  },

  {
    name: "context",
    nodes: [
      { name: "ThemeProvider.tsx" },
      { name: "AuthProvider.tsx" },
    ],
  },

  {
    name: "styles",
    nodes: [
      { name: "globals.css" },
      { name: "reset.css" },
    ],
  },

  {
    name: "public",
    nodes: [
      { name: "images", nodes: [] },
      { name: "logo.svg" },
    ],
  },

  {
    name: "prisma",
    nodes: [
      { name: "schema.prisma" },
    ],
  },

  { name: "next.config.js" },
  { name: "package.json" },
  { name: "tsconfig.json" },
  { name: "middleware.ts" },
]

export const nodes: Node[] = generateIds(rawNodes)
