import * as React from "react";
import { cn } from "@/utils/cn";
import "./Button.css";

import { ButtonProps } from "./Button.types";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, onClick, active, disabled, className, type, variant, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        type={type}
        onClick={onClick}
        className={cn("Button", className, {
          [`Button_${variant}`]: variant,
          [`Button_active`]: active,
          [`Button_disabled`]: disabled,
        })}
      >
        <span className={cn("ButtonText")}>{children}</span>
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
