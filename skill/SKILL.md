---
name: minecraft-react-ui
description: This skill should be used when building or maintaining a React interface with @iicemeta/minecraft-react-ui — the Minecraft-styled component library (Button, ButtonGroup, Input, Checkbox, Radio, Switch, CheckboxGroup, RadioGroup, Select, Slider, List, Menu, MenuItem, MenuIcon, DropdownMenu, Dropdown, Tooltip, FlexBox, Tag). Covers installing the package, wiring its stylesheet, theming through CSS custom properties, per-component props and worked examples, and the traps that make these components render unstyled, transparent, collapsed or hidden behind other chrome. Targets version 1.0.2.
agent_created: true
---

# Minecraft React UI

A React 19 + TypeScript component library that renders Minecraft-style widgets:
bezel buttons, pixelated inputs, a virtualised draggable list, and floating layers
built on `@floating-ui`. Published on npm as `@iicemeta/minecraft-react-ui`.

The whole surface is 19 components. Everything below is either a rule that applies
to all of them or a pointer to the file that documents one of them.

## Workflow

1. **Install and wire the stylesheet once per project.** Read
   `references/getting-started.md` for the install command, the mandatory style
   import, the full `:root` token list and the list of props that are declared but
   do nothing. Skipping the style import is the single most common cause of
   "everything renders unstyled".
2. **Look the component up before writing props.** Each component has its own file
   under `references/`. The prop tables carry caveats the type signatures do not —
   which props are inert, which are required in practice, what the component wraps
   or portals.
3. **Start from the examples.** Each reference file reproduces the examples from the
   library's own gallery; they are known to work as written on the documented
   version. Snippets assume `import { useState } from "react"`.
4. **Compose, then verify by rendering.** These components are CSS-driven, so a
   wrong-looking result is usually a CSS problem, not a props problem. When
   something is unstyled, transparent, collapsed or hidden, check the traps below
   before changing props.
5. **For anything the docs do not cover** — a custom panel, a light theme, a new
   composition — read the shipped stylesheet (`dist/minecraft-react-ui.css` inside
   the installed package) rather than guessing, and see the `demo-site/` directory
   in the repository for a worked light theme and per-component demos.

## Traps that bite

- **The stylesheet import is not optional.** `import "@iicemeta/minecraft-react-ui/style.css"`
  at the app entry, before app CSS. Without it the components render as bare
  semantic HTML.
- **`Button` has no default `variant`.** Upstream set one through `defaultProps`,
  which React 19 dropped. Always pass `variant="primary" | "secondary" | "clear"`,
  otherwise the button renders with no colours at all.
- **Inputs are controlled.** Pass `value` and `onChange`. `Checkbox`, `Switch` and
  `Radio` take the boolean/string directly, not an event.
- **No built-in label.** `Checkbox` and `Switch` accept a `label` prop that is never
  rendered. Wrap the control in your own `<label>` so the text is clickable.
- **`Dropdown` adds no chrome of its own.** It portals `content` into
  `document.body` and positions it — nothing more: no background, no border, no
  padding, no shadow. Style whatever is passed as `content`, or it is painted
  transparently over the page beneath it. `DropdownMenu` and `Select` are built on
  it and pass a `Menu`, which does carry a background.
- **Portalled panels need `--floating-z-index` (default `1000`, added in 1.0.2).**
  On earlier versions nothing set a `z-index`, so any app chrome with its own
  stacking order — a sticky header, a drawer — paints over an open panel and takes
  its clicks. Raise the token if app chrome sits higher.
- **`Tooltip` wraps its child in a `<span class="TooltipTarget">`.** That is an extra
  inline box in the layout; account for it in flex and grid, and do not pass a child
  that refuses to be wrapped.
- **`List` virtualises, so it needs a bounded height.** Give the container a fixed
  height, or `min-height: 0` inside a flex column, or it collapses to nothing.
- **`Select` is composed from `Dropdown` + `Menu`**, so the portal rules above apply
  to its popup too.
- **Theming has an overloaded pair of variables.** `--text-color` is both the page
  ink and the ink drawn on the green `--primary-color` surface; `--text-color-invert`
  is both the ink on the light-grey `--secondary-color` surface and the background of
  empty controls. A dark theme survives that overlap; a light theme has to split the
  couplings. `references/getting-started.md` lists the tokens and the worked example.
- **Components request the `Minecraft, Minercraftory` webfonts** but do not ship them.
  Without the font the fallback stack applies.

## Reference index

| Component | Family | File | What it is |
| --- | --- | --- | --- |
| `Button` | Buttons | [button.md](./references/button.md) | Bezel button with three variants and an active state |
| `ButtonGroup` | Buttons | [button-group.md](./references/button-group.md) | Segmented row of buttons driven by a value |
| `Input` | Inputs | [input.md](./references/input.md) | Single-line text field |
| `Checkbox` | Inputs | [checkbox.md](./references/checkbox.md) | Checkbox drawn in CSS around a real `<input>` |
| `Switch` | Inputs | [switch.md](./references/switch.md) | On/off toggle |
| `Radio` | Inputs | [radio.md](./references/radio.md) | Single radio button |
| `CheckboxGroup` | Inputs | [checkbox-group.md](./references/checkbox-group.md) | Checkbox list with an optional select-all |
| `RadioGroup` | Inputs | [radio-group.md](./references/radio-group.md) | Radio list |
| `Select` | Inputs | [select.md](./references/select.md) | Searchable dropdown select |
| `Slider` | Inputs | [slider.md](./references/slider.md) | Integer slider with a draggable handle |
| `Menu` | Content | [menu.md](./references/menu.md) | Vertical menu list |
| `MenuItem` | Content | [menu-item.md](./references/menu-item.md) | One menu row |
| `MenuIcon` | Content | [menu-icon.md](./references/menu-icon.md) | The three-line menu glyph |
| `DropdownMenu` | Content | [dropdown-menu.md](./references/dropdown-menu.md) | Menu inside a Dropdown behind a button |
| `List` | Content | [list.md](./references/list.md) | Virtualised list with drag, search, selection and per-row menus |
| `Dropdown` | Layers | [dropdown.md](./references/dropdown.md) | The positioning primitive behind every popup |
| `Tooltip` | Layers | [tooltip.md](./references/tooltip.md) | Floating hint with a pixel arrow |
| `FlexBox` | Layout | [flex-box.md](./references/flex-box.md) | Flex container driven by props |
| `Tag` | Layout | [tag.md](./references/tag.md) | Small inline label |

Start with [getting-started.md](./references/getting-started.md) for install,
theming and the inert-prop list.

## Provenance

The reference pages are generated from `demo-site/src/registry.ts` — the same data
that drives the library's live showcase gallery, whose prop tables were typechecked
against the published package. Component names are cross-checked against the
library's entry point (`src/index.ts`), so a page cannot exist for something that
is not exported. The content describes **1.0.2**; check the installed version if a
prop behaves differently.
