# Getting started

Covers `@iicemeta/minecraft-react-ui@1.0.2`. Peer dependencies: `react ^18.0.0 || ^19.0.0`, `react-dom ^18.0.0 || ^19.0.0`.

## Install

```bash
npm install @iicemeta/minecraft-react-ui
```

## Wire up the stylesheet

The library ships one stylesheet that carries the palette, the component rules and the webfont stack. **Import it once at the app entry point**, before any app CSS:

```tsx
import "@iicemeta/minecraft-react-ui/style.css";
import { Button } from "@iicemeta/minecraft-react-ui";

export function App() {
  return <Button variant="primary">Hello</Button>;
}
```

Components also set their own `font-family: Minecraft, Minercraftory`. Those are webfont names the consumer has to supply; without them the browser falls back to the next family in the stack.

## Palette and tokens

Every colour is a custom property on `:root`. Override them anywhere after the library stylesheet:

```css
:root {
  --background-color: #23232a;
  --midground-color: #484848;
  --foreground-color: #8b8b8b;
  --select-color: #fff;
  --primary-color: #3b8526;
  --primary-color-30: rgba(59, 133, 38, 0.3);
  --primary-color-hover: #50ad2e;
  --primary-color-hover-30: rgba(52, 165, 53, 0.3);
  --primary-color-active: #4bbc22;
  --primary-color-active-30: rgba(42, 100, 28, 0.3);
  --primary-color-dark: #1d4d13;
  --accent-color: #2e6be5;
  --secondary-color: #d0d1d4;
  --secondary-color-30: rgba(208, 209, 212, 0.3);
  --secondary-color-hover: #f4f6f9;
  --secondary-color-hover-30: rgba(244, 246, 249, 0.3);
  --secondary-color-active: #ffffff;
  --secondary-color-active-30: rgba(177, 178, 181, 0.3);
  --secondary-color-dark: #58585a;
  --success-color: #89ffb2;
  --warning-color: #fcd58c;
  --error-color: #ff8383;
  --text-color: #fff;
  --text-color-invert: #23232a;
  --bezel-color: rgba(0, 0, 0, 0.4);
  --bezel-color-semi: rgba(128, 128, 128, 0.4);
  --bezel-color-invert: rgba(255, 255, 255, 0.4);
  --floating-z-index: 1000;
}
```

Two entries deserve a note:

- `--text-color` is the page ink *and* the ink drawn on the green `--primary-color` surface (primary button labels, the checked checkbox tick, the radio dot). `--text-color-invert` is the ink on the light-grey `--secondary-color` surface *and* the background of empty controls. A dark theme can get away with that overlap; a light theme has to split them — see `demo-site/src/styles/site.css` in this repository for a worked example.
- `--floating-z-index` (default `1000`) is the stacking order of the two layers that portal into `document.body`, `Dropdown` and `Tooltip`. Raise it if app chrome sits higher, otherwise a sticky header paints over an open panel and takes its clicks.

## Props declared but not implemented in this version

These exist in the TypeScript types and do nothing at runtime. The per-component tables repeat the warning inline; they are collected here so one grep answers the question.

| Component | Prop | Why |
| --- | --- | --- |
| `checkbox` | `label` | Declared in the props type but NOT rendered in 1.0.2 — destructured and dropped. Wrap the checkbox in your own <label> instead. |
| `checkbox` | `onClick` | Also declared but NOT forwarded to the input in 1.0.2. |
| `switch` | `label` | Declared but not rendered in 1.0.2 (same as Checkbox). |
| `switch` | `onClick` | Declared but not forwarded in 1.0.2. |
| `slider` | `step` | Declared but not used in 1.0.2 — the slider always rounds to integers. |
| `slider` | `children / onClick / type / variant` | Declared in SliderProps but unused in 1.0.2; they are inherited leftovers. |
| `flex-box` | `wrap` | Declared in FlexBoxProps but NOT used in 1.0.2 — it never reaches the className. Set flex-wrap through style instead. |
