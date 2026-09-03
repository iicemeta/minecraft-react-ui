import React from "react";
import Dropdown, { type DropdownProps } from "@/components/layers/Dropdown";
import Button from "@/components/buttons/Button";
import Menu, { type MenuProps } from "@/components/content/Menu";
import { MenuIcon } from "@/components/content/Menu";
import type { ButtonProps } from "@/components/buttons/Button/Button.types";

export type DropdownMenuProps = MenuProps & ButtonProps & DropdownProps;

const DropdownMenu = ({
  items,
  placement = "bottom-start",
  className,
  onClick,
  tabIndex,
}: MenuProps & ButtonProps & { placement?: DropdownProps["placement"] }) => {
  return (
    <Dropdown
      closeOnClickOutside
      closeOnClickContent
      placement={placement}
      content={<Menu items={items} />}
      target={
        <Button
          onClick={onClick}
          variant={"clear"}
          className={className}
          tabIndex={tabIndex as any}
        >
          <MenuIcon />
        </Button>
      }
    />
  );
};

export default DropdownMenu;
