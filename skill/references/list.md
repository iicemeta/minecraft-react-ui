# List

**Group:** Content · `import { List } from "@iicemeta/minecraft-react-ui"`

A virtualised, draggable, searchable, selectable list. This is the largest component in the library: virtualization via @tanstack/react-virtual, drag-and-drop via @dnd-kit, and an optional per-row overflow menu.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `Array<Item>` | — | Required. Item is { id: string } plus any fields you need — the extra fields are yours to read in renderItem. |
| `renderItem` | `({ item, index, data }) => ReactNode` | — | Required. Renders the content of one row. |
| `itemSize` | `number` | `48` | Row height in pixels, used by the virtualiser. |
| `draggable` | `boolean` | `false` | Enables drag-to-reorder. The list keeps its own copy of items, so reordering does not touch your array. |
| `search` | `{ searchItem: (item, keywords) => boolean }` | — | Adds a search field to the header and highlights matches. Enter / ArrowDown jumps forward, Shift+Enter / ArrowUp jumps back. |
| `selection` | `{ initialSelectedIds?: string[]; itemDisabled?: (item) => boolean }` | — | Adds a checkbox per row plus a select-all header that shows an indeterminate state. |
| `menu` | `{ items: (item?: Item) => MenuItemProps[] }` | — | Adds a ⋮ button to each row. The factory is also called with no argument for the list-level menu, so make item optional. |
| `className` | `string` | — | Applied to the scroll container. |
| `direction` | `"row" \| "column"` | — | Declared in ListProps; the 1.0.2 implementation is fixed to a vertical list. |

## Examples

### 1. Simple

Just items and a renderItem. Virtualisation is always on.

```tsx
<List
  items={blocks}
  renderItem={({ item }) => <div>{item.name}</div>}
/>
```

### 2. Everything enabled

draggable + itemSize, search (with Enter / Shift+Enter to jump between matches), selection and a per-row menu. Try dragging a row, typing in the search box, ticking the select-all header, or opening a row's ⋮ menu.

```tsx
<List
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
/>
```

### 3. Dense rows

itemSize controls row height; renderItem gets the index too.

```tsx
<List
  items={blocks.slice(0, 8)}
  draggable
  itemSize={36}
  renderItem={({ item, index }) => <div>{index + 1}. {item.name}</div>}
/>
```

## Notes

- The list virtualises, so its container MUST have a bounded height. The showcase wraps it in a 320px box; without a height the rows collapse.
- Dragging and virtualisation interact: drag is disabled while the list is scrolling, which is why itemSize matters.
