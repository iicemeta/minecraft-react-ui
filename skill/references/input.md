# Input

**Group:** Inputs · `import { Input } from "@iicemeta/minecraft-react-ui"`

Single-line text input. onChange is unwrapped: it hands you the string, not the event.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | — | Controlled value (inherited from HTMLProps<HTMLInputElement>). |
| `onChange` | `(value: string, event?: React.ChangeEvent<HTMLInputElement>) => void` | — | Required. Receives the string, not the DOM event. |
| `disabled` | `boolean` | `false` | Disables the input. |
| `className` | `string` | — | Appended to the Input class list. |
| `...rest` | `React.HTMLProps<HTMLInputElement>` | — | placeholder, type, onKeyDown, … are all forwarded. |

## Examples

### 1. Basic

```tsx
const [value, setValue] = useState("");

<Input placeholder="Type something…" value={value} onChange={setValue} />
```

### 2. Disabled and native types

Any native attribute is forwarded, including type.

```tsx
<Input placeholder="Disabled" disabled value="" onChange={() => {}} />
<Input value={value} onChange={setValue} />
<Input type="password" placeholder="Password" value="" onChange={() => {}} />
```

## Notes

- forwardRef — the underlying <input> can be reached with a ref.
