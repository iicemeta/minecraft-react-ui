import { useState } from "react";

import {
  DropdownMenu,
  List,
  Menu,
  MenuIcon,
  MenuItem,
  Tag,
  type Item,
} from "@iicemeta/minecraft-react-ui";

import type { Entry } from "../lib/types";

/* ------------------------------------------------------------------- Menu */

function MenuDemo() {
  const [picked, setPicked] = useState("nothing yet");
  return (
    <div className="row">
      <Menu
        items={[
          { id: "new", label: "New world", onClick: () => setPicked("New world") },
          { id: "open", label: "Open world", onClick: () => setPicked("Open world") },
          { id: "nether", label: "Go to the Nether", disabled: true },
          { id: "quit", label: "Quit to title", onClick: () => setPicked("Quit") },
        ]}
      />
      <Tag>{picked}</Tag>
    </div>
  );
}

export const menuEntry: Entry = {
  id: "menu",
  title: "Menu",
  group: "Content",
  summary:
    "A vertical list of MenuItems. Menu itself is purely presentational — it renders whatever items you hand it and adds no positioning, so it is normally placed inside a Dropdown.",
  examples: [
    {
      title: "Basic",
      description: "Click an enabled row; the disabled row does nothing.",
      code: `<Menu
  items={[
    { id: "new",   label: "New world",  onClick: () => pick("New world") },
    { id: "open",  label: "Open world", onClick: () => pick("Open world") },
    { id: "nether", label: "Go to the Nether", disabled: true },
  ]}
/>`,
      Demo: MenuDemo,
    },
  ],
  props: [
    {
      name: "items",
      type: "Array<MenuItemProps>",
      description: "Required. Each entry becomes a MenuItem.",
    },
    {
      name: "...rest",
      type: "—",
      description:
        "None. MenuProps only declares items in 1.0.1 — it accepts no className and forwards no extra props.",
    },
  ],
  notes: [
    "Menu is a forwardRef component; the ref points at the wrapping <div class=\"Menu\">.",
    "No keyboard navigation is built in — arrow-key handling lives in the dropdown layer, not here.",
  ],
};

/* --------------------------------------------------------------- MenuItem */

function MenuItemDemo() {
  return (
    <div className="column">
      <MenuItem id="a" label="Normal item" />
      <MenuItem id="b" label="Disabled item" disabled />
      <MenuItem id="c" label={<strong>Rich node label</strong>} />
    </div>
  );
}

export const menuItemEntry: Entry = {
  id: "menu-item",
  title: "MenuItem",
  group: "Content",
  summary:
    "A single row inside a Menu. Standalone use is rare — Menu is the normal entry point — but the props are useful to know because Menu forwards them untouched.",
  examples: [
    {
      title: "label accepts a node",
      code: `<MenuItem id="a" label="Normal item" />
<MenuItem id="b" label="Disabled item" disabled />
<MenuItem id="c" label={<strong>Rich node label</strong>} />`,
      Demo: MenuItemDemo,
    },
  ],
  props: [
    { name: "id", type: "string", description: "Required. React key and identity." },
    {
      name: "label",
      type: "ReactNode",
      description: "Required. Rendered as the row content, so icons and markup are fine.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Adds MenuItem_disabled, which dims the row.",
    },
    {
      name: "onClick",
      type: "(event: React.MouseEvent<HTMLDivElement>) => void",
      description: "Called when the row is clicked.",
    },
    {
      name: "...rest",
      type: "React.HTMLAttributes<HTMLDivElement>",
      description: "Any other div attribute is forwarded.",
    },
  ],
  notes: [
    "disabled only changes styling — MenuItem still fires onClick when disabled unless you guard it yourself.",
  ],
};

/* --------------------------------------------------------------- MenuIcon */

function MenuIconDemo() {
  return (
    <div className="row">
      <MenuIcon />
      <MenuIcon className="site-icon-tinted" />
      <Tag>the glyph, not a button</Tag>
    </div>
  );
}

export const menuIconEntry: Entry = {
  id: "menu-icon",
  title: "MenuIcon",
  group: "Content",
  summary:
    "The vertical-ellipsis glyph used by DropdownMenu. It draws the icon only — wrap it in a Button yourself if you need a click target.",
  examples: [
    {
      title: "Default and recoloured",
      description: "className is the only styling hook.",
      code: `<MenuIcon />
<MenuIcon className="site-icon-tinted" />`,
      Demo: MenuIconDemo,
    },
  ],
  props: [
    {
      name: "className",
      type: "string",
      description: "Appended to the MenuIcon class list.",
    },
  ],
};

/* ----------------------------------------------------------- DropdownMenu */

function DropdownMenuDemo() {
  const [picked, setPicked] = useState("nothing yet");
  return (
    <div className="row">
      <DropdownMenu
        items={[
          { id: "rename", label: "Rename", onClick: () => setPicked("Rename") },
          { id: "duplicate", label: "Duplicate", onClick: () => setPicked("Duplicate") },
          { id: "delete", label: "Delete", disabled: true },
        ]}
      />
      <Tag>{picked}</Tag>
    </div>
  );
}

function DropdownMenuPlacementDemo() {
  return (
    <div className="row">
      <DropdownMenu
        placement="bottom-end"
        items={[
          { id: "one", label: "Aligns to the bottom-end" },
          { id: "two", label: "Of the button" },
        ]}
      />
      <DropdownMenu
        variant="primary"
        active
        placement="top-start"
        items={[{ id: "one", label: "Opens upwards" }]}
      />
    </div>
  );
}

export const dropdownMenuEntry: Entry = {
  id: "dropdown-menu",
  title: "DropdownMenu",
  group: "Content",
  summary:
    "The ⋮ overflow button. It is the most common way to use Menu: a Button containing MenuIcon, wired to a Dropdown that closes when you click away.",
  examples: [
    {
      title: "Basic",
      code: `<DropdownMenu
  items={[
    { id: "rename",    label: "Rename", onClick: () => pick("Rename") },
    { id: "duplicate", label: "Duplicate", onClick: () => pick("Duplicate") },
    { id: "delete",    label: "Delete", disabled: true },
  ]}
/>`,
      Demo: DropdownMenuDemo,
    },
    {
      title: "Placement and button styling",
      description:
        "DropdownMenu merges MenuProps, ButtonProps and DropdownProps, so button props (variant, active) and placement both work.",
      code: `<DropdownMenu placement="bottom-end" items={[...]} />
<DropdownMenu variant="primary" active placement="top-start" items={[...]} />`,
      Demo: DropdownMenuPlacementDemo,
    },
  ],
  props: [
    {
      name: "items",
      type: "Array<MenuItemProps>",
      description: "Required (from MenuProps).",
    },
    {
      name: "placement",
      type: "Placement",
      defaultValue: '"bottom-start"',
      description:
        "Any @floating-ui placement: top / bottom / left / right, plus -start and -end variants.",
    },
    {
      name: "variant / active / disabled",
      type: "ButtonProps",
      description: "Forwarded to the trigger Button.",
    },
    {
      name: "onClick",
      type: "(event: React.MouseEvent<HTMLButtonElement>) => void",
      description: "Click handler on the trigger Button (from ButtonProps).",
    },
    {
      name: "className",
      type: "string",
      description: "Applied to the trigger Button.",
    },
  ],
};

/* ------------------------------------------------------------------- List */

const blockItems: Array<Item> = [
  { id: "grass", name: "Grass Block", kind: "Natural" },
  { id: "dirt", name: "Dirt", kind: "Natural" },
  { id: "stone", name: "Stone", kind: "Natural" },
  { id: "cobblestone", name: "Cobblestone", kind: "Building" },
  { id: "oak-planks", name: "Oak Planks", kind: "Building" },
  { id: "oak-log", name: "Oak Log", kind: "Building" },
  { id: "sand", name: "Sand", kind: "Natural" },
  { id: "gravel", name: "Gravel", kind: "Natural" },
  { id: "glass", name: "Glass", kind: "Decoration" },
  { id: "bricks", name: "Bricks", kind: "Building" },
  { id: "netherrack", name: "Netherrack", kind: "Nether" },
  { id: "obsidian", name: "Obsidian", kind: "Nether" },
  { id: "glowstone", name: "Glowstone", kind: "Nether" },
  { id: "diamond-block", name: "Block of Diamond", kind: "Mineral" },
  { id: "emerald-block", name: "Block of Emerald", kind: "Mineral" },
  { id: "redstone-block", name: "Block of Redstone", kind: "Mineral" },
  { id: "iron-block", name: "Block of Iron", kind: "Mineral" },
  { id: "gold-block", name: "Block of Gold", kind: "Mineral" },
  { id: "bookshelf", name: "Bookshelf", kind: "Decoration" },
  { id: "tnt", name: "TNT", kind: "Redstone" },
  { id: "crafting-table", name: "Crafting Table", kind: "Utility" },
  { id: "furnace", name: "Furnace", kind: "Utility" },
  { id: "chest", name: "Chest", kind: "Utility" },
  { id: "torch", name: "Torch", kind: "Decoration" },
];

const blockRow = ({ item }: { item: Item }) => (
  <div className="list-row">
    <strong>{String(item.name)}</strong>
    <span className="list-row-kind">{String(item.kind)}</span>
  </div>
);

function ListSimpleDemo() {
  return (
    <div className="list-box">
      <List items={blockItems} renderItem={blockRow} />
    </div>
  );
}

function ListEverythingDemo() {
  return (
    <div className="list-box">
      <List
        items={blockItems}
        draggable
        itemSize={48}
        renderItem={blockRow}
        search={{
          searchItem: (item, keywords) =>
            String(item.name).toLowerCase().includes(keywords.toLowerCase()) ||
            String(item.kind).toLowerCase().includes(keywords.toLowerCase()),
        }}
        selection={{ initialSelectedIds: [] }}
        menu={{
          items: (item) => [
            { id: `${item?.id}-open`, label: `Open ${item?.name}` },
            { id: `${item?.id}-info`, label: "Block info" },
            { id: `${item?.id}-delete`, label: "Delete", disabled: true },
          ],
        }}
      />
    </div>
  );
}

function ListCompactDemo() {
  return (
    <div className="list-box">
      <List
        items={blockItems.slice(0, 8)}
        draggable
        itemSize={36}
        renderItem={({ item, index }) => (
          <div className="list-row">
            <span className="list-row-index">{index + 1}</span>
            <span>{String(item.name)}</span>
          </div>
        )}
      />
    </div>
  );
}

export const listEntry: Entry = {
  id: "list",
  title: "List",
  group: "Content",
  summary:
    "A virtualised, draggable, searchable, selectable list. This is the largest component in the library: virtualization via @tanstack/react-virtual, drag-and-drop via @dnd-kit, and an optional per-row overflow menu.",
  examples: [
    {
      title: "Simple",
      description: "Just items and a renderItem. Virtualisation is always on.",
      code: `<List
  items={blocks}
  renderItem={({ item }) => <div>{item.name}</div>}
/>`,
      Demo: ListSimpleDemo,
    },
    {
      title: "Everything enabled",
      description:
        "draggable + itemSize, search (with Enter / Shift+Enter to jump between matches), selection and a per-row menu. Try dragging a row, typing in the search box, ticking the select-all header, or opening a row's ⋮ menu.",
      code: `<List
  items={blocks}
  draggable
  itemSize={48}
  renderItem={renderRow}
  search={{ searchItem: (item, keywords) => match(item, keywords) }}
  selection={{ initialSelectedIds: [] }}
  menu={{
    items: (item) => [
      { id: item.id + "-open", label: "Open " + item.name },
      { id: item.id + "-delete", label: "Delete", disabled: true },
    ],
  }}
/>`,
      Demo: ListEverythingDemo,
    },
    {
      title: "Dense rows",
      description: "itemSize controls row height; renderItem gets the index too.",
      code: `<List
  items={blocks.slice(0, 8)}
  draggable
  itemSize={36}
  renderItem={({ item, index }) => <div>{index + 1}. {item.name}</div>}
/>`,
      Demo: ListCompactDemo,
    },
  ],
  props: [
    {
      name: "items",
      type: "Array<Item>",
      description:
        "Required. Item is { id: string } plus any fields you need — the extra fields are yours to read in renderItem.",
    },
    {
      name: "renderItem",
      type: "({ item, index, data }) => ReactNode",
      description: "Required. Renders the content of one row.",
    },
    {
      name: "itemSize",
      type: "number",
      defaultValue: "48",
      description: "Row height in pixels, used by the virtualiser.",
    },
    {
      name: "draggable",
      type: "boolean",
      defaultValue: "false",
      description:
        "Enables drag-to-reorder. The list keeps its own copy of items, so reordering does not touch your array.",
    },
    {
      name: "search",
      type: "{ searchItem: (item, keywords) => boolean }",
      description:
        "Adds a search field to the header and highlights matches. Enter / ArrowDown jumps forward, Shift+Enter / ArrowUp jumps back.",
    },
    {
      name: "selection",
      type: "{ initialSelectedIds?: string[]; itemDisabled?: (item) => boolean }",
      description:
        "Adds a checkbox per row plus a select-all header that shows an indeterminate state.",
    },
    {
      name: "menu",
      type: "{ items: (item?: Item) => MenuItemProps[] }",
      description:
        "Adds a ⋮ button to each row. The factory is also called with no argument for the list-level menu, so make item optional.",
    },
    {
      name: "className",
      type: "string",
      description: "Applied to the scroll container.",
    },
    {
      name: "direction",
      type: '"row" | "column"',
      description: "Declared in ListProps; the 1.0.1 implementation is fixed to a vertical list.",
    },
  ],
  notes: [
    "The list virtualises, so its container MUST have a bounded height. The showcase wraps it in a 320px box; without a height the rows collapse.",
    "Dragging and virtualisation interact: drag is disabled while the list is scrolling, which is why itemSize matters.",
  ],
};
