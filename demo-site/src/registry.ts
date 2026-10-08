// The version actually installed on disk, read straight out of the published
// package's manifest (the library exports "./package.json"). This is proof that
// the showcase consumes the real npm artifact and not the local src/ tree.
import libraryManifest from "@iicemeta/minecraft-react-ui/package.json";

import { buttonEntry, buttonGroupEntry } from "./demos/buttons";
import {
  checkboxEntry,
  checkboxGroupEntry,
  inputEntry,
  radioEntry,
  radioGroupEntry,
  selectEntry,
  sliderEntry,
  switchEntry,
} from "./demos/inputs";
import {
  dropdownMenuEntry,
  listEntry,
  menuEntry,
  menuIconEntry,
  menuItemEntry,
} from "./demos/content";
import { dropdownEntry, tooltipEntry } from "./demos/layers";
import { flexBoxEntry, tagEntry } from "./demos/layout";
import type { Entry } from "./lib/types";

export const libraryVersion: string = libraryManifest.version;
export const libraryName: string = libraryManifest.name;

export const entries: Array<Entry> = [
  // Buttons
  buttonEntry,
  buttonGroupEntry,
  // Inputs
  inputEntry,
  checkboxEntry,
  switchEntry,
  radioEntry,
  checkboxGroupEntry,
  radioGroupEntry,
  selectEntry,
  sliderEntry,
  // Content
  menuEntry,
  menuItemEntry,
  menuIconEntry,
  dropdownMenuEntry,
  listEntry,
  // Layers
  dropdownEntry,
  tooltipEntry,
  // Layout
  flexBoxEntry,
  tagEntry,
];

export type Group = {
  name: string;
  items: Array<Entry>;
};

/** Same order as the library's own src/index.ts, so nothing gets forgotten. */
const GROUP_ORDER = ["Buttons", "Inputs", "Content", "Layers", "Layout"];

export const groups: Array<Group> = GROUP_ORDER.map((name) => ({
  name,
  items: entries.filter((entry) => entry.group === name),
})).filter((group) => group.items.length > 0);

export const entryById: ReadonlyMap<string, Entry> = new Map(
  entries.map((entry) => [entry.id, entry])
);

export const exampleCount: number = entries.reduce(
  (total, entry) => total + entry.examples.length,
  0
);

export const propCount: number = entries.reduce(
  (total, entry) => total + entry.props.length,
  0
);
