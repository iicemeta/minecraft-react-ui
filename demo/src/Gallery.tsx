import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  DropdownMenu,
  FlexBox,
  Input,
  List,
  Menu,
  MenuIcon,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Tag,
  Tooltip,
  type Item,
} from "@/index";

const listItems: Array<Item> = Array.from({ length: 60 }, (_, i) => ({
  id: `item-${i}`,
  name: `Item ${i}`,
  description: `Description for item number ${i}`,
}));

export function Gallery() {
  const [buttonGroupValue, setButtonGroupValue] = useState("one");
  const [checkbox, setCheckbox] = useState(false);
  const [checkboxValues, setCheckboxValues] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [radio, setRadio] = useState<string | undefined>("a");
  const [radioValues, setRadioValues] = useState<string | undefined>("a");
  const [selectValue, setSelectValue] = useState<string | undefined>("");
  const [sliderValue, setSliderValue] = useState(50);
  const [switchValue, setSwitchValue] = useState(false);

  return (
    <div className="demo">
      <header className="demo-header">
        <h1>Minecraft React UI</h1>
        <p>
          React 19 component gallery — a lightweight replacement for Storybook.
          All components are fully interactive.
        </p>
      </header>

      <section className="demo-section">
        <h2>Buttons</h2>
        <div className="demo-card">
          <div className="demo-row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="clear">Clear</Button>
            <Button disabled>Disabled</Button>
            <Button active>Active</Button>
          </div>
          <div className="demo-row">
            <span className="demo-label">ButtonGroup (controlled)</span>
            <ButtonGroup
              value={buttonGroupValue}
              onChange={setButtonGroupValue}
              options={[
                { value: "one", label: "One" },
                { value: "two", label: "Two" },
                { value: "three", label: "Three" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Inputs</h2>
        <div className="demo-card">
          <div className="demo-row">
            <span className="demo-label">Input</span>
            <Input
              placeholder="Type something..."
              value={inputValue}
              onChange={setInputValue}
            />
            <Input disabled value="" onChange={() => {}} placeholder="Disabled" />
          </div>
          <div className="demo-row">
            <span className="demo-label">Checkbox</span>
            <Checkbox value={checkbox} onChange={setCheckbox} />
            <Tag>{checkbox ? "checked" : "unchecked"}</Tag>
          </div>
          <div className="demo-row">
            <span className="demo-label">Switch</span>
            <Switch value={switchValue} onChange={setSwitchValue} />
            <Tag>{switchValue ? "on" : "off"}</Tag>
          </div>
          <div className="demo-row">
            <span className="demo-label">CheckboxGroup</span>
            <CheckboxGroup
              name="pets"
              value={checkboxValues}
              onChange={setCheckboxValues}
              options={[
                { label: "Cat", value: "cat" },
                { label: "Dog", value: "dog" },
                { label: "Fish", value: "fish" },
              ]}
              showSelectAll
            />
          </div>
          <div className="demo-row">
            <span className="demo-label">RadioGroup</span>
            <RadioGroup
              name="animals"
              value={radioValues}
              onChange={setRadioValues}
              options={[
                { label: "Fox", value: "fox" },
                { label: "Wolf", value: "wolf" },
                { label: "Ocelot", value: "ocelot" },
              ]}
            />
          </div>
          <div className="demo-row">
            <span className="demo-label">Select</span>
            <Select
              value={selectValue}
              onChange={setSelectValue}
              placeholder="Pick a material..."
              searchPlaceholder="Search..."
              options={[
                { label: "Oak Wood", value: "oak" },
                { label: "Stone", value: "stone" },
                { label: "Iron Ingot", value: "iron" },
                { label: "Diamond", value: "diamond" },
              ]}
            />
            <span className="demo-code">value: {selectValue || "—"}</span>
          </div>
          <div className="demo-row">
            <span className="demo-label">Slider</span>
            <div style={{ width: 320 }}>
              <Slider value={sliderValue} min={0} max={10} onChange={setSliderValue} />
            </div>
            <Tag>{sliderValue}</Tag>
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>Menu &amp; Tooltip</h2>
        <div className="demo-card">
          <div className="demo-row">
            <DropdownMenu
              items={[
                { id: "rename", label: "Rename" },
                { id: "delete", label: "Delete", disabled: true },
                { id: "duplicate", label: "Duplicate", onClick: () => alert("Duplicated!") },
              ]}
            />
            <span className="demo-label">DropdownMenu (click the ⋮ button)</span>
          </div>
          <div className="demo-row">
            <Tooltip content="I am a tooltip" placement="top">
              <Button variant="secondary">Hover me (top)</Button>
            </Tooltip>
            <Tooltip content="Tooltips are fun" placement="bottom">
              <Button variant="secondary">Hover me (bottom)</Button>
            </Tooltip>
            <Tooltip content="Click me to toggle" trigger="click" placement="right">
              <Button variant="secondary">Click me (right)</Button>
            </Tooltip>
          </div>
          <div className="demo-row">
            <span className="demo-label">Standalone Menu + MenuIcon</span>
            <MenuIcon />
            <Menu
              items={[
                { id: "one", label: "Option one" },
                { id: "two", label: "Option two", disabled: true },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="demo-section">
        <h2>FlexBox</h2>
        <div className="demo-card">
          <FlexBox direction="col" justify="flex-start" align="stretch" style={{ gap: 8 }}>
            <Button variant="primary">Stacked button 1</Button>
            <Button variant="secondary">Stacked button 2</Button>
            <div>
              <FlexBox justify="space-between">
                <Tag>A</Tag>
                <Tag>B</Tag>
                <Tag>C</Tag>
              </FlexBox>
            </div>
          </FlexBox>
        </div>
      </section>

      <section className="demo-section">
        <h2>List (virtualized + draggable + search + selection)</h2>
        <div className="demo-card">
          <div className="demo-list-box">
            <List
              items={listItems}
              draggable
              itemSize={48}
              renderItem={({ item, index }: { item: Item; index: number }) => (
                <div>
                  <strong>{item.name}</strong> <span>{item.description}</span>
                </div>
              )}
              search={{
                searchItem: (item: Item, keywords: string) =>
                  item.name.toLowerCase().includes(keywords.toLowerCase()),
              }}
              selection={{
                initialSelectedIds: [],
              }}
              menu={{
                items: (item?: Item) => [
                  { id: `${item?.id}-open`, label: `Open ${item?.name}` },
                  { id: `${item?.id}-info`, label: "Info" },
                ],
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
