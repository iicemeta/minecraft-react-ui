# Slider

**Group:** Inputs · `import { Slider } from "@iicemeta/minecraft-react-ui"`

A stepped rails-style slider. The visible knob is a themed Button and the rail is painted with a CSS gradient generated from min/max/value.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `number` | `50` | Required prop. Current value. |
| `min` | `number` | `0` | Required prop. Lower bound. |
| `max` | `number` | `100` | Required prop. Upper bound. The rail is divided into max − min segments. |
| `onChange` | `(value: number) => void` | — | Required. Fires on click and on drag. |
| `disabled` | `boolean` | `false` | Disables dragging and clicking. |
| **⚠** `step` | `number` | — | ⚠ Declared but not used in 1.0.2 — the slider always rounds to integers. |
| **⚠** `children / onClick / type / variant` | `—` | — | ⚠ Declared in SliderProps but unused in 1.0.2; they are inherited leftovers. |
| `className` | `string` | — | Appended to the Slider class list. |

## Examples

### 1. Discrete steps

One notch per integer between min and max. Click the rail or drag the knob.

```tsx
const [value, setValue] = useState(7);

<Slider value={value} min={0} max={10} onChange={setValue} />
```

### 2. Wide range

```tsx
<Slider value={value} min={0} max={100} onChange={setValue} />
```

### 3. Disabled

```tsx
<Slider value={4} min={0} max={10} disabled onChange={() => {}} />
```

## Notes

- Give the slider a bounded width — it fills its container.
