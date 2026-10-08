# Checkbox

**Group:** Inputs · `import { Checkbox } from "@iicemeta/minecraft-react-ui"`

A themed checkbox. The visual box is drawn in CSS around a real <input type="checkbox">.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `boolean` | — | Checked state. Optional in the type, but always pass it — the input is controlled. |
| `onChange` | `(value: boolean, event: React.ChangeEvent<HTMLInputElement>) => void` | — | Required. Receives the boolean. |
| `indeterminate` | `boolean` | `false` | Adds the mixed-state class. |
| `disabled` | `boolean` | `false` | Disables the input. |
| `className` | `string` | — | Appended to the Checkbox class list. |
| **⚠** `label` | `string` | — | ⚠ Declared in the props type but NOT rendered in 1.0.2 — destructured and dropped. Wrap the checkbox in your own <label> instead. |
| **⚠** `onClick` | `React.MouseEventHandler<HTMLInputElement>` | — | ⚠ Also declared but NOT forwarded to the input in 1.0.2. |

## Examples

### 1. Basic

```tsx
const [checked, setChecked] = useState(false);

<Checkbox value={checked} onChange={setChecked} />
```

### 2. Indeterminate

Renders the mixed state; it is presentational only.

```tsx
<Checkbox
  value={checked}
  indeterminate={indeterminate}
  onChange={(next) => { setChecked(next); setIndeterminate(false); }}
/>
```

## Notes

- There is no built-in label. Use a wrapping <label> so the text is part of the hit target (see the live example).
