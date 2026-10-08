# Select

**Group:** Inputs · `import { Select } from "@iicemeta/minecraft-react-ui"`

A searchable select. It is a Dropdown wrapping a Menu, driven by a text input — so focusing it opens the list and typing filters it.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Selected option value. undefined means nothing is selected. |
| `options` | `Array<{ label: string; value: string; disabled?: boolean }>` | — | Required. Filtered against both label and value as you type. |
| `onChange` | `(value?: string) => void` | — | Required. Called with the picked value, or with undefined when the clear (✕) button is used. |
| `placeholder` | `string` | — | Shown while unfocused and empty. |
| `searchPlaceholder` | `string` | — | Swapped in while the field has focus. |
| `disabled` | `boolean` | `false` | Disables the field. |
| `onFocus / onBlur` | `(event: React.FocusEvent<HTMLInputElement>) => void` | — | Both default to a no-op, so they are safe to omit. |
| `className` | `string` | — | Appended to the Select class list. |

## Examples

### 1. Searchable select

Click the field, type to filter, click an option to choose. The ✕ button clears the selection.

```tsx
const [value, setValue] = useState<string | undefined>(undefined);

<Select
  value={value}
  onChange={setValue}
  placeholder="Pick a material…"
  searchPlaceholder="Search…"
  options={[
    { label: "Oak Wood", value: "oak" },
    { label: "Stone",    value: "stone" },
    { label: "Netherite (disabled)", value: "netherite", disabled: true },
  ]}
/>
```

### 2. Disabled

```tsx
<Select disabled value="stone" onChange={() => {}} options={[...]} />
```

## Notes

- Give it a bounded width — the dropdown matches the field's width.
