import * as React from "react";
import { cn } from "@/utils/cn";
import "./ButtonGroup.css";
import Button from "@/components/buttons/Button";
import { ButtonProps } from "@/components/buttons/Button/Button.types";

type ButtonGroupOptionProps = ButtonProps & { value: string; label: string };

export type ButtonGroupProps = {
  value: string;
  onChange?: (value: string) => void;
  options: Array<ButtonGroupOptionProps>;
  disabled?: boolean;
  className?: string;
};

const ButtonGroup = ({ options, disabled, className, onChange, value }: ButtonGroupProps) => {
  const handleClick = (option: ButtonGroupOptionProps, event: React.MouseEvent<HTMLButtonElement>) => {
    if (option.onClick) {
      option.onClick(event);
    }
    if (onChange) {
      onChange(option.value);
    }
  };
  return (
    <div className={cn("ButtonGroup", className)}>
      {options.map((option, index) => (
        <Button
          key={index}
          disabled={disabled}
          type={"button"}
          active={option.value === value}
          className={cn("ButtonGroupButton", {
            "ButtonGroupButton-active": option.value === value,
          })}
          onClick={(event) => handleClick(option, event)}
          variant={option.value === value ? "primary" : "secondary"}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

ButtonGroup.displayName = "ButtonGroup";

export default ButtonGroup;
