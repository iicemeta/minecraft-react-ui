import { useState } from "react";

import {
  Checkbox,
  CheckboxGroup,
  Input,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Tag,
} from "@iicemeta/minecraft-react-ui";

import type { Entry } from "../lib/types";

/* ------------------------------------------------------------------ Input */

function InputBasicDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="row">
      <Input placeholder="Type something…" value={value} onChange={setValue} />
      <Tag>{value ? `${value.length} chars` : "empty"}</Tag>
    </div>
  );
}

function InputStatesDemo() {
  const [value, setValue] = useState("Read only-ish");
  return (
    <div className="column">
      <Input placeholder="Disabled" disabled value="" onChange={() => {}} />
      <Input value={value} onChange={setValue} />
      <Input type="password" placeholder="Password" value="" onChange={() => {}} />
    </div>
  );
}

export const inputEntry: Entry = {
  id: "input",
  title: "Input",
  group: "Inputs",
  summary:
    "Single-line text input. onChange is unwrapped: it hands you the string, not the event.",
  examples: [
    {
      title: "Basic",
      code: `const [value, setValue] = useState("");

<Input placeholder="Type something…" value={value} onChange={setValue} />`,
      Demo: InputBasicDemo,
    },
    {
      title: "Disabled and native types",
      description: "Any native attribute is forwarded, including type.",
      code: `<Input placeholder="Disabled" disabled value="" onChange={() => {}} />
<Input value={value} onChange={setValue} />
<Input type="password" placeholder="Password" value="" onChange={() => {}} />`,
      Demo: InputStatesDemo,
    },
  ],
  props: [
    {
      name: "value",
      type: "string",
      description: "Controlled value (inherited from HTMLProps<HTMLInputElement>).",
    },
    {
      name: "onChange",
      type: "(value: string, event?: React.ChangeEvent<HTMLInputElement>) => void",
      description: "Required. Receives the string, not the DOM event.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables the input.",
    },
    {
      name: "className",
      type: "string",
      description: "Appended to the Input class list.",
    },
    {
      name: "...rest",
      type: "React.HTMLProps<HTMLInputElement>",
      description: "placeholder, type, onKeyDown, … are all forwarded.",
    },
  ],
  notes: ["forwardRef — the underlying <input> can be reached with a ref."],
};

/* --------------------------------------------------------------- Checkbox */

function CheckboxBasicDemo() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="row">
      <label className="checkbox-row">
        <Checkbox value={checked} onChange={setChecked} />
        <span>Keep the world loaded</span>
      </label>
      <Tag>{checked ? "on" : "off"}</Tag>
    </div>
  );
}

function CheckboxIndeterminateDemo() {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(true);
  return (
    <div className="row">
      <Checkbox
        value={checked}
        indeterminate={indeterminate}
        onChange={(next) => {
          setChecked(next);
          setIndeterminate(false);
        }}
      />
      <Tag>{indeterminate ? "indeterminate" : checked ? "checked" : "unchecked"}</Tag>
    </div>
  );
}

export const checkboxEntry: Entry = {
  id: "checkbox",
  title: "Checkbox",
  group: "Inputs",
  summary:
    "A themed checkbox. The visual box is drawn in CSS around a real <input type=\"checkbox\">.",
  examples: [
    {
      title: "Basic",
      code: `const [checked, setChecked] = useState(false);

<Checkbox value={checked} onChange={setChecked} />`,
      Demo: CheckboxBasicDemo,
    },
    {
      title: "Indeterminate",
      description: "Renders the mixed state; it is presentational only.",
      code: `<Checkbox
  value={checked}
  indeterminate={indeterminate}
  onChange={(next) => { setChecked(next); setIndeterminate(false); }}
/>`,
      Demo: CheckboxIndeterminateDemo,
    },
  ],
  props: [
    {
      name: "value",
      type: "boolean",
      description: "Checked state. Optional in the type, but always pass it — the input is controlled.",
    },
    {
      name: "onChange",
      type: "(value: boolean, event: React.ChangeEvent<HTMLInputElement>) => void",
      description: "Required. Receives the boolean.",
    },
    {
      name: "indeterminate",
      type: "boolean",
      defaultValue: "false",
      description: "Adds the mixed-state class.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables the input.",
    },
    {
      name: "className",
      type: "string",
      description: "Appended to the Checkbox class list.",
    },
    {
      name: "label",
      type: "string",
      description:
        "⚠ Declared in the props type but NOT rendered in 1.0.1 — destructured and dropped. Wrap the checkbox in your own <label> instead.",
    },
    {
      name: "onClick",
      type: "React.MouseEventHandler<HTMLInputElement>",
      description: "⚠ Also declared but NOT forwarded to the input in 1.0.1.",
    },
  ],
  notes: [
    "There is no built-in label. Use a wrapping <label> so the text is part of the hit target (see the live example).",
  ],
};

/* ----------------------------------------------------------------- Switch */

function SwitchDemo() {
  const [on, setOn] = useState(true);
  return (
    <div className="row">
      <Switch value={on} onChange={setOn} />
      <Tag>{on ? "on" : "off"}</Tag>
    </div>
  );
}

function SwitchDisabledDemo() {
  return (
    <div className="row">
      <Switch value onChange={() => {}} />
      <Switch value={false} onChange={() => {}} />
      <Switch value disabled onChange={() => {}} />
    </div>
  );
}

export const switchEntry: Entry = {
  id: "switch",
  title: "Switch",
  group: "Inputs",
  summary:
    "A sliding on/off switch. Same API shape as Checkbox, different chrome.",
  examples: [
    {
      title: "Basic",
      code: `const [on, setOn] = useState(true);

<Switch value={on} onChange={setOn} />`,
      Demo: SwitchDemo,
    },
    {
      title: "On / off / disabled",
      code: `<Switch value onChange={() => {}} />
<Switch value={false} onChange={() => {}} />
<Switch value disabled onChange={() => {}} />`,
      Demo: SwitchDisabledDemo,
    },
  ],
  props: [
    {
      name: "value",
      type: "boolean",
      description: "Required. Checked state.",
    },
    {
      name: "onChange",
      type: "(value: boolean, event: React.ChangeEvent<HTMLInputElement>) => void",
      description: "Required. Receives the boolean.",
    },
    {
      name: "indeterminate",
      type: "boolean",
      defaultValue: "false",
      description: "Adds the mixed-state class.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables the input.",
    },
    {
      name: "className",
      type: "string",
      description: "Appended to the Switch class list.",
    },
    {
      name: "label",
      type: "string",
      description: "⚠ Declared but not rendered in 1.0.1 (same as Checkbox).",
    },
    {
      name: "onClick",
      type: "React.MouseEventHandler<HTMLInputElement>",
      description: "⚠ Declared but not forwarded in 1.0.1.",
    },
  ],
};

/* ------------------------------------------------------------------ Radio */

function RadioBasicDemo() {
  const [picked, setPicked] = useState("creeper");
  return (
    <div className="row">
      {["creeper", "skeleton", "zombie"].map((mob) => (
        <label key={mob} className="checkbox-row">
          <Radio
            name="mob"
            value={mob}
            checked={picked === mob}
            onChange={setPicked}
          />
          <span>{mob}</span>
        </label>
      ))}
      <Tag>{picked}</Tag>
    </div>
  );
}

export const radioEntry: Entry = {
  id: "radio",
  title: "Radio",
  group: "Inputs",
  summary:
    "A single radio input. It is unopinionated about grouping — you supply name, checked and the change handler yourself. For a ready-made group use RadioGroup.",
  examples: [
    {
      title: "Manual group",
      description: "Three Radios sharing a name, state kept by the parent.",
      code: `const [picked, setPicked] = useState("creeper");

{["creeper", "skeleton", "zombie"].map((mob) => (
  <Radio
    key={mob}
    name="mob"
    value={mob}
    checked={picked === mob}
    onChange={setPicked}
  />
))}`,
      Demo: RadioBasicDemo,
    },
  ],
  props: [
    {
      name: "value",
      type: "string",
      description: "The value reported to onChange.",
    },
    {
      name: "checked",
      type: "boolean",
      description: "Controlled checked state — Radio does not manage it for you.",
    },
    {
      name: "onChange",
      type: "(value: string, event: React.ChangeEvent<HTMLInputElement>) => void",
      description: "Required. Receives the input's value.",
    },
    {
      name: "indeterminate",
      type: "boolean",
      defaultValue: "false",
      description: "Adds the mixed-state class.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables the input.",
    },
    {
      name: "className",
      type: "string",
      description: "Appended to the Radio class list.",
    },
    {
      name: "...rest",
      type: "React.HTMLProps<HTMLInputElement>",
      description: "name and any other input attribute are forwarded.",
    },
  ],
};

/* ---------------------------------------------------------- CheckboxGroup */

function CheckboxGroupDemo() {
  const [values, setValues] = useState<string[]>(["diamond"]);
  return (
    <div className="column">
      <CheckboxGroup
        name="ores"
        value={values}
        onChange={setValues}
        options={[
          { label: "Diamond", value: "diamond" },
          { label: "Emerald", value: "emerald" },
          { label: "Redstone", value: "redstone" },
          { label: "Bedrock (disabled)", value: "bedrock", disabled: true },
        ]}
      />
      <Tag>{values.length ? values.join(", ") : "nothing selected"}</Tag>
    </div>
  );
}

function CheckboxGroupSelectAllDemo() {
  const [values, setValues] = useState<string[]>([]);
  return (
    <CheckboxGroup
      name="biomes"
      value={values}
      onChange={setValues}
      showSelectAll
      direction="row"
      options={[
        { label: "Plains", value: "plains" },
        { label: "Desert", value: "desert" },
        { label: "Taiga", value: "taiga" },
      ]}
    />
  );
}

export const checkboxGroupEntry: Entry = {
  id: "checkbox-group",
  title: "CheckboxGroup",
  group: "Inputs",
  summary:
    "A labelled list of checkboxes that share one value array. Optionally renders a select-all checkbox.",
  examples: [
    {
      title: "Basic",
      description: "value is an array of the checked option values.",
      code: `const [values, setValues] = useState(["diamond"]);

<CheckboxGroup
  name="ores"
  value={values}
  onChange={setValues}
  options={[
    { label: "Diamond",  value: "diamond" },
    { label: "Emerald",  value: "emerald" },
    { label: "Bedrock (disabled)", value: "bedrock", disabled: true },
  ]}
/>`,
      Demo: CheckboxGroupDemo,
    },
    {
      title: "Select all, horizontal",
      description:
        "showSelectAll adds a header checkbox that toggles every option; it shows the indeterminate state when only some are checked.",
      code: `<CheckboxGroup
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
/>`,
      Demo: CheckboxGroupSelectAllDemo,
    },
  ],
  props: [
    {
      name: "name",
      type: "string",
      description: "Required. Used to derive each checkbox's id (name-optionValue).",
    },
    {
      name: "value",
      type: "Array<string>",
      defaultValue: "[]",
      description: "Checked option values.",
    },
    {
      name: "onChange",
      type: "(value: Array<string>, event: React.ChangeEvent<HTMLInputElement>) => void",
      description: "Required. Receives the full next array.",
    },
    {
      name: "options",
      type: "Array<{ label: string; value: string; disabled?: boolean; readOnly?: boolean }>",
      description: "Required.",
    },
    {
      name: "direction",
      type: '"row" | "column"',
      defaultValue: '"column"',
      description: "Layout of the options.",
    },
    {
      name: "showSelectAll",
      type: "boolean",
      defaultValue: "false",
      description: "Renders the select-all header checkbox.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables every checkbox.",
    },
    {
      name: "readOnly",
      type: "boolean",
      defaultValue: "false",
      description: "Keeps the group focusable but prevents toggling.",
    },
    {
      name: "className",
      type: "string",
      description: "Appended to the CheckboxGroup class list.",
    },
  ],
};

/* ------------------------------------------------------------- RadioGroup */

function RadioGroupDemo() {
  const [value, setValue] = useState<string | undefined>("cave");
  return (
    <div className="column">
      <RadioGroup
        name="spawn"
        value={value}
        onChange={setValue}
        options={[
          { label: "Surface", value: "surface" },
          { label: "Cave", value: "cave" },
          { label: "Ocean floor (disabled)", value: "ocean", disabled: true },
        ]}
      />
      <Tag>{value ?? "unset"}</Tag>
    </div>
  );
}

function RadioGroupRowDemo() {
  const [value, setValue] = useState<string | undefined>("easy");
  return (
    <RadioGroup
      name="difficulty"
      value={value}
      onChange={setValue}
      direction="row"
      options={[
        { label: "Peaceful", value: "peaceful" },
        { label: "Easy", value: "easy" },
        { label: "Hard", value: "hard" },
      ]}
    />
  );
}

export const radioGroupEntry: Entry = {
  id: "radio-group",
  title: "RadioGroup",
  group: "Inputs",
  summary:
    "A labelled list of radios with the shared state handled for you.",
  examples: [
    {
      title: "Basic",
      description: "one option may be disabled, and value may be undefined (nothing selected).",
      code: `const [value, setValue] = useState<string | undefined>("cave");

<RadioGroup
  name="spawn"
  value={value}
  onChange={setValue}
  options={[
    { label: "Surface", value: "surface" },
    { label: "Cave",    value: "cave"    },
    { label: "Ocean floor (disabled)", value: "ocean", disabled: true },
  ]}
/>`,
      Demo: RadioGroupDemo,
    },
    {
      title: "Horizontal",
      code: `<RadioGroup name="difficulty" value={value} onChange={setValue} direction="row" options={[...]} />`,
      Demo: RadioGroupRowDemo,
    },
  ],
  props: [
    {
      name: "name",
      type: "string",
      description: "Required. Groups the radios together.",
    },
    {
      name: "value",
      type: "string | undefined",
      description: "Required prop. undefined means nothing is selected.",
    },
    {
      name: "onChange",
      type: "(value: string, event: React.ChangeEvent<HTMLInputElement>) => void",
      description: "Required. Receives the newly selected value.",
    },
    {
      name: "options",
      type: "Array<{ label: string; value: string; disabled?: boolean; readOnly?: boolean }>",
      description: "Required.",
    },
    {
      name: "direction",
      type: '"row" | "column"',
      defaultValue: '"column"',
      description: "Layout of the options.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables every radio.",
    },
    {
      name: "readOnly",
      type: "boolean",
      defaultValue: "false",
      description: "Focusable but not changeable.",
    },
    {
      name: "className",
      type: "string",
      description: "Appended to the RadioGroup class list.",
    },
  ],
};

/* ----------------------------------------------------------------- Select */

function SelectDemo() {
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <div className="row">
      <div className="select-box">
        <Select
          value={value}
          onChange={setValue}
          placeholder="Pick a material…"
          searchPlaceholder="Search…"
          options={[
            { label: "Oak Wood", value: "oak" },
            { label: "Stone", value: "stone" },
            { label: "Iron Ingot", value: "iron" },
            { label: "Diamond", value: "diamond" },
            { label: "Netherite (disabled)", value: "netherite", disabled: true },
          ]}
        />
      </div>
      <Tag>{value ?? "nothing selected"}</Tag>
    </div>
  );
}

function SelectDisabledDemo() {
  return (
    <div className="select-box">
      <Select
        disabled
        value="stone"
        onChange={() => {}}
        placeholder="Pick a material…"
        options={[
          { label: "Oak Wood", value: "oak" },
          { label: "Stone", value: "stone" },
        ]}
      />
    </div>
  );
}

export const selectEntry: Entry = {
  id: "select",
  title: "Select",
  group: "Inputs",
  summary:
    "A searchable select. It is a Dropdown wrapping a Menu, driven by a text input — so focusing it opens the list and typing filters it.",
  examples: [
    {
      title: "Searchable select",
      description:
        "Click the field, type to filter, click an option to choose. The ✕ button clears the selection.",
      code: `const [value, setValue] = useState<string | undefined>(undefined);

<Select
  value={value}
  onChange={setValue}
  placeholder="Pick a material…"
  searchPlaceholder="Search…"
  options={[
    { label: "Oak Wood", value: "oak" },
    { label: "Stone",    value: "stone" },
    { label: "Netherite (disabled)", value: "netherite", disabled: true },
  ]}
/>`,
      Demo: SelectDemo,
    },
    {
      title: "Disabled",
      code: `<Select disabled value="stone" onChange={() => {}} options={[...]} />`,
      Demo: SelectDisabledDemo,
    },
  ],
  props: [
    {
      name: "value",
      type: "string",
      description: "Selected option value. undefined means nothing is selected.",
    },
    {
      name: "options",
      type: "Array<{ label: string; value: string; disabled?: boolean }>",
      description: "Required. Filtered against both label and value as you type.",
    },
    {
      name: "onChange",
      type: "(value?: string) => void",
      description:
        "Required. Called with the picked value, or with undefined when the clear (✕) button is used.",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Shown while unfocused and empty.",
    },
    {
      name: "searchPlaceholder",
      type: "string",
      description: "Swapped in while the field has focus.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables the field.",
    },
    {
      name: "onFocus / onBlur",
      type: "(event: React.FocusEvent<HTMLInputElement>) => void",
      description: "Both default to a no-op, so they are safe to omit.",
    },
    {
      name: "className",
      type: "string",
      description: "Appended to the Select class list.",
    },
  ],
  notes: ["Give it a bounded width — the dropdown matches the field's width."],
};

/* ----------------------------------------------------------------- Slider */

function SliderDemo() {
  const [value, setValue] = useState(7);
  return (
    <div className="row">
      <div className="slider-box">
        <Slider value={value} min={0} max={10} onChange={setValue} />
      </div>
      <Tag>{value}</Tag>
    </div>
  );
}

function SliderRangeDemo() {
  const [value, setValue] = useState(50);
  return (
    <div className="row">
      <div className="slider-box">
        <Slider value={value} min={0} max={100} onChange={setValue} />
      </div>
      <Tag>{value}%</Tag>
    </div>
  );
}

function SliderDisabledDemo() {
  return (
    <div className="slider-box">
      <Slider value={4} min={0} max={10} disabled onChange={() => {}} />
    </div>
  );
}

export const sliderEntry: Entry = {
  id: "slider",
  title: "Slider",
  group: "Inputs",
  summary:
    "A stepped rails-style slider. The visible knob is a themed Button and the rail is painted with a CSS gradient generated from min/max/value.",
  examples: [
    {
      title: "Discrete steps",
      description: "One notch per integer between min and max. Click the rail or drag the knob.",
      code: `const [value, setValue] = useState(7);

<Slider value={value} min={0} max={10} onChange={setValue} />`,
      Demo: SliderDemo,
    },
    {
      title: "Wide range",
      code: `<Slider value={value} min={0} max={100} onChange={setValue} />`,
      Demo: SliderRangeDemo,
    },
    {
      title: "Disabled",
      code: `<Slider value={4} min={0} max={10} disabled onChange={() => {}} />`,
      Demo: SliderDisabledDemo,
    },
  ],
  props: [
    {
      name: "value",
      type: "number",
      defaultValue: "50",
      description: "Required prop. Current value.",
    },
    {
      name: "min",
      type: "number",
      defaultValue: "0",
      description: "Required prop. Lower bound.",
    },
    {
      name: "max",
      type: "number",
      defaultValue: "100",
      description: "Required prop. Upper bound. The rail is divided into max − min segments.",
    },
    {
      name: "onChange",
      type: "(value: number) => void",
      description: "Required. Fires on click and on drag.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables dragging and clicking.",
    },
    {
      name: "step",
      type: "number",
      description: "⚠ Declared but not used in 1.0.1 — the slider always rounds to integers.",
    },
    {
      name: "children / onClick / type / variant",
      type: "—",
      description: "⚠ Declared in SliderProps but unused in 1.0.1; they are inherited leftovers.",
    },
    {
      name: "className",
      type: "string",
      description: "Appended to the Slider class list.",
    },
  ],
  notes: ["Give the slider a bounded width — it fills its container."],
};
