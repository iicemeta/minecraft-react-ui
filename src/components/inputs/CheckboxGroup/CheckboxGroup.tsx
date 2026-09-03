import * as React from "react";
import { cn } from "@/utils/cn";
import "./CheckboxGroup.css";
import Checkbox from "@/components/inputs/Checkbox";

export type CheckboxGroupOption = {
  label: string;
  value: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export type CheckboxGroupProps = Omit<React.HTMLProps<HTMLDivElement>, "onChange" | "value"> & {
  name: string;
  value?: Array<string>;
  onChange: (value: Array<string>, event: React.ChangeEvent<HTMLInputElement>) => void;
  options: Array<CheckboxGroupOption>;
  className?: string;
  direction?: "row" | "column";
  showSelectAll?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
};

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ name, value, onChange, options, disabled, readOnly, className, showSelectAll, direction = "column" }, ref) => {
    const optionId = (option: CheckboxGroupOption) => `${name}-${option.value}`;
    const handleChange = (
      option: CheckboxGroupOption,
      checked: boolean,
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      onChange(
        [...(value?.filter((optionValue) => optionValue !== option.value) || []), ...(checked ? [option.value] : [])],
        event,
      );
    };

    const allSelected = options.every((option) => value?.includes(option.value));

    const handleSelectAll = (value: boolean, event: React.ChangeEvent<HTMLInputElement>) => {
      if (allSelected) {
        onChange([], event);
      } else {
        onChange(
          options.map((option) => option.value),
          event,
        );
      }
    };

    return (
      <div
        className={cn("CheckboxGroup", className, {
          [`CheckboxGroup_${direction}`]: true,
          [`CheckboxGroup_disabled`]: disabled,
        })}
        ref={ref}
      >
        {options.map((option: CheckboxGroupOption) => (
          <label
            key={optionId(option)}
            htmlFor={optionId(option)}
            className={cn("CheckboxOption", {
              [`CheckboxOption_readOnly`]: readOnly || option.readOnly,
              [`CheckboxOption_disabled`]: disabled || option.disabled,
            })}
          >
            <Checkbox
              id={optionId(option)}
              disabled={disabled || option.disabled}
              readOnly={readOnly || option.readOnly}
              value={value?.includes(option.value) ?? false}
              onChange={(value, event) => handleChange(option, value, event)}
            />
            <span title={option.label}>{option.label}</span>
          </label>
        ))}
        {showSelectAll && (
          <label htmlFor={`${name}-SELECT_ALL`} className={cn("CheckboxOption")}>
            <Checkbox
              id={"select_all"}
              disabled={disabled}
              value={options.every((option) => value?.includes(option.value))}
              onChange={handleSelectAll}
              indeterminate={!allSelected && (value ? value.length > 0 : false)}
            />
            <span>Select all</span>
          </label>
        )}
      </div>
    );
  },
);

CheckboxGroup.displayName = "CheckboxGroup";

export default CheckboxGroup;