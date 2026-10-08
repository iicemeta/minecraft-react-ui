import type { ComponentType } from "react";

export type PropRow = {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
};

export type Example = {
  title: string;
  description?: string;
  /** the snippet shown next to the live demo */
  code: string;
  Demo: ComponentType;
};

export type Entry = {
  /** stable id, also the hash route: #/component/<id> */
  id: string;
  /** exported symbol name */
  title: string;
  group: string;
  summary: string;
  examples: Example[];
  props: PropRow[];
  notes?: string[];
};
