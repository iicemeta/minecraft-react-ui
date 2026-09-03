import React from "react";
import { cn } from "@/utils/cn";
import Input from "@/components/inputs/Input";
import Menu from "@/components/content/Menu";
import Button from "@/components/buttons/Button";
import Dropdown from "@/components/layers/Dropdown";
import type { DropdownTargetProps } from "@/components/layers/Dropdown";
import "./Select.css";

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SelectProps = {
  value?: string;
  options: Array<SelectOption>;
  onChange: (value?: string) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
};

const Select = ({
  className,
  disabled,
  options,
  value,
  placeholder,
  searchPlaceholder,
  onChange,
  onFocus = () => {},
  onBlur = () => {},
}: SelectProps) => {
  const [focus, setFocus] = React.useState<boolean>(false);
  const [filter, setFilter] = React.useState<string>("");

  const inputRef = React.useRef(null);

  const selectOption = (option: SelectOption) => {
    onChange(option.value);
    setFocus(false);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true);
    onFocus(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    onBlur(event);
  };

  const handleFilter = (value: string) => {
    setFilter(value);
  };

  React.useEffect(() => {
    setFilter("");
  }, [focus]);

  const filteredOptions = options.filter((option) => {
    return (
      option.label.toLowerCase().includes(filter.toLowerCase()) ||
      option.value.toLowerCase().includes(filter.toLowerCase())
    );
  });

  const inputPlaceholder = focus && searchPlaceholder ? searchPlaceholder : placeholder;

  const selectedOption = options.find((option) => option.value === value);

  const inputValue = focus
    ? filter
    : value && selectedOption
      ? selectedOption.label
      : "";

  return (
    <Dropdown
      closeOnClickOutside
      content={
        <Menu
          items={filteredOptions.map((option) => ({
            id: option.value,
            label: option.label,
            disabled: option.disabled,
            onMouseDown: () => selectOption(option),
          }))}
        />
      }
      target={({ open, close, visible, ref, className: dropdownClassName }: DropdownTargetProps): React.ReactNode => (
        <div
          ref={ref}
          className={cn(className, dropdownClassName, "Select", {
            Select_disabled: disabled,
            Select_focus: focus,
            Select_visible: visible,
          })}
        >
          <Input
            ref={inputRef}
            className={cn("SelectValue")}
            disabled={disabled}
            onFocus={(event) => {
              open();
              handleFocus(event);
            }}
            onBlur={(event) => {
              close();
              handleBlur(event);
            }}
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={handleFilter}
          />
          <div className={cn("SelectActions")}>
            <Button
              onClick={() => onChange(undefined)}
              className={cn("SelectAction", "SelectActionClear")}
              variant="clear"
            >
              {"✕"}
            </Button>
            <Button
              onClick={() => {
                if (visible) {
                  close();
                } else {
                  open();
                }
              }}
              className={cn("SelectAction", "SelectActionOpen")}
              variant="clear"
            >
              {visible ? "▲" : "▼"}
            </Button>
          </div>
        </div>
      )}
    />
  );
};

export default Select;