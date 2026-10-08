import { useState } from "react";

import {
  Button,
  Dropdown,
  Tag,
  Tooltip,
  type DropdownTargetProps,
} from "@iicemeta/minecraft-react-ui";

import type { Entry } from "../lib/types";

/* --------------------------------------------------------------- Dropdown */

const panel = (title: string, body: string) => (
  <div className="dropdown-panel">
    <strong>{title}</strong>
    <p>{body}</p>
  </div>
);

function DropdownClickDemo() {
  return (
    <div className="row">
      <Dropdown
        closeOnClickOutside
        placement="bottom-start"
        content={panel("Click dropdown", "Opens on click, closes on an outside click.")}
        target={<Button variant="secondary">Click me</Button>}
      />
      <Dropdown
        closeOnClickContent
        closeOnClickOutside
        content={panel("Closes on content click", "Click inside the panel and it closes itself.")}
        target={<Button variant="secondary">Close on content click</Button>}
      />
    </div>
  );
}

function DropdownHoverDemo() {
  return (
    <Dropdown
      trigger="hover"
      placement="bottom"
      content={panel("Hover dropdown", "Opens while the pointer is over the target.")}
      target={<Button variant="primary">Hover me</Button>}
    />
  );
}

function DropdownFunctionTargetDemo() {
  // The function form hands you open/close/visible so you can build a fully
  // custom trigger — here, a whole row that looks nothing like a Button.
  const target = ({ open, close, visible, ref, className }: DropdownTargetProps) => (
    <div ref={ref} className={`custom-target ${className}`} onClick={visible ? close : open}>
      <span className="custom-target-dot" data-open={visible} />
      <span>Custom trigger ({visible ? "open" : "closed"})</span>
    </div>
  );

  return (
    <Dropdown
      closeOnClickOutside
      placement="right-start"
      content={panel("Function target", "The trigger is entirely up to you.")}
      target={target}
    />
  );
}

export const dropdownEntry: Entry = {
  id: "dropdown",
  title: "Dropdown",
  group: "Layers",
  summary:
    "The positioning layer: it anchors arbitrary content to a target in a portal, using @floating-ui. Everything that pops over the page — including Select and DropdownMenu — is built on it.",
  examples: [
    {
      title: "Click targets",
      description:
        "Pass a React element as target and Dropdown clones it, injecting ref, onClick and active. closeOnClickOutside dismisses on an outside click; closeOnClickContent also dismisses when the panel itself is clicked.",
      code: `<Dropdown
  closeOnClickOutside
  placement="bottom-start"
  content={<Panel />}
  target={<Button variant="secondary">Click me</Button>}
/>`,
      Demo: DropdownClickDemo,
    },
    {
      title: "Hover trigger",
      description: "trigger=\"hover\" opens on mouse-enter and closes on mouse-leave.",
      code: `<Dropdown
  trigger="hover"
  placement="bottom"
  content={<Panel />}
  target={<Button variant="primary">Hover me</Button>}
/>`,
      Demo: DropdownHoverDemo,
    },
    {
      title: "Function target",
      description:
        "Pass a function to take full control of the trigger: it receives open, close, visible, ref and the positioning className.",
      code: `const target = ({ open, close, visible, ref, className }: DropdownTargetProps) => (
  <div ref={ref} className={className} onClick={visible ? close : open}>
    Custom trigger ({visible ? "open" : "closed"})
  </div>
);

<Dropdown closeOnClickOutside placement="right-start" content={<Panel />} target={target} />`,
      Demo: DropdownFunctionTargetDemo,
    },
  ],
  props: [
    {
      name: "content",
      type: "ReactNode",
      description: "Required. Rendered inside a portal, positioned against the target.",
    },
    {
      name: "target",
      type: "ReactElement | ((props: DropdownTargetProps) => ReactNode)",
      description:
        "Required. As an element it must accept a ref (Button does). As a function it receives { open, close, visible, ref, className }.",
    },
    {
      name: "placement",
      type: "Placement",
      defaultValue: '"bottom-start"',
      description:
        "Any @floating-ui placement. This fork defaults it in the component; upstream set it via defaultProps.",
    },
    {
      name: "trigger",
      type: '"click" | "hover"',
      defaultValue: '"click"',
      description: "How the dropdown opens.",
    },
    {
      name: "closeOnClickOutside",
      type: "boolean",
      defaultValue: "false",
      description: "Closes when a click lands outside both target and panel.",
    },
    {
      name: "closeOnClickContent",
      type: "boolean",
      defaultValue: "false",
      description: "Closes when the panel itself is clicked.",
    },
  ],
  notes: [
    "The panel is rendered into document.body and gets a min-width equal to the target's width.",
    "closeOnClickOutside only applies to the click trigger; the hover trigger watches mouse-leave instead.",
  ],
};

/* ---------------------------------------------------------------- Tooltip */

function TooltipHoverDemo() {
  return (
    <div className="row">
      <Tooltip content="I appear on hover" placement="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="So do I" placement="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="And me" placement="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
      <Tooltip content="And me" placement="left">
        <Button variant="secondary">Left</Button>
      </Tooltip>
    </div>
  );
}

function TooltipAlignDemo() {
  return (
    <div className="row">
      <Tooltip content="bottom-start" placement="bottom-start">
        <Button variant="secondary">bottom-start</Button>
      </Tooltip>
      <Tooltip content="bottom-end" placement="bottom-end">
        <Button variant="secondary">bottom-end</Button>
      </Tooltip>
      <Tooltip content="top-start" placement="top-start">
        <Button variant="secondary">top-start</Button>
      </Tooltip>
      <Tooltip content="top-end" placement="top-end">
        <Button variant="secondary">top-end</Button>
      </Tooltip>
    </div>
  );
}

function TooltipClickDemo() {
  const [count, setCount] = useState(0);
  return (
    <div className="row">
      <Tooltip content="Click to toggle me" trigger="click" placement="top">
        <Button variant="primary" onClick={() => setCount((n) => n + 1)}>
          Toggle tooltip
        </Button>
      </Tooltip>
      <Tag>button clicked {count}×</Tag>
    </div>
  );
}

export const tooltipEntry: Entry = {
  id: "tooltip",
  title: "Tooltip",
  group: "Layers",
  summary:
    "A floating hint with an arrow, positioned with @floating-ui. Wrap any element and it gains a hover or click trigger.",
  examples: [
    {
      title: "Hover, four sides",
      code: `<Tooltip content="I appear on hover" placement="top">
  <Button variant="secondary">Top</Button>
</Tooltip>`,
      Demo: TooltipHoverDemo,
    },
    {
      title: "Aligned placements",
      description: "The -start and -end suffixes align the tooltip to the edges of the child.",
      code: `<Tooltip content="bottom-end" placement="bottom-end">
  <Button variant="secondary">bottom-end</Button>
</Tooltip>`,
      Demo: TooltipAlignDemo,
    },
    {
      title: "Click trigger",
      description:
        "With trigger=\"click\" the tooltip toggles on the child and dismisses on an outside mousedown or touchstart. The child's own onClick still runs.",
      code: `<Tooltip content="Click to toggle me" trigger="click" placement="top">
  <Button variant="primary" onClick={handleClick}>Toggle tooltip</Button>
</Tooltip>`,
      Demo: TooltipClickDemo,
    },
  ],
  props: [
    {
      name: "content",
      type: "ReactNode",
      description: "Required. Tooltip body.",
    },
    {
      name: "children",
      type: "ReactNode",
      description:
        "Required. Wrapped in a <span class=\"TooltipTarget\"> — so the child gets an inline wrapper it did not have before.",
    },
    {
      name: "placement",
      type: "Placement",
      defaultValue: '"bottom"',
      description: "Any @floating-ui placement; also used to pick the arrow-side CSS class.",
    },
    {
      name: "trigger",
      type: '"hover" | "click"',
      defaultValue: '"hover"',
      description: "How the tooltip opens.",
    },
  ],
  notes: [
    "Under the hood the tooltip starts hidden and only portals into the DOM while visible, so it costs nothing until first shown.",
    "forwardRef exposes { update, middlewareData, elements, floatingStyles } if you need to reposition it manually.",
  ],
};
