# ButtonGroup

**Group:** Buttons · `import { ButtonGroup } from "@iicemeta/minecraft-react-ui"`

A segmented control built from Buttons. The selected option renders as a primary, active button; every other option renders as secondary.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Required. Value of the currently selected option. |
| `options` | `Array<ButtonProps & { value: string; label: string }>` | — | Required. Each option may carry any Button prop, but variant/active are overridden by the selection state. |
| `onChange` | `(value: string) => void` | — | Called with the clicked option's value. Typed as optional but required for the group to be usable. |
| `disabled` | `boolean` | `false` | Disables every option. |
| `className` | `string` | — | Appended to the ButtonGroup class list. |

## Examples

### 1. Controlled group

value is required and the group is fully controlled.

```tsx
const [value, setValue] = useState("stone");

<ButtonGroup
  value={value}
  onChange={setValue}
  options={[
    { value: "stone", label: "Stone" },
    { value: "dirt",  label: "Dirt"  },
    { value: "oak",   label: "Oak"   },
  ]}
/>
```

### 2. Per-option side effects

An option can carry its own onClick; it runs in addition to the group's onChange.

```tsx
<ButtonGroup
  value={value}
  onChange={setValue}
  options={[
    { value: "one", label: "One" },
    { value: "two", label: "Two" },
    { value: "three", label: "Logs to console", onClick: () => console.log("fired") },
  ]}
/>
```

### 3. Disabled

disabled disables every option at once.

```tsx
<ButtonGroup
  value="b"
  disabled
  options={[
    { value: "a", label: "A" },
    { value: "b", label: "B" },
  ]}
/>
```

## Notes

- Selection is derived, not stored: the group has no internal state, so value/onChange must be wired up or nothing will move.
