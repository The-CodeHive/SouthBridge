
export type Node = {
  name: string;
  nodes?: Node[];
  content?: string; 
  path?: string;
  id?: string;
};

const assign = (nodes: Node[], base = ""): Node[] =>
  nodes.map((n, i) => {
    const id = base === "" ? `${i}` : `${base}/${i}`;
    const path = base === "" ? n.name : `${base}/${n.name}`;
    return {
      ...n,
      id,
      path,
      nodes: n.nodes ? assign(n.nodes, path) : undefined,
    };
  });

// minimal clean tree
const raw: Node[] = [
  {
    name: "app",
    nodes: [
      {
        name: "page.tsx",
        content: `\n\nexport default function Page() {
  return <main>Hello World</main>
}`,
      },
      {
        name: "layout.tsx",
        content: `\n\nexport default function RootLayout({ children }) {
  return \n   <html>\n    <body>\n      {children}\n     </body>\n   </html>
}`,
      },
    ],
  },

  {
    name: "components",
    nodes: [
      {
        name: "Navbar.tsx",
        content: `\n\nexport default function Navbar() {
  return <nav className='p-4'>Navbar</nav>
}`,
      },
      {
        name: "Button.tsx",
        content: `\n\nexport default function Button({ children }) {
  return <button className='px-3 py-1'>{children}</button>
}`,
      },
    ],
  },

  {
    name: "lib",
    nodes: [
      {
        name: "utils.ts",
        content: `\n\nexport const add = (a: number, b: number) => a + b`,
      },
    ],
  },

  {
    name: "styles",
    nodes: [
      {
        name: "globals.css",
        content: `\n\nbody {\n margin: 0;\n background: #0b1020;\n color: white; \n}`,
      },
    ],
  },
];

export const nodes = assign(raw);
