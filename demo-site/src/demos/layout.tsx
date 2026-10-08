import { Button, FlexBox, Tag } from "@iicemeta/minecraft-react-ui";

import type { Entry } from "../lib/types";

function FlexBoxRowDemo() {
  return (
    <FlexBox justify="space-between" align="center">
      <Button variant="primary">Left</Button>
      <Button variant="secondary">Middle</Button>
      <Button variant="clear">Right</Button>
    </FlexBox>
  );
}

function FlexBoxColumnDemo() {
  return (
    <FlexBox direction="col" justify="flex-start" align="stretch" style={{ maxWidth: 260 }}>
      <Button variant="primary">Stacked one</Button>
      <Button variant="secondary">Stacked two</Button>
      <Button variant="clear">Stacked three</Button>
    </FlexBox>
  );
}

function FlexBoxAlignmentDemo() {
  return (
    <FlexBox direction="col" style={{ gap: 12 }}>
      <span className="site-caption">justify=&quot;flex-start&quot;</span>
      <div className="flexbox-outline">
        <FlexBox justify="flex-start" style={{ gap: 8 }}>
          <Tag>A</Tag>
          <Tag>B</Tag>
          <Tag>C</Tag>
        </FlexBox>
      </div>

      <span className="site-caption">justify=&quot;center&quot;</span>
      <div className="flexbox-outline">
        <FlexBox justify="center" style={{ gap: 8 }}>
          <Tag>A</Tag>
          <Tag>B</Tag>
          <Tag>C</Tag>
        </FlexBox>
      </div>

      <span className="site-caption">justify=&quot;space-between&quot;</span>
      <div className="flexbox-outline">
        <FlexBox justify="space-between">
          <Tag>A</Tag>
          <Tag>B</Tag>
          <Tag>C</Tag>
        </FlexBox>
      </div>

      <span className="site-caption">
        justify=&quot;space-around&quot; + align=&quot;flex-end&quot;
      </span>
      <div className="flexbox-outline flexbox-outline-tall">
        <FlexBox justify="space-around" align="flex-end">
          <Tag>A</Tag>
          <Tag>B</Tag>
          <Tag>C</Tag>
        </FlexBox>
      </div>
    </FlexBox>
  );
}

export const flexBoxEntry: Entry = {
  id: "flex-box",
  title: "FlexBox",
  group: "Layout",
  summary:
    "A thin declarative wrapper around flexbox. Its whole value is that the layout reads as props instead of one-off CSS classes.",
  examples: [
    {
      title: "Row with space-between",
      code: `<FlexBox justify="space-between" align="center">
  <Button variant="primary">Left</Button>
  <Button variant="secondary">Middle</Button>
  <Button variant="clear">Right</Button>
</FlexBox>`,
      Demo: FlexBoxRowDemo,
    },
    {
      title: "Column, stretched",
      description: 'direction="col" maps to FlexBox_col, which is column-direction with centered cross-axis.',
      code: `<FlexBox direction="col" justify="flex-start" align="stretch">
  <Button variant="primary">Stacked one</Button>
  <Button variant="secondary">Stacked two</Button>
</FlexBox>`,
      Demo: FlexBoxColumnDemo,
    },
    {
      title: "Every justify value",
      description:
        "Gaps are not a prop — pass them through style, which FlexBox applies to the wrapper div.",
      code: `<FlexBox justify="space-around" align="flex-end" style={{ gap: 8 }}>
  <Tag>A</Tag>
  <Tag>B</Tag>
  <Tag>C</Tag>
</FlexBox>`,
      Demo: FlexBoxAlignmentDemo,
    },
  ],
  props: [
    {
      name: "direction",
      type: '"row" | "col"',
      defaultValue: '"row"',
      description: "Main axis.",
    },
    {
      name: "justify",
      type: '"flex-start" | "flex-end" | "center" | "space-between" | "space-around"',
      defaultValue: '"flex-start"',
      description: "justify-content.",
    },
    {
      name: "align",
      type: '"flex-start" | "flex-end" | "center" | "stretch"',
      defaultValue: '"flex-start"',
      description: "align-items.",
    },
    {
      name: "wrap",
      type: '"wrap" | "nowrap"',
      description:
        "⚠ Declared in FlexBoxProps but NOT used in 1.0.1 — it never reaches the className. Set flex-wrap through style instead.",
    },
    {
      name: "style",
      type: "React.CSSProperties",
      description: "Applied to the wrapper div — this is how you pass gap.",
    },
    {
      name: "className",
      type: "string",
      description: "Appended to the FlexBox class list.",
    },
    {
      name: "children",
      type: "ReactNode",
      description: "Required.",
    },
  ],
  notes: [
    "The generated class list includes both FlexBox_justify_<value> and a shorthand FlexBox_<value>; the alignment classes come from the bundled FlexBox.css.",
  ],
};

function TagDemo() {
  return (
    <div className="row">
      <Tag>diamond</Tag>
      <Tag>iron_ingot</Tag>
      <Tag className="site-tag-success">+12</Tag>
      <Tag className="site-tag-danger">-3</Tag>
    </div>
  );
}

export const tagEntry: Entry = {
  id: "tag",
  title: "Tag",
  group: "Layout",
  summary:
    "A small inline label. Nothing but a styled <span>, which makes it the cheapest way to show a value next to a control.",
  examples: [
    {
      title: "Default and restyled",
      code: `<Tag>diamond</Tag>
<Tag>iron_ingot</Tag>
<Tag className="site-tag-success">+12</Tag>`,
      Demo: TagDemo,
    },
  ],
  props: [
    {
      name: "children",
      type: "ReactNode",
      description: "Required. Tag content.",
    },
    {
      name: "className",
      type: "string",
      description: "Appended to the Tag class list — the only styling hook.",
    },
  ],
  notes: ["Tag forwards no other props, so put handlers on a wrapping element."],
};
