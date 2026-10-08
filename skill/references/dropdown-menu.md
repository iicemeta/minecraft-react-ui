# DropdownMenu

**Group:** Content · `import { DropdownMenu } from "@iicemeta/minecraft-react-ui"`

The ⋮ overflow button. It is the most common way to use Menu: a Button containing MenuIcon, wired to a Dropdown that closes when you click away.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `Array<MenuItemProps>` | — | Required (from MenuProps). |
| `placement` | `Placement` | `"bottom-start"` | Any @floating-ui placement: top / bottom / left / right, plus -start and -end variants. |
| `variant / active / disabled` | `ButtonProps` | — | Forwarded to the trigger Button. |
| `onClick` | `(event: React.MouseEvent<HTMLButtonElement>) => void` | — | Click handler on the trigger Button (from ButtonProps). |
| `className` | `string` | — | Applied to the trigger Button. |

## Examples

### 1. Basic

```tsx
<DropdownMenu
  items={[
    { id: "rename",    label: "Rename", onClick: () => pick("Rename") },
    { id: "duplicate", label: "Duplicate", onClick: () => pick("Duplicate") },
    { id: "delete",    label: "Delete", disabled: true },
  ]}
/>
```

### 2. Placement and button styling

DropdownMenu merges MenuProps, ButtonProps and DropdownProps, so button props (variant, active) and placement both work.

```tsx
<DropdownMenu placement="bottom-end" items={[...]} />
<DropdownMenu variant="primary" active placement="top-start" items={[...]} />
```
