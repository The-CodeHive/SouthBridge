# CodeHive — SouthBridge Frontend

A Next.js 16 web application presenting an integrated development workspace that combines an AI-assisted chat interface, a syntax-highlighted code viewer, and a file explorer within a single, resizable layout.

---

## Overview

CodeHive replicates the core user experience of a modern in-browser IDE. The interface is divided into three resizable panels — chat, code viewer, and file explorer — allowing users to browse a project's file structure, view syntax-highlighted source code, and interact with an AI assistant in a unified workspace.

---

## Key Features

| Feature | Description |
|---|---|
| Three-panel layout | Chat, code viewer, and file explorer displayed side by side, with draggable dividers and enforced minimum widths |
| AI chat interface | Message input with streaming response rendering and slash-command support (`/assist`, `/reason`) for different assistant behaviors |
| Syntax-highlighted code viewer | Displays file contents with language-aware highlighting, rendered server-side via the Shiki library |
| File explorer | Collapsible tree view of the project structure; selecting a file loads its contents into the code viewer |
| Responsive, animated UI | Panel transitions and interactions built with Framer Motion; dark theme with custom scrollbars |
| Command palette | Contextual command suggestions triggered by `/` in the chat input |

---

## Technology Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript, React 19 |
| Styling | Tailwind CSS 4, CSS custom properties, tw-animate-css |
| UI Components | shadcn/ui, Lucide icon set |
| Animation | Framer Motion |
| Syntax Highlighting | Shiki (rose-pine theme) |
| Typography | Satoshi (primary), Geist (fallback) |

---

## Project Structure

```
.
├── app/
│   ├── api/highlight/route.ts       # API endpoint for server-side code highlighting
│   ├── globals.css                  # Global styles and CSS variables
│   ├── layout.tsx                   # Root layout, includes SelectedFileProvider
│   └── page.tsx                     # Main three-panel layout and resize logic
├── components/
│   ├── Chat/
│   │   ├── aiChat.tsx                # Chat container: input handling and message state
│   │   └── utils/msgDisplay.tsx      # Message list rendering with auto-scroll
│   ├── codeDisplay/
│   │   ├── codeBlock.tsx             # Retrieves highlighted HTML from the API
│   │   └── codeDisplay.tsx           # Renders code viewer with filename header
│   ├── FileSystem/
│   │   ├── fileSystem.tsx            # Explorer panel container
│   │   └── utils/
│   │       ├── FileList.tsx          # Renders file tree
│   │       ├── filesystem-data.ts    # Project file/folder data source
│   │       └── selectedFileContext.tsx # Context provider for selected file state
│   └── ui/
│       ├── animated-chat-input.tsx   # Chat input with slash-command support
│       └── filesystem-item.tsx       # Individual tree node component
├── lib/utils.ts                      # Shared Tailwind class utility (cn())
├── public/code.png                   # Placeholder graphic (no file selected)
├── types/globals.d.ts                # Type declarations
└── utils/shiki.ts                    # Shiki highlighting wrapper
```

**Note:** `components/ui/animated-ai-chat.tsx` and `components/FileSystem/utils/FileNode.tsx` exist in the codebase as design references from an earlier iteration but are not used in the active application.

---

## Getting Started

### Prerequisites
- Node.js 18 or later (v20 recommended)
- npm, yarn, or pnpm

### Installation
```bash
git clone <repository-url>
cd The-CodeHive-SouthBridge
npm install
```

### Local Development
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

### Production Build
```bash
npm run build
npm start
```

---

## Usage

**Chat**
Enter a message in the chat panel and press Enter or select Send. Prefixing a message with `/` surfaces command suggestions — `/assist` for general responses or `/reason` for step-by-step reasoning. Responses are currently simulated for demonstration purposes and rendered with a streaming (typewriter) effect.

**Code Viewer**
Selecting a file in the explorer panel loads its contents into the code viewer with syntax highlighting applied. The viewer can be closed via the header control, returning to a placeholder state.

**Panel Resizing**
Panel widths are adjustable by dragging the dividers between panels. Minimum widths are enforced: 400px for the chat and code panels, 250px for the file explorer.

---

## API Reference

### `POST /api/highlight`

Returns syntax-highlighted HTML for a given code snippet and language.

**Request body**
```json
{
  "code": "const x = 1;",
  "language": "ts"
}
```

**Response body**
```json
{
  "html": "<pre class=\"shiki rose-pine\">...</pre>"
}
```

The highlighting theme (rose-pine) is configured in `utils/shiki.ts` and can be changed to any theme supported by Shiki.

---

## Configuration and Extensibility

| To change... | Modify... |
|---|---|
| File tree contents | `components/FileSystem/utils/filesystem-data.ts` |
| Chat response logic (e.g., connect a live AI API) | `components/Chat/aiChat.tsx` |
| Syntax highlighting theme | `THEME` constant in `utils/shiki.ts` |
| Available slash commands | `commandSuggestions` in `components/ui/animated-chat-input.tsx` |
| Minimum panel widths | `MIN_PX` array in `app/page.tsx` |

---

## Current Limitations

- File tree data and file contents are static and stored in `filesystem-data.ts`; they are not read from an actual filesystem or repository.
- AI chat responses are pre-scripted demonstration content and are not connected to a live language model API.
- Two UI components (`animated-ai-chat.tsx`, `FileNode.tsx`) remain in the codebase from earlier design iterations and are unused in the current build.

---

## License and Status

This repository is intended for internal review purposes only and is not licensed for external distribution or production use in its current form.
