import * as React from "react";
import { cn } from "@/utils/cn";
import "./Menu.css";
import MenuItem from "./MenuItem";
import type { MenuItemProps } from "./MenuItem";

export type MenuProps = {
  items: Array<MenuItemProps>;
};

const Menu = React.forwardRef<HTMLDivElement, MenuProps>(({ items }, ref) => {
  return (
    <div ref={ref} className={cn("Menu")}>
      {items.map((item) => (
        <MenuItem key={item.id} {...item} />
      ))}
    </div>
  );
});

Menu.displayName = "Menu";

export default Menu;