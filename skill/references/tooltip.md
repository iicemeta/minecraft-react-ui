# Tooltip

**Group:** Layers · `import { Tooltip } from "@iicemeta/minecraft-react-ui"`

A floating hint with an arrow, positioned with @floating-ui. Wrap any element and it gains a hover or click trigger.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | `ReactNode` | — | Required. Tooltip body. |
| `children` | `ReactNode` | — | Required. Wrapped in a <span class="TooltipTarget"> — so the child gets an inline wrapper it did not have before. |
| `placement` | `Placement` | `"bottom"` | Any @floating-ui placement; also used to pick the arrow-side CSS class. |
| `trigger` | `"hover" \| "click"` | `"hover"` | How the tooltip opens. |

## Examples

### 1. Hover, four sides

```tsx
<Tooltip content="I appear on hover" placement="top">
  <Button variant="secondary">Top</Button>
</Tooltip>
```

### 2. Aligned placements

The -start and -end suffixes align the tooltip to the edges of the child.

```tsx
<Tooltip content="bottom-end" placement="bottom-end">
  <Button variant="secondary">bottom-end</Button>
</Tooltip>
```

### 3. Click trigger

With trigger="click" the tooltip toggles on the child and dismisses on an outside mousedown or touchstart. The child's own onClick still runs.

```tsx
<Tooltip content="Click to toggle me" trigger="click" placement="top">
  <Button variant="primary" onClick={handleClick}>Toggle tooltip</Button>
</Tooltip>
```

## Notes

- Under the hood the tooltip starts hidden and only portals into the DOM while visible, so it costs nothing until first shown.
- forwardRef exposes { update, middlewareData, elements, floatingStyles } if you need to reposition it manually.
