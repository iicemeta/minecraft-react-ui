import * as React from "react";
import { cn } from "@/utils/cn";
import "./Tag.css";

export type TagProps = {
  className?: string;
  children: React.ReactNode;
};

const Tag = ({ className, children }: TagProps) => {
  return <span className={cn("Tag", className)}>{children}</span>;
};

export default Tag;
