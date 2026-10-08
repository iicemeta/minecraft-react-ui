# Radio

**Group:** Inputs · `import { Radio } from "@iicemeta/minecraft-react-ui"`

A single radio input. It is unopinionated about grouping — you supply name, checked and the change handler yourself. For a ready-made group use RadioGroup.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | The value reported to onChange. |
| `checked` | `boolean` | — | Controlled checked state — Radio does not manage it for you. |
| `onChange` | `(value: string, event: React.ChangeEvent<HTMLInputElement>) => void` | — | Required. Receives the input's value. |
| `indeterminate` | `boolean` | `false` | Adds the mixed-state class. |
| `disabled` | `boolean` | `false` | Disables the input. |
| `className` | `string` | — | Appended to the Radio class list. |
| `...rest` | `React.HTMLProps<HTMLInputElement>` | — | name and any other input attribute are forwarded. |

## Examples

### 1. Manual group

Three Radios sharing a name, state kept by the parent.

```tsx
const [picked, setPicked] = useState("creeper");

{["creeper", "skeleton", "zombie"].map((mob) => (
  <Radio
    key={mob}
    name="mob"
    value={mob}
    checked={picked === mob}
    onChange={setPicked}
  />
))}
```
