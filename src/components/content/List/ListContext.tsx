import React from "react";
import type {
  RenderItemProps,
  ListContextValue,
  ListItemContextValue,
  ListContextProviderProps,
} from "./types";

const ListContext = React.createContext<ListContextValue>({
  items: [],
  renderItem: ({ item }: RenderItemProps) => item.id,
});

export const useListContext = () =>
  React.useContext<ListContextValue>(ListContext);

export const useListItemContext: ({
  item,
  index,
}: RenderItemProps) => ListItemContextValue = ({ item, index }) => {
  const { selection, menu, search, renderItem } = useListContext();

  const itemMenu = (() => {
    if (menu) {
      return {
        items: menu.items(item),
      };
    }
    return undefined;
  })();

  const itemSelection = (() => {
    if (selection) {
      const { itemSelected, selectedIds, setSelectedIds, itemDisabled } =
        selection;
      const selected = Boolean(itemSelected && itemSelected(item));
      const disabled = Boolean(itemDisabled && itemDisabled(item));
      const toggle = () => {
        setSelectedIds([
          ...selectedIds.filter((id) => id !== item.id),
          ...(selected ? [] : [item.id]),
        ]);
      };
      return {
        selected,
        selectedIds,
        toggle,
        disabled,
      };
    }
    return undefined;
  })();

  const itemSearch = (() => {
    if (search) {
      return {
        ...search,
        filtered: search.searchItem(item, search.keywords),
      };
    }
    return undefined;
  })();

  return {
    index,
    item,
    renderItem,
    menu: itemMenu,
    selection: itemSelection,
    search: itemSearch,
  };
};

export const ListContextProvider = ({
  value,
  children,
}: ListContextProviderProps) => {
  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export default ListContext;