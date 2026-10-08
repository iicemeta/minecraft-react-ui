# Menu

**Group:** Content · `import { Menu } from "@iicemeta/minecraft-react-ui"`

A vertical list of MenuItems. Menu itself is purely presentational — it renders whatever items you hand it and adds no positioning, so it is normally placed inside a Dropdown.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `Array<MenuItemProps>` | — | Required. Each entry becomes a MenuItem. |
| `...rest` | `—` | — | None. MenuProps only declares items in 1.0.2 — it accepts no className and forwards no extra props. |

## Examples

### 1. Basic

Click an enabled row; the disabled row does nothing.

```tsx
<Menu
  items={[
    { id: "new",   label: "New world",  onClick: () => pick("New world") },
    { id: "open",  label: "Open world", onClick: () => pick("Open world") },
    { id: "nether", label: "Go to the Nether", disabled: true },
  ]}
/>
```

## Notes

- Menu is a forwardRef component; the ref points at the wrapping <div class="Menu">.
- No keyboard navigation is built in — arrow-key handling lives in the dropdown layer, not here.
