# Tag

**Group:** Layout · `import { Tag } from "@iicemeta/minecraft-react-ui"`

A small inline label. Nothing but a styled <span>, which makes it the cheapest way to show a value next to a control.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | — | Required. Tag content. |
| `className` | `string` | — | Appended to the Tag class list — the only styling hook. |

## Examples

### 1. Default and restyled

```tsx
<Tag>diamond</Tag>
<Tag>iron_ingot</Tag>
<Tag className="site-tag-success">+12</Tag>
```

## Notes

- Tag forwards no other props, so put handlers on a wrapping element.
