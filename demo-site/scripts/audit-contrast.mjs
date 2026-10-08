// Contrast audit for the showcase themes.
//
// Why this exists: the light theme cannot be expressed by the library's palette
// alone. Two of its variables are overloaded — `--text-color` is both the page
// ink and the ink drawn on the green `--primary-color` surface, and
// `--text-color-invert` is both the ink on the light-grey `--secondary-color`
// surface and the background of empty controls. The shipped dark theme gets away
// with that because each overloaded pair collapses to one value; a light theme
// cannot, so src/styles/site.css carries a small adapter. This script resolves
// the palette the same way the browser would and checks that every ink/surface
// pair the library actually paints clears its WCAG threshold, so the adapter
// cannot silently rot when the library's colours change.
//
// Run with:  npm run audit:contrast
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LIB = path.resolve(SITE, "..");

const blockOf = (css, selector) => {
  const idx = css.indexOf(selector);
  if (idx === -1) return "";
  const start = css.indexOf("{", idx);
  if (start === -1) return "";
  let depth = 0;
  for (let i = start; i < css.length; i++) {
    if (css[i] === "{") depth++;
    else if (css[i] === "}" && --depth === 0) return css.slice(start + 1, i);
  }
  return "";
};

const varsIn = (css) => {
  const out = {};
  for (const m of css.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/gi)) out[m[1].trim()] = m[2].trim();
  return out;
};

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const p = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(p) : [p];
  });

// The library declares its palette in styles/minecraft-ui.css and derives
// per-component variables (--checkbox-text-color, --slider-rail-fill-color, …)
// in component :root blocks. Flatten them all; only the palette is overridden
// per theme, so order does not matter for the values we resolve.
const libraryVars = {};
for (const file of walk(path.join(LIB, "src")).filter((f) => f.endsWith(".css"))) {
  Object.assign(libraryVars, varsIn(fs.readFileSync(file, "utf8")));
}

const siteCss = fs.readFileSync(path.join(SITE, "src/styles/site.css"), "utf8");
const siteBase = varsIn(blockOf(siteCss, ":root {"));
const themeBlocks = {
  dark: varsIn(blockOf(siteCss, ':root[data-theme="dark"]')),
  light: varsIn(blockOf(siteCss, ':root[data-theme="light"]')),
};

// The light-mode adapter, read out of the stylesheet rather than duplicated here.
const adapterVars = varsIn(
  [...siteCss.matchAll(/:root\[data-theme="light"\][^{]*\{([^}]*)\}/g)].map((m) => m[1]).join("\n")
);
const adapterComponentVars = {};
for (const m of siteCss.matchAll(/:root\[data-theme="light"\]\s*\.([A-Za-z_]+)\s*\{([^}]*)\}/g)) {
  adapterComponentVars[m[1]] = varsIn(m[2]);
}

const storeFor = (theme) => {
  const values = { ...libraryVars, ...siteBase, ...themeBlocks[theme] };
  if (theme === "light") Object.assign(values, adapterVars);

  const resolve = (name, seen = 0) => {
    const value = values[name];
    if (value === undefined || seen > 10) return value;
    return value.replace(/var\((--[a-z0-9-]+)\)/g, (_, ref) => resolve(ref, seen + 1) ?? "#000000");
  };
  const resolveValue = (value) =>
    value == null ? value : value.replace(/var\((--[a-z0-9-]+)\)/g, (_, ref) => resolve(ref) ?? "#000000");

  return { resolve, resolveValue };
};

const toLinear = (channel) =>
  channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;

const parseColor = (value) => {
  if (!value) return null;
  const text = value.trim();
  let m = text.match(/^#([0-9a-f]{6})$/i);
  if (m) return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16));
  m = text.match(/^#([0-9a-f]{3})$/i);
  if (m) return [0, 1, 2].map((i) => parseInt(m[1][i] + m[1][i], 16));
  m = text.match(/^rgba?\(([^)]+)\)$/i);
  if (m) return m[1].split(",").slice(0, 3).map((n) => parseFloat(n));
  return null;
};

const relativeLuminance = (rgb) => {
  const [r, g, b] = rgb.map((v) => toLinear(v / 255));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const contrastRatio = (a, b) => {
  const first = parseColor(a);
  const second = parseColor(b);
  if (!first || !second) return null;
  const la = relativeLuminance(first);
  const lb = relativeLuminance(second);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
};

let failures = 0;

for (const theme of ["dark", "light"]) {
  const { resolve, resolveValue } = storeFor(theme);

  // Which variable carries the label of each button variant, mirroring
  // Button.css plus the light-mode adapter.
  const labelInk = (variant) => {
    const adapted = resolveValue(adapterComponentVars[`Button_${variant}`]?.["--button-text-color"]);
    if (theme === "light" && adapted) return adapted;
    return variant === "secondary" ? resolve("--text-color-invert") : resolve("--text-color");
  };

  const pairs = [
    ["page text / clear button", resolve("--text-color"),          resolve("--background-color"), 4.5],
    ["primary button label",     labelInk("primary"),              resolve("--primary-color"),    4.5],
    ["secondary button label",   labelInk("secondary"),            resolve("--secondary-color"),  4.5],
    ["Tag label",                theme === "light" ? resolve("--text-color") : resolve("--text-color-invert"), resolve("--secondary-color"), 4.5],
    ["input text",               resolve("--text-color"),          resolve("--midground-color"),  4.5],
    ["menu item text",           resolve("--text-color"),          resolve("--midground-color"),  4.5],
    ["checkbox tick",            resolve("--checkbox-text-color"), resolve("--checkbox-bg-checked-color"), 3.0],
    ["radio dot",                resolve("--radio-text-color"),    resolve("--radio-bg-checked-color"),    3.0],
    ["switch knob off",          resolve("--switch-text-hover-color"), resolve("--text-color-invert"), 3.0],
    ["switch knob on",           resolve("--switch-bg-checked-color"), resolve("--text-color-invert"), 3.0],
    ["slider rail fill (base)",  resolve("--primary-color"),       resolve("--secondary-color"),  3.0],
    ["site body text",           resolve("--site-text"),           resolve("--site-bg"),          4.5],
    ["dropdown panel title",     resolve("--site-text"),           resolve("--site-panel"),       4.5],
    ["site dim text",            resolve("--site-text-dim"),       resolve("--site-panel"),       4.5],
    ["site faint text",          resolve("--site-text-faint"),     resolve("--site-panel"),       4.5],
    ["site faint on panel-2",    resolve("--site-text-faint"),     resolve("--site-panel-2"),     4.5],
    ["site link",                resolve("--site-accent"),         resolve("--site-bg"),          4.5],
    ["code text",                resolve("--site-text"),           resolve("--site-code-bg"),     4.5],
  ];

  console.log(`\n===== ${theme.toUpperCase()} =====`);
  for (const [label, ink, surface, minimum] of pairs) {
    const ratio = contrastRatio(ink, surface);
    const passed = ratio !== null && ratio >= minimum;
    if (!passed) failures++;
    const shown = ratio === null ? "  n/a" : `${ratio.toFixed(2).padStart(5)}:1`;
    console.log(
      `  ${passed ? "PASS" : "FAIL"}  ${label.padEnd(24)} ${shown}  (min ${minimum})   ${ink} on ${surface}`
    );
  }
}

console.log(
  `\nRESULT: ${failures === 0 ? "all pairs pass" : `${failures} pair(s) below threshold`}`
);
process.exitCode = failures ? 1 : 0;
