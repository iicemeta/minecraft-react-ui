import type React from "react";
import type { MenuProps } from "@/components/content/Menu";

export type ListProps = {
  className?: string;
  children?: React.ReactNode;
  items: Array<Item>;
  menu?: ListMenuProps;
  search?: ListSearchProps;
  selection?: ListSelectionProps;
  renderItem: (renderItemProps: RenderItemProps) => React.ReactNode;
  direction?: "row" | "column";
  draggable?: boolean;
  itemSize?: number;
};

export type Item = {
  id: string;
  [key: string]: any;
};

export type ListSearchProps = {
  searchItem: (item: Item, keywords: string) => boolean;
};

export type ListMenuProps = Omit<MenuProps, "items"> & {
  items: (item?: Item) => MenuProps["items"];
};

export type ListContextValue = {
  items: Array<Item>;
  selection?: ListSelectionContextValue;
  search?: ListSearchContextValue;
  menu?: ListMenuProps;
  renderItem: (props: RenderItemProps) => React.ReactNode;
};

export type ListContextProviderProps = {
  value: {
    items: Array<Item>;
    selection?: ListSelectionContextValue;
    search?: ListSearchContextValue;
    menu?: ListMenuProps;
    renderItem: (props: RenderItemProps) => React.ReactNode;
  };
  children: React.ReactNode;
};

export type ListItemSelection = {
  selected: boolean;
  selectedIds: Array<Item["id"]>;
  setSelectedIds: (selectedIds: Array<Item["id"]>) => void;
  toggle: (item: Item) => void;
  disabled: boolean;
};

export type ListItemSelectionProps = {
  toggle: () => void;
  selected: boolean;
  selectedIds: Array<Item["id"]>;
  disabled: boolean;
};

export type ListItemProps = Omit<React.HTMLProps<HTMLLIElement>, "data"> & {
  children?: React.ReactNode;
  className?: string;
  index: number;
  item: Item;
  dragging?: boolean;
};

export type ListItemSearchProps = {
  searchItem: (item: Item, keywords: string) => boolean;
};

export type ListItemSearchContextValue = ListItemSearchProps & {
  filtered: boolean;
  currentResultItemIndex: number;
};

export type ListItemContextValue = {
  index: number;
  item: Item;
  renderItem: (props: RenderItemProps) => React.ReactNode;
  menu: MenuProps | undefined;
  selection: ListItemSelectionProps | undefined;
  search: ListItemSearchContextValue | undefined;
};

export type ListSelectionProps = {
  itemDisabled?: (item: Item) => ListItemSelectionProps["disabled"];
  initialSelectedIds?: Array<Item["id"]>;
};

export type ListSelectionContextValue = {
  itemSelected?: (item: Item) => ListItemSelectionProps["selected"];
  itemDisabled?: (item: Item) => ListItemSelectionProps["disabled"];
  selectedIds: Array<Item["id"]>;
  setSelectedIds: (selectedIds: Array<Item["id"]>) => void;
};

export type RenderItemPropsData = {
  items: Array<Item>;
  draggable?: boolean;
  selection?: ListItemSelectionProps;
};

export type RenderItemProps = {
  item: Item;
  index: number;
  data?: RenderItemPropsData;
};

export type ListOptions = React.HTMLProps<HTMLDivElement> & {
  className?: string;
};

export type ListSearchContextValue = ListSearchProps & {
  onChange: (keywords: string) => void;
  keywords: string;
  next: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  prev: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  currentResultItemIndex: number;
};
