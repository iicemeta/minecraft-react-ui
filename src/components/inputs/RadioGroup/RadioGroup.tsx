import * as React from "react";
import { cn } from "@/utils/cn";
import "./RadioGroup.css";
import Radio from "@/components/inputs/Radio";

export type RadioGroupOption = {
  label: string;
  value: string;
  disabled?: boolean;
  readOnly?: boolean;
};

export type RadioGroupProps = Omit<React.HTMLProps<HTMLDivElement>, "onChange" | "value"> & {
  name: string;
  value: string | undefined;
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  options: Array<RadioGroupOption>;
  className?: string;
  direction?: "row" | "column";
  disabled?: boolean;
  readOnly?: boolean;
};

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ name, value, onChange, options, disabled, readOnly, className, direction = "column" }, ref) => {
    const optionId = (option: RadioGroupOption) => `${name}-${option.value}`;
    const handleChange = (option: RadioGroupOption, event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(option.value, event);
    };

    return (
      <div
        className={cn("RadioGroup", className, {
          [`RadioGroup_${direction}`]: true,
          [`RadioGroup_disabled`]: disabled,
        })}
        ref={ref}
      >
        {options.map((option: RadioGroupOption) => (
          <label
            key={optionId(option)}
            htmlFor={optionId(option)}
            className={cn("RadioOption", {
              [`RadioOption_readOnly`]: readOnly || option.readOnly,
              [`RadioOption_disabled`]: disabled || option.disabled,
            })}
          >
            <Radio
              id={optionId(option)}
              disabled={disabled || option.disabled}
              readOnly={readOnly || option.readOnly}
              value={option.value}
              checked={value === option.value}
              onChange={(value, event) => handleChange(option, event)}
            />
            <span title={option.label}>{option.label}</span>
          </label>
        ))}
      </div>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

export default RadioGroup;