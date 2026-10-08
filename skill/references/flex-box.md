# FlexBox

**Group:** Layout · `import { FlexBox } from "@iicemeta/minecraft-react-ui"`

A thin declarative wrapper around flexbox. Its whole value is that the layout reads as props instead of one-off CSS classes.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `direction` | `"row" \| "col"` | `"row"` | Main axis. |
| `justify` | `"flex-start" \| "flex-end" \| "center" \| "space-between" \| "space-around"` | `"flex-start"` | justify-content. |
| `align` | `"flex-start" \| "flex-end" \| "center" \| "stretch"` | `"flex-start"` | align-items. |
| **⚠** `wrap` | `"wrap" \| "nowrap"` | — | ⚠ Declared in FlexBoxProps but NOT used in 1.0.2 — it never reaches the className. Set flex-wrap through style instead. |
| `style` | `React.CSSProperties` | — | Applied to the wrapper div — this is how you pass gap. |
| `className` | `string` | — | Appended to the FlexBox class list. |
| `children` | `ReactNode` | — | Required. |

## Examples

### 1. Row with space-between

```tsx
<FlexBox justify="space-between" align="center">
  <Button variant="primary">Left</Button>
  <Button variant="secondary">Middle</Button>
  <Button variant="clear">Right</Button>
</FlexBox>
```

### 2. Column, stretched

direction="col" maps to FlexBox_col, which is column-direction with centered cross-axis.

```tsx
<FlexBox direction="col" justify="flex-start" align="stretch">
  <Button variant="primary">Stacked one</Button>
  <Button variant="secondary">Stacked two</Button>
</FlexBox>
```

### 3. Every justify value

Gaps are not a prop — pass them through style, which FlexBox applies to the wrapper div.

```tsx
<FlexBox justify="space-around" align="flex-end" style={{ gap: 8 }}>
  <Tag>A</Tag>
  <Tag>B</Tag>
  <Tag>C</Tag>
</FlexBox>
```

## Notes

- The generated class list includes both FlexBox_justify_<value> and a shorthand FlexBox_<value>; the alignment classes come from the bundled FlexBox.css.
