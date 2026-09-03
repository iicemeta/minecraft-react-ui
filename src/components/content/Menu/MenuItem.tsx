import * as React from "react";
import { cn } from "@/utils/cn";
import "./MenuItem.css";

export type MenuItemProps = React.HTMLAttributes<HTMLDivElement> & {
  id: string;
  label: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  disabled?: boolean;
};

const MenuItem = ({ label, onClick, disabled, ...rest }: MenuItemProps) => {
  return (
    <div
      onClick={onClick}
      className={cn("MenuItem", { [`MenuItem_disabled`]: disabled })}
      {...rest}
    >
      {label}
    </div>
  );
};

export default MenuItem;