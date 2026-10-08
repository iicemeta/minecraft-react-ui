import { useState } from "react";

import { Button, ButtonGroup, Tag } from "@iicemeta/minecraft-react-ui";

import type { Entry } from "../lib/types";

function VariantsDemo() {
  return (
    <div className="row">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="clear">Clear</Button>
    </div>
  );
}

function StatesDemo() {
  return (
    <div className="row">
      <Button variant="secondary">Default</Button>
      <Button variant="secondary" active>
        Active
      </Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
      <Button variant="primary" active>
        Active primary
      </Button>
    </div>
  );
}

function ClickDemo() {
  const [clicks, setClicks] = useState(0);
  return (
    <div className="row">
      <Button variant="primary" onClick={() => setClicks((n) => n + 1)}>
        Mine
      </Button>
      <Tag>{clicks} clicks</Tag>
    </div>
  );
}

function SubmitDemo() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <form
      className="row"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <Button type="submit" variant="primary">
        Submit
      </Button>
      <Button
        type="reset"
        variant="clear"
        onClick={() => setSubmitted(false)}
      >
        Reset
      </Button>
      {submitted ? <Tag>submitted</Tag> : null}
    </form>
  );
}

export const buttonEntry: Entry = {
  id: "button",
  title: "Button",
  group: "Buttons",
  summary:
    "The Minecraft bezel button. A thin wrapper over a native <button>, with three visual variants and an active/pressed state.",
  examples: [
    {
      title: "Variants",
      description: "primary, secondary and clear.",
      code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="clear">Clear</Button>`,
      Demo: VariantsDemo,
    },
    {
      title: "States",
      description: "active renders the pressed bezel, disabled blocks interaction.",
      code: `<Button variant="secondary">Default</Button>
<Button variant="secondary" active>Active</Button>
<Button variant="secondary" disabled>Disabled</Button>`,
      Demo: StatesDemo,
    },
    {
      title: "onClick",
      description: "Standard click handling.",
      code: `const [clicks, setClicks] = useState(0);

<Button variant="primary" onClick={() => setClicks((n) => n + 1)}>
  Mine
</Button>
<Tag>{clicks} clicks</Tag>`,
      Demo: ClickDemo,
    },
    {
      title: "Form buttons",
      description: "type forwards to the native button, so it works inside a form.",
      code: `<form onSubmit={handleSubmit}>
  <Button type="submit" variant="primary">Submit</Button>
  <Button type="reset" variant="clear">Reset</Button>
</form>`,
      Demo: SubmitDemo,
    },
  ],
  props: [
    {
      name: "children",
      type: "ReactNode",
      description: "Button label. Rendered inside a <span class=\"ButtonText\">.",
    },
    {
      name: "variant",
      type: '"primary" | "secondary" | "clear"',
      description:
        "Visual style. Note: this fork dropped upstream's defaultProps, so there is NO default variant — pass one explicitly or the button renders unstyled.",
    },
    {
      name: "active",
      type: "boolean",
      defaultValue: "false",
      description: "Renders the pressed/active bezel.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables the button.",
    },
    {
      name: "type",
      type: '"button" | "submit" | "reset"',
      description: "Forwarded to the native button.",
    },
    {
      name: "onClick",
      type: "(event: React.MouseEvent<HTMLButtonElement>) => void",
      description: "Click handler.",
    },
    {
      name: "className",
      type: "string",
      description: "Appended to the Button class list.",
    },
    {
      name: "...rest",
      type: "React.HTMLProps<HTMLButtonElement>",
      description: "Any other <button> attribute is forwarded.",
    },
  ],
  notes: [
    "Button is a forwardRef component, so it can be used directly as a Dropdown target.",
    "Upstream declared variant=\"secondary\" via defaultProps; React 19 removed defaultProps for function components and this fork did not replace it with a JS default. Render <Button> with no variant and you get the bare .Button class.",
  ],
};

function BasicGroupDemo() {
  const [value, setValue] = useState("stone");
  return (
    <div className="row">
      <ButtonGroup
        value={value}
        onChange={setValue}
        options={[
          { value: "stone", label: "Stone" },
          { value: "dirt", label: "Dirt" },
          { value: "oak", label: "Oak" },
        ]}
      />
      <Tag>{value}</Tag>
    </div>
  );
}

function GroupWithActionsDemo() {
  const [value, setValue] = useState("one");
  return (
    <ButtonGroup
      value={value}
      onChange={setValue}
      options={[
        { value: "one", label: "One" },
        { value: "two", label: "Two" },
        {
          value: "three",
          label: "Logs to console",
          onClick: () => console.log("option onClick fired"),
        },
      ]}
    />
  );
}

function DisabledGroupDemo() {
  return (
    <ButtonGroup
      value="b"
      disabled
      options={[
        { value: "a", label: "A" },
        { value: "b", label: "B" },
        { value: "c", label: "C" },
      ]}
    />
  );
}

export const buttonGroupEntry: Entry = {
  id: "button-group",
  title: "ButtonGroup",
  group: "Buttons",
  summary:
    "A segmented control built from Buttons. The selected option renders as a primary, active button; every other option renders as secondary.",
  examples: [
    {
      title: "Controlled group",
      description: "value is required and the group is fully controlled.",
      code: `const [value, setValue] = useState("stone");

<ButtonGroup
  value={value}
  onChange={setValue}
  options={[
    { value: "stone", label: "Stone" },
    { value: "dirt",  label: "Dirt"  },
    { value: "oak",   label: "Oak"   },
  ]}
/>`,
      Demo: BasicGroupDemo,
    },
    {
      title: "Per-option side effects",
      description:
        "An option can carry its own onClick; it runs in addition to the group's onChange.",
      code: `<ButtonGroup
  value={value}
  onChange={setValue}
  options={[
    { value: "one", label: "One" },
    { value: "two", label: "Two" },
    { value: "three", label: "Logs to console", onClick: () => console.log("fired") },
  ]}
/>`,
      Demo: GroupWithActionsDemo,
    },
    {
      title: "Disabled",
      description: "disabled disables every option at once.",
      code: `<ButtonGroup
  value="b"
  disabled
  options={[
    { value: "a", label: "A" },
    { value: "b", label: "B" },
  ]}
/>`,
      Demo: DisabledGroupDemo,
    },
  ],
  props: [
    {
      name: "value",
      type: "string",
      description: "Required. Value of the currently selected option.",
    },
    {
      name: "options",
      type: "Array<ButtonProps & { value: string; label: string }>",
      description:
        "Required. Each option may carry any Button prop, but variant/active are overridden by the selection state.",
    },
    {
      name: "onChange",
      type: "(value: string) => void",
      description:
        "Called with the clicked option's value. Typed as optional but required for the group to be usable.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description: "Disables every option.",
    },
    {
      name: "className",
      type: "string",
      description: "Appended to the ButtonGroup class list.",
    },
  ],
  notes: [
    "Selection is derived, not stored: the group has no internal state, so value/onChange must be wired up or nothing will move.",
  ],
};
