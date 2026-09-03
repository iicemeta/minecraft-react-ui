import * as React from "react";
import { cn } from "@/utils/cn";
import "./FlexBox.css";

export type FlexBoxProps = {
  direction?: "row" | "col";
  align?: "flex-start" | "flex-end" | "center" | "stretch";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  wrap?: "wrap" | "nowrap";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
};

const FlexBox = ({
  direction = "row",
  align = "flex-start",
  justify = "flex-start",
  className,
  style,
  children,
}: FlexBoxProps) => {
  return (
    <div
      style={style}
      className={cn("FlexBox", className, {
        [`FlexBox_${direction}`]: true,
        [`FlexBox_justify_${justify}`]: true,
        [`FlexBox_align_${align}`]: true,
        [`FlexBox_${justify}`]: true,
      })}
    >
      {children}
    </div>
  );
};

export default FlexBox;
