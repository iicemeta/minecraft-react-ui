# CheckboxGroup

**Group:** Inputs · `import { CheckboxGroup } from "@iicemeta/minecraft-react-ui"`

A labelled list of checkboxes that share one value array. Optionally renders a select-all checkbox.

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | — | Required. Used to derive each checkbox's id (name-optionValue). |
| `value` | `Array<string>` | `[]` | Checked option values. |
| `onChange` | `(value: Array<string>, event: React.ChangeEvent<HTMLInputElement>) => void` | — | Required. Receives the full next array. |
| `options` | `Array<{ label: string; value: string; disabled?: boolean; readOnly?: boolean }>` | — | Required. |
| `direction` | `"row" \| "column"` | `"column"` | Layout of the options. |
| `showSelectAll` | `boolean` | `false` | Renders the select-all header checkbox. |
| `disabled` | `boolean` | `false` | Disables every checkbox. |
| `readOnly` | `boolean` | `false` | Keeps the group focusable but prevents toggling. |
| `className` | `string` | — | Appended to the CheckboxGroup class list. |

## Examples

### 1. Basic

value is an array of the checked option values.

```tsx
const [values, setValues] = useState(["diamond"]);

<CheckboxGroup
  name="ores"
  value={values}
  onChange={setValues}
  options={[
    { label: "Diamond",  value: "diamond" },
    { label: "Emerald",  value: "emerald" },
    { label: "Bedrock (disabled)", value: "bedrock", disabled: true },
  ]}
/>
```

### 2. Select all, horizontal

showSelectAll adds a header checkbox that toggles every option; it shows the indeterminate state when only some are checked.

```tsx
<CheckboxGroup
  name="biomes"
  value={values}
  onChange={setValues}
  showSelectAll
  direction="row"
  options={[
    { label: "Plains", value: "plains" },
    { label: "Desert", value: "desert" },
    { label: "Taiga",  value: "taiga"  },
  ]}
/>
```
