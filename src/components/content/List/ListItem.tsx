import React from "react";
import { cn } from "@/utils/cn";
import Checkbox from "@/components/inputs/Checkbox";
import DropdownMenu from "@/components/content/DropdownMenu";
import { useListItemContext } from "./ListContext";
import type { ListItemProps } from "./types";
import "./ListItem.css";

const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, index, className, item, dragging, ...rest }, ref) => {
    const { selection, menu, renderItem, search } = useListItemContext({
      item,
      index,
    });
    const selectionEnable = selection && selection.selectedIds.length > 0;
    const selected = selection && selection.selected;

    const handleClick = () => {
      if (selection && selection.selectedIds.length > 0) {
        selection.toggle();
      }
    };

    return (
      <li
        ref={ref}
        {...rest}
        className={cn("ListItem", className, {
          ListItem_selected: selected,
          ListItem_selection: selectionEnable,
          ListItem_dragging: dragging,
          ListItem_filtered: search?.filtered,
          ListItem_highlighted: search?.currentResultItemIndex === index,
        })}
      >
        {selection && (
          <Checkbox
            className={cn("ListItemCheckbox")}
            onChange={() => selection.toggle()}
            value={selection.selected}
          />
        )}
        <div onClick={handleClick} className={cn("ListItemContent")}>
          {renderItem({ item, index })}
        </div>
        {menu && (
          <DropdownMenu
            className={cn("ListItemOptions")}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => event.stopPropagation()}
            tabIndex={selection && selection.selectedIds.length > 0 ? -1 : 0}
            placement="bottom-end"
            {...menu}
          />
        )}
      </li>
    );
  },
);

export default ListItem;