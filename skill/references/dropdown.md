# Dropdown

**Group:** Layers · `import { Dropdown } from "@iicemeta/minecraft-react-ui"`

The positioning layer: it anchors arbitrary content to a target in a portal, using @floating-ui. Everything that pops over the page — including Select and DropdownMenu — is built on it.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `content` | `ReactNode` | — | Required. Rendered inside a portal, positioned against the target. |
| `target` | `ReactElement \| ((props: DropdownTargetProps) => ReactNode)` | — | Required. As an element it must accept a ref (Button does). As a function it receives { open, close, visible, ref, className }. |
| `placement` | `Placement` | `"bottom-start"` | Any @floating-ui placement. This fork defaults it in the component; upstream set it via defaultProps. |
| `trigger` | `"click" \| "hover"` | `"click"` | How the dropdown opens. |
| `closeOnClickOutside` | `boolean` | `false` | Closes when a click lands outside both target and panel. |
| `closeOnClickContent` | `boolean` | `false` | Closes when the panel itself is clicked. |

## Examples

### 1. Click targets

Pass a React element as target and Dropdown clones it, injecting ref, onClick and active. closeOnClickOutside dismisses on an outside click; closeOnClickContent also dismisses when the panel itself is clicked.

```tsx
<Dropdown
  closeOnClickOutside
  placement="bottom-start"
  content={<Panel />}
  target={<Button variant="secondary">Click me</Button>}
/>
```

### 2. Hover trigger

trigger="hover" opens on mouse-enter and closes on mouse-leave.

```tsx
<Dropdown
  trigger="hover"
  placement="bottom"
  content={<Panel />}
  target={<Button variant="primary">Hover me</Button>}
/>
```

### 3. Function target

Pass a function to take full control of the trigger: it receives open, close, visible, ref and the positioning className.

```tsx
const target = ({ open, close, visible, ref, className }: DropdownTargetProps) => (
  <div ref={ref} className={className} onClick={visible ? close : open}>
    Custom trigger ({visible ? "open" : "closed"})
  </div>
);

<Dropdown closeOnClickOutside placement="right-start" content={<Panel />} target={target} />
```

## Notes

- The panel is rendered into document.body and gets a min-width equal to the target's width.
- closeOnClickOutside only applies to the click trigger; the hover trigger watches mouse-leave instead.
