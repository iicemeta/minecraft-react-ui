# RadioGroup

**Group:** Inputs · `import { RadioGroup } from "@iicemeta/minecraft-react-ui"`

A labelled list of radios with the shared state handled for you.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — | Required. Groups the radios together. |
| `value` | `string \| undefined` | — | Required prop. undefined means nothing is selected. |
| `onChange` | `(value: string, event: React.ChangeEvent<HTMLInputElement>) => void` | — | Required. Receives the newly selected value. |
| `options` | `Array<{ label: string; value: string; disabled?: boolean; readOnly?: boolean }>` | — | Required. |
| `direction` | `"row" \| "column"` | `"column"` | Layout of the options. |
| `disabled` | `boolean` | `false` | Disables every radio. |
| `readOnly` | `boolean` | `false` | Focusable but not changeable. |
| `className` | `string` | — | Appended to the RadioGroup class list. |

## Examples

### 1. Basic

one option may be disabled, and value may be undefined (nothing selected).

```tsx
const [value, setValue] = useState<string | undefined>("cave");

<RadioGroup
  name="spawn"
  value={value}
  onChange={setValue}
  options={[
    { label: "Surface", value: "surface" },
    { label: "Cave",    value: "cave"    },
    { label: "Ocean floor (disabled)", value: "ocean", disabled: true },
  ]}
/>
```

### 2. Horizontal

```tsx
<RadioGroup name="difficulty" value={value} onChange={setValue} direction="row" options={[...]} />
```
