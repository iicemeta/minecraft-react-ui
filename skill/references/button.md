# Button

**Group:** Buttons · `import { Button } from "@iicemeta/minecraft-react-ui"`

The Minecraft bezel button. A thin wrapper over a native <button>, with three visual variants and an active/pressed state.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Button label. Rendered inside a <span class="ButtonText">. |
| `variant` | `"primary" \| "secondary" \| "clear"` | — | Visual style. Note: this fork dropped upstream's defaultProps, so there is NO default variant — pass one explicitly or the button renders unstyled. |
| `active` | `boolean` | `false` | Renders the pressed/active bezel. |
| `disabled` | `boolean` | `false` | Disables the button. |
| `type` | `"button" \| "submit" \| "reset"` | — | Forwarded to the native button. |
| `onClick` | `(event: React.MouseEvent<HTMLButtonElement>) => void` | — | Click handler. |
| `className` | `string` | — | Appended to the Button class list. |
| `...rest` | `React.HTMLProps<HTMLButtonElement>` | — | Any other <button> attribute is forwarded. |

## Examples

### 1. Variants

primary, secondary and clear.

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="clear">Clear</Button>
```

### 2. States

active renders the pressed bezel, disabled blocks interaction.

```tsx
<Button variant="secondary">Default</Button>
<Button variant="secondary" active>Active</Button>
<Button variant="secondary" disabled>Disabled</Button>
```

### 3. onClick

Standard click handling.

```tsx
const [clicks, setClicks] = useState(0);

<Button variant="primary" onClick={() => setClicks((n) => n + 1)}>
  Mine
</Button>
<Tag>{clicks} clicks</Tag>
```

### 4. Form buttons

type forwards to the native button, so it works inside a form.

```tsx
<form onSubmit={handleSubmit}>
  <Button type="submit" variant="primary">Submit</Button>
  <Button type="reset" variant="clear">Reset</Button>
</form>
```

## Notes

- Button is a forwardRef component, so it can be used directly as a Dropdown target.
- Upstream declared variant="secondary" via defaultProps; React 19 removed defaultProps for function components and this fork did not replace it with a JS default. Render <Button> with no variant and you get the bare .Button class.
