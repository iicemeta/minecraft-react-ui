# Minecraft React UI

The Minecraft UI which Mojang Studios wished to had and haven't.

A React + TypeScript components library, rebuilt on **React 19**.

## Tech Stack

- **UI:** TypeScript, React 19 and CSS
- **Preview:** lightweight Vite gallery page (`demo/`) — replaces Storybook
- **Build:** Vite (library mode) + postcss (mixins + import)
- **Dependencies (modern replacements):**
  - `@floating-ui/react-dom` → replaces `react-popper` / `@popperjs/core` (Dropdown, Tooltip)
  - `@dnd-kit/*` → replaces `react-beautiful-dnd` (List drag-and-drop)
  - `@tanstack/react-virtual` → replaces `react-window` / `react-virtualized-auto-sizer` (List virtualization)

## Getting Started

```bash
npm install
```

## Components Preview (gallery)

Instead of Storybook, this repo ships a lightweight, interactive gallery page that
shows every component. Run it with:

```bash
npm run dev
```

Then open `http://localhost:5173`. The gallery lives in `demo/` and imports the
real library sources (`src/`), so edits to components hot-reload immediately.

## Build the library

```bash
npm run build
```

Outputs to `dist/`:

- `dist/index.js` — ESM
- `dist/index.cjs` — CommonJS
- `dist/index.d.ts` — TypeScript declarations
- `dist/minecraft-react-ui.css` — bundled, processed styles

Style the minecraft CSS variables (colors, etc.) are available once the styles
are loaded. The CSS build preserves the original `@import "minecraft-ui.css"`
and `@mixin bezel` processing via `postcss.config.cjs` (`postcss-import` +
`postcss-mixins` + `autoprefixer`).

## Components

Buttons · ButtonGroup · Checkbox · CheckboxGroup · Dropdown · DropdownMenu ·
FlexBox · Input · List (virtualized + draggable + search + selection) · Menu ·
MenuIcon · MenuItem · Radio · RadioGroup · Select · Slider · Switch · Tag · Tooltip

## License

MIT
