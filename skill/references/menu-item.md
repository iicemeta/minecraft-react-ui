# MenuItem

**Group:** Content · `import { MenuItem } from "@iicemeta/minecraft-react-ui"`

A single row inside a Menu. Standalone use is rare — Menu is the normal entry point — but the props are useful to know because Menu forwards them untouched.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | `string` | — | Required. React key and identity. |
| `label` | `ReactNode` | — | Required. Rendered as the row content, so icons and markup are fine. |
| `disabled` | `boolean` | `false` | Adds MenuItem_disabled, which dims the row. |
| `onClick` | `(event: React.MouseEvent<HTMLDivElement>) => void` | — | Called when the row is clicked. |
| `...rest` | `React.HTMLAttributes<HTMLDivElement>` | — | Any other div attribute is forwarded. |

## Examples

### 1. label accepts a node

```tsx
<MenuItem id="a" label="Normal item" />
<MenuItem id="b" label="Disabled item" disabled />
<MenuItem id="c" label={<strong>Rich node label</strong>} />
```

## Notes

- disabled only changes styling — MenuItem still fires onClick when disabled unless you guard it yourself.
