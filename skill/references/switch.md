# Switch

**Group:** Inputs · `import { Switch } from "@iicemeta/minecraft-react-ui"`

A sliding on/off switch. Same API shape as Checkbox, different chrome.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `boolean` | — | Required. Checked state. |
| `onChange` | `(value: boolean, event: React.ChangeEvent<HTMLInputElement>) => void` | — | Required. Receives the boolean. |
| `indeterminate` | `boolean` | `false` | Adds the mixed-state class. |
| `disabled` | `boolean` | `false` | Disables the input. |
| `className` | `string` | — | Appended to the Switch class list. |
| **⚠** `label` | `string` | — | ⚠ Declared but not rendered in 1.0.2 (same as Checkbox). |
| **⚠** `onClick` | `React.MouseEventHandler<HTMLInputElement>` | — | ⚠ Declared but not forwarded in 1.0.2. |

## Examples

### 1. Basic

```tsx
const [on, setOn] = useState(true);

<Switch value={on} onChange={setOn} />
```

### 2. On / off / disabled

```tsx
<Switch value onChange={() => {}} />
<Switch value={false} onChange={() => {}} />
<Switch value disabled onChange={() => {}} />
```
